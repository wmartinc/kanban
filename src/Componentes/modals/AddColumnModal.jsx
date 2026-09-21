import Input from "../ui/shared/Input";
import Button from "../ui/shared/Button"
import { useModals } from "../../store/store";
import { useState } from "react";
import { createNewColumn } from "../../controllers/boards.controller";
import { useTasks } from "../../store/tasks";
import useAlerts from "../../store/useAlerts";
import useUser from "../../store/useUser";

const AddColumnModal = () => {
  const updateModalStatus = useModals(state => state.updateModalStatus)
  const setAlert = useAlerts(state => state.setAlert)
  const [columnName, setColumnName] = useState("")
  const addColumn = useTasks(state => state.addColumn)
  const currentBoard = useUser(state => state.user?.main_board)
  const hideModal = () => {
    updateModalStatus(false, "addColumn")
  }

  const createColumn = async () => {
    const column = await createNewColumn(columnName, currentBoard)
    if (column) {
      addColumn(column[0])
      setAlert("success")
      hideModal()
    } else {
      setAlert("error")
    }
  }

  const updateColumnName = (ev) => {
    setColumnName(ev.target.value)
  }

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-fit bg-elevated border border-zinc-800 rounded-2xl p-6 shadow-xl shadow-black/30">
      <h1 className="text-lg font-semibold text-zinc-100">Add a column</h1>
      <div className="my-5">
        <Input changeEvent={updateColumnName} nameField={"columnName"}>Column name</Input>
      </div>

      <div className="gap-2 flex justify-end">
        <Button variant="ghost" event={hideModal}>Cancel</Button>
        <Button variant="primary" event={createColumn}>Create</Button>
      </div>
    </div>
  )
}

export default AddColumnModal;