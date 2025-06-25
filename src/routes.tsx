import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

// Structured for future expansion with marketplace routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  // Future marketplace routes
  // { path: '/login', element: <Login /> },
  // { path: '/produto/:id', element: <ProductDetail /> },
  // { path: '/carrinho', element: <Cart /> },
  // { path: '/checkout', element: <Checkout /> },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;