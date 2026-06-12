import { useState } from "react"
import requestLogin from "../../controllers/authorization.controller";

const useAuthorization = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const sendRequest = async(email, password) => {
    setLoading(true);
    setResponse(null);
    try {
      const respApi = await requestLogin(email, password)
      setLoading(false)
      setResponse(respApi);
    } catch (error) {
      setError(error.message);
      console.log('Error getting board:', error.message); 
    }
  }

  return {
    loading,
    response,
    sendRequest
  }
}

export default useAuthorization;