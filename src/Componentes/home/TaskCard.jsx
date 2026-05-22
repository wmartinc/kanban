const TaskCard = ({ information }) => {
  return (
    <div className="p-5 rounded-xl cursor-pointer bg-neutral-800 border border-white/25">
      <h1 className="text-white text-center uppercase">{information.titulo}</h1>
      <p className="text-white/50">{information.descripcion}</p>
    </div>  
  )
}

export default TaskCard;