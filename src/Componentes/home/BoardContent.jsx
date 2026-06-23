import { move } from "@dnd-kit/helpers";
import { DragDropProvider } from "@dnd-kit/react";
import { useState } from "react";
import { useEffect } from "react";
import Spinner from "../ui/shared/Spinner";
import TaskViewer from "./TaskViewer";

const BoardContent = ({ loadingBoard, responseBoard }) => {
  const [tarjetas, setTarjetas] = useState([])  // const boardSelected = useBoards(state => state.boardSelected);

  useEffect(() => {
    if (!responseBoard) return
    setTarjetas(responseBoard)

  }, [loadingBoard, responseBoard])

  return (
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
  )
}

export default BoardContent;