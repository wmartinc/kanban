import { useModals } from "../../store/store";

const AddContent = ({children, btnText, openModal}) => {
  const updateModal = useModals((state) => state.updateModalStatus)

  const selectBoard = () => {
    updateModal(true, openModal);
  }

  return (
    <section className="w-full h-full flex place-items-center">
      <div className="m-auto text-zinc-500 flex flex-col gap-4 items-center">
        <h1 className="text-lg font-display">{children}</h1>
        <button className="cursor-pointer text-sm text-purple-400 hover:text-purple-300 transition-colors font-medium" onClick={selectBoard}>
          {btnText} &rarr;
        </button>
      </div>
    </section>
  )
}

export default AddContent;