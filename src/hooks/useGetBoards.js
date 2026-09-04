import { useState } from "react"
import { getBoardContent, getBoards } from "../controllers/boards.controller";
import { useBoards } from "../store/useBoards";

const useGetBoards = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  // save local information from the response we will get.
  const saveBoards = useBoards(state => state.setBoards)
  const savingLoad = useBoards(state => state.setLoading)

  const fetchBoardInformation = async (boardName) => {
    setLoading(true);
    savingLoad(true)
    setResponse(null);
    try {
      const respApi = await getBoardContent(boardName);
      setLoading(false)
      setResponse(respApi);
      saveBoards(respApi)
      savingLoad(false)
    } catch (error) {
      setError(error.message);
    }
  }

  // on the other hand the one above has the hole information such as tables and tasks.
  // This one will get the boards to show them in the modal
  const fetchBoards = async () => {
    setLoading(true)
    setResponse(null)
    savingLoad(true)
    const boardsResponse = await getBoards();
    console.log(boardsResponse)
    if(!boardsResponse) {
      setLoading(false)
      setResponse(false)
      return
    }
    setLoading(false)
    setResponse(boardsResponse)
    savingLoad(false)
  }

  return {
    loading,
    response,
    fetchBoardInformation,
    fetchBoards
  }
}

export default useGetBoards;