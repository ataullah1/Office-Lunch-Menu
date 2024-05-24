import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <Link
          className="py-2 px-5 rounded-md bg-gray-500 text-white font-medium"
          to={'/'}
        >
          Home
        </Link>
        <Link
          className="py-2 px-5 rounded-md bg-gray-500 text-white"
          font-medium
          to={'/all-menu'}
        >
          All Menu
        </Link>
      </div>
      <button className="py-2 px-6 bg-slate-600 rounded-md">
        Login Account
      </button>
    </div>
  );
};

export default Nav;
