import { useState } from "react"
import { getBoards } from "../controllers/boards.controller";
import { useBoards } from "../store/useBoards";

const useGetBoards = () => {
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState(null);
  const savingLoad = useBoards(state => state.setLoading)

  // This one will get the boards to show them in the modal
  const fetchBoards = async () => {
    setLoading(true)
    setResponse(null)
    savingLoad(true)
    const boardsResponse = await getBoards();
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
    fetchBoards
  }
}

export default useGetBoards;