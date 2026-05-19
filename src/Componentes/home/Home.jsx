import Navegation from "../ui/navegation/Navegation";
import Button from "../ui/shared/Button";
import TaskCard from "../ui/shared/TaskCard";

const h1 = "text-center text-white font-bold p-2"

const Home = () => {
  return (
    <main className="w-[95%] h-dvh flex flex-col m-auto">
      <Navegation />
      <section className="w-full bg-neutral-950 rounded-2xl flex-1 my-4 mx-auto flex gap-5">
        <section className="flex-1 m-4 flex flex-col items-center">
          <h1 className={h1}>PENDING</h1>
          <Button variant="add" className="w-[30%] font-mono">Add task</Button>
        </section> {/**Seccion para las pendientes   */}
        <section className="flex-1 m-4 flex flex-col items-center">
          <h1 className={h1}>DOING</h1>
          <Button variant="add" className="w-[30%] font-mono">Add task</Button>
        </section> {/**Seccion para los que esta trabajando   */}
        <section className="flex-1 m-4 flex flex-col items-center">
          <h1 className={h1}>DONE</h1>
          <Button variant="add" className="w-[30%] font-mono">Add task</Button>
        </section> {/**Seccion para las hechas   */}
      </section>
    </main>
  )
}

export default Home;