import { useBoards } from "../../store/useBoards"
import Spinner from "../ui/shared/Spinner"

const ShowBoards = ({ data }) => {
  const boards = useBoards(state => state.boards)
  
  return (
    <div className='absolute top-1/2 left-1/2 bg-neutral-950 w-[90%] max-w-200 translate-x-[-50%] translate-y-[-50%] rounded-lg
     border border-white/20 flex items-center  p-4 flex-col h-125'>
      <h1 className='text-white text-2xl font-semibold'>Your Boards</h1>
      <div className="w-full py-4 h-full flex gap-2 flex-wrap justify-center overflow-y-scroll">
        {
          boards.length > 0 ? (boards.map(board => (
            <BoardsView key={board.id} title={board.board_name} description={board.description} />
          ))) : (<Spinner />)
        }
      </div>
    </div>
  )
}

const BoardsView = ({ title, description }) => {
  return (
    <div className="bg-neutral-900 border border-white/20 w-[95%] hover:border-white/40 transition duration-300 
    sm:max-w-70 h-35 rounded-lg flex cursor-pointer items-center justify-center flex-col">
      <h2 className="text-white text-lg font-medium">{title}</h2>
      {
        description !== "" ?<div className="text-white/50">{description}</div> : <div className="text-white/50">No description</div>
      }
    </div>
  )
}

export default ShowBoards;