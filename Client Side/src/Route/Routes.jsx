import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Root from '../root/Root';
import TodayMenu from '../pages/TodayMenu/TodayMenu';
import MyOrders from '../pages/MyOrders/MyOrders';
import Error from '../pages/Error/Error';
import PrivetRoute from './PrivetRoute';
import Dashboard from '../pages/Dashboard/Dashboard';
import DashboardHome from '../pages/Dashboard/DashboardHome.jsx/DashboardHome';
import PrivetDashboard from './PrivetDashboard';
import AllEmployee from '../pages/AllEmployee/AllEmployee';
import TodayOrders from '../pages/TodayOrders/TodayOrders';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <Error />,
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/today-menu',
        element: (
          <PrivetRoute>
            <TodayMenu />
          </PrivetRoute>
        ),
      },
      {
        path: '/my-orders',
        element: (
          <PrivetRoute>
            <MyOrders />
          </PrivetRoute>
        ),
        children: [],
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <PrivetDashboard>
        <Dashboard />
      </PrivetDashboard>
    ),
    children: [
      {
        path: '/dashboard',
        element: <DashboardHome />,
      },
      {
        path: '/dashboard/all-employees',
        element: <AllEmployee />,
      },
      {
        path: '/dashboard/today-orders',
        element: <TodayOrders />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);
export default router;
