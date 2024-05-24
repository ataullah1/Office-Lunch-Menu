import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <Link to={'/'}>Home</Link>
        <Link to={'/all-menu'}>All Menu</Link>
      </div>
      <button className="py-2 px-6 bg-slate-600 rounded-md">Login Account</button>
    </div>
  );
};

export default Nav;
