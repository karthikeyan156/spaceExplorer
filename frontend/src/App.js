import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home/home';
import About from './pages/about/about';
import Contact from './pages/contact/contact';
import Paper from './pages/paper/paper';
import Login from './pages/login/login';
import PaperDetails from './pages/paper/paperDetails';
import Profile from './pages/profile/profile'
import './App.css';
import NavBar from './pages/nav';
function App() {
  return (
    <Router>
      <div className="content">

        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} /> {/* You might want to update this to point to an actual Profile component */}
          <Route path="/papers" element={<Paper />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/" element={<Home />} />
          <Route path="/paperDetails/:paperId" element={<PaperDetails />} />
        </Routes>
      </div>  
    </Router>
  );
}

export default App;
