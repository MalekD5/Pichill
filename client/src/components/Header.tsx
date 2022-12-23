import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthHook } from '../hooks/useAuthHook';
import logo from '../assets/logo.svg';
import menu from '../assets/menu.svg';
import pfp from '../assets/pfp.png';
import Button from './Button';

export default function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthHook();

  const handleMenu = () => {
    setOpen((v) => !v);
  };

  return (
    <nav className='flex items-center justify-between flex-wrap bg-gray-900 p-6 rounded'>
      <div className='flex flex-shrink-0 items-center text-white mr-6'>
        <img
          src={logo}
          alt='logo'
          className='fill-[rgb(29 78 216)] h-6 mr-3 sm:h-9 '
        />
        <span className='self-center text-xl font-bold order-1 whitespace-nowrap text-white '>
          Pichill
        </span>
      </div>
      <div className='block lg:hidden'>
        <button
          type='button'
          className='flex items-center px-3 py-2 border-none rounded text-white'
          onClick={handleMenu}
        >
          <img src={menu} alt='menu' className='fill-white h-5 w-5' />
        </button>
      </div>
      <div
        className={`w-full ${
          open ? 'block' : 'hidden'
        } flex-grow lg:flex lg:items-center mt-5 outline outline-2 outline-gray-600 lg:outline-none lg:mt-0 lg:w-auto rounded-lg bg-gray-700 lg:bg-inherit lg:rounded-none`}
      >
        <div className='text-sm lg:flex-grow lg:block flex flex-col items-center justify-center'>
          <Link
            to='/'
            className='block mt-6 lg:inline-block font-semibold lg:font-normal lg:mt-0 text-white hover:text-white mr-4'
          >
            Home
          </Link>
          <Link
            to='/'
            className='block mt-6 lg:inline-block font-semibold lg:font-normal lg:mt-0 text-white hover:text-white mr-4'
          >
            Discover
          </Link>

          <Link
            to='/'
            className='block mt-6 lg:inline-block font-semibold lg:font-normal lg:mt-0 text-white hover:text-white mr-4'
          >
            Profile
          </Link>
        </div>
        <div className='flex justify-center'>
          {isLoggedIn() ? (
            <img
              className='mr-5 rounded-full w-11 h-11 cursor-pointer'
              src={pfp}
              alt='profile'
            />
          ) : (
            <>
              <Button
                onClick={() => navigate('/login')}
                className='hover:bg-transparent hover:outline hover:outline-1 hover:outline-blue-700 mt-6 lg:mt-0'
              >
                Login
              </Button>
              <Button
                onClick={() => navigate('/register')}
                className='hover:bg-transparent hover:outline hover:outline-1 hover:outline-blue-700 mt-6 lg:mt-0'
              >
                Register
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
