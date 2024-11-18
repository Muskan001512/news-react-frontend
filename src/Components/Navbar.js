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

  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen);

  const logout = async (e) => {
    try {
      const response = await axios.post('http://localhost:3000/api/users/logout');
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
      <Toaster />
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light mb-5" id="navbar_sticky">
        <a href="/" className="navbar-brand">
          <img src={logo} alt="Logo" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarSupportedContent"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto fs-6 fw-bold">
            {userRole === 'admin' && (
              <>
                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Admin
                  </Link>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><Link className="dropdown-item" to="/createNews">Create Post</Link></li>
                    <li><Link className="dropdown-item" to="/categorylist">Create Category</Link></li>
                    <li><Link className="dropdown-item" to="/createadvertise">Create Advertisement</Link></li>
                  </ul>
                </li>
              </>
            )}
            <li className="nav-item active">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category/fashion">Fashion</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category/entertainment">Entertainment</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category/lifestyle">Lifestyle</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category/local">Local News</Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li> */}
           
            {userId ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to={`/profile/${userId}`}>{userName}</Link>
                </li>
                <li className="nav-item">
                  <button type="button" className="nav-link btn btn-link" onClick={logout}>Logout</button>
                </li>
              </>
            ) : (
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
