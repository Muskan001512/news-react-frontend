import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { Toaster } from 'react-hot-toast';

// Adjust your NewsDetail component
const NewsDetail = () => {
  const { articleId } = useParams();
  const [news, setNews] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/news/getnews/${articleId}`);
        setNews(response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };
    fetchNews();
  }, [articleId]);

  if (!news) return <div>Loading...</div>;

  return (
    <div className="main-container">
      <Navbar />
      <div className="content">
        <section className="vh-100 bg-image">
          <div className="mask d-flex align-items-center h-100 gradient-custom-3">
            <div className="container h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                  <div className="card">
                    <div className="card-body p-5">
                      <h2 className="text-uppercase text-center mb-5">{news.title}</h2>
                      <img src={`http://localhost:3000/${news.image}`} alt={news.title} className="img-fluid"
                        style={{ width: '538px', height: '337px', objectFit: 'cover' }} />
                      <p className="mt-4">{news.description}</p>
                      {news.video && (
                        <video controls className="mt-4">
                          <source src={`http://localhost:3000/${news.video}`} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};


export default NewsDetail;
