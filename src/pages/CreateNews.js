
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
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState(null);
  const [categories, setCategories] = useState([]); // State to hold categories
  const [selectedCategory, setSelectedCategory] = useState(''); // State for selected category

  useEffect(() => {
    // Fetch categories on component mount
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/categories/allcategories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = getCookie('accessToken');
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('category', selectedCategory); // Append selected category
      if (image) formData.append('image', image);
      if (video) formData.append('video', video);

      const response = await axios.post('http://localhost:3000/api/news/newscreate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${accessToken}`
        }
      });

      toast.success('News article created successfully');
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

                      <div className="form-outline mb-4">
                        <textarea
                          className="form-control form-control-lg"
                          required
                          placeholder="Description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          rows="4"
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <select
                          className="form-control form-control-lg"
                          required
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                          <option value="">Select Category</option>
                          {categories.map((category) => (
                            <option key={category._id} value={category.name}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="file"
                          className="form-control"
                          accept="image/*"
                          onChange={(e) => setImage(e.target.files[0])}
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="file"
                          className="form-control"
                          accept="video/*"
                          onChange={(e) => setVideo(e.target.files[0])}
                        />
                      </div>

                      <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">
                          Create News
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
  );
};

export default CreateNews;
