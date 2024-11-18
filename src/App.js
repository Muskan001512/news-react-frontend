import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
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
import CategoryPage from './pages/CategoryPage';
import CategoryList from './pages/CategoryList';
import CreateCategoryModel from './pages/CreateCategoryModal';
import '@fortawesome/fontawesome-free/css/all.min.css';
import CreateAdvertise from './pages/CreateAdvertise';
import About from './Components/About'
import NoteState from './Context/Notes/NoteState';

function App() {
  return (
    <>
    <NoteState>
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
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/categorylist" element={<CategoryList />} />
          <Route path="/create-category" element={<CreateCategoryModel />} />
          <Route path="/createadvertise" element={<CreateAdvertise />} />
          <Route path="/about" element={<About />} />

</Routes>
        <Footer/>
      </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;


