import React from 'react';

const NewsCard = ({ news }) => {
  return (
    <div className="single-blog-post style-3">
      <div className="blog-thumbnail">
        <a href="#"><img src={news.image || 'default-image.jpg'} alt={news.title} /></a>
      </div>
      <div className="blog-content">
        <span className="post-date">{new Date(news.date).toLocaleDateString()}</span>
        <p className="post-title">{news.title}</p>
      </div>
    </div>
  );
};

export default NewsCard;
