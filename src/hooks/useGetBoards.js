import { useState } from "react"
import { getBoardContent, getBoards } from "../controllers/boards.controller";
import { useCallback } from "react";

const useGetBoards = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const fetchBoardInformation = async (boardName) => {
    setLoading(true);
    setResponse(null);
    try {
      const respApi = await getBoardContent(boardName);
      setLoading(false)
      setResponse(respApi);
    } catch (error) {
      setError(error.message);
    }
  }

  // on the other hand the one above has the hole information such as tables and tasks.
  // This one will get the boards to show them in the modal
  const fetchBoards = async () => {
    setLoading(true)
    setResponse(null)
    const boardsResponse = await getBoards();
    
    if(!boardsResponse) {
      setLoading(false)
      setResponse(false)
      return
    }
    setLoading(false)
    setResponse(boardsResponse)
  }

  return {
    loading,
    response,
    fetchBoardInformation,
    fetchBoards
  }
}

export default useGetBoards;