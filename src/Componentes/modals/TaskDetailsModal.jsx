import { useModals } from "../../store/store";
import { useTasks } from "../../store/tasks";
import Button from "../ui/shared/Button";

const TaskDetailsModal = () => {
  const modifyStatusModal = useModals((state) => state.updateModalStatus);
  const selectedTask = useTasks((state) => state.selectedTask);

  const closeModal = () => {
    modifyStatusModal(false)
  }

  return (
    <div className="bg-elevated border border-zinc-800 absolute top-1/2 left-1/2 max-w-xl -translate-x-1/2 -translate-y-1/2 w-[90%] p-6 rounded-2xl shadow-xl shadow-black/30">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-zinc-100 text-lg font-display font-semibold capitalize">
            {selectedTask?.title || "Unnamed card"}
          </h1>
          
        </div>
      </div>

      <div className="mb-6">
        <span className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Description</span>
        <p className="text-zinc-300 text-sm mt-2 leading-relaxed whitespace-pre-wrap">
          {selectedTask?.description || "No description added yet."}
        </p>
      </div>

      <div className="flex justify-end items-center gap-3">
        <Button variant="ghost" event={closeModal}>Cancel</Button>
        <Button variant="primary" event={closeModal}>Close</Button>
      </div>
    </div>
  );
};

export default TaskDetailsModal;