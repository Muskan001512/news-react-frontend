import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
// import Navbar from './Components/Navbar';
import Register from  './Components/Register';
import Footer from './Components/Footer';
import CreateNews from './pages/CreateNews';
import EditNews from './pages/EditNews';
import Profile from './Components/Profile';
import EditProfile from './pages/EditProfile';
import NewsDetail from './pages/NewsDetail';

function App() {
  return (
    <Router>
      <div>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/createnews" element={<CreateNews />} />
          <Route path="/editnews/:articleId" element={<EditNews />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/edit-profile/:userId" element={<EditProfile />} />
          <Route path="/news/:articleId" element={<NewsDetail />} />
</Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;


