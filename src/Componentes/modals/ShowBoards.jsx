import { useState } from "react"
import { useBoards } from "../../store/useBoards"
import BoardsView from "../ui/shared/BoardCard"
import Spinner from "../ui/shared/Spinner"
import { Trash } from "lucide-react"
import { SquarePen } from "lucide-react"
import { ChevronRight } from "lucide-react"


const actionClass = "cursor-pointer rounded-md text-white/50 transition duration-300"

const ShowBoards = ({ data }) => {
  const boards = useBoards(state => state.boards)
  const [selectedBoard, setSelectedBoard] = useState(null)

  const handleSelectBoard = (boardId) => {
    setSelectedBoard(boardId)
  }

  const deleteBoard = () => {}
  const updateBoard = () => {}

  const goToBoard = () => {
    
  }

  return (
    <div className='absolute top-1/2 left-1/2 bg-neutral-950 w-[90%] max-w-200 translate-x-[-50%] translate-y-[-50%] rounded-lg
     border border-white/20 flex items-center  p-4 flex-col h-125'>
      <h1 className='text-white text-2xl font-semibold'>Your Boards</h1>
      <div className="w-full py-4 h-full flex gap-2 flex-wrap justify-center overflow-y-scroll">
        {
          boards.length > 0 ? (boards.map(board => (
            <BoardsView key={board.id} id={board.id} title={board.board_name} description={board.description} selectId={handleSelectBoard} />
          ))) : (<Spinner />)
        }
      </div>

      {
        selectedBoard &&
        <div className="flex mt-2 flex-wrap p-2 gap-6 ml-auto">
          <SquarePen className={`${actionClass} hover:text-white`} />
          <Trash className={`${actionClass} hover:text-red-500/50`} />
          <ChevronRight className={`${actionClass} hover:text-white`} />
        </div>
      }

    </div>
  )
}



export default ShowBoards;