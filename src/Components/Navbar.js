import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { setCookie, getCookie, removeCookie } from '../utility/cookieUtils';
import axios from 'axios';
import logo from '../img/core-img/logo.png';

const Navbar = () => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(getCookie('accessToken'));
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const logout = async (e) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/users/logout'
      );
      toast.success(response.data.message);
      setUserId(null);
      removeCookie('user');
      removeCookie('accessToken');
      removeCookie('refreshToken');
      return navigate('/login');
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    const user = getCookie('user');
    if (user) {
      setUserId(user._id);
      setUserName(user.username);
      setUserRole(user.role);
    }
    const navbarSticky = document.getElementById("navbar_sticky");
    const navbarHeight = navbarSticky ? navbarSticky.offsetHeight : 0;
    const sticky = navbarSticky ? navbarSticky.offsetTop : 0;

    const handleScroll = () => {
      if (window.scrollY >= sticky + navbarHeight) {
        navbarSticky.classList.add("sticky");
        // document.body.style.paddingTop = navbarHeight + 'px';
      } else {
        navbarSticky.classList.remove("sticky");
        document.body.style.paddingTop = '0';
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5" id="navbar_sticky">
        <a href="/" className="navbar-brand">
          <img src={logo} alt="Logo" />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto fs-6 fw-bold">
          {userRole === 'admin' && (
              <>
                
                <li className="nav-item">
                  <span className="navbar-text admin-title">Admin News Management</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-primary" onClick={() => navigate('/createNews')}>Create News</button>
                </li>
              </>
            )}
            <li className="nav-item active">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Local News</a>
            </li>
            
            <li className="nav-item">
              <a className="nav-link" href="#">Lifestyle</a>
            </li>
            
            {userId && (
  <>
    <li className="nav-item">
      <Link className="nav-link" to={`/profile/${userId}`}>{userName}</Link>
    </li>
    <li className="nav-item">
      <button type="button" className="nav-link" onClick={logout}>Logout</button>
    </li>
  </>
)}
            
            {!userId && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
