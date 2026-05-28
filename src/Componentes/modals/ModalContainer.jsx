import { Dialog } from "radix-ui";
import { useModals } from "@Store/store";
import AddTaskModal from "./AddTaskModal";
import { X } from "lucide-react";
import { useEffect } from "react";


const ModalContainer = ({shown}) => {
  const modalAddTaskOpen = useModals((state) => state.modals.addTask)
  const updateModalStatus = useModals((state) => state.updateModalStatus)
  
  const hideModalContainer = () => {
    updateModalStatus(false)
  }

  useEffect(() =>{console.log('ModalContainer updated')} ,[])

  return (
    <Dialog.Root open={ shown } >
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 fixed top-0 left-0 w-full h-full" />
        <Dialog.Content >
        <X className="stroke-white absolute top-5 right-5 cursor-pointer" onClick={hideModalContainer} />
          {modalAddTaskOpen && <AddTaskModal />}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default ModalContainer;