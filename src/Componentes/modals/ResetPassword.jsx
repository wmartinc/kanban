import Button from "../ui/shared/Button";
import Input from "../ui/shared/Input";
import { useModals } from "../../store/store";
import { useState, useEffect } from "react";
import { validateEmail } from "../auth/verificationAuth";
import { checkPassword } from "../../../utilities/format";
import useResetPassword from "../../hooks/user/useResetPassword";
import OtpEntry from "../ui/OtpEntry";
import useCheckOtp from "../../hooks/user/useCheckOtp";

const EmailRequestAction = ({ setEmail, showAlert }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <Input nameField="email" changeEvent={(e) => setEmail(e.target.value)}>
        Enter email associated
      </Input>
      {showAlert && <p className="text-red-500">Please enter a valid email address</p>}
    </div>
  );
};

const OtpSubmitAction = ({ saveOtp, error }) => {
  return (
    <div className="w-full flex flex-col gap-5">
      <OtpEntry saveOtp={saveOtp} />
      {error && <p className="text-rose-400 text-xs">{error}</p>}
    </div>
  );
};

const NewPasswordAction = ({ setPassword, setConfirmPassword, isPasswordValid, passwordsMatch }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div>
        <Input nameField="newPassword" type="password" changeEvent={(e) => setPassword(e.target.value)}>
          Enter new password
        </Input>
        {!isPasswordValid && (
          <p className="text-rose-400 text-xs mt-1">
            The password must have 8-64 characters, an uppercase, a lowercase, a number and a special character
          </p>
        )}
      </div>
      <div>
        <Input nameField="confirmPassword" type="password" changeEvent={(e) => setConfirmPassword(e.target.value)}>
          Confirm new password
        </Input>
        {!passwordsMatch && <p className="text-rose-400 text-xs mt-1">Passwords do not match</p>}
      </div>
    </div>
  );
};

const ResetPassword = () => {
  const [otpNumber, setOtpNumber] = useState({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: ""
  });

  const [email, setEmail] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [stage, setStage] = useState("email");
  const [updateMessage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const { isLoading, response, sendResetPassword, changePassword } = useResetPassword();
  const { isCheckingOtp, otpResponse, sendCheckOtp } = useCheckOtp();
  
  const updateModalStatus = useModals((state) => state.updateModalStatus);

  const closeModal = () => {
    updateModalStatus(false, "changePassword");
  };

  const saveOtp = (target) => {
    setOtpNumber({
      ...otpNumber,
      [target.name]: target.value || ""
    });
  };

  useEffect(() => {
    if (response && !response.error) {
      setStage("otp");
      setShowAlert(false);
    }
  }, [response]);

  useEffect(() => {
    if (otpResponse && !otpResponse.error) {
      setStage("newPassword");
    }
  }, [otpResponse]);

  const checkEmail = async () => {
    const isMailValid = validateEmail(email);
    if (!isMailValid) {
      setShowAlert(true);
      return;
    }

    setShowAlert(false);
    await sendResetPassword(email);
  };

  const checkOtp = async () => {
    const otp = Object.values(otpNumber).join("");
    await sendCheckOtp(otp);
  };

  const updatePassword = async () => {
    await changePassword(password, confirmPassword)
  };

  const submitNewPassword = () => {
    if (!otpResponse || otpResponse.error) return;

    const validPassword = checkPassword(password);
    const match = password === confirmPassword;

    setIsPasswordValid(validPassword);
    setPasswordsMatch(match);

    if (!validPassword || !match) return;
    updatePassword();
  };

  const confirmConfig = {
    email: { label: "Accept", variant: "primary", event: checkEmail },
    otp: { label: "Confirm OTP", variant: "primary", event: checkOtp },
    newPassword: { label: "Update password", variant: "secondary", event: submitNewPassword }
  }[stage];

  return (
    <div className="bg-black/60 h-90 flex-center w-105 rounded-xl shadow-2xl fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="w-[70%] min-w-25 flex-center flex-col gap-5">
        <div className="w-full">
          {stage === "email" && (
            <EmailRequestAction
              setEmail={setEmail}
              showAlert={showAlert}
            />
          )}

          {stage === "otp" && (
            <OtpSubmitAction
              saveOtp={saveOtp}
              error={otpResponse?.error}
            />
          )}

          {stage === "newPassword" && otpResponse && !otpResponse.error && (
            <NewPasswordAction
              setPassword={setPassword}
              setConfirmPassword={setConfirmPassword}
              isPasswordValid={isPasswordValid}
              passwordsMatch={passwordsMatch}
            />
          )}
  
          {updateMessage && <p className="text-emerald-400 text-sm mt-2">{updateMessage}</p>}
          {response?.error && stage === "email" && (
            <p className="text-rose-400 text-xs mt-2">{response.error}</p>
          )}
        </div>
        {(isLoading || isCheckingOtp) && (
          <div className="relative flex-center">
            <div className="absolute size-8 rounded-full border-t-2 animate-spin border-t-white"></div>
          </div>
        )}
        <div className="w-full flex justify-between items-center">
          <Button variant="ghost" event={closeModal}>Cancel</Button>
          <Button variant={confirmConfig.variant} event={confirmConfig.event}>{confirmConfig.label}</Button>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword;