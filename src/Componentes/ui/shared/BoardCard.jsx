const BoardCard = ({ id, title, description, selectId, boardSelected}) => {

  const selectBoard = () => {
    selectId({id, title, description})  // saving the board information
  }
  
  return (
    <div className={`bg-neutral-900 border w-[95%]  transition duration-300 
    sm:max-w-70 h-35 rounded-lg flex cursor-pointer items-center justify-center flex-col ${boardSelected?.id === id ? "border-white hover:border-white": "hover:border-white/40 "}`} onClick={selectBoard}>
      <h2 className="text-white text-lg font-medium capitalize" >{title}</h2>
      {
        description !== "" ?<div className="text-white/50 text-center w-50 line-clamp-2">{description}</div> : <div className="text-white/50 line-clamp-2">No description</div>
      }
    </div>
  )
}

export default BoardCard;