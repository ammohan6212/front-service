import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
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
  );
}

export default App;
