import { useState } from "react"
import BoardsView from "../ui/shared/BoardCard"
import Spinner from "../ui/shared/Spinner"
import { Trash, SquarePen, ChevronRight, LayoutDashboard } from "lucide-react"
import { useModals } from "../../store/store"
import useUser from "../../store/useUser"
import { ioClient } from "../../controllers/socket"
import { useBoards } from "../../store/useBoards"
import { useLayoutEffect } from "react"

const ShowBoards = () => {

  const [selectedBoard, setSelectedBoard] = useState(null)
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

  const goToBoard = () => {
    setProperty("main_board", selectedBoard)
    ioClient.emit('changeBoard', selectedBoard)
    updateModalStatus(false)
  }

  return (
    <div className='absolute top-1/2 left-1/2 bg-elevated w-[90%] max-w-3xl translate-x-[-50%] translate-y-[-50%] rounded-2xl
     border border-zinc-800 p-6 flex flex-col shadow-xl shadow-black/30'
    >
      <div className="flex items-center gap-2.5 mb-5">
        <LayoutDashboard className="size-5 text-purple-400" />
        <h1 className='text-lg font-display font-semibold text-zinc-100'>Your Boards</h1>
      </div>
      <div className={`w-full ${loading ? "min- h-64" : ""} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto place-items-center pb-2 max-h-115 min-h-25`}>
        {
          loading ? <div className="col-span-full flex items-center h-full justify-center"><Spinner /></div> :
            (tasksToRender?.content?.length > 0) ? tasksToRender?.content.map(board => (
              <BoardsView key={board.id} id={board.id} title={board.board_name} description={board.description} selectId={handleSelectBoard} boardSelected={selectedBoard} />
            )) : <p className="text-zinc-500 col-span-full text-sm">No boards yet</p>
        }
      </div>
      {
        selectedBoard &&
        <div className="flex mt-4 pt-4 border-t border-zinc-800 gap-4 justify-end">
          <button className="p-2 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 transition-all">
            <SquarePen className="size-4" />
          </button>
          <button className="p-2 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all">
            <Trash className="size-4" />
          </button>
          <button className="p-2 rounded-lg text-zinc-500 hover:text-purple-400 hover:bg-purple-500/10 transition-all" onClick={goToBoard}>
            <ChevronRight className="size-4" />
          </button>
        </div>
      }
    </div>
  )
}

export default ShowBoards;