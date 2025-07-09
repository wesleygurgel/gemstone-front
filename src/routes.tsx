import {createBrowserRouter} from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import Marketplace from './pages/Marketplace';
import ProductDetail from './pages/Marketplace/ProductDetail';
import Profile from './pages/Marketplace/Profile';
import Checkout from './pages/Marketplace/Checkout';
import OrderList from './pages/Marketplace/OrderList';
import OrderDetail from './pages/Marketplace/OrderDetail';
import Favorites from './pages/Marketplace/Favorites';
import GuestRoute from './components/auth/GuestRoute';
import ProtectedRoute from './components/auth/ProtectedRoute';

const isDevelopment = import.meta.env.MODE === 'development';

// Structured for future expansion with marketplace routes
const router = createBrowserRouter([
        {
            path: '/',
            element: <Home/>,
        },
        {
            path: '/login',
            element: <GuestRoute><Login/></GuestRoute>,
        },
        {
            path: '/register',
            element: <GuestRoute><Register/></GuestRoute>,
        },
        {
            path: '/marketplace',
            element: <Marketplace/>,
        },
        {
            path: '/marketplace/product/:id',
            element: <ProductDetail/>,
        },
        {
            path: '/marketplace/profile',
            element: <ProtectedRoute><Profile/></ProtectedRoute>,
        },
        // Order routes
        {
            path: '/checkout',
            element: <ProtectedRoute><Checkout/></ProtectedRoute>,
        },
        {
            path: '/marketplace/orders',
            element: <ProtectedRoute><OrderList/></ProtectedRoute>,
        },
        {
            path: '/marketplace/orders/:id',
            element: <ProtectedRoute><OrderDetail/></ProtectedRoute>,
        },
        {
            path: '/marketplace/favorites',
            element: <ProtectedRoute><Favorites/></ProtectedRoute>,
        },
        {
            path: '*',
            element: <NotFound/>,
        },
    ],
    {
        basename: isDevelopment ? "/gemstone-front/" : "/"
    });

export default router;
