import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getCookie } from '../utility/cookieUtils';
import { Link } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Ensure Bootstrap JS is included
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Navbar from './Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import $ from 'jquery';
import VideoModal from '../pages/VideoModel';
import img2 from '../img/bg-img/add2.png'; // Corrected import statement



const Home = () => {
  const [newsArticles, setNewsArticles] = useState([]);
    const [advertisements, setAdvertisements] = useState([]); // State for advertisements
    const [addIndex, setaddIndex] = useState(0);

  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false); 
  const articlesPerPage = 3;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setaddIndex((prevIndex) => (prevIndex + 1) % advertisements.length);
    }, 5000); // 10 seconds

    return () => clearInterval(intervalId);
  }, [advertisements]);

  useEffect(() => {
    if ($.fn.owlCarousel) {
      const videoSlides = $('.video-slides');
      videoSlides.owlCarousel({
        items: 3,
        margin: 30,
        loop: true,
        dots: false,
        autoplay: true,
        nav: true,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        responsive: {
          0: { items: 1 },
          576: { items: 2 },
          992: { items: 3 },
        }
      });
    }
  }, [newsArticles]);
  const user_id = getCookie('user._id');
  // console.log(user_id);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this news article?')) {
      const accessToken = getCookie('accessToken');
      try {
        await axios.delete(`http://localhost:3000/api/news/newsdelete/${id}`, {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        toast.success("News article deleted successfully");
        window.location.reload();
      } catch (error) {
        console.error('Error deleting article:', error);
        toast.error("Failed to delete news article");
      }
    }
  };

  useEffect(() => {
    const fetchNews = async () => {
      const user = getCookie('user');
      try {
        if (user) {
          setUserId(user._id);
          if (user.role === 'admin') {
            setUserRole('admin');
          }
        }

        const response = await axios.get('http://localhost:3000/api/news/getnews', {
          headers: { 'Authorization': `Bearer ${getCookie('accessToken')}` }
        });
        const data = response.data;
        console.log("response article", response.data);
        if (Array.isArray(data)) {
          setNewsArticles(data);
        } else {
          setNewsArticles([]);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);


  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/advertise/alladvertise');
        const data = response.data;
        console.log("response advertisements", data);
        if (Array.isArray(data)) {
          setAdvertisements(data);
        } else {
          setAdvertisements([]);
        }
      } catch (error) {
        console.error('Error fetching advertisements:', error);
      }
    };

    fetchAdvertisements();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(newsArticles.length / articlesPerPage));
    }, 5000);

    return () => clearInterval(interval);
  }, [newsArticles]);

  const startIndex = currentIndex * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const displayedArticles = newsArticles.slice(startIndex, endIndex);

  const handleVideoClick = (videoUrl) => {
    const fullVideoUrl = `http://localhost:3000/${videoUrl}`;
    console.log("url",fullVideoUrl);
    setSelectedVideo(fullVideoUrl);
    setShowVideoModal(true); // Show the modal
  };

  const handleCloseVideoModal = () => {
    setShowVideoModal(false); // Hide the modal
  };

  return (
    <>
      <Toaster />
      <Navbar />

      <section className="breaking-news-area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="breaking-news-ticker d-flex flex-wrap align-items-center">
                <div className="title"><h6>Trending</h6></div>
                <div className="marquee-container">
                  <div className="marquee">
                    {newsArticles.length > 0 ? (
                      newsArticles.map((article, index) => (
                        <div key={index} className="marquee-item">
                          <Link to={`/news/${article._id}`} className="trending-news">{article.title}</Link>
                        </div>
                      ))
                    ) : (
                      <div>No trending news available</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-fluid">
        <div className="row">
          {displayedArticles.length > 0 && (
            <>
              <div className="col-md-6">
                <div className="card mb-3" style={{ width: '100%' }}>
                  <Link to={`/news/${displayedArticles[0]._id}`}>
                    <img
                      className="card-img-top"
                      src={`http://localhost:3000/${displayedArticles[0].image}`}
                      alt={displayedArticles[0].title}
                      style={{ width: '699px', height: '552px', objectFit: 'cover' }}
                    />
                  </Link>
                  <div className="card-body">
                    <Link to={`/news/${displayedArticles[0]._id}`}>
                      <h5 className="card-title">{displayedArticles[0].title}</h5>
                    </Link>
                    <p className="card-text">{displayedArticles[0].content}</p>
                  </div>
                  <div className="card-footer">
                    <small className="text-muted">{new Date(displayedArticles[0].date).toLocaleDateString()}</small>
                  </div>
                  {userRole === 'admin' && (
                    <div className="d-flex justify-content-start mt-2">
                      <Link className="btn btn-success me-2" to={`/editnews/${displayedArticles[0]._id}`}>
                        Edit 
                      </Link>
                      <button className="btn btn-danger" onClick={() => handleDelete(displayedArticles[0]._id)}>
                        Delete 
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                {displayedArticles.slice(1, 3).map((article) => (
                  <div key={article._id} className="card mb-3" style={{ width: '100%' }}>
                    <Link to={`/news/${article._id}`}>
                      <img
                        className="card-img-top"
                        src={`http://localhost:3000/${article.image}`}
                        alt={article.title}
                        style={{ width: '699px', height: '264px', objectFit: 'cover' }}
                      />
                    </Link>
                    <div className="card-body">
                      <Link to={`/news/${article._id}`}>
                        <h5 className="card-title">{article.title}</h5>
                      </Link>
                      <p className="card-text">{article.content}</p>
                    </div>
                    <div className="card-footer">
                      <small className="text-muted">{new Date(article.date).toLocaleDateString()}</small>
                    </div>
                    {userRole === 'admin' && (
                      <div className="d-flex justify-content-start mt-2">
                        <Link className="btn btn-success me-2" to={`/editnews/${article._id}`}>
                          Edit 
                        </Link>
                        <button className="btn btn-danger" onClick={() => handleDelete(article._id)}>
                          Delete 
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="video-slideshow py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
            <OwlCarousel
  className="video-slides"
  loop
  margin={50}
  dots={false}
  autoplay
  nav
  navText={[
    '<i class="fa fa-chevron-left"></i>',  // Left arrow icon
    '<i class="fa fa-chevron-right"></i>'  // Right arrow icon
  ]}
  responsive={{
    0: { items: 1 },
    576: { items: 2 },
    992: { items: 3 },
  }}
              >
                {newsArticles.map((article) => (
                  <div className="single-blog-post style-3" key={article._id}>
                    <div className="blog-thumbnail">
                      <a href="#">
                        <img src={`http://localhost:3000/${article.image}`} alt={article.title}
                        style={{ width: '412px', height: '274px', objectFit: 'cover' }} />
                      </a>
                      {article.video && (
                        <a
                          href="#"
                          className="video-btn"
                          onClick={(e) => {
                            e.preventDefault(); // Prevent default link behavior
                            handleVideoClick(article.video);
                            console.log("video----?>", article.video);
                          }}
                        >
                          <FontAwesomeIcon icon={faYoutube} />
                        </a>
                        
                      )}
                      {userRole === 'admin' && (
                    <div className="d-flex justify-content-start mt-2">
                      <Link className="btn btn-success me-2" to={`/editnews/${displayedArticles[0]._id}`}>
                        Edit 
                      </Link>
                      <button className="btn btn-danger" onClick={() => handleDelete(displayedArticles[0]._id)}>
                        Delete 
                      </button>
                    </div>
                  )}
                    </div>
                    <div className="blog-content">
                      <span className="post-date">{new Date(article.date).toLocaleDateString()}</span>
                      <p className="post-title">{article.title}</p>
                      <Link to={`/news/${article._id}`} className="read-more">Read More</Link>

                    </div>
                  </div>
                ))}
              </OwlCarousel>
            </div>
          </div>
        </div>
      </div>

       {/* Video Modal */}
       <VideoModal
        show={showVideoModal}
        handleClose={handleCloseVideoModal}
        videoUrl={selectedVideo}
      />

      {/* Advertisement section */}

      <div className="big-add-area mb-100">
      <span className="text-ad">Advertisement</span>
      <div className="container-fluid">
        {advertisements.length > 0 ? (
          <a
            href={advertisements[addIndex]?.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={`http://localhost:3000/uploads/${advertisements[addIndex]?.image}`}
              alt="Advertisement"
              style={{ width: '1321px', height: '186px', objectFit: 'cover' }}
            />
          </a>
        ) : (
          <p>No advertisements available.</p>
        )}
      </div>
    </div>
    </>
  
  );
};

export default Home;
