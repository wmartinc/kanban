import { useEffect } from "react";
import { getFavoritesBoards } from "../controllers/boards.controller";
import { useState } from "react";

const useGetFavoriteBoards = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getFavorites = async () => {
    setLoading(true);
    try {
      const responseApi = await getFavoritesBoards();
      setFavorites(responseApi);
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { favorites, loading, error, getFavorites };

}

export default useGetFavoriteBoards;