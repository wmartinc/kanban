import { useSortable } from "@dnd-kit/react/sortable";
import { Ellipsis } from "lucide-react";
import { useState } from "react";
import Button from "../ui/shared/Button";
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

  const mouseIn = () => {
    setMouseHoverCard(true)
  }

  const mouseOut = () => {
    setMouseHoverCard(false)
  }

  const toggleSubMenu = (e) => {
    e.stopPropagation()
    setShowSubMenu(!showSubMenu)
  }

  return (
    <div ref={ref} className={`p-2 rounded-sm cursor-pointer border flex flex-col bg-[#0d0d0d] hover:border-white/40 select-none transition-all duration-300
    ${isDragging ? 'border-pink-900' : showSubMenu ? 'border-white/25' : 'border-white/25'}`}
      onMouseEnter={mouseIn}
      onMouseLeave={mouseOut}
    >
      <div className="flex items-center">
        <span className="text-white capitalize text-sm">{information.title}</span>
        <MenuToggle isVisible={mouseHoverCard} isOpen={showSubMenu} onToggle={toggleSubMenu} />
      </div>

      <SubMenu isVisible={showSubMenu} />
    </div>
  )
}

const MenuToggle = ({ isVisible, isOpen, onToggle }) => {
  if (!isVisible) return null

  return (
    <button
      onClick={onToggle}
      className="ml-auto p-0 hover:bg-white/10 rounded transition-colors"
    >
      <Ellipsis className="size-4 stroke-white" />
    </button>
  )
}

const SubMenu = ({ isVisible }) => {
  if (!isVisible) return null
  const modifyStatusModal = useModals((state) => state.updateModalStatus);

  const changeTask = () => {
    modifyStatusModal(true, "changeTask")
  }

  return (
    <div className="mt-2 pt-2 border-t border-white/25 flex flex-col gap-1.5">
      <button className="text-left px-2 py-1.5 text-xs text-white hover:bg-white/10 rounded transition-colors" onClick={changeTask}>
        Edit
      </button>
      <button className="text-left px-2 py-1.5 text-xs text-white hover:bg-white/10 rounded transition-colors">
        Add Labels
      </button>
      <button className="text-left px-2 py-1.5 text-xs text-white hover:bg-white/10 rounded transition-colors">
        Remove
      </button>
    </div>
  )
}
export default TaskCard;