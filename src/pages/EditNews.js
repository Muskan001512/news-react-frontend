import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { getCookie,setCookie } from '../utility/cookieUtils';
import { Toaster, toast } from "react-hot-toast";
import Navbar from '../Components/Navbar';

const EditNews = () => {
    const navigate = useNavigate();
    const { articleId } = useParams();
    
    const titleRef = useRef(null);
    const imageRef = useRef(null);
    const videoRef = useRef(null);
    const descriptionRef = useRef(null);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [existingPost, setExistingPost] = useState(null);
    const [video, setVideo] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/news/getnews/${ articleId}`, {
                    headers: {
                        'Authorization': `Bearer ${getCookie('accessToken')}`
                    }
                });
                const post = response.data; // Adjust based on your response structure
                setExistingPost(post);
                setTitle(post.title);
                console.log("Fetched post:", post); // Debugging line
            } catch (error) {
                console.error('Error fetching post:', error);
                toast.error("Failed to load post");
            }
        };

        fetchPost();
    }, [ articleId]);

    useEffect(() => {
        const focusFields = async () => {
            if (titleRef.current) {
                titleRef.current.focus();
            }
        };

        focusFields();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const accessToken = getCookie('accessToken');
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            if (image) formData.append('image', image);
            if (video) formData.append('video', video);

            console.log('Submitting form with data:', formData); // Debugging line

            const response = await axios.put(`http://localhost:3000/api/news/newsupdate/${ articleId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            console.log('Update response:', response.data); // Debugging line
            toast.success("News article updated successfully");
            navigate('/');
        } catch (error) {
            console.error('Error updating post:', error);
            toast.error("Failed to update post");
        }
    };

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
                                    <div className="card-body p-5 edit-card">
                                        <h2 className="text-uppercase text-center mb-5">Edit News</h2>
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-outline mb-4">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    required
                                                    placeholder="Title"
                                                    value={title}
                                                    onChange={(e) => setTitle(e.target.value)}
                                                    ref={titleRef}
                                                />
                                            </div>
                                            {existingPost && existingPost.description && (
                                            <div className="form-outline mb-4">
    <textarea
      className="form-control form-control-lg"
      required
      placeholder="Description"
      value={existingPost.description}
      onChange={(e) => setDescription(e.target.value)}
      rows="4" // Adjust the number of rows as needed
      ref={descriptionRef}
    />
  </div>
                                            )}
                                           {existingPost && existingPost.image && (
  <div className="mb-4">
    <label className="form-label">Current Image</label>
    <div>
      <img
        src={`http://localhost:3000/${existingPost.image}`}
        alt="Current"
        style={{ width: '100%', maxHeight: '100px', objectFit: 'cover' }}
      />
      <p>Current file name: {existingPost.image.split('/').pop()}</p>
    </div>
  </div>
)}

<div className="form-outline mb-4">
  <input
    type="file"
    className="form-control"
    accept="image/*"
    onChange={(e) => setImage(e.target.files[0])}
    ref={imageRef}
  />
  <p className="mt-2">Choose a new image if you want to update it.</p>
</div>

{existingPost && existingPost.video && (
  <div className="mb-4">
    <label className="form-label">Current Video</label>
    <div>
      <p>Current file name: {existingPost.video.split('/').pop()}</p>
    </div>
  </div>
)}

<div className="form-outline mb-4">
  <input
    type="file"
    className="form-control"
    accept="video/*"
    onChange={(e) => setVideo(e.target.files[0])}
    ref={videoRef}
  />
  <p className="mt-2">Choose a new video if you want to update it.</p>
</div>



                                            <div className="d-flex justify-content-center">
                                                <button type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Edit News</button>
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

export default EditNews;
