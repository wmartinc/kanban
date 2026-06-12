import { Route, Routes } from "react-router";
import Home from "./Componentes/home/Home";
import ModalContainer from "./Componentes/modals/ModalContainer";
import { useModals } from "@Store/store";
import Login from "./Componentes/auth/Login";
import Signup from "./Componentes/auth/Signup";

function App() {
  const modalContainer = useModals((state) => state.modals.modalContainer)

  return (
    <div className='bg-black/95 h-dvh'>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/home">
          <Route index element={<Home/>} />
        </Route>
      </Routes>
      
      {/*Here we will have the modals, it will work to display them..*/}
      <ModalContainer shown={modalContainer}/>
    </div>
  )
}

export default App; 