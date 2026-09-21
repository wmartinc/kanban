import Button from "../ui/shared/Button";
import TaskCard from "./TaskCard";
import { Plus } from "lucide-react";
import { useModals } from "../../store/store";
import { useColumnsStore } from "../../store/columns";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import useSelected from "../../store/useSelected";
import { removeColumn } from "../../controllers/boards.controller";
import { useTasks } from "../../store/tasks";
import useAlerts from "../../store/useAlerts";

const TaskViewer = ({ column, index, tasks, columnId }) => {
  const updateModalStatus = useModals(state => state.updateModalStatus)
  const saveColumnId = useColumnsStore(state => state.saveColumnSelected)
  const [isMouseIn, setIsMouseIn] = useState(false)
  const [showSubMenu, setShowSubMenu] = useState(false)
  const [editColumn, setEditColumn] = useState(false)
  const setColumnSelected = useSelected(state => state.setColumnSelected)
  const [newColumnName, setNewColumnName] = useState('')
  const removeColumnStore = useTasks(state => state.removeColumn)
  const setAlert = useAlerts(state => state.setAlert)

  const addTask = () => {
    saveColumnId(columnId)
    updateModalStatus(true, "addTask")
  }

  const mouseOver = () => {
    setIsMouseIn(true)
  }

  const mouseOut = () => {
    setIsMouseIn(false)
    setShowSubMenu(false)
  }

  const toggleMenu = () => {
    setShowSubMenu(!showSubMenu)
  }

  const renameColumn = () => {
    openEditColumn()
    setShowSubMenu(false)
  }

  const deleteColumn = () => {
    removeColumnStore(columnId)
    removeColumn(columnId)
    setAlert("success")
    setShowSubMenu(false)
  }

  const openEditColumn = () => {
    setEditColumn(true)
  }

  const closeEditColumn = () => {
    setEditColumn(false)
  }
  const cancelEditColumn = () => {
    setNewColumnName('')
    closeEditColumn()
  }
  const confirmEdit = () => {
    updateModalStatus(true, "confirmation")
    setColumnSelected(columnId, newColumnName)
    closeEditColumn()
  }

  const changeColumnName = (ev) => {
    const { value } = ev?.target
    if (!value) return
    setNewColumnName(value)
  }

  return (
    <section
      className="relative h-fit rounded-xl flex flex-col bg-elevated/40 border border-zinc-800/60 animate-[slideUp_0.3s_ease-out]"
      key={index}
      style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'both' }}
      onMouseEnter={mouseOver}
      onMouseLeave={mouseOut}
    >
      <div className="h-0.5 rounded-t-xl bg-linear-to-r from-purple-400/60 to-teal-400/60" />
      <div className="relative ml-auto mr-1.5 mt-1.5">
        <button onClick={toggleMenu}>
          <EllipsisVertical className={`size-4 sm:size-5 ${isMouseIn ? "opacity-100 cursor-pointer" : "opacity-0"}`} />
        </button>
        {showSubMenu &&
          <div className="absolute bg-[#0e0e0e] border border-white/25 w-30 sm:w-40 right-full rounded">
            <ul>
              <li className="p-1"><button className="w-full px-2 sm:py-1 text-sm hover:bg-black/30" onClick={renameColumn}>Rename</button></li>
              <li className="p-1"><button className="w-full px-2 sm:py-1 text-sm hover:bg-black/30" onClick={deleteColumn}>Delete</button></li>
            </ul>
          </div>
        }
      </div>
      {
        editColumn ?
          <div className="flex flex-col">
            <input type="text" onChange={changeColumnName} autoFocus className="w-30 text-sm sm:w-40 m-auto outline-0 border-b border-white/50 px-2 py-1 focus:border-white/80" />
            <div className="flex justify-around mt-1"><Button variant="ghost" event={confirmEdit}>Aceptar</Button><Button variant="ghost" event={cancelEditColumn}>Cancelar</Button></div>
          </div>
          : <h1 className="text-center text-sm font-display font-semibold text-zinc-300 pt-3 pb-1 px-4">{newColumnName ? newColumnName : column}</h1>
      }

      <section className="flex flex-col w-40 sm:w-50 gap-2 p-3">
        {tasks?.map((data) => (
          <TaskCard key={data.id} information={data} columnId={columnId} />
        ))}
        <Button variant="add" className="w-full mt-1 text-xs" event={addTask}>
          <Plus className="size-3.5 mr-1" /> Add a card
        </Button>
      </section>
    </section>
  )
}

export default TaskViewer;