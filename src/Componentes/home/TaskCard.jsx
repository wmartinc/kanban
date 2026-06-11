import { useSortable } from "@dnd-kit/react/sortable";
import { useEffect } from "react";

const TaskCard = ({ information, index, column }) => {
  const { ref, isDragging } = useSortable({
    id: information.id,
      index: index,
      group: column,
      accept: "item",
      type: "item"
  })  

  return (
    <div ref={ref} className={`p-5 rounded-sm cursor-pointer border hover:border-pink-500/70 select-none ${isDragging ? 'border-pink-900' : 'border-white/25'}`}>
      <h1 className="text-white text-center uppercase text-lg md:text-sm">{information.title}</h1>
      <p className="text-white/50 text-xs md:text-sm">{information.description}</p>
    </div>
  )
}

export default TaskCard;