import Input from "../ui/shared/Input";
import TextArea from "../ui/shared/TextArea";
import { useModals } from "../../store/store";
import Button from "../ui/shared/Button";

const AddTaskModal = () => {
  const modifyStatusModal = useModals((state) => state.updateModalStatus);

  const closeModal = () => {
    modifyStatusModal(false)
  }

  return (
    <section className="w-[90%] max-w-lg bg-elevated border border-zinc-800 fixed top-1/2 left-1/2 -translate-x-1/2 
    -translate-y-1/2 shadow-xl shadow-black/30 p-6 rounded-2xl flex flex-col gap-5">
      <h1 className="text-zinc-100 text-center text-lg font-display font-semibold select-none">What's next?</h1>
      <div className="flex flex-col gap-4">
        <Input nameField="taskName">What's the task name?</Input>
        <TextArea />
      </div>
      <div className="flex justify-end gap-3">
        <Button variant="ghost" event={closeModal}>Cancel</Button>
        <Button variant="primary">Add Task</Button>
      </div>
    </section>
  )
}

export default AddTaskModal;