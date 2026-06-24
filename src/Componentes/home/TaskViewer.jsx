import { useDroppable } from "@dnd-kit/react";
import Button from "../ui/shared/Button";
import TaskCard from "./TaskCard";
import { GripHorizontal } from "lucide-react";
import { useState } from "react";
import { useSortable } from "@dnd-kit/react/sortable";
import { CollisionPriority } from "@dnd-kit/abstract"
import { useEffect } from "react";
import useGetTasks from "../../hooks/useGetTasks";
import { Plus } from "lucide-react";

const TaskViewer = ({ column, index, tasks }) => {
  const { fetchTasks, loading, response } = useGetTasks();
  const [mouseOver, setMouseOver] = useState(false)
  const { ref } = useDroppable({
    id: column,
    type: "column",
    accept: "item",
    collisionPriority: CollisionPriority.Low
  })

  //! Para evitar hacer muchas peticiones de las tareas vamos a utilizar web sockets
  const mouseEnter = () => {
    setMouseOver(true)
  }

  const mouseLeave = () => {
    setMouseOver(false)
  }
  
  // Function is gonna define sortableElement as the reference.
  return (
    <section className={`flex-1 shadow-[2px_2px_10px_rgba(0,0,0,0.5)] relative min-w-60 max-w-80 border border-neutral-400/10 duration-500 h-fit rounded-xl flex flex-col items-center bg-black/10 p-2`}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      data-id={column}
    >
      {mouseOver && <GripHorizontal className="absolute stroke-white right-6 top-4 cursor-pointer " />}
      <h1 className="text-center text-lg text-white font-bold p-2">{column}</h1>
      <section ref={ref} className={`flex flex-col w-full gap-3 p-5 rounded-xl  flex-1`}>
        {tasks?.map((data, ind) => (
          <TaskCard key={data.id} information={data} index={ind} column={column} />
        ))}
        <Button variant="add" className="w-[60%] px-2 text-xs text-white/50 m-auto">Add a card</Button>
      </section>
    </section>
  )
}

export default TaskViewer;