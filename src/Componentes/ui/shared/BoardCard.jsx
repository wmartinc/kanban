const BoardCard = ({ id, title, description, selectId }) => {

  const selectBoard = () => {
    if(selectId) {
      selectId(id)
    }
  }
  
  return (
    <div className="bg-neutral-900 border border-white/20 w-[95%] hover:border-white/40 transition duration-300 
    sm:max-w-70 h-35 rounded-lg flex cursor-pointer items-center justify-center flex-col" onClick={selectBoard}>
      <h2 className="text-white text-lg font-medium" >{title}</h2>
      {
        description !== "" ?<div className="text-white/50">{description}</div> : <div className="text-white/50">No description</div>
      }
    </div>
  )
}

export default BoardCard;