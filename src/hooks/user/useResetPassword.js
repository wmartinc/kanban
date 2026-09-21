import { useState } from "react";
import { changePasswordRequest, resetPasswordRequest } from "../../controllers/user.controller";

const useResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const sendResetPassword = async (email) => {
    setIsLoading(true);
    setResponse(null);

    try {
      const data = await resetPasswordRequest({ email });
      setResponse(data);
      return data;
    } catch (error) {
      setResponse({ error: error.message });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // $2a$10$MZsA3EZAnRnjM0MorVghU.lNVS9PT8an7ikiwrG3TWmEm5SbgAII2
  // $2a$10$MZsA3EZAnRnjM0MorVghU.lNVS9PT8an7ikiwrG3TWmEm5SbgAII2
  
  const changePassword = async (password, passwordConfirmation) => {
    setIsLoading(true);
    setResponse(null);

    try {
      const data = await changePasswordRequest(password, passwordConfirmation);
      setResponse(data.confirmation);
      return data;
    } catch (error) {
      setResponse({ error: error.message });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    response,
    sendResetPassword,
    changePassword
  };
};

export default useResetPassword;
