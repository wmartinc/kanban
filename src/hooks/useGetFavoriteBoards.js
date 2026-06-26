import { useEffect } from "react";
import { getFavoritesBoards } from "../controllers/boards.controller";
import { useState } from "react";
import { useBoards } from "../store/useBoards";

const useGetFavoriteBoards = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const saveBoards = useBoards(state => state.setBoards)
  const savingLoad = useBoards(state => state.setLoading)

  const getFavorites = async () => {
    setLoading(true);
    savingLoad(true)
    try {
      const responseApi = await getFavoritesBoards();
      setFavorites(responseApi);
      // saving the store information.
      saveBoards(responseApi,"favorites")
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
      savingLoad(false)
    }
  }

  return { favorites, loading, error, getFavorites };

}

export default useGetFavoriteBoards;