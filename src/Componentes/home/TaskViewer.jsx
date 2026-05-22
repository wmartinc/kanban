import Button from "../ui/shared/Button";
import TaskCard from "./TaskCard";

const tarjetas = [
  {
    titulo: "primera",
    descripcion: "lasjdlajdlkasjldkjajda ladjlasjdlakjdlka kadakdljasdja"
  },
  {
    titulo: "segunda",
    descripcion: "lasjdlajdlkasjldkjajda ladjlasjdlakjdlka kadakdljasdja"
  },
  {
    titulo: "tercera",
    descripcion: "lasjdlajdlkasjldkjajda ladjlasjdlakjdlka kadakdljasdja"
  }
]

const TaskViewer = ({ status }) => {
  return (
    <section className="flex-1 m-4 flex flex-col items-center">
      <h1 className="text-center text-white font-bold p-2">{status}</h1>
      <Button variant="add" className="w-[40%] font-mono">Add task</Button>

      <section className="flex flex-col gap-3 mt-5">
        {
          tarjetas.map((data, index) => (
            <TaskCard information={data} />
          ))
        }
      </section>
    </section>
  )
}

export default TaskViewer;