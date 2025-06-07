import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Cart from './components/Cart'; // ✅ Import Cart
import Orders from './components/Orders';
import Payment from './components/Payment';
import SellerLogin from './components/SellerLogin';
import SellerRegister from './components/SellerRegister';
import SellerHome from './components/SellerHome';
import SellerForgotPassword from './components/SellerForgotPassword'
import SellerResetPassword from './components/SellerResetPassword'
import Forgot from './components/ForgotPassword';
import Reset from './components/ResetPassword';

import './App.css';

function App() {
  return (
    <Router>
      <div className="auth-container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} /> {/* ✅ Add Cart route */}
          <Route path="/order" element={<Orders />} /> {/* ✅ Add this */}
          <Route path="/payment" element={<Payment />} />
          <Route path="/seller-login" element={<SellerLogin />} />
          <Route path="/seller-register" element={<SellerRegister />} />
          <Route path="/seller-home" element={<SellerHome />} />
          <Route path="/seller-forgot-password" element={<SellerForgotPassword />} />
          <Route path="/seller-reset-password" element={<SellerResetPassword />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/forgot-password" element={<Forgot />} />
          
          

        </Routes>
      </div>
    </Router>
  );
}

export default App;
