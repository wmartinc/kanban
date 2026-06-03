import { useState } from "react"
import { getBoards } from "../controllers/boards.controller";

const useGetBoards = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const fetchBoards = async() => {
    setLoading(true);
    setResponse(null);
    try {
      const respApi = await getBoards();
      console.log( 'Boards fetched successfully:', respApi);
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
    fetchBoards
  }
}

export default useGetBoards;