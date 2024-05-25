import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div className="fixed left-0 top-0 z-50 w-full">
      <div className="py-5 flex justify-between items-center w-11/12 mx-auto">
        <button className="text-3xl font-bold">Logo</button>
        <div className="flex gap-5 items-center">
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
        <button className="py-2 px-6 rounded-md shadow-md  hover:shadow-lg hover:shadow-slate-100 hover:scale-110 duration-300 shadow-slate-200">
          Login
        </button>
      </div>
    </div>
  );
};

export default Nav;
