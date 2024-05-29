import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Root from '../root/Root';
import TodayMenu from '../pages/TodayMenu/TodayMenu';
import MyOrders from '../pages/MyOrders/MyOrders';
import Error from '../pages/Error/Error';

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
        element: <TodayMenu />,
      },
      {
        path: '/my-orders',
        element: <MyOrders />,
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
