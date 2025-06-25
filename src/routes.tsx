import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import Marketplace from './pages/Marketplace';
import GuestRoute from './components/auth/GuestRoute';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Structured for future expansion with marketplace routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <GuestRoute><Login /></GuestRoute>,
  },
  {
    path: '/register',
    element: <GuestRoute><Register /></GuestRoute>,
  },
  {
    path: '/marketplace',
    element: <Marketplace />,
  },
  // Future marketplace routes
  // { path: '/produto/:id', element: <ProtectedRoute><ProductDetail /></ProtectedRoute> },
  // { path: '/carrinho', element: <ProtectedRoute><Cart /></ProtectedRoute> },
  // { path: '/checkout', element: <ProtectedRoute><Checkout /></ProtectedRoute> },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
