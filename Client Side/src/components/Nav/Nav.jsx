import { useEffect, useState } from 'react';
import { CgMenuRightAlt } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import { ImSpinner9 } from 'react-icons/im';
import ProfileMenu from '../ProfileMenu/ProfileMenu';

const Nav = () => {
  const [menu, setMenu] = useState(false);
  const [logoutMenu, setLogout] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { userDta, isLoading } = useAuth();
  console.log(userDta);

  useEffect(() => {
    const handleScrolled = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScrolled);
    return () => {
      window.removeEventListener('scroll', handleScrolled);
    };
  }, []);
  // console.log(scrolled);
  return (
    // <div className="fixed left-0 top-0 z-50 w-full" >
    <div
      className={
        scrolled
          ? 'w-full fixed top-0 left-0 z-50 py-3 pb-4 bg-[#0b1625ca] shadow-xl shadow-[#343a4298] duration-300'
          : 'w-full fixed top-0 left-0 z-50 pt-5 sm:pt-8 pb-4 duration-300'
      }
    >
      <div className=" flex justify-between items-center w-11/12 mx-auto">
        <button className="text-3xl font-bold">Logo</button>
        <div className="hidden md:flex gap-5 items-center">
          <Link
            className="py-2 px-5 rounded-md shadow-md shadow-slate-200 text-white font-medium hover:shadow-lg hover:shadow-slate-200 hover:scale-110 duration-300"
            to={'/'}
          >
            Home
          </Link>
          <Link
            className="py-2 px-5 rounded-md shadow-md shadow-slate-200 text-white font-medium  hover:shadow-lg hover:shadow-slate-200 hover:scale-110 duration-300"
            font-medium
            to={'/today-menu'}
          >
            Today Menu
          </Link>
          <Link
            className="py-2 px-5 rounded-md shadow-md shadow-slate-200 text-white font-medium  hover:shadow-lg hover:shadow-slate-200 hover:scale-110 duration-300"
            font-medium
            to={'/my-orders'}
          >
            My Order
          </Link>
        </div>
        <div className="flex items-center gap-4 relative">
          {isLoading ? (
            <div className="py-2 w-[60px] h-[60px] flex items-center justify-center text-5xl text-white">
              <ImSpinner9 className="animate-spin" />
            </div>
          ) : userDta ? (
            <ProfileMenu />
          ) : (
            <Link to={'/login'}>
              <button className="py-2 px-6 shadow-md shadow-slate-200 hover:shadow-slate-200 hover:shadow-lg hover:scale-110 duration-300 rounded ">
                Log in
              </button>
            </Link>
          )}
          <button onClick={() => setMenu(!menu)} className="text-4xl md:hidden">
            <CgMenuRightAlt />
          </button>
          {menu && (
            <div className="absolute top-12 w-44 rounded-md p-5 right-0 bg-slate-600 md:hidden flex flex-col gap-5 items-center">
              <Link
                onClick={() => setMenu(!menu)}
                className="py-2 w-full text-center rounded-md shadow-md shadow-slate-200 text-white font-medium hover:shadow-lg hover:shadow-slate-200 hover:scale-110 duration-300"
                to={'/'}
              >
                Home
              </Link>
              <Link
                onClick={() => setMenu(!menu)}
                className="py-2 w-full text-center rounded-md shadow-md shadow-slate-200 text-white font-medium  hover:shadow-lg hover:shadow-slate-200 hover:scale-110 duration-300"
                font-medium
                to={'/today-menu'}
              >
                Today Menu
              </Link>
              <Link
                onClick={() => setMenu(!menu)}
                className="py-2 w-full text-center rounded-md shadow-md shadow-slate-200 text-white font-medium  hover:shadow-lg hover:shadow-slate-200 hover:scale-110 duration-300"
                font-medium
                to={'/my-orders'}
              >
                My Order
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
