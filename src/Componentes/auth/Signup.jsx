import { useNavigate } from "react-router";
import Button from "../ui/shared/Button";
import Input from "../ui/shared/Input";
import { validateEmail } from "./verificationAuth";
import { checkPassword } from '../../../utilities/format'
import { UserPlus } from "lucide-react";
import { useState } from "react";
import OtpEntry from "../ui/OtpEntry";
import { createUser, signupCheck } from "../../controllers/authorization.controller";

const OtpSubmitAction = ({ saveOtp, error }) => {
  return (
    <div className="w-full flex flex-col gap-5">
      <OtpEntry saveOtp={saveOtp} />
      {error && <p className="text-rose-400 text-xs">{error}</p>}
    </div>
  );
};

const Signup = () => {
  const navigate = useNavigate()
  const [userCredentials, setUserCredentials] = useState({ userName: "", email: "", password: "", confirmPassword: "" })
  const [otpNumber, setOtpNumber] = useState({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: ""
  })
  const [stage, setStage] = useState("form")
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [isPasswordValid, setIsPasswordValid] = useState(true)
  const [passwordsMatch, setPasswordsMatch] = useState(true)
  const [fillFields, setFillFields] = useState(false)
  const [showError, setShowError] = useState(false)
  const [otpError, setOtpError] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  const back = () => {
    return navigate("/", { replace: true })
  }

  const updateCredentials = (ev) => {
    if (!isEmailValid) setIsEmailValid(true)
    if (!isPasswordValid) setIsPasswordValid(true)
    if (passwordsMatch === false) setPasswordsMatch(true)
    if (fillFields) setFillFields(false)
    if (showError) setShowError(false)
    if (!ev?.target) return

    const fieldName = ev.target.name
    const fieldValue = ev.target.value

    setUserCredentials({
      ...userCredentials,
      [fieldName]: fieldValue
    })
  }

  // Valida la info, pide el envío del OTP a signup-check y pasa a la etapa de verificación
  const submitInformation = async () => {
    if (userCredentials.userName.trim() === "" || userCredentials.email.trim() === "" || userCredentials.password.trim() === "" || userCredentials.confirmPassword.trim() === "") {
      setFillFields(true)
      return
    }

    const emailValid = validateEmail(userCredentials.email)
    setIsEmailValid(emailValid)
    if (!emailValid) return

    const passwordValid = checkPassword(userCredentials.password)
    setIsPasswordValid(passwordValid)
    if (!passwordValid) return

    const match = userCredentials.password === userCredentials.confirmPassword
    setPasswordsMatch(match)
    if (!match) return

    setShowError(false)
    setIsSending(true)
    const data = await signupCheck(userCredentials.email)
    setIsSending(false)

    if (data?.confirmation) {
      setStage("otp")
    } else {
      setShowError(true)
    }
  }

  const saveOtp = (target) => {
    if (otpError) setOtpError("")
    setOtpNumber({
      ...otpNumber,
      [target.name]: target.value || ""
    });
  };

  // Envía nombre, email, password y el OTP al backend para insertar la data
  const confirmOtp = async () => {
    const otp = Object.values(otpNumber).join("");

    setIsCreating(true)
    const data = await createUser(userCredentials.userName, userCredentials.email, userCredentials.password, userCredentials.confirmPassword, otp)
    setIsCreating(false)

    if (data?.confirmation) {
      navigate("/", { replace: true })
    } else {
      setOtpError(data?.error || "Something went wrong! Try again")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-linear-to-br from-base via-surface to-base">
      <div className="w-full max-w-md border border-zinc-800 rounded-2xl shadow-xl shadow-black/30 p-8 bg-elevated">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center size-12 rounded-xl bg-teal-500/10 mb-4">
            <UserPlus className="size-6 text-teal-400" />
          </div>
          <h1 className="text-2xl font-display font-semibold text-zinc-100">
            {stage === "otp" ? "Verify your email" : "Create an account"}
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            {stage === "otp" ? "We have sent an OTP to your email" : "Enter your information to get started"}
          </p>
        </div>

        {stage === "form" && (
          <div className="space-y-5">
            <div>
              <Input nameField="userName" changeEvent={updateCredentials}>Enter Username</Input>
            </div>
            <div>
              <Input nameField="email" changeEvent={updateCredentials}>Enter Email</Input>
              {
                !isEmailValid && <span className="text-rose-400 text-xs mt-1 block">Try a valid email</span>
              }
            </div>
            <div>
              <Input nameField="password" type="password" changeEvent={updateCredentials}>Enter Password</Input>
              {
                !isPasswordValid && <span className="text-rose-400 text-xs mt-1 block">The password must have 8-64 characters, an uppercase, a lowercase, a number and a special character</span>
              }
            </div>
            <div>
              <Input nameField="confirmPassword" type="password" changeEvent={updateCredentials}>Confirm Password</Input>
              {
                !passwordsMatch && <span className="text-rose-400 text-xs mt-1 block">Passwords do not match</span>
              }
            </div>
            {
              fillFields && <span className="text-rose-400 text-xs mt-2 block">Fill all the fields before continuing</span>
            }
          </div>
        )}

        {stage === "otp" && (
          <OtpSubmitAction saveOtp={saveOtp} error={otpError} />
        )}

        {
          showError && <span className="text-rose-400 text-xs mt-2 block">Something went wrong! Try again</span>
        }

        {(isSending || isCreating) && (
          <div className="relative flex-center mt-3">
            <div className="absolute size-8 rounded-full border-t-2 animate-spin border-t-white"></div>
          </div>
        )}

        <div className="flex gap-3 mt-6">
          <Button variant="ghost" event={back} className="flex-1">Back</Button>
          {stage === "form" ? (
            <Button variant="secondary" event={submitInformation} className="flex-1">Create</Button>
          ) : (
            <Button variant="primary" event={confirmOtp} className="flex-1">Confirm OTP</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;