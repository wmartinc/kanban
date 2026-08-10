import { useState } from "react";
import { checkOtpRequest } from "../../controllers/user.controller";

const useCheckOtp = () => {
  const [isCheckingOtp, setIsCheckingOtp] = useState(false);
  const [otpResponse, setOtpResponse] = useState(null);

  const sendCheckOtp = async (otp) => {
    setIsCheckingOtp(true);
    setOtpResponse(null);

    try {
      const data = await checkOtpRequest({ otp });
      if (data?.confirmation) {
        setOtpResponse(data.confirmation);
      } else {
        setOtpResponse({ error: data?.error || "Incorrect OTP. Try again." });
      }
      return data;
    } catch (error) {
      setOtpResponse({ error: error.message });
      throw error;
    } finally {
      setIsCheckingOtp(false);
    }
  };
  
  return {
    isCheckingOtp,
    otpResponse,
    sendCheckOtp,
  };
};

export default useCheckOtp