import { Ellipsis } from "lucide-react";
import { useState } from "react";
import { useModals } from "../../store/store";
import { useTasks } from "../../store/tasks";
import useTask from "../../hooks/tasks/useTask";
import useAlerts from "../../store/useAlerts";

const TaskCard = ({ information, columnId }) => {
  const [mouseHoverCard, setMouseHoverCard] = useState(false)
  const [showSubMenu, setShowSubMenu] = useState(false)


  const setSelectedTask = useTasks((state) => state.setSelectedTask)
  const updateModalStatus = useModals((state) => state.updateModalStatus)

  const mouseIn = () => setMouseHoverCard(true)
  const mouseOut = () => setMouseHoverCard(false)

  const toggleSubMenu = (e) => {
    e.stopPropagation()
    setShowSubMenu(!showSubMenu)
  }

  const displayOptions = () => {
    setSelectedTask(information)
    updateModalStatus(true, "showTask")
  }

  return (
    <div
      className={`rounded-lg border cursor-pointer flex flex-col select-none transition-all duration-200
      ${showSubMenu
          ? 'border-zinc-600 bg-elevated'
          : 'border-zinc-800 bg-elevated/60 hover:border-zinc-600 hover:bg-elevated'}`}
      onMouseEnter={mouseIn}
      onMouseLeave={mouseOut}
    >
      <div className="flex items-center px-3 py-2.5" onDoubleClick={displayOptions}>
        <span className="text-zinc-200 capitalize text-sm font-medium">{information.title}</span>
        <MenuToggle isVisible={mouseHoverCard} onToggle={toggleSubMenu} />
      </div>

      <SubMenu isVisible={showSubMenu} taskId={information.id} columnId={columnId} />
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

const SubMenu = ({ isVisible, taskId, columnId }) => {
  const modifyStatusModal = useModals((state) => state.updateModalStatus);
  const deleteTask = useTasks(state => state.removeTask)
  const { sendRemoveTask } = useTask();
  const setAlert = useAlerts(state => state.setAlert)

  if (!isVisible) return null

  const changeTask = () => {
    modifyStatusModal(true, "changeTask")
  }

  const removeTask = async () => {
    deleteTask(columnId, taskId)
    const wasRemoved = await sendRemoveTask(taskId, columnId)
    if (wasRemoved) setAlert("success");
    if (!wasRemoved) setAlert("error");
  }

  return (
    <div className="mx-2 mb-2 px-2 py-1.5 border-t border-zinc-800 flex flex-col gap-0.5">
      <button className="text-left px-2 py-1.5 text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 rounded transition-all" onClick={changeTask}>
        Edit
      </button>
      <button className="text-left px-2 py-1.5 text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 rounded transition-all">
        Add Labels
      </button>
      <button className="text-left px-2 py-1.5 text-xs text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 rounded transition-all"
        onClick={removeTask}
      >
        Remove
      </button>
    </div>
  )
}
export default TaskCard;