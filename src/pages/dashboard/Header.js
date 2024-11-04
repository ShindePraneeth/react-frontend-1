// Header.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/header.css';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userType = localStorage.getItem('userType');

  const isActiveLink = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    navigate('/login');
  };

  return (
    <header className="site-header">
      <div className="header-container">
        <nav className="header-nav">
          <div className="nav-links">
            <Link to="/dashboard" className={isActiveLink('/dashboard')}>
              Dashboard
            </Link>
            <Link to="/available-food" className={isActiveLink('/available-food')}>
              Available Food
            </Link>
            <Link to="/ngo-directory" className={isActiveLink('/ngo-directory')}>
              NGO Directory
            </Link>
            {userType === 'donor' && (
              <Link to="/donate" className={isActiveLink('/donate')}>
                Donate
              </Link>
            )}
            {userType === 'ngo' && (
              <Link to="/donate" className={isActiveLink('/donate')}>
                Share Food
              </Link>
            )}
            <Link to="/contact" className={isActiveLink('/contact')}>
              Contact
            </Link>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;