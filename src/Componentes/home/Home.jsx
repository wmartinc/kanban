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
import { ioClient } from "../../controllers/socket";
import { useState } from "react";

const fetcher = (title) => getBoardContent(title)

const Home = () => {
  const globalUser = useUser(state => state.user)
  const { loading, response } = useCheckSession()
  const [isFavorite, setIsFavorite] = useState(false)
  const boardName = globalUser?.main_board?.title
  const { data: responseBoard, isLoading: loadingBoard } = useSWR(
    boardName || null,
    fetcher,
    { keepPreviousData: true }
  )

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
                    (responseBoard?.length == 0) ? <AddContent btnText={"Create a column"} openModal={"addColumn"}>There are no columns created.</AddContent> :
                      <BoardContent loadingBoard={loadingBoard} responseBoard={responseBoard} />
              }
            </section>
          </div>
        </main>
  )
}

export default Home;