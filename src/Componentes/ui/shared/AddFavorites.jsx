import { Star } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import { addFavorite, removeFavorite, checkFavorite} from "../../../controllers/boards.controller";


const AddFavorites = ({boardId}) => {
  const [isSelected, setIsSelected] = useState(false)

  useEffect(() => {
    (async () => {
      const isFavorite = await checkFavorite(boardId)
      setIsSelected(isFavorite)
    })()
  }, [])

  const handleAddFavorites = () => {
    if(isSelected){
      removeFavorite(boardId)
    } else {
      addFavorite(boardId)
    }
    setIsSelected(!isSelected)
  }

  return (
    <div className="flex-center">
      <button className="btn" onClick={handleAddFavorites}><Star size={18} className={`${isSelected ? 'text-yellow-500 fill-yellow-500' : ''}`} /></button>
    </div>
  )
}

export default AddFavorites;