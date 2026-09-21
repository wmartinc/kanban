import Navegation from "../ui/navegation/Navegation";
import useSWR from "swr";
import Spinner from "../ui/shared/Spinner";
import useUser from "../../store/useUser";
import useCheckSession from "../../hooks/auth/useCheckSesion";
import { Navigate } from "react-router";
import { getBoardContent } from "../../controllers/boards.controller";
import AddContent from "./AddContent";
import BoardContent from "./BoardContent";
import AddFavorites from "../ui/shared/AddFavorites";
import { useEffect } from "react";
import { useTasks } from "../../store/tasks";
import useAlerts from "../../store/useAlerts";
import Alert from "../alerts/Alert";

const fetcher = (title) => getBoardContent(title)

const Home = () => {
  const globalUser = useUser(state => state.user)
  const { loading, response } = useCheckSession()
  const setGlobalTasks = useTasks(state => state.setTasks)
  const globlasTasks = useTasks(state => state.tasks)
  const totalColumns = Array.isArray(globlasTasks)
    ? globlasTasks.length
    : Object.keys(globlasTasks ?? {}).length
  const boardName = globalUser?.main_board?.id
  const alertType = useAlerts(state => state.alertType)
  const setAlert = useAlerts(state => state.setAlert)
  const { data: responseBoard, isLoading: loadingBoard } = useSWR(
    boardName || null,
    fetcher,
    { keepPreviousData: true }
  )

  useEffect(() => {
    setTimeout(() => {
      setAlert()
    }, 2000)
  }, [alertType])

  useEffect(() => {
    if (!responseBoard) return
    setGlobalTasks(responseBoard);
  }, [loadingBoard, responseBoard])

  return (
    (loading) ? <Spinner /> :
      (!response) ? <Navigate to={"/"} /> :
        <main className="w-full h-dvh flex flex-col">
          <div className="w-[95%] max-w-7xl mx-auto flex flex-col flex-1">
            <Navegation />
            <section className="flex flex-1 flex-col">
              {(!loadingBoard && globalUser?.main_board) && (
                <div className="py-4 px-1 flex gap-2">
                  <h1 className="text-xl font-display font-semibold text-zinc-100 capitalize">{globalUser?.main_board?.title}</h1>
                  <AddFavorites boardId={globalUser?.main_board?.id} />
                </div>
              )}
              {
                (loadingBoard && globalUser?.main_board) ? <Spinner /> :
                  (!globalUser?.main_board) ? <AddContent btnText={"Select a new board"} openModal={"showBoards"}>There are no board selected.</AddContent> :
                    (totalColumns === 0) ? <AddContent btnText={"Create a column"} openModal={"addColumn"}>There are no columns created.</AddContent> :
                      <BoardContent loadingBoard={loadingBoard} />
              }
            </section>
          </div>
          {alertType === "error" && <Alert type="error" />}
          {alertType === "success" && <Alert type="success" />}
        </main>
  )
}

export default Home;