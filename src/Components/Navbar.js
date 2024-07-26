import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'
import { toast } from 'react-hot-toast';
import { setCookie, getCookie, removeCookie } from '../utility/cookieUtils';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../img/core-img/logo.png';

const Navbar = () => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(getCookie('accessToken'));
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  
  const logout = async (e) => {
      try {
          console.log("i am starting the logout the process");
          const response = await axios.post(
              'http://localhost:3000/api/users/logout',
               null, // No body data for this request
              {
                  withCredentials: true,
                  headers: {
                      'Authorization': `Bearer ${getCookie('accessToken')}`
                  }
              }
          );
          console.log(response);
          toast.success(response.data.message);
          setUserId(null);
          removeCookie('user');
          removeCookie('accessToken');
          removeCookie('refreshToken');
          return navigate('/login');
          // setCookie('user', response.data.data.user[0], { maxAge: 3600 }); // Set cookie for 1 hour
      } catch (error) {
          console.log(error);
          toast.error("somthing went wrong");
      }
  };

  useEffect(() => {
    const user = getCookie('user');
    console.log("userDetails", user);
    if (user) {
      setUserId(user._id);
      setUserName(user.userName);
    }
    const navbarSticky = document.getElementById("navbar_sticky");
    const navbarHeight = navbarSticky ? navbarSticky.offsetHeight : 0;
    const sticky = navbarSticky ? navbarSticky.offsetTop : 0;
  
    const handleScroll = () => {
      if (window.scrollY >= sticky + navbarHeight) {
        navbarSticky.classList.add("sticky");
        document.body.style.paddingTop = navbarHeight + 'px';
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
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5"  id="navbar_sticky">
        <a href="index.html" className="navbar-brand">
          <img src={logo} alt="Logo" />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto fs-6 fw-bold">
            <li className="nav-item active">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Local News</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Pages</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Sport</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Lifestyle</a>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li> */}

            {userId && (<> <li className="nav-item">
                                    <a className="nav-link" href="account.html"><i className="fa fa-user fs-4 align-middle me-1 lh-1 col_red"></i> {userName} </a>
                                </li>
                                <li className="nav-item">
                                <button type ="button" className="nav-link" onClick={logout} >Logout</button>
                               </li></>)}
                               {!userId && (<> 
                                <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                               </li>
                               <li className="nav-item">
                                <Link className="nav-link" to="/register">Register</Link>
                               </li></>)}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
