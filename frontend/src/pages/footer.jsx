import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css'; // Path to your Footer CSS

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <p>International Science and Technology Society<br/>1, Dublin 1, Ireland - AZ5DF70</p>
      </div>
      <div className="footer-center">
        <p>OUR PARTNERS<br/>GOOGLE, AMAZON R&D, IEEE</p>
      </div>
      <div className="footer-right">
        <Link to="//facebook.com" target="_blank"><img src="/path-to-facebook-logo.png" alt="Facebook" /></Link>
        <Link to="//twitter.com" target="_blank"><img src="/path-to-twitter-logo.png" alt="Twitter" /></Link>
        <Link to="//instagram.com" target="_blank"><img src="/path-to-instagram-logo.png" alt="Instagram" /></Link>
      </div>
    </footer>
  );
};

export default Footer;
