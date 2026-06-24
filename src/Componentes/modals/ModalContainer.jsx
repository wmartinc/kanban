import { Dialog } from "radix-ui";
import { useModals } from "@Store/store";
import AddTaskModal from "./AddTaskModal";
import { X } from "lucide-react";
import { useEffect } from "react";
import CreateBoardModal from "./CreateBoardModal";
import ShowBoards from "./ShowBoards";
import FavoritesModal from "./FavoritesModal";
import ChangeCardModal from "./ChangeCardModal";


const ModalContainer = ({shown}) => {
  const modalAddTaskOpen = useModals((state) => state.modals.addTask)
  const modalShowBoards = useModals((state) => state.modals.showBoards)
  const updateModalStatus = useModals((state) => state.updateModalStatus)
  const modalNewBoard = useModals((state) => state.modals.addBoard)  
  const favorites = useModals(state => state.modals.favorites)
  const changeTask = useModals(state => state.modals.changeTask)

  const hideModalContainer = () => {
    updateModalStatus(false)
  }

  return (
    <Dialog.Root open={ shown } >
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 fixed top-0 left-0 w-full h-full" />
        <Dialog.Content >
        <X className="stroke-white absolute top-5 right-5 cursor-pointer" onClick={hideModalContainer} />
          {modalAddTaskOpen && <AddTaskModal />}
          {modalNewBoard && <CreateBoardModal /> }
          {modalShowBoards && <ShowBoards /> }
          {favorites && <FavoritesModal />}
          {changeTask && <ChangeCardModal />}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default ModalContainer;