import { useState } from "react"
import BoardsView from "../ui/shared/BoardCard"
import Spinner from "../ui/shared/Spinner"
import { Trash } from "lucide-react"
import { SquarePen } from "lucide-react"
import { ChevronRight } from "lucide-react"
import { useModals } from "../../store/store"
import { io } from "socket.io-client"
import useGetBoards from "../../hooks/useGetBoards"
import { useEffect } from "react"
import useUser from "../../store/useUser"
import { ioClient } from "../../controllers/socket"
import { useBoards } from "../../store/useBoards"
import { useLayoutEffect } from "react"

const actionClass = "cursor-pointer rounded-md text-white/50 transition duration-300"

const ShowBoards = () => {

  const [selectedBoard, setSelectedBoard] = useState(null)
  const user = useUser(state => state.user)
  // STORE.
  const setProperty = useUser((state) => state.setProperty)
  const updateModalStatus = useModals((state) => state.updateModalStatus)
  const loading = useBoards(state => state.status.loading)

  const favorites = useBoards(state => state.favorites)
  const fetched = useBoards(state => state.fetched)
  const boards = useBoards(state => state.boards)
  
  const [tasksToRender, setTasksToRender] = useState([]);

  const handleSelectBoard = (board) => {
    setSelectedBoard(board)
  }

  useLayoutEffect(() => {
    if (fetched === "favorites") {
      setTasksToRender(favorites)
    } else {
      setTasksToRender(boards)
    }
  }, [fetched, boards, favorites])
  const deleteBoard = () => { }

  const updateBoard = () => { }

  const goToBoard = () => { 
    setProperty("main_board", selectedBoard)
    ioClient.emit('selectBoard', selectedBoard)
    updateModalStatus(false)
  }

  return (
    <div className='absolute top-1/2 left-1/2 bg-neutral-950 w-[90%] max-w-200 translate-x-[-50%] translate-y-[-50%] rounded-lg
     border border-white/20 flex items-center  p-4 flex-col h-125'>
      <h1 className='text-white text-lg sm:text-xl md:text-2xl font-semibold'>Your Boards</h1>
      <div className={`w-full py-4 ${loading ? "h-full": ""} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto place-items-center`}>
        {
          loading && tasksToRender?.length == 0 ? <div className="col-span-full flex items-center h-full justify-center"><Spinner /></div> :
            (tasksToRender?.content?.length > 0 && !loading) ? tasksToRender?.content.map(board => (
              <BoardsView key={board.id} id={board.id} title={board.board_name} description={board.description} selectId={handleSelectBoard} boardSelected={selectedBoard} />
            )) : <h1 className="text-white/50 col-span-full text-sm sm:text-base">No boards yet</h1>
        }
      </div>
      {
        selectedBoard &&
        <div className="flex mt-2 flex-wrap p-2 gap-6 ml-auto">
          <SquarePen className={`${actionClass} hover:text-white`} />
          <Trash className={`${actionClass} hover:text-red-500/50`} />
          <ChevronRight className={`${actionClass} hover:text-white`} onClick={goToBoard} />
        </div>
      }
    </div>
  )
}



export default ShowBoards;