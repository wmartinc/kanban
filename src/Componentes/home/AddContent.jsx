import { useModals } from "../../store/store";

const   AddContent = ({children, btnText, openModal}) => {
  const updateModal = useModals((state) => state.updateModalStatus)

  const selectBoard  = () => {
    updateModal(true, openModal);
  }

  return (
    <section className="w-full h-full flex place-items-center">
      <div className="m-auto text-white/75 flex flex-col gap-5">
        <h1 className="text-2xl">{children}</h1>
        <button className="hover:cursor-pointer hover:text-white" onClick={selectBoard}>
          <span className="text-xl underline">{btnText}</span>
        </button>
      </div>
    </section>
  )
}

export default AddContent;