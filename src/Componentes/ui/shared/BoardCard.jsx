const BoardCard = ({ id, title, description, selectId, boardSelected}) => {

  const selectBoard = () => {
    selectId({id, title, description})
  }
  
  return (
    <div className={`bg-elevated border w-[95%] transition-all duration-300 
    sm:max-w-70 h-35 rounded-xl flex cursor-pointer items-center justify-center flex-col gap-1
    ${boardSelected?.id === id 
      ? "border-purple-500/50 shadow-sm shadow-purple-500/5" 
      : "border-zinc-700 hover:border-zinc-500"}`} onClick={selectBoard}>
      <h2 className="text-zinc-100 text-lg font-display font-semibold capitalize" >{title}</h2>
      {
        description !== "" 
          ? <div className="text-zinc-500 text-sm text-center w-50 line-clamp-2">{description}</div> 
          : <div className="text-zinc-600 text-sm line-clamp-2">No description</div>
      }
    </div>
  )
}

export default BoardCard;