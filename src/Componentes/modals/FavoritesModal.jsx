import { useEffect } from "react";
import useGetFavoriteBoards from "../../hooks/useGetFavoriteBoards";
import BoardCard from "../ui/shared/BoardCard";
import Spinner from "../ui/shared/Spinner";
import { Star } from "lucide-react";

const FavoritesModal = () => {
  const { getFavorites, favorites, loading } = useGetFavoriteBoards();

  useEffect(() => {
    getFavorites();
  }, [])

  return (
    <div className="w-[90%] max-w-2xl h-[32rem] bg-elevated border border-zinc-800 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl p-6 shadow-xl shadow-black/30">
      <div className="flex items-center gap-2.5 mb-5">
        <Star className="size-5 text-amber-400" />
        <h1 className="text-lg font-display font-semibold text-zinc-100">Favorites</h1>
      </div>

      <div className="w-full h-[calc(100%-3rem)] flex gap-3 flex-wrap justify-center overflow-y-auto py-2">
        {
          loading ? <Spinner /> :
            favorites.length > 0 ? favorites.map(board => (
              <BoardCard key={board.id} title={board.board_name} description={board.description} />
            ))
              : <p className="text-zinc-500 text-sm self-center">No favorites yet</p>
        }
      </div>
    </div>
  )
}

export default FavoritesModal;