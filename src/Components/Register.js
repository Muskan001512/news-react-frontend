import axios from 'axios';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    phone: "",
    email: "",
    userType: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/users/register', user);
      console.log("response", response);
      toast.success('User is registered');
    } catch (error) {
      console.error('Error registering user:', error);
      toast.error('Error registering user');
    }
  };

  return (
    <div>
      <Toaster />
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
                          value={user.username}
                          onChange={(e) => setUser({ ...user, username: e.target.value })}
                          className="form-control form-control-lg"
                          placeholder="Username"
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
                      <div className="form-outline mb-4">
                        <input
                          type="tel"
                          value={user.phone}
                          onChange={(e) => setUser({ ...user, phone: e.target.value })}
                          className="form-control form-control-lg"
                          placeholder="Phone"
                          required
                        />
                      </div>
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
                          type="text"
                          value={user.userType}
                          onChange={(e) => setUser({ ...user, userType: e.target.value })}
                          className="form-control form-control-lg"
                          placeholder="User Type"
                          required
                        />
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
