import { useEffect } from "react";
import useGetFavoriteBoards from "../../hooks/useGetFavoriteBoards";
import BoardCard from "../ui/shared/BoardCard";
import Spinner from "../ui/shared/Spinner";

const FavoritesModal = () => {
  const { getFavorites, favorites, loading, error } = useGetFavoriteBoards();

  useEffect(() => {
    getFavorites();
  }, [])

  return (
    <div className="w-200 h-125 bg-neutral-950 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg p-5 text-white border border-white/20">
      <h1 className="text-2xl text-center">Favorites</h1>

      <div className="w-full py-4 h-full flex gap-2 flex-wrap justify-center overflow-y-scroll">
        {
          loading ? <Spinner /> :
            favorites.length > 0 ? favorites.map(board => (
              <BoardCard key={board.id} title={board.board_name} description={board.description} />
            ))
              : <p className="text-white/50">No favorites yet</p>
        }
      </div>
    </div>
  )
}

export default FavoritesModal;