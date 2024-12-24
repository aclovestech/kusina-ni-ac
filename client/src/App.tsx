// Imports
import { BrowserRouter, Routes, Route } from 'react-router';
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/auth/sign-in" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/category/:category_name" element={<Category />} />
        <Route path="/product/:product_id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cart/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:order_id" element={<OrderDetails />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
