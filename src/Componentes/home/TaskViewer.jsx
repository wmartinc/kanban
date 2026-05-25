import { useDroppable } from "@dnd-kit/react";
import Button from "../ui/shared/Button";
import TaskCard from "./TaskCard";
import { GripHorizontal } from "lucide-react";
import { useState } from "react";
import { useSortable } from "@dnd-kit/react/sortable";
import { useRef } from "react";
import { CollisionPriority } from "@dnd-kit/abstract"

const TaskViewer = ({ children, column, index }) => {
  const [mouseOver, setMouseOver] = useState(false)
  const { ref, isDropTarget } = useDroppable({
    id: column,
    type: "column",
    accept: "item",
    collisionPriority: CollisionPriority.Low
  })
  
  const mouseEnter = () => {
    setMouseOver(true)
  }

  const mouseLeave = () => {
    setMouseOver(false)
  }

  // Function is gonna define sortableElement as the reference.
  return (
    <section className={`flex-1 border duration-500 rounded-xl flex flex-col items-center bg-black/10 p-2`}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      data-id={column}
    >
      {mouseOver && <GripHorizontal className="absolute stroke-white right-6 top-4 cursor-pointer" />}
      <h1 className="text-center text-2xl text-white font-bold p-2">{column}</h1>
      <Button variant="add" className="w-[40%] font-mono">Add task</Button>
      <section ref={ref} className={`flex flex-col border w-full gap-3 p-5 h-full rounded-xl overflow-y-scroll overflow-x-hidden`}>
          {children}
      </section>
    </section>
  )
}

export default TaskViewer;