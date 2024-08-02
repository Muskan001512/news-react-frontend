import axios from 'axios';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { getCookie, setCookie } from '../utility/cookieUtils';
import Navbar from './Navbar';


const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/users/login', user);
      console.log("response", response);
      
      const { data } = response; // Destructure data from response
      console.log(data);
  
      if (data && data.user && data.accessToken && data.refreshToken) {
        const { user, accessToken, refreshToken } = data;
        setCookie('user', JSON.stringify(user), { maxAge: 3600 }); // Convert user object to JSON string
        setCookie('accessToken', accessToken, { maxAge: 3600 }); // Set cookie for 1 hour
        setCookie('refreshToken', refreshToken, { maxAge: 3600 }); // Set cookie for 1 hour
  
        toast.success('Login successful');
        navigate('/'); // Redirect to home page
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('Invalid credentials');
    }
  };
  

  return (
    <div>
      <Toaster />
      <section className="vh-100 bg-image">
      <Navbar />
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card">
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">Login</h2>
                    <form onSubmit={handleSubmit}>
                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          value={user.email}
                          onChange={(e) => setUser({ ...user, email: e.target.value })}
                          className="form-control form-control-lg"
                          placeholder="Email"
                          required
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          value={user.password}
                          onChange={(e) => setUser({ ...user, password: e.target.value })}
                          className="form-control form-control-lg"
                          placeholder="Password"
                          required
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Login</button>
                      </div>
                      <p className="text-center text-muted mt-5 mb-0">
                        Don't have an account? <a href="/register" className="fw-bold text-body"><u>Register here</u></a>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
