import logo from '../../../assets/logoo.png';
import { useModals } from '@Store/store';
import Button from '../../ui/shared/Button';
import Searcher from '../shared/Searcher';
import useGetBoards from '../../../hooks/useGetBoards';
import { useEffect } from 'react';
import { getBoards, getFavoritesBoards } from '../../../controllers/boards.controller';
import { useBoards } from '../../../store/useBoards';
import { Menu, User, Plus, Columns, Grid3x3, Star, Settings } from 'lucide-react';
import { useState } from 'react';
import { X } from 'lucide-react';
import useGetFavoriteBoards from '../../../hooks/useGetFavoriteBoards';

const Navegation = () => {
  const { fetchBoards, loading, response } = useGetBoards()
  const { favorites, getFavorites, loading:loadingFavorites } = useGetFavoriteBoards() 
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
    updateModalStatus(true, "showBoards")
    getFavorites()
  }

  return (
    <nav className="w-full py-2 md:px-4 flex items-center justify-between flex-col md:flex-row">
      <div className="md:w-[30%] w-62.5 md:flex hidden items-center justify-center">
        <img src={logo} alt="logo" className='w-[50%] aspect-11/5  object-cover pointer-events-none user-select-none' />
      </div>

      <NavegationOptionsDesktop setModalBoard={setModalBoard} getTotalBoards={getTotalBoards} showFavoritesModal={showFavoritesModal} />
      <NavegationOptionsMobile createBoard={setModalBoard} showBoards={getTotalBoards} showFavoriteBoards={showFavoritesModal} />
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

const NavegationOptionsMobile = ({createBoard, showBoards, showFavoriteBoards }) => {
  const [isShown, setIsShown] = useState(false)
  const toggleMenu = () => {
    setIsShown(!isShown)
  }

  const selectOption = (action) => {
    action()
    setIsShown(false)
  }

  const btn_menu = "transition[background] duration-500 p-2 w-full text-start text-sm flex items-center gap-2 cursor-pointer hover:bg-white/5"

  return (
    <div className='flex gap-5 justify-between md:hidden w-full h-full'>
      <Menu className='stroke-white ml-auto cursor-pointer ' onClick={toggleMenu}/>
      {/* Submenu */}
      <div className={`text-white border rounded-[6px_0px_0px_6px] border-white/20 transition[position] duration-500 ease-in-out fixed top-0 w-1/2 ${isShown ? "right-0" : "-right-200"} h-full z-10 bg-[#0d0d0d]`}>
        <div className='p-2 border-b border-white/20'>
          <button className={btn_menu}><User size={18}/>My Account</button>
        </div>
        <button className={btn_menu} onClick={()=> selectOption(createBoard) } ><Plus size={18} />Create Board</button>
        <button className={btn_menu} onClick={() => {}} ><Columns size={18} />Add a column</button>
        <button className={btn_menu} onClick={() => selectOption(showBoards)} ><Grid3x3 size={18} />Select a new board</button>
        <button className={btn_menu} onClick={() => selectOption(showFavoriteBoards)} ><Star size={18} />See Favorites</button>
        <button className={btn_menu} onClick={() => {}} ><Settings size={18} />Settings</button>

        <X className='absolute bottom-2 right-2' onClick={toggleMenu}/>
      </div>


    </div>
  )
}

export default Navegation;