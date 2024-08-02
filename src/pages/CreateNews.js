
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { setCookie, getCookie, removeCookie } from '../utility/cookieUtils';
import Navbar from '../Components/Navbar';


const CreateNews = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState(null);
  const [video, setVideo] = useState(null);

  const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("cookie", getCookie('accessToken'));
      console.log("cookie", getCookie('refreshToken'));
      const accessToken = getCookie('accessToken');
      console.log('Title', title, 'Image', image, 'Video', video);
      try {
          const formData = new FormData();
          formData.append('title', title);
           formData.append('image', image);
          formData.append('video', video);
          formData.append('description', description);
          

          const response = await axios.post('http://localhost:3000/api/news/newscreate', formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': `Bearer ${accessToken}` // Use the access token from cookies
              }
          });
          console.log(response);
          toast.success(response.data.message);
          return navigate('/');
      } catch (error) {
          console.log(error);
          toast.error("Something went wrong");
      }
  };

  useEffect(() => {
      const user = getCookie('user');
      console.log("role-repeat", user);
      const userRole = user.role;
      console.log("user", user);
      if(user){ 
          console.log("user role", user.role);
          if(userRole == "user"){
            return navigate('/');
          }
      }else{
          return navigate('/login');
      }
  }, []);
return (
  <div>
  <Toaster />
  <Navbar/>
  <section className="vh-100 bg-image">
    <div className="mask d-flex align-items-center h-100 gradient-custom-3">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-9 col-lg-7 col-xl-6">
            <div className="card">
              <div className="card-body p-5">
                <h2 className="text-uppercase text-center mb-5">Create News</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-outline mb-4">
                  <input
                  type="text"
                  className="form-control form-control-lg"
                  required
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
              />
                  </div>

                  {/* Description Textarea Field */}
  <div className="form-outline mb-4">
    <textarea
      className="form-control form-control-lg"
      required
      placeholder="Description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      rows="4" // Adjust the number of rows as needed
    />
  </div>

                  <div className="form-outline mb-4">
                  <input
                  type="file"
                  className="lg"
                  
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
              />
              </div>
              <div className="form-outline mb-4">
                  <input
                  type="file"
                  className="lg"
                  
                  accept="video/*"
                  onChange={(e) => setVideo(e.target.files[0])}
              />
              </div>
                  
                
               
                 
                 
                  <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Create News</button>
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

export default CreateNews
