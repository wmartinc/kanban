import Spinner from "../ui/shared/Spinner";
import TaskViewer from "./TaskViewer";
import AddColumn from "./AddColumn";
import { useTasks } from "../../store/tasks";

const BoardContent = ({ loadingBoard }) => {
  const globalTasks = useTasks(state => state.tasks);  // this name needs must be changed.

  // Normaliza el contenido del board sin importar la forma que traiga el backend:
  // objeto keyeado por columnId o por título, o un arreglo de columnas.
  const columns = Array.isArray(globalTasks)
    ? globalTasks.map(col => ({ ...col, columnId: col?.columnId ?? col?.id }))
    : Object.entries(globalTasks ?? {}).map(([key, value]) => ({
        ...value,
        title: value?.title ?? key,
        columnId: value?.columnId ?? key,
      }));

  const totalColumns = columns.length;

  return (
    <section className="w-full h-full overflow-x-auto flex-row py-2 flex gap-5 ">
      {
        loadingBoard && totalColumns === 0 ? <Spinner /> : columns.map(({ title, tasks, columnId }, index) => (
          <TaskViewer key={columnId ?? index} column={title} index={index} tasks={tasks} columnId={columnId} />
        ))
      }
      <AddColumn key="addColumn" index={totalColumns} />
    </section>
  )
}
export default BoardContent;