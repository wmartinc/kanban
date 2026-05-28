import Home from "./Componentes/home/Home";
import ModalContainer from "./Componentes/modals/ModalContainer";
import { useModals } from "@Store/store";

function App() {
  const modalContainer = useModals((state) => state.modals.modalContainer)

  return (
    <div className='bg-black/95 h-dvh'>
      <Home />
      {/*Here we will have the modals, it will work to display them..*/}
      <ModalContainer shown={modalContainer}/>
    </div>
  )
}

export default App; 