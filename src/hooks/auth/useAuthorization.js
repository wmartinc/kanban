import { useState } from "react"
import { createSesion } from "../../controllers/authorization.controller";

const useAuthorization = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const requestSession = async(email, password) => {
    setLoading(true);
    setResponse(null);
    try {
      const respApi = await createSesion(email, password)
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
    requestSession
  }
}

export default useAuthorization;