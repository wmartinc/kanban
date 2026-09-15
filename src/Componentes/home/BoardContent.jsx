import { useEffect } from "react";
import Spinner from "../ui/shared/Spinner";
import TaskViewer from "./TaskViewer";
import AddColumn from "./AddColumn";
import { useTasks } from "../../store/tasks";

const BoardContent = ({ loadingBoard, responseBoard }) => {
  const setGlobalTasks = useTasks(state => state.setTasks);
  const globalTasks = useTasks(state => state.tasks);

  useEffect(() => {
    if (!responseBoard) return
    setGlobalTasks(responseBoard);  
  }, [loadingBoard, responseBoard])

  return (
    <section className="w-full h-full overflow-x-auto flex-row py-2 flex gap-5 ">
      {
        loadingBoard && globalTasks?.length === 0 ? <Spinner /> : Object.entries(globalTasks)?.map(([column,{tasks, columnId}] , index) => (
          <TaskViewer key={column} column={column} index={index} tasks={tasks} columnId={columnId}/>
        ))
      }
      <AddColumn key="addColumn" index={globalTasks?.length} />
    </section>
  )
}
export default BoardContent;