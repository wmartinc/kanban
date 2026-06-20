import logo from '../../../assets/logoo.png';
import { useModals } from '@Store/store';
import Button from '../../ui/shared/Button';
import Searcher from '../shared/Searcher';
import useGetBoards from '../../../hooks/useGetBoards';
import { useEffect } from 'react';
import { getBoards } from '../../../controllers/boards.controller';
import { useBoards } from '../../../store/useBoards';

const Navegation = () => {
  const { fetchBoards, loading, response } = useGetBoards();
  const updateModalStatus = useModals((state) => state.updateModalStatus)
  const setBoards = useBoards(state => state.setBoards);

  useEffect(() => {
    if (!loading && response) {
      setBoards(response)
    }
  }, [loading, response])
  
  const setModalBoard = () => {
    updateModalStatus(true, "addBoard")
  }
  
  const getTotalBoards = async () => {
    updateModalStatus(true, "showBoards")
    fetchBoards();
  } 

  const showFavoritesModal = () => {
    updateModalStatus(true, "favorites")
  }

  return (
    <nav className="md:w-full w-[90%] py-2 md:px-4 flex items-center justify-between flex-col md:flex-row">
      <div className="md:w-[30%] w-62.5 flex items-center justify-center">
        <img src={logo} alt="logo" className='w-[50%] aspect-11/5  object-cover pointer-events-none user-select-none' />
      </div>

      <NavegationOptionsDesktop setModalBoard={setModalBoard} getTotalBoards={getTotalBoards} showFavoritesModal={showFavoritesModal} />
      <NavegationOptionsMobile setModalBoard={setModalBoard} />
    </nav>
  )
}

const NavegationOptionsDesktop = ({ setModalBoard, getTotalBoards, showFavoritesModal }) => {
  return (
    <div className='w-[70%] h-dv hidden md:flex items-center gap-3'>
      <Button variant="ghost" event={showFavoritesModal}>Favorites</Button>
      <Button variant="ghost" event={getTotalBoards}>Boards</Button>
      <Searcher />
      <Button variant="ghost" event={setModalBoard}>Create Board</Button>
    </div>
  )
}

const NavegationOptionsMobile = ({ setModalBoard }) => {
  return (
    <div className='flex items-center gap-5 justify-between md:hidden w-full'>
      <Searcher />
      <Button variant="ghost" event={setModalBoard}>Create Board</Button>
    </div>
  )
}

export default Navegation;