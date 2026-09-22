import { useState } from "react"
import BoardsView from "../ui/shared/BoardCard"
import Spinner from "../ui/shared/Spinner"
import Button from "../ui/shared/Button"
import { Trash, SquarePen, ChevronRight, LayoutDashboard, Plus } from "lucide-react"
import { useModals } from "../../store/store"
import useUser from "../../store/useUser"
import { ioClient } from "../../controllers/socket"
import { useBoards } from "../../store/useBoards"
import { useEffect, useLayoutEffect } from "react"
import useGetBoards from "../../hooks/useGetBoards"
import useGetFavoriteBoards from "../../hooks/useGetFavoriteBoards"
import { deleteBoard } from "../../controllers/boards.controller"
import useAlerts from "../../store/useAlerts"

const ShowBoards = () => {

  const [selectedBoard, setSelectedBoard] = useState(null)
  const setProperty = useUser((state) => state.setProperty)
  const updateModalStatus = useModals((state) => state.updateModalStatus)
  const setCreationInformation = useModals((state) => state.setCreationInformation)
  const loading = useBoards(state => state.status.loading)

  const favorites = useBoards(state => state.favorites)
  const fetched = useBoards(state => state.fetched)
  const boards = useBoards(state => state.boards)

  const [tasksToRender, setTasksToRender] = useState([]);

  const setBoards = useBoards(state => state.setBoards)
  const { fetchBoards, response: boardsResponse } = useGetBoards()
  const { getFavorites } = useGetFavoriteBoards()
  const setAlert = useAlerts(state => state.setAlert)

  const handleSelectBoard = (board) => {
    setSelectedBoard(board)
  }

  // Al abrir el modal siempre se trae la info, para que el loading nunca se quede colgado
  // (cubre también el caso donde se abre sin un board seleccionado, que no llamaba a fetchBoards)
  useEffect(() => {
    if (fetched !== "favorites") {
      fetchBoards()
    }
  }, [fetched, fetchBoards])

  useEffect(() => {
    if (boardsResponse && fetched !== "favorites") {
      setBoards(boardsResponse)
    }
  }, [boardsResponse, fetched, setBoards])

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

  const handleDeleteBoard = async () => {
    if (!selectedBoard?.id) return
    const wasDeleted = await deleteBoard(selectedBoard.id)
    if (wasDeleted) {
      setSelectedBoard(null)
      // Recarga la lista visible según el modo del modal (boards o favoritos)
      if (fetched === "favorites") {
        getFavorites()
      } else {
        fetchBoards()
      }
      setAlert("success")
    } else {
      setAlert("error")
    }
  }

  const hasBoards = tasksToRender?.content?.length > 0

  const openCreateBoard = () => {
    // El sistema de modales solo mantiene uno abierto: cierra "showBoards" y abre "addBoard"
    // Si se abre desde el modal de favoritos, el nuevo board se crea como favorito
    setCreationInformation({ is_favorite: fetched === "favorites" })
    updateModalStatus(false)
    updateModalStatus(true, "addBoard")
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
        // Botón "New board": centrado si no hay boards, al final si ya hay
        !loading &&
        <div className={`flex mt-4 ${hasBoards ? "justify-end" : "justify-center"}`}>
          <Button variant="add" className="px-2 py-1.5" event={openCreateBoard}>
            <Plus className="size-4 mr-1" /> New board
          </Button>
        </div>
      }
      {
        selectedBoard &&
        <div className="flex mt-4 pt-4 border-t border-zinc-800 gap-4 justify-end">
          <button className="p-2 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 transition-all">
            <SquarePen className="size-4" />
          </button>
          <button className="p-2 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all" onClick={handleDeleteBoard}>
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