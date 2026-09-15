import { Dialog } from "radix-ui";
import { useModals } from "@Store/store";
import AddTaskModal from "./AddTaskModal";
import { X } from "lucide-react";
import CreateBoardModal from "./CreateBoardModal";
import ShowBoards from "./ShowBoards";
import FavoritesModal from "./FavoritesModal";
import ChangeCardModal from "./ChangeCardModal";
import AddColumnModal from "./AddColumnModal";
import ResetPassword from "./ResetPassword";
import TaskDetailsModal from "./TaskDetailsModal";
import ConfirmationModal from "./ConfirmationModal";

const ModalContainer = ({shown}) => {
  const modalAddTaskOpen = useModals((state) => state.modals.addTask)
  const modalShowBoards = useModals((state) => state.modals.showBoards)
  const updateModalStatus = useModals((state) => state.updateModalStatus)
  const modalNewBoard = useModals((state) => state.modals.addBoard)  
  const favorites = useModals(state => state.modals.favorites)
  const changeTask = useModals(state => state.modals.changeTask)
  const addColumn = useModals(state => state.modals.addColumn)
  const changePassword = useModals(state => state.modals.changePassword)
  const showTask = useModals(state => state.modals.showTask)
  const confirmation = useModals(state => state.modals.confirmation)

  const hideModalContainer = () => {
    updateModalStatus(false)
  }

  return (
    <Dialog.Root open={ shown } >
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/60 backdrop-blur-sm fixed top-0 left-0 w-full h-full data-[state=open]:animate-[fadeIn_0.2s_ease-out]" />
        <Dialog.Content className="data-[state=open]:animate-[fadeIn_0.2s_ease-out] focus:outline-none" >
          <button
            onClick={hideModalContainer}
            className="absolute top-5 right-5 z-50 p-1.5 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 transition-colors"
          >
            <X className="size-4 stroke-zinc-400" />
          </button>
          {modalAddTaskOpen && <AddTaskModal />}
          {modalNewBoard && <CreateBoardModal /> }
          {modalShowBoards && <ShowBoards /> }
          {favorites && <FavoritesModal />}
          {changeTask && <ChangeCardModal />}
          {addColumn && <AddColumnModal />}
          {changePassword && <ResetPassword />}
          {showTask && <TaskDetailsModal />}
          {confirmation && <ConfirmationModal />}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default ModalContainer;