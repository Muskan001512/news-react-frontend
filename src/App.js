import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Register from  './Components/Register';
import Footer from './Components/Footer';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        

        </Routes>
        
        <Footer/>
      </div>
    </Router>
  );
}

export default App;


