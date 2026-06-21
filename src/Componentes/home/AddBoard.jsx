import { useModals } from "../../store/store";

const AddBoard = () => {
  const updateModal = useModals((state) => state.updateModalStatus)

  const selectBoard  = () => {
    updateModal(true, "addBoard");
  }

  return (
    <section className="w-full h-full flex place-items-center">
      <div className="m-auto text-white/75 flex flex-col gap-5">
        <h1 className="text-2xl">There are no board selected</h1>
        <button className="hover:cursor-pointer hover:text-white" onClick={selectBoard}>
          <span className="text-xl underline">Select a board</span>
        </button>
      </div>
    </section>
  )
}

export default AddBoard;