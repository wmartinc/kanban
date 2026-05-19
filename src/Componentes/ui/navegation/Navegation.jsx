import logo from '../../../assets/logoo.png';
import Button from '../../ui/shared/Button';
import Searcher from '../shared/Searcher';

const Navegation = () => {
  return (
    <nav className="md:w-full w-[90%]  m-auto py-2 md:px-4 flex items-center justify-between flex-col md:flex-row">
      <div className="md:w-[30%] w-62.5 flex items-center justify-center">
        <img src={logo} alt="logo" className='w-[50%] aspect-11/5  object-cover pointer-events-none user-select-none' />
      </div>

      <NavegationOptionsDesktop />
      <NavegationOptionsMobile />
    </nav>
  )
}

const NavegationOptionsDesktop = () => {
  return (
    <div className='w-[70%] h-dv hidden md:flex items-center gap-3'>
      <Button variant="ghost">Favorites</Button>
      <Button variant="ghost">Boards</Button>
      <Searcher />
      <Button variant="ghost">Create Board</Button>
    </div>
  )
}

const NavegationOptionsMobile = () => {
  return (
    <div className='flex items-center gap-5 justify-between md:hidden w-full'>
      <Searcher />
      <Button variant="ghost" >Create Board</Button>
    </div>
  )
}

export default Navegation;