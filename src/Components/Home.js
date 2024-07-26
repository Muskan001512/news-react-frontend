import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getCookie } from '../utility/cookieUtils';
import { Link } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import $ from 'jquery';
import logo from '../img/core-img/logo.png';
import add from '../img/bg-img/add.png';
import img1 from '../img/bg-img/1.jpg';
import img2 from '../img/bg-img/2.jpg';
import img3 from '../img/bg-img/3.jpg';
import img11 from '../img/bg-img/11.jpg';
import img12 from '../img/bg-img/12.jpg';
import img13 from '../img/bg-img/13.jpg';

const Home = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const userd_id = getCookie('user._id');

  useEffect(() => {
    const fetchNews = async () => {
      const user = getCookie('user');
      console.log("user here", user);

      try {
        if (user) {
          setUserId(user._id);
          if (user.userRole === 'Admin') {
            setUserRole('Admin');
            console.log('I am admin', userRole);
          }
        } else {
          console.log('No user found in cookies');
        }
        console.log('userId:', userId, userRole);
        console.log('user constant id:', userd_id);

        const response = await axios.get('http://localhost:3000/api/news/getnews', {
          headers: {
            'Authorization': `Bearer ${getCookie('accessToken')}`
          }
        });
        const data = response.data;
        if (Array.isArray(data)) {
          setNewsArticles(data);
        } else {
          console.error('Unexpected response format:', data);
          setNewsArticles([]);
        }
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, [userId, userRole]);

  useEffect(() => {
    if ($.fn.simpleTicker) {
      $.simpleTicker($("#breakingNewsTicker"), {
        speed: 1000,
        delay: 3000,
        easing: 'swing',
        effectType: 'roll'
      });
    }
  }, [newsArticles]);

  const mostRecentArticle = newsArticles[0];

  return (
    <>
      <Toaster />
      {/* Breaking News Area Start */}
      <section className="breaking-news-area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="breaking-news-ticker d-flex flex-wrap align-items-center">
                <div className="title">
                  <h6>Trending</h6>
                </div>
                <div>
                  <ul id="breakingNewsTicker">
                    {mostRecentArticle && (
                      <li>
                        <a href="#" className="trending-news">
                          {mostRecentArticle.title}
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All News Start */}
      <div className="single-slide">
        <div className="container-fluid">
          <div className="row">
            {newsArticles.map((article) => (
              <div key={article._id} className="col-12 col-md-3">
                <div className="single-blog-post style-1" data-animation="fadeInUpBig" data-delay="100ms" data-duration="1000ms">
                  <div className="blog-thumbnail bg-overlay">
                    <a href="#">
                      <img src={`http://localhost:3000/${article.image}`} alt={article.title} />
                    </a>
                  </div>
                  <div className="blog-content">
                    <span className="post-date">{new Date(article.date).toLocaleDateString()}</span>
                    <a href="#" className="post-title">
                      {article.title}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slider Start */}
      <OwlCarousel className="owl-theme" loop margin={10} nav>
        <div className="single-blog-post style-3">
          <div className="blog-thumbnail">
            <a href="#"><img src={img11} alt="" /></a>
          </div>
          <div className="blog-content">
            <span className="post-date">June 20, 2018</span>
            <p className="post-title">Elon Musk: Tesla worker admitted to sabotage</p>
          </div>
        </div>
        <div className="single-blog-post style-3">
          <div className="blog-thumbnail">
            <a href="#"><img src={img12} alt="" /></a>
          </div>
          <div className="blog-content">
            <span className="post-date">June 20, 2018</span>
            <p className="post-title">Rachel Smith breaks down while discussing border crisis</p>
          </div>
        </div>
        <div className="single-blog-post style-3">
          <div className="blog-thumbnail">
            <a href="#"><img src={img13} alt="" /></a>
          </div>
          <div className="blog-content">
            <span className="post-date">June 20, 2018</span>
            <p className="post-title">Dow falls 287 points as trade war fears escalate</p>
            <a href="#" className="post-author">By Michael Smith</a>
          </div>
        </div>
      </OwlCarousel>

      {/* Admin News Form */}
      {userRole === 'Admin' && (
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <h2>Admin News Management</h2>
              <form>
                {/* Add form fields for creating, updating, and deleting news articles */}
                <button type="button" className="btn btn-primary">Post News Article</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
