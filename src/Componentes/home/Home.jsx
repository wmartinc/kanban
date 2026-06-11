import { DragDropProvider } from "@dnd-kit/react";
import Navegation from "../ui/navegation/Navegation";
import TaskCard from "./TaskCard";
import TaskViewer from "./TaskViewer";
import { move } from "@dnd-kit/helpers";
import { useState } from "react";
import AlertDialog from "../ui/shared/AlertDialog";
import useGetColumns from "../../hooks/useGetColumns";
import { useEffect } from "react";
import { useBoards } from "../../store/useBoards";
import Spinner from "../ui/shared/Spinner";



/**
 * When there are changes we will compare the previous information with the new one
 * if there are no changes or if columns are the same we will no do any changes on the database when 
 * we implement backend. 
 */
// We will show always the main board.
const Home = () => {
  const [changesMade, setChangesMade] = useState(false);

  const [tarjetas, setTarjetas] = useState([])
  const { fetchColumns, loading, response } = useGetColumns()

  const boardSelected = useBoards(state => state.boardSelected);

  useEffect(() => {
    fetchColumns(boardSelected || 'main')
  }, [boardSelected])

  useEffect(() => {
    if (response && !loading) {
      setTarjetas(response)
    }
  }, [response, setTarjetas, loading])

  return (
    <main className="w-[95%] h-dvh flex flex-col m-auto relative">
      <Navegation />
      <h1 className="text-white text-2xl font-semibold mt-4 text-center uppercase">{boardSelected ? boardSelected : "MAIN"}</h1>

      <DragDropProvider
        onDragStart={(event) => {
          console.log(event.operation.source.initialIndex)
        }}
        onDragOver={(event) => {
          if (event.operation.canceled) return;
          setTarjetas((prev) => move(tarjetas, event))  // this is the reason the cards are not changing position.
        }}
        onDragEnd={(event) => {
          console.log(event.operation.source.index)
        }}
      >
        <section className="w-full overflow-y-scroll overflow-x-hidden md:bg-transparent md:flex-wrap lg:flex-row flex-col flex-1 my-4 mx-auto flex gap-5">
         {
          loading && tarjetas?.length === 0 ? <Spinner /> : Object.entries(tarjetas)?.map(([column, tasks], index) => (
            <TaskViewer key={column} column={column} index={index} tasks={tasks} />
          ))
        }
        </section>
      </DragDropProvider>
      {
        changesMade && <AlertDialog />
      }
    </main>
  )
}

export default Home;