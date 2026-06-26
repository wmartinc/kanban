import Navegation from "../ui/navegation/Navegation";
import { useEffect } from "react";
import Spinner from "../ui/shared/Spinner";
import useUser from "../../store/useUser";
import useCheckSession from "../../hooks/auth/useCheckSesion";
import { useNavigate } from "react-router";
import useGetBoards from "../../hooks/useGetBoards";
import { useModals } from "../../store/store";
import AddContent from "./AddContent";
import BoardContent from "./BoardContent";

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
  const { loading, response, information } = useCheckSession()
  const { fetchBoardInformation, loading: loadingBoard, response: responseBoard } = useGetBoards()

  useEffect(() => {
    if (!loading && !response && !information) {
      console.log(false, response, information) 
      return navigate("/")
    }

    if (!loading && globalUser.main_board) {
      console.log('entra aca')
      fetchBoardInformation(globalUser.main_board.title)
    }
  }, [loading, response, navigate, globalUser])

  return (

    (loading && !information) ? <Spinner /> :
      <main className="w-[95%] h-dvh flex flex-col m-auto relative">
        <Navegation />
        <section className="flex flex-1 flex-col">
          {(!loadingBoard && globalUser?.main_board) && <h1 className="text-white text-2xl text-center font-semibold capitalize">{globalUser?.main_board?.title}</h1>}
          {
            (loadingBoard && globalUser?.main_board) ? <Spinner /> :
            (!globalUser?.main_board) ? <AddContent btnText={"Select a new board"} openModal={"showBoards"}>There are no board selected.</AddContent> :
            (responseBoard.length == 0) ? <AddContent btnText={"Create a column"} openModal={"addTask"}>There are no columns created.</AddContent> :
            <BoardContent loadingBoard={loadingBoard} responseBoard={responseBoard} />
          }
          
        </section>
      </main>
  )
}

export default Home;