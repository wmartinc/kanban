import logo from '../../../assets/logoo.png';
import { useModals } from '@Store/store';
import Button from '../../ui/shared/Button';
import Searcher from '../shared/Searcher';
import useGetBoards from '../../../hooks/useGetBoards';
import { useEffect } from 'react';
import { useBoards } from '../../../store/useBoards';
import { Menu, User, Plus, Grid3x3, Star, Settings } from 'lucide-react';
import { useState } from 'react';
import { X } from 'lucide-react';
import useGetFavoriteBoards from '../../../hooks/useGetFavoriteBoards';

const Navegation = () => {
  const { fetchBoards, loading, response } = useGetBoards()
  const { getFavorites } = useGetFavoriteBoards() 
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
    <nav className="w-full py-3 md:px-4 flex items-center justify-between flex-col md:flex-row border-b border-zinc-800/50">
      <div className="md:w-[30%] w-62.5 md:flex hidden items-center justify-center">
        <img src={logo} alt="logo" className='w-[50%] aspect-11/5 object-cover pointer-events-none user-select-none' />
      </div>

      <NavegationOptionsDesktop setModalBoard={setModalBoard} getTotalBoards={getTotalBoards} showFavoritesModal={showFavoritesModal} />
      <NavegationOptionsMobile createBoard={setModalBoard} showBoards={getTotalBoards} showFavoriteBoards={showFavoritesModal} />
    </nav>
  )
}

const NavegationOptionsDesktop = ({ setModalBoard, getTotalBoards, showFavoritesModal }) => {
  return (
    <div className='w-[70%] hidden md:flex items-center gap-2'>
      <Button variant="ghost" event={showFavoritesModal}>Favorites</Button>
      <Button variant="ghost" event={getTotalBoards}>Boards</Button>
      <Searcher />
      <div className="w-px h-6 bg-zinc-800 mx-1" />
      <Button variant="secondary" event={setModalBoard}>New Board</Button>
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

  const btn_menu = "transition-all duration-200 p-3 w-full text-start text-sm flex items-center gap-3 cursor-pointer hover:bg-zinc-800/50 text-zinc-400 hover:text-zinc-200"

  return (
    <div className='flex gap-5 justify-between md:hidden w-full'>
      <Menu className='stroke-zinc-400 ml-auto cursor-pointer hover:stroke-zinc-200 transition-colors' onClick={toggleMenu}/>
      <div className={`text-zinc-200 border-l border-zinc-800 transition-all duration-300 ease-in-out fixed top-0 w-64 ${isShown ? "right-0" : "-right-72"} h-full z-10 bg-surface shadow-2xl shadow-black/50`}>
        <div className='p-4 border-b border-zinc-800'>
          <h2 className='text-sm font-display font-semibold text-zinc-400 uppercase tracking-wider'>Menu</h2>
        </div>
        <button className={btn_menu}><User size={18}/>My Account</button>
        <button className={btn_menu} onClick={()=> selectOption(createBoard) } ><Plus size={18} />Create Board</button>
        <button className={btn_menu} onClick={() => selectOption(showBoards)} ><Grid3x3 size={18} />Select a board</button>
        <button className={btn_menu} onClick={() => selectOption(showFavoriteBoards)} ><Star size={18} />Favorites</button>
        <button className={btn_menu} onClick={() => {}} ><Settings size={18} />Settings</button>

        <X className='absolute bottom-4 right-4 stroke-zinc-500 hover:stroke-zinc-300 cursor-pointer transition-colors' onClick={toggleMenu}/>
      </div>
    </div>
  )
}

export default Navegation;