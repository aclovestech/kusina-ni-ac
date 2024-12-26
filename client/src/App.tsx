// Imports
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router';
import { useEffect } from 'react';
import Header from './components/layout/Header/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Category from './pages/Category';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import OrderDetails from './pages/OrderDetails';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

const MainLayout = () => (
  <div>
    <Header />
    <main>
      <Outlet />
    </main>
  </div>
);

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: '/auth/sign-in', element: <Login /> },
        { path: '/auth/register', element: <Register /> },
        // Change to categories instead of category
        { path: '/categories', element: <Category /> },
        { path: '/category/:category_name', element: <Category /> },
        { path: '/product/:product_id', element: <Product /> },
        { path: '/cart', element: <Cart /> },
        { path: '/cart/checkout', element: <Checkout /> },
        { path: '/orders', element: <Orders /> },
        { path: '/orders/:order_id', element: <OrderDetails /> },
        { path: '/settings', element: <Settings /> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'coffee');
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
