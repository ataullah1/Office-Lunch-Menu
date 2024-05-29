import { Outlet } from 'react-router-dom';
import Nav from '../components/Nav/Nav';
import Footer from '../components/Footer/Footer';
import { Toaster } from 'react-hot-toast';

const Root = () => {
  return (
    <div className="bg-slate-800 text-white">
      <Toaster />
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
