import { Outlet, useLocation } from 'react-router-dom';
import Nav from '../components/Nav/Nav';
import Footer from '../components/Footer/Footer';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';

const Root = () => {
  // const [navView, setNavView] = useState(true);
  // const location = useLocation();
  // console.log(location);
  // if (location.pathname === '/login' || location.pathname === '/register') {
  //   setNavView(false);
  // }
  return (
<<<<<<< HEAD
    <div className="bg-slate-800 text-white">
      <Toaster />
      {/* {navView && <Nav />} */}
=======
    <div className="bg-slate-800 text-slate-100">
>>>>>>> account
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
