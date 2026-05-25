import { DragDropProvider } from "@dnd-kit/react";
import Navegation from "../ui/navegation/Navegation";
import TaskCard from "./TaskCard";
import TaskViewer from "./TaskViewer";
import { move } from "@dnd-kit/helpers";
import { useState } from "react";
import AlertDialog from "../ui/shared/AlertDialog";
import { isSortable } from "@dnd-kit/react/sortable";



/**
 * When there are changes we will compare the previous information with the new one
 * if there are no changes or if columns are the same we will no do any changes on the database when 
 * we implement backend. 
 */

const Home = () => {
  const [columnOrigin, setColumnOrigin] = useState(""); // Store the origin of the column being dragged.
  const [changesMade, setChangesMade] = useState(false);
  const [tarjetas, setTarjetas] = useState({
    "PENDING": [
      {
        id: "11",
        titulo: "Tarea 1 Pending",
        descripcion: "Descripción de la tarea 1"
      },
      {
        id: "22",
        titulo: "Tarea 2 Pending",
        descripcion: "Descripción de la tarea 2"
      },
      {
        id: "34",
        titulo: "Tarea 3 Pending",
        descripcion: "Descripción de la tarea 3"
      },
      {
        id: "4.5",
        titulo: "Tarea 4 Pending",
        descripcion: "Descripción de la tarea 4"
      }
    ],
    "DOING": [
      {
        id: "1.224",
        titulo: "Tarea 1 Doing",
        descripcion: "Descripción de la tarea 3"
      },
      {
        id: "2.85",
        titulo: "Tarea 2 Doing",
        descripcion: "Descripción de la tarea 5"
      },
      {
        id: "3.2001",
        titulo: "Tarea 3 Doing",
        descripcion: "Descripción de la tarea 5"
      },
      {
        id: "4.872223",
        titulo: "Tarea 4 Doing",
        descripcion: "Descripción de la tarea 5"
      },
    ],
    "DONE": [
      {
        id: "1.5545",
        titulo: "Tarea 1 Done",
        descripcion: "Descripción de la tarea 4"
      },
      {
        id: "20+659",
        titulo: "Tarea 2 Done",
        descripcion: "Descripción de la tarea 4"
      },
      {
        id: "344777",
        titulo: "Tarea 3 Done",
        descripcion: "Descripción de la tarea 4"
      },
    ]
  })

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
        <section className="w-full overflow-y-scroll overflow-x-hidden md:bg-transparent md:flex-row flex-col flex-1 my-4 mx-auto flex gap-5">
          {
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