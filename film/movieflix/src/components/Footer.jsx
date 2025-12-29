import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <div className="logo-container">
            <i className="fas fa-film logo-icon"></i>
            <span className="logo-text">MOVIEFLIX</span>
          </div>
          <p className="footer-tagline">Unlimited movies, TV shows, and more.</p>
        </div>
        
        <div className="footer-links">
          <div className="link-column">
            <h4>Get to Know Us</h4>
            <ul>
              <li><a href="#about">About MovieFlix</a></li>
              <li><a href="#jobs">Careers</a></li>
              <li><a href="#press">Press</a></li>
            </ul>
          </div>
          
          <div className="link-column">
            <h4>Help & Support</h4>
            <ul>
              <li><a href="#help">Help Center</a></li>
              <li><a href="#account">Account</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>
          
          <div className="link-column">
            <h4>Watch</h4>
            <ul>
              <li><a href="#movies">Movies</a></li>
              <li><a href="#tv">TV Shows</a></li>
              <li><a href="#originals">Originals</a></li>
            </ul>
          </div>
          
          <div className="link-column">
            <h4>Connect</h4>
            <ul>
              <li><a href="#facebook">Facebook</a></li>
              <li><a href="#twitter">Twitter</a></li>
              <li><a href="#instagram">Instagram</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-legal">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Use</a>
            <a href="#cookies">Cookie Preferences</a>
          </div>
          
          <div className="footer-social">
            <a href="#facebook" className="social-icon">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#twitter" className="social-icon">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#instagram" className="social-icon">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
          
          <div className="footer-copyright">
            <p>&copy; 2024 MovieFlix. All rights reserved.</p>
            <p className="disclaimer">This is a demo Netflix clone for educational purposes.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;