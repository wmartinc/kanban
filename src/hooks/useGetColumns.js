import { useState } from "react"
import { getColumns } from "../controllers/boards.controller";

const useGetColumns = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const fetchColumns = async(boardName) => {
    setLoading(true);
    try {
      console.log('cargando...')
      const respApi = await getColumns(boardName);
      setResponse(respApi);

      console.log('fin de la carga..', )
    } catch (error) {
      setError(error.message);
      console.log('Error getting columns:', error.message); 
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    response,
    fetchColumns
  }
}

export default useGetColumns;