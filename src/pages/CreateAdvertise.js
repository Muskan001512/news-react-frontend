import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from "react-hot-toast";
import axios from 'axios';
import { getCookie } from '../utility/cookieUtils';
import Navbar from '../Components/Navbar';

const CreateAdvertise = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [link, setLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = getCookie('accessToken');
    try {
      const formData = new FormData();
   
      if (image) formData.append('image', image);
      formData.append('link', link); // Append link

      const response = await axios.post('http://localhost:3000/api/advertise/createadvertise', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${accessToken}`
        }
      });
      console.log("add-rsponse",response);

      toast.success('Advertisement created successfully');
      navigate('/');
    } catch (error) {
      toast.error('Something went wrong');
    }
  };


  useEffect(() => {
    const user = getCookie('user');
    if (user) {
      if (user.role === 'user') {
        navigate('/');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

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
                    <h2 className="text-uppercase text-center mb-5">Create Advertisement</h2>
                    <form onSubmit={handleSubmit}>
                      <div className="form-outline mb-4">
                        <input
                          type="file"
                          className="form-control"
                          accept="image/*"
                          onChange={(e) => setImage(e.target.files[0])}
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <label htmlFor="homepage">link:</label>
                        <input
                          type="link"
                          className="form-control"
                          onChange={(e) => setLink(e.target.value)} // Fixed link input handler
                        />
                      </div>

                      <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">
                          Create Advertisement
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CreateAdvertise;
