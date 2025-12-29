// src/components/Hero.jsx
import React from 'react';
import './Hero.css';

const Hero = ({ movie, onPlayClick }) => {
  return (
    <div className="hero">
      <div 
        className="hero-background"
        style={{ backgroundImage: `url(${movie.background})` }}
      >
        <div className="hero-gradient"></div>
      </div>
      
      <div className="hero-content">
        <div className="hero-info">
          <h1 className="hero-title">{movie.title}</h1>
          <div className="hero-meta">
            <span className="rating">
              <i className="fas fa-star"></i> {movie.rating}
            </span>
            <span>{movie.year}</span>
            <span>{movie.duration}</span>
          </div>
          <p className="hero-description">{movie.description}</p>
          <div className="hero-actions">
            <button className="play-btn" onClick={onPlayClick}>
              <i className="fas fa-play"></i> Shiko Tani
            </button>
            <button className="info-btn">
              <i className="fas fa-info-circle"></i> Më Shumë Informacion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;