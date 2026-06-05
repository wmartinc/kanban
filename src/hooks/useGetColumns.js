import { useState } from "react"
import { getColumns } from "../controllers/boards.controller";

const useGetColumns = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const fetchColumns = async(boardName) => {
    setLoading(true);
    setResponse(null);
    try {
      const respApi = await getColumns(boardName);
      console.log( 'Columns fetched successfully:', respApi);
      setLoading(false)
      setResponse(respApi);
    } catch (error) {
      setError(error.message);
      console.log('Error getting columns:', error.message); 
    }
  }

  return {
    loading,
    response,
    fetchColumns
  }
}

export default useGetColumns;