import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Cart from './components/Cart'; // ✅ Import Cart
import Orders from './components/Orders';
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
          <Route path="/orders" element={<Orders />} /> {/* ✅ Add this */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
