import { useState } from 'react';
import { isClientValidated } from '../../controllers/authorization.controller.js'
import { useEffect } from 'react';
import useUser from '../../store/useUser.js';

const useCheckSession = () => {
  const setUser = useUser((state) => state.setUser)
  const [loading, setLoading] = useState(true)
  const [response, setResponse] = useState(null)
  const [information, setInformation] = useState(null)

  useEffect(() => {
    (async () => {
      setLoading(true)
      const {confirmation, content} = await isClientValidated();
      setResponse(confirmation)
      setInformation(content)
      setUser(content)
      setLoading(false)
    })()
  }, [])
  return {loading, response, information}
}

export default useCheckSession;