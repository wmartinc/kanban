import { move } from "@dnd-kit/helpers";
import { DragDropProvider } from "@dnd-kit/react";
import { useState } from "react";
import { useEffect } from "react";
import Spinner from "../ui/shared/Spinner";
import TaskViewer from "./TaskViewer";

const BoardContent = ({ loadingBoard, responseBoard }) => {
  const [tarjetas, setTarjetas] = useState([])

  useEffect(() => {
    if (!responseBoard) return
    setTarjetas(responseBoard)
  }, [loadingBoard, responseBoard])

  return (
    <DragDropProvider
      onDragOver={(event) => {
        if (event.operation.canceled) return;
        setTarjetas(() => move(tarjetas, event))
      }}
    >
      <section className="w-full h-full overflow-x-auto flex-row py-2 flex gap-5">
        {
          loadingBoard && tarjetas?.length === 0 ? <Spinner /> : Object.entries(tarjetas)?.map(([column, tasks], index) => (
            <TaskViewer key={column} column={column} index={index} tasks={tasks} />
          ))
        }
      </section>
    </DragDropProvider>
  )
}

export default BoardContent;