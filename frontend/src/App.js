import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home/home';


import Mars from './pages/mars/mars';
import Gallery from './pages/gallery/gallery'
import './App.css';
import NavBar from './pages/nav';
function App() {
  return (
    <Router>
      <div className="content">

        <Routes>
         
          <Route path="/gallery" element={<Gallery />} /> {/* You might want to update this to point to an actual Profile component */}
          <Route path="/mars" element={<Mars />} />
        
          <Route path="/" element={<Home />} />
          
        </Routes>
      </div>  
    </Router>
  );
}

export default App;
