import { useSortable } from "@dnd-kit/react/sortable";

const TaskCard = ({ information, index, column }) => {
  const { ref } = useSortable({
    id: information.id,
    index: index,
    group: column,
    accept: "item",
    type: "item"
  })
    
  return (
    <div ref={ref} className="p-5 rounded-xl cursor-pointer bg-neutral-800 border border-white/25 hover:border-white duration-500">
      <h1 className="text-white text-center uppercase text-lg md:text-sm">{information.titulo}</h1>
      <p className="text-white/50 text-xs md:text-sm">{information.descripcion}</p>
    </div>
  )
}

export default TaskCard;