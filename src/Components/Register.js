import axios from 'axios';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    phone: "",
    email: "",
    userType: "",
    profileImage: ""
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    phone: "",
    email: "",
    profileImage: ""
  });


 const validate = () => {
    let isValid = true;
    const newErrors = {};

    // Validate username
    if (!user.username) {
      newErrors.username = "Username is required";
      isValid = false;
    }

    // Validate password
    if (!user.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (user.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }
  

   // Validate phone number
   const phonePattern = /^[0-9]{10}$/;
   if (!user.phone || !phonePattern.test(user.phone)) {
      newErrors.phone = "Valid phone number is required";
     isValid = false;
   }

   // Validate email
   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if (!user.email || !emailPattern.test(user.email)) {
     newErrors.email = "Valid email is required";
     isValid = false;
   }

    // Validate profile image
    if (user.profileImage && user.profileImage.size > 2000000) {
      newErrors.profileImage = "File size should be less than 2MB";
      isValid = false;
    }

  
    setErrors(newErrors);
    return isValid;
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const response = await axios.post('http://localhost:3000/api/users/register', user);
      console.log("response", response);
      toast.success('User is registered');
    } catch (error) {
      console.error('Error registering user:', error);
      toast.error('Error registering user');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  return (
    
     <div>
      <Toaster />
      <Navbar />
      <section className="vh-100 bg-image">
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card">
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">Create an account</h2>
                    <form onSubmit={handleSubmit}>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          name="username"
                          value={user.username}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                          placeholder="Username"
                        />
                        {errors.username && <small className="text-danger">{errors.username}</small>}
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          name="password"
                          value={user.password}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                          placeholder="Password"
                        />
                        {errors.password && <small className="text-danger">{errors.password}</small>}
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="tel"
                          name="phone"
                          value={user.phone}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                          placeholder="Phone"
                        />
                        {errors.phone && <small className="text-danger">{errors.phone}</small>}
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          name="email"
                          value={user.email}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                          placeholder="Email"
                        />
                        {errors.email && <small className="text-danger">{errors.email}</small>}
                      </div>
                      <div className="form-outline mb-4">
                      <label htmlFor="homepage">Profile Image:</label>
                        <input
                          type="file"
                          name="profileImage"
                          onChange={handleChange}
                          className="form-control form-control-lg"
                          accept="image/*"
                        />
                        {errors.profileImage && <small className="text-danger">{errors.profileImage}</small>}
                      </div>
                      <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                      </div>
                      <p className="text-center text-muted mt-5 mb-0">
                        Have already an account? <a href="/login" className="fw-bold text-body"><u>Login here</u></a>
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

export default Register;
