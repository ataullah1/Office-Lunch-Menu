import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div>
      <div className="py-5 flex justify-between items-center w-11/12 mx-auto">
        <button className="text-3xl font-bold">Logo</button>
        <div className="flex gap-5 items-center">
          <Link
            className="py-2 px-5 rounded-md shadow-md shadow-slate-200 text-white font-medium"
            to={'/'}
          >
            Home
          </Link>
          <Link
            className="py-2 px-5 rounded-md shadow-md shadow-slate-200 text-white"
            font-medium
            to={'/all-menu'}
          >
            All Menu
          </Link>
        </div>
        <button className="py-2 px-6 rounded-md shadow-md shadow-slate-200">
          Login
        </button>
      </div>
    </div>
  );
};

export default Nav;
