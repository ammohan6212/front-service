import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Cart from './components/Cart';
import UserOrders from './components/Orders';
import Payment from './components/Payment';
import SellerLogin from './components/SellerLogin';
import SellerRegister from './components/SellerRegister';
import SellerHome from './components/SellerHome';
import SellerForgotPassword from './components/SellerForgotPassword';
import SellerResetPassword from './components/SellerResetPassword';
import Forgot from './components/ForgotPassword';
import Reset from './components/ResetPassword';
import ProductHome from './components/ProductHome';
import SellerDashboard from './components/Sellerdashboard';
import SellerOrders  from './components/sellerorders';  
import OrderDetails from './components/order-details';

import './App.css';

function AppRoutes() {
  const location = useLocation();

  // ✅ Fixed: added `||` for product-home check
  const isHomePage =
    location.pathname === "/home" ||
    location.pathname === "/seller-home" ||
    location.pathname === "/seller-dashboard" ||
    location.pathname === "/cart" ||
    location.pathname === "/order" ||
    location.pathname.startsWith("/product-home");

  return (
    <div className={isHomePage ? "" : "auth-container"}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<UserOrders />} />
        <Route path="/order/:orderId" element={<OrderDetails />} />
        <Route path="/sellerorder" element={<SellerOrders />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/seller-login" element={<SellerLogin />} />
        <Route path="/seller-register" element={<SellerRegister />} />
        <Route path="/seller-home" element={<SellerHome />} />
        <Route path="/seller-forgot-password" element={<SellerForgotPassword />} />
        <Route path="/seller-reset-password" element={<SellerResetPassword />} />
        <Route path="/reset-password" element={<Reset />} />
        <Route path="/forgot-password" element={<Forgot />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
        <Route path="/product-home/:id" element={<ProductHome />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
