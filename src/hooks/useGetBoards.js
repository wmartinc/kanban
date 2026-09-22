import { useState, useCallback } from "react"
import { getBoards } from "../controllers/boards.controller";
import { useBoards } from "../store/useBoards";

const useGetBoards = () => {
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState(null);
  const savingLoad = useBoards(state => state.setLoading)

  // This one will get the boards to show them in the modal
  const fetchBoards = useCallback(async () => {
    setLoading(true)
    setResponse(null)
    savingLoad(true)
    try {
      const boardsResponse = await getBoards();
      if (!boardsResponse) {
        setResponse(false)
        return
      }
      setResponse(boardsResponse)
    } finally {
      // Siempre apaga el loading, incluso si no hay boards o falla la petición
      setLoading(false)
      savingLoad(false)
    }
  }, [savingLoad])

  return {
    loading,
    response,
    fetchBoards
  }
}

export default useGetBoards;