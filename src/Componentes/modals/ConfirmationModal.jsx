/*
This document will be used to confirm information once it is accepted we can go ahead to do it.
We will do it more general, at the moment its just to confirm the change column name.
*/

import Button from "../ui/shared/Button";
import { useModals } from "../../store/store";
import useSelected from "../../store/useSelected";
import { changeColumnName } from "../../controllers/boards.controller";

const ConfirmationModal = () => {
  const updateModalStatus = useModals(state => state.updateModalStatus)
  const informationToModify = useSelected(state => state.columnSelected)

  const hideModal = () => {
    updateModalStatus(false, "confirmation")
  }

  const confirm = () => {
    changeColumnName(informationToModify)
    hideModal()
  }

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50">
      <div className=" w-[250px] bg-elevated border border-zinc-800 rounded-xl shadow-xl shadow-black/30 p-4 flex flex-col">
        <p className="text-sm mt-2 text-center text-zinc-200">¿Desea hacer los cambios?</p>
        <div className="flex gap-2 m-auto mt-4">
          <Button variant="ghost" event={confirm}>Confirmar</Button>
          <Button variant="ghost" event={hideModal}>Cancelar</Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;