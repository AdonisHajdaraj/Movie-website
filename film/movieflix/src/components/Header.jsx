import React from 'react';
import './Hero.css';

const Hero = ({ movie, onPlayClick }) => {
  const handleInfoClick = () => {
    onPlayClick();
  };

  return (
    <section className="hero">
      <div 
        className="hero-background"
        style={{ backgroundImage: `linear-gradient(to right, rgba(20, 20, 20, 0.9) 0%, rgba(20, 20, 20, 0.6) 50%, rgba(20, 20, 20, 0.2) 100%), url(${movie.background || movie.poster})` }}
      >
        <div className="hero-content">
          <div className="hero-info">
            <h1 className="hero-title">{movie.title}</h1>
            
            <div className="hero-meta">
              <div className="meta-badge rating">
                <i className="fas fa-star"></i>
                <span>{movie.rating}</span>
              </div>
              <div className="meta-badge year">{movie.year}</div>
              <div className="meta-badge duration">{movie.duration}</div>
              <div className="meta-badge age-rating">{movie.ageRating}</div>
            </div>
            
            <p className="hero-description">{movie.description}</p>
            
            <div className="hero-details">
              <div className="detail-item">
                <span className="detail-label">Director:</span>
                <span className="detail-value">{movie.director}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Cast:</span>
                <span className="detail-value">{movie.cast?.join(', ')}</span>
              </div>
            </div>
            
            <div className="hero-actions">
              <button className="play-btn" onClick={onPlayClick}>
                <i className="fas fa-play"></i>
                <span>Play Now</span>
              </button>
              <button className="info-btn" onClick={handleInfoClick}>
                <i className="fas fa-info-circle"></i>
                <span>More Info</span>
              </button>
            </div>
          </div>
          
          <div className="hero-poster">
            <img src={movie.poster} alt={movie.title} />
            <div className="poster-badge">
              <i className="fas fa-crown"></i>
              <span>#1 Trending</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;