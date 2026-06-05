import { DragDropProvider } from "@dnd-kit/react";
import Navegation from "../ui/navegation/Navegation";
import TaskCard from "./TaskCard";
import TaskViewer from "./TaskViewer";
import { move } from "@dnd-kit/helpers";
import { useState } from "react";
import AlertDialog from "../ui/shared/AlertDialog";
import { isSortable } from "@dnd-kit/react/sortable";
import useGetColumns from "../../hooks/useGetColumns";
import { useEffect } from "react";



/**
 * When there are changes we will compare the previous information with the new one
 * if there are no changes or if columns are the same we will no do any changes on the database when 
 * we implement backend. 
 */


// We will show always the main board.
const Home = () => {
  const [columnOrigin, setColumnOrigin] = useState(""); // Store the origin of the column being dragged.
  const [changesMade, setChangesMade] = useState(false);

  const [board, setBoard] = useState("main")
  const [tarjetas, setTarjetas] = useState([])
  const {fetchColumns, loading, response} = useGetColumns()
  
  useEffect(() => {
    fetchColumns(board);

    console.log(response)
  }, [board,])

  return (
    <main className="w-[95%] h-dvh flex flex-col m-auto relative">
      <Navegation />
      <DragDropProvider
        onDragOver={(event) => {
          if(event.operation.canceled) return;
          setTarjetas((prev) => move(tarjetas, event))
        }}

        onDragStart={(event) => {
          const { source } = event.operation;
          setColumnOrigin(source.group);
        }}
      >
        <section className="w-full overflow-y-scroll overflow-x-hidden md:bg-transparent md:flex-wrap lg:flex-row flex-col flex-1 my-4 mx-auto flex gap-5">
          {!loading &&
            Object.entries(tarjetas)?.map(([column, data], index) => (
              <TaskViewer key={column} column={column} index={index}>
                {
                  data?.map((data, index) => (
                    <TaskCard key={data.id} information={data} index={index} column={column} />
                  ))
                }
              </TaskViewer>
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