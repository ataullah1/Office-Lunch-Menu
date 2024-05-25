import { Outlet } from 'react-router-dom';
import Nav from '../components/Nav/Nav';
import Footer from '../components/Footer/Footer';

const Root = () => {
  return (
    <div className="bg-slate-800 text-slate-100">
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
