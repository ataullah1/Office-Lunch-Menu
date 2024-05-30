import { Link } from 'react-router-dom';
import useAdmin from '../../Hooks/useAdmin';

const Footer = () => {
  const isAdmin = useAdmin();
  return (
    <footer className=" bg-neutral-900 text-white pt-14 mt-10">
      <div className="w-11/12 mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between pb-5">
          <div className="italic text-balance">
            <Link className="px-2 ">Home</Link>
            <Link to={'/today-menu'} className="px-2 ">
              Today Menus
            </Link>
            {isAdmin || (
              <Link to={'/my-order'} className="px-2 ">
                My Order
              </Link>
            )}
            {isAdmin && (
              <Link to={'/Dashboard'} className="px-2 ">
                Dashboard
              </Link>
            )}
          </div>
          <p className="text-base italic">
            Copyright © 2024 - All right reserved by{' '}
            <a
              href="https://www.linkedin.com/in/md-ataullah/"
              className="text-pink-500 italic font-semibold tracking-wide"
            >
              Md Ataullah
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
