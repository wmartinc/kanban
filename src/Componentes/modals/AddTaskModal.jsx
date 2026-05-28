import Input from "../ui/shared/Input";
import TextArea from "../ui/shared/TextArea";

const AddTaskModal = () => {

  return (
    <section className="w-[90%] max-w-125 bg-neutral-950 h-125 fixed top-1/2 left-1/2 -translate-x-1/2 
    -translate-y-1/2 shadow-[2px_2px_10px_rgba(0,0,0,0.5)] p-5 flex flex-col gap-5 items-center">
      <h1 className="text-gray-300 text-center md:text-2xl text-shadow-2xs text-sm select-none">What's Next?</h1>
      <div className="w-80 flex-1 flex flex-col gap-5">
        <Input nameField="taskName">What's the task name?</Input>
        <TextArea />
      </div>
    </section>
  )
}



export default AddTaskModal;