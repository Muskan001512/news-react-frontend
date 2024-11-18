import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { setCookie, getCookie, removeCookie } from '../utility/cookieUtils';



const CategoryPage = () => {
  const { category } = useParams();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const user = getCookie('user');
    if (user) {
     
      setUserName(user.username);
      
    }
  });

  useEffect(() => {
    const fetchNewsByCategory = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/news/getnews/category/${category}`);
        console.log("API Response:",response, response.data); // Check this in the console
        console.log("cat-name",`${category}`);
        setNews(response.data);
      } catch (error) {
        console.error('Error fetching news by category:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchNewsByCategory();
  }, [category]);
  

  if (loading) {
    return <div>Loading...</div>;
  }

 return (
    <div>
      <Navbar/>
      <div className="top-news-area section-padding-100">
        <div className="container">
          <div className="row">
            
            {news.length > 0 ? (
              news.map((article) => (
                <div key={article._id} className="col-12 col-sm-6 col-lg-4">
                  <div className="single-blog-post style-2 mb-5">
                    {/* Blog Thumbnail */}
                    <div className="blog-thumbnail">
                    <Link to={`/news/${article._id}`}><img src={`http://localhost:3000/${article.image}`} alt={article.title} 
                       style={{ width: '416px',  height: '277px', objectFit: 'cover' }}
                       /></Link>
                    </div>

                    {/* Blog Content */}
                    <div className="blog-content">
                      <span className="post-date">{new Date(article.date).toLocaleDateString()}</span>
                      <Link to={`/news/${article._id}`} className="post-title">{article.title}</Link>
                     
                  {/* <Link className="post-author" >By {userName}</Link> */}
                
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No news articles available for this category.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
