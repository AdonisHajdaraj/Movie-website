// src/components/Hero.jsx
import React from "react";
import "./Hero.css";

const Hero = ({ movie, onPlayClick }) => {
  return (
    <section className="hero">
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
            <span className="meta-badge rating">
              ⭐ {movie.rating}
            </span>
            <span className="meta-badge year">{movie.year}</span>
            <span className="meta-badge duration">{movie.duration}</span>
          </div>

          <p className="hero-description">
            {movie.description}
          </p>

          <div className="hero-details">
            <div className="detail-item">
              <span className="detail-label">Genre</span>
              <span className="detail-value">{movie.genre}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Regjisori</span>
              <span className="detail-value">{movie.director}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Kasti</span>
              <span className="detail-value">
                {movie.cast}
              </span>
            </div>

            
          </div>

          <div className="hero-actions">
            <button className="play-btn" onClick={onPlayClick}>
              ▶ 
            </button>

            <button className="info-btn">
               Më Shumë Info
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
