import { useModals } from "../../store/store";
import { Plus } from "lucide-react";

const AddColumn = ({ index }) => {
  const updateModalStatus = useModals((state) => state.updateModalStatus);

  const addColumn = () => {
    updateModalStatus(true, "addColumn");
  };

  return (
    <button
      onClick={addColumn}
      className="relative w-30 sm:w-40 h-fit rounded-xl flex items-center justify-center bg-elevated/40 border border-zinc-800/60 border-dashed backdrop-blur-sm hover:backdrop-blur-md hover:bg-elevated/60 hover:border-zinc-700/60 transition-all duration-300 cursor-pointer animate-[slideUp_0.3s_ease-out] group"
      style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'both' }}
    >
      <div className="p-8 flex items-center justify-center">
        <Plus className="size-10 text-zinc-500 group-hover:text-purple-400 transition-colors duration-300" />
      </div>
    </button>
  );
};

export default AddColumn;
