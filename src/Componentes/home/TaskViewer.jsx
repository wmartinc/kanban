import Button from "../ui/shared/Button";
import TaskCard from "./TaskCard";
import { Plus } from "lucide-react";
import { useModals } from "../../store/store";
import { useColumnsStore } from "../../store/columns";
import { useTasks } from "../../store/tasks";

const TaskViewer = ({ column, index, tasks, columnId }) => {
  const updateModalStatus = useModals(state => state.updateModalStatus)
  const saveColumnId = useColumnsStore(state => state.saveColumnSelected)
  const globalTasks = useTasks(state => state.tasks)
  

  const addTask = () => {
    saveColumnId(columnId)
    updateModalStatus(true, "addTask")
  }

  return (
    <section
      className="relative min-w-60 max-w-80 h-fit rounded-xl flex flex-col bg-elevated/40 border border-zinc-800/60 animate-[slideUp_0.3s_ease-out]"
      data-id={column}
      style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'both' }}
    >
      <div className="h-0.5 rounded-t-xl bg-linear-to-r from-purple-400/60 to-teal-400/60" />
      <h1 className="text-center text-sm font-display font-semibold text-zinc-300 pt-3 pb-1 px-4">{column}</h1>
      <section className="flex flex-col w-full gap-2 p-3 flex-1">
        {tasks?.map((data, ind) => (
          <TaskCard key={data.id} information={data} index={ind} column={column} columnId={columnId} />
        ))}
        <Button variant="add" className="w-full mt-1 text-xs" event={addTask}>
          <Plus className="size-3.5 mr-1" /> Add a card
        </Button>
      </section>
    </section>
  )
}

export default TaskViewer;