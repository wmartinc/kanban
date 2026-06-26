import { useSortable } from "@dnd-kit/react/sortable";
import { Ellipsis } from "lucide-react";
import { useState } from "react";
import { useModals } from "../../store/store";

const TaskCard = ({ information, index, column }) => {
  const [mouseHoverCard, setMouseHoverCard] = useState(false)
  const [showSubMenu, setShowSubMenu] = useState(false)
  
  const { ref, isDragging } = useSortable({
    id: information.id,
    index: index,
    group: column,
    accept: "item",
    type: "item"
  })

  const mouseIn = () => setMouseHoverCard(true)
  const mouseOut = () => setMouseHoverCard(false)

  const toggleSubMenu = (e) => {
    e.stopPropagation()
    setShowSubMenu(!showSubMenu)
  }

  return (
    <div
      ref={ref}
      className={`rounded-lg border cursor-pointer flex flex-col select-none transition-all duration-200
      ${isDragging 
        ? 'border-purple-500/40 bg-elevated shadow-lg shadow-purple-500/5' 
        : showSubMenu 
          ? 'border-zinc-600 bg-elevated' 
          : 'border-zinc-800 bg-elevated/60 hover:border-zinc-600 hover:bg-elevated'}`}
      onMouseEnter={mouseIn}
      onMouseLeave={mouseOut}
    >
      <div className="flex items-center px-3 py-2.5">
        <span className="text-zinc-200 capitalize text-sm font-medium">{information.title}</span>
        <MenuToggle isVisible={mouseHoverCard} onToggle={toggleSubMenu} />
      </div>

      <SubMenu isVisible={showSubMenu} />
    </div>
  )
}

const MenuToggle = ({ isVisible, onToggle }) => {
  if (!isVisible) return null

  return (
    <button
      onClick={onToggle}
      className="ml-auto p-1 hover:bg-zinc-700/50 rounded transition-colors"
    >
      <Ellipsis className="size-4 stroke-zinc-400" />
    </button>
  )
}

const SubMenu = ({ isVisible }) => {
  const modifyStatusModal = useModals((state) => state.updateModalStatus);

  if (!isVisible) return null

  const changeTask = () => {
    modifyStatusModal(true, "changeTask")
  }

  return (
    <div className="mx-2 mb-2 px-2 py-1.5 border-t border-zinc-800 flex flex-col gap-0.5">
      <button className="text-left px-2 py-1.5 text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 rounded transition-all" onClick={changeTask}>
        Edit
      </button>
      <button className="text-left px-2 py-1.5 text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 rounded transition-all">
        Add Labels
      </button>
      <button className="text-left px-2 py-1.5 text-xs text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 rounded transition-all">
        Remove
      </button>
    </div>
  )
}
export default TaskCard;