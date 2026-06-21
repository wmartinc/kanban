import { DragDropProvider } from "@dnd-kit/react";
import Navegation from "../ui/navegation/Navegation";
import TaskCard from "./TaskCard";
import TaskViewer from "./TaskViewer";
import { move } from "@dnd-kit/helpers";
import { useState } from "react";
import AlertDialog from "../ui/shared/AlertDialog";
import { useEffect } from "react";
import Spinner from "../ui/shared/Spinner";
import useUser from "../../store/useUser";
import ShowBoards from "../modals/ShowBoards";
import useCheckSession from "../../hooks/auth/useCheckSesion";
import { useNavigate } from "react-router";
import useGetBoards from "../../hooks/useGetBoards";
import { useCallback } from "react";
import { useModals } from "../../store/store";
import AddBoard from "./AddBoard";

/**
 * When there are changes we will compare the previous information with the new one
 * if there are no changes or if columns are the same we will no do any changes on the database when 
 * we implement backend. 
 */
// We will show always the main board.
const Home = () => {
  const updateModalStatus = useModals(state => state.updateModalStatus)
  const navigate = useNavigate()
  // We will do a request to the server to check if the user is fully validated.
  const globalUser = useUser(state => state.user)
  const setUser = useUser((state) => state.setProperty)
  const [tarjetas, setTarjetas] = useState([])  // const boardSelected = useBoards(state => state.boardSelected);
  const { loading, response, information } = useCheckSession()
  const { fetchBoardInformation, loading: loadingBoard, response: responseBoard } = useGetBoards()

  useEffect(() => {
    if (loading === false && response === false && !information) {
      return navigate("/")
    }
    if (!globalUser) return
    fetchBoardInformation(globalUser.main_board.title)

  }, [loading, response, navigate, globalUser])

  useEffect(() => {
    if (!responseBoard) return
    setTarjetas(responseBoard)
  }, [loadingBoard, responseBoard])

  const displayModals = () => {
    updateModalStatus(true, "showBoards")
  }

  return (

    (loading && !information) ? <Spinner /> :
      <main className="w-[95%] h-dvh flex flex-col m-auto relative">
        <Navegation />
        {
          (!globalUser.main_board || tarjetas.length === 0) ?
            <AddBoard />
            :
            <>
              <h1 className="text-white text-2xl font-semibold mt-4 text-center uppercase">{globalUser.main_board.title}</h1>
              <DragDropProvider
                onDragOver={(event) => {
                  if (event.operation.canceled) return;
                  setTarjetas((prev) => move(tarjetas, event))  // this is the reason the cards are not changing position.
                }}
              >
                <section className="w-full overflow-y-scroll overflow-x-hidden md:bg-transparent md:flex-wrap lg:flex-row flex-col flex-1 my-4 mx-auto flex gap-5">
                  {
                    loadingBoard && tarjetas?.length === 0 ? <Spinner /> : Object.entries(tarjetas)?.map(([column, tasks], index) => (
                      <TaskViewer key={column} column={column} index={index} tasks={tasks} />
                    ))
                  }
                </section>
              </DragDropProvider>
            </>
        }
      </main>
  )
}

export default Home;