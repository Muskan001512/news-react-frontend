import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from './Navbar';
import { useParams, useNavigate } from 'react-router-dom';

const Profile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/users/user/${userId}`);
        setUser(response.data.data);
        const imageUrl = response.data.data.profileImage ? `http://localhost:3000/${response.data.data.profileImage}` : '';
        setProfileImageUrl(imageUrl);
        setIsImageUploaded(Boolean(response.data.data.profileImage));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to fetch user data');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleEditProfileClick = () => {
    navigate(`/edit-profile/${userId}`);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('username', user.username);
      formData.append('password', user.password);
      formData.append('phone', user.phone);
      formData.append('email', user.email);
      formData.append('role', user.role);
      formData.append('profileImage', file);

      try {
        const response = await axios.put(`http://localhost:3000/api/users/userupdate/${userId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        setProfileImageUrl(`http://localhost:3000/${response.data.data.profileImage}`);
        setIsImageUploaded(true);
        toast.success('Profile updated successfully!');
      } catch (error) {
        console.error('Error updating profile:', error);
        toast.error('Failed to update profile.');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <>
      <Toaster />
      <Navbar />
      <div className="container emp-profile">
        <form method="post">
          <div className="row">
            <div className="col-md-4">
            <div className="profile-img">
                {isImageUploaded ? (
                  <>
                    <img
                      src={profileImageUrl}
                      alt="Profile"
                      style={{ width: '291px', height: '194px', objectFit: 'cover' }}
                    />
                    <div className="file btn btn-lg btn-primary">
                      Change Photo
                      <input type="file" name="file" onChange={handleFileChange} />
                    </div>
                  </>
                ) : (
                  <>
                    <p>Please upload a profile image.</p>
                    <div className="file btn btn-lg btn-primary">
                      Upload Photo
                      <input type="file" name="file" onChange={handleFileChange} />
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="profile-head">
                <h5>{user?.username || 'N/A'}</h5>
                <h6>{user?.role || 'N/A'}</h6>
                <p className="proile-rating">RANKINGS : <span>8/10</span></p>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Timeline</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-2">
            <button className="profile-edit-btn" onClick={handleEditProfileClick}>Edit Profile</button>
          </div>
        </div>
          <div className="row">
            <div className="col-md-4">
              <div className="profile-work">
                <p>WORK LINK</p>
                <a href="#">Website Link</a><br />
                <a href="#">Bootsnipp Profile</a><br />
                <a href="#">Bootply Profile</a>
                <p>SKILLS</p>
                <a href="#">Web Designer</a><br />
                <a href="#">Web Developer</a><br />
                <a href="#">WordPress</a><br />
                <a href="#">WooCommerce</a><br />
                <a href="#">PHP, .Net</a><br />
              </div>
            </div>
            <div className="col-md-8">
              <div className="tab-content profile-tab" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                  <div className="row">
                    <div className="col-md-6">
                      <label>User Id</label>
                    </div>
                    <div className="col-md-6">
                      <p>{user?._id || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Name</label>
                    </div>
                    <div className="col-md-6">
                      <p>{user?.username || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Email</label>
                    </div>
                    <div className="col-md-6">
                      <p>{user?.email || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Phone</label>
                    </div>
                    <div className="col-md-6">
                      <p>{user?.phone || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Role</label>
                    </div>
                    <div className="col-md-6">
                      <p>{user?.role || 'N/A'}</p>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                  <div className="row">
                    <div className="col-md-6">
                      <label>Experience</label>
                    </div>
                    <div className="col-md-6">
                      <p>Expert</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Hourly Rate</label>
                    </div>
                    <div className="col-md-6">
                      <p>10$/hr</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Total Projects</label>
                    </div>
                    <div className="col-md-6">
                      <p>230</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>English Level</label>
                    </div>
                    <div className="col-md-6">
                      <p>Expert</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Availability</label>
                    </div>
                    <div className="col-md-6">
                      <p>6 months</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <label>Your Bio</label><br />
                      <p>Your detail description</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
