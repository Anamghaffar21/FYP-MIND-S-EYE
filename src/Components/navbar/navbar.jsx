import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../../UserContext';
import { setAuthToken } from '../../api';
import './navbar.css';
import LoginForm from '../login/login';
import SignupForm from '../signup/signup';

const Navbar = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const { user, setUser } = useUser();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    setUser(null);
    navigate('/');
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/use-cases" className="use-cases-btn">Highlights▾</Link>
        </div>
        <div className="navbar-center">
          <Link to="/" className="brand-name">Mind's Eye</Link>
        </div>
        <div className="navbar-right">
          <button onClick={() => navigate('/faq')} className="nav-btn faq-btn">FAQ</button>
          <button onClick={() => navigate('/community')} className="nav-btn community-btn">Community</button>
          {user ? (
            <>
              <button onClick={() => navigate('/profile')} className="nav-btn profile-btn">Profile</button>
              <button onClick={handleLogout} className="nav-btn logout-btn">Logout</button>
            </>
          ) : (
            <>
              <button className="nav-btn signup-btn" onClick={() => setShowSignup(true)}>Sign Up</button>
              <button className="nav-btn login-btn" onClick={() => setShowLogin(true)}>Log In</button>
            </>
          )}
        </div>
      </nav>
      {showLogin && (
        <div className="modal">
          <LoginForm onClose={() => setShowLogin(false)} />
        </div>
      )}
      {showSignup && (
        <div className="modal">
          <SignupForm onClose={() => setShowSignup(false)} />
        </div>
      )}
    </>
  );
};

export default Navbar;