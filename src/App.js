import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Products from './components/Products';
import './App.css';

function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="auth-container">
              <h2>{isLogin ? 'Login' : 'Register'}</h2>
              {isLogin ? <Login /> : <Register />}
              <p>
                {isLogin ? "Don't have an account?" : 'Already have an account?'}
                <button onClick={() => setIsLogin(!isLogin)}>
                  {isLogin ? 'Register here' : 'Login here'}
                </button>
              </p>
            </div>
          }
        />
        <Route path="/products" element={<Products />} />
        {/* Redirect any unknown route to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;