import Navegation from "../ui/navegation/Navegation";
import { useEffect } from "react";
import useSWR from "swr";
import Spinner from "../ui/shared/Spinner";
import useUser from "../../store/useUser";
import useCheckSession from "../../hooks/auth/useCheckSesion";
import { useNavigate } from "react-router";
import { getBoardContent } from "../../controllers/boards.controller";
import AddContent from "./AddContent";
import BoardContent from "./BoardContent";

const fetcher = (title) => getBoardContent(title)

const Home = () => {
  const navigate = useNavigate()
  const globalUser = useUser(state => state.user)
  const { loading, response, information } = useCheckSession()

  const boardName = globalUser?.main_board?.title
  const { data: responseBoard, isLoading: loadingBoard } = useSWR(
    boardName || null,
    fetcher,
    { keepPreviousData: true }
  )

  useEffect(() => {
    if (!loading && !response && !information) {
      return navigate("/")
    }
  }, [loading, response, information, navigate])

  return (

    (loading && !information) ? <Spinner /> :
      <main className="w-full h-dvh flex flex-col">
        <div className="w-[95%] max-w-7xl mx-auto flex flex-col flex-1">
          <Navegation />
          <section className="flex flex-1 flex-col">
            {(!loadingBoard && globalUser?.main_board) && (
              <div className="py-4 px-1">
                <h1 className="text-xl font-display font-semibold text-zinc-100 capitalize">{globalUser?.main_board?.title}</h1>
              </div>
            )}
            {
              (loadingBoard && globalUser?.main_board) ? <Spinner /> :
              (!globalUser?.main_board) ? <AddContent btnText={"Select a new board"} openModal={"showBoards"}>There are no board selected.</AddContent> :
              (responseBoard?.length == 0) ? <AddContent btnText={"Create a column"} openModal={"addTask"}>There are no columns created.</AddContent> :
              <BoardContent loadingBoard={loadingBoard} responseBoard={responseBoard} />
            }
            
          </section>
        </div>
      </main>
  )
}

export default Home;