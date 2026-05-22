import Navegation from "../ui/navegation/Navegation";
import TaskCard from "./TaskCard";
import TaskViewer from "./TaskViewer";


const Home = () => {
  return (
    <main className="w-[95%] h-dvh flex flex-col m-auto">
      <Navegation />
      <section className="w-full bg-neutral-950 rounded-2xl flex-1 my-4 mx-auto flex gap-5">
        <TaskViewer status={"PENDING"} />
        <TaskViewer status={"DOING"} />
        <TaskViewer status={"DONE"} />
      </section>
    </main>
  )
}

export default Home;