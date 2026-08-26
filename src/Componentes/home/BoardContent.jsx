import { useState } from "react";
import { useEffect } from "react";
import Spinner from "../ui/shared/Spinner";
import TaskViewer from "./TaskViewer";
import AddColumn from "./AddColumn";

const BoardContent = ({ loadingBoard, responseBoard }) => {
  const [tarjetas, setTarjetas] = useState([])

  useEffect(() => {
    if (!responseBoard) return
    setTarjetas(responseBoard)
  }, [loadingBoard, responseBoard])

  return (
    <section className="w-full h-full overflow-x-auto flex-row py-2 flex gap-5">
      {
        loadingBoard && tarjetas?.length === 0 ? <Spinner /> : Object.entries(tarjetas)?.map(([column,{tasks, columnId}] , index) => (
          <TaskViewer key={column} column={column} index={index} tasks={tasks} columnId={columnId}/>
        ))
      }
      <AddColumn key="addColumn" index={tarjetas?.length} />
    </section>
  )
}
export default BoardContent;