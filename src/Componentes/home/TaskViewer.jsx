import { useDroppable } from "@dnd-kit/react";
import Button from "../ui/shared/Button";
import TaskCard from "./TaskCard";
import { GripHorizontal, Plus } from "lucide-react";
import { useState } from "react";
import { CollisionPriority } from "@dnd-kit/abstract"
import { useModals } from "../../store/store";

const TaskViewer = ({ column, index, tasks }) => {
  const updateModalStatus = useModals(state => state.updateModalStatus)
  const [mouseOver, setMouseOver] = useState(false)
  const { ref } = useDroppable({
    id: column,
    type: "column",
    accept: "item",
    collisionPriority: CollisionPriority.Low
  })

  const mouseEnter = () => setMouseOver(true)
  const mouseLeave = () => setMouseOver(false)

  const addTask = () => {
    updateModalStatus(true, "addTask")
  }

  return (
    <section
      className="relative min-w-60 max-w-80 h-fit rounded-xl flex flex-col bg-elevated/40 border border-zinc-800/60 animate-[slideUp_0.3s_ease-out]"
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      data-id={column}
      style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'both' }}
    >
      <div className="h-0.5 rounded-t-xl bg-linear-to-r from-purple-400/60 to-teal-400/60" />
      {mouseOver && <GripHorizontal className="absolute stroke-zinc-500 right-4 top-3.5 cursor-pointer size-4" />}
      <h1 className="text-center text-sm font-display font-semibold text-zinc-300 pt-3 pb-1 px-4">{column}</h1>
      <section ref={ref} className="flex flex-col w-full gap-2 p-3 flex-1">
        {tasks?.map((data, ind) => (
          <TaskCard key={data.id} information={data} index={ind} column={column} />
        ))}
        <Button variant="add" className="w-full mt-1 text-xs" event={addTask}>
          <Plus className="size-3.5 mr-1" /> Add a card
        </Button>
      </section>
    </section>
  )
}

export default TaskViewer;