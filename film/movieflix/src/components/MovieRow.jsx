import React, { useState, useRef } from 'react';
import './MovieRow.css';

const MovieRow = ({ title, movies, onMovieClick, onViewAll }) => {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const rowRef = useRef(null);

  const scrollLeft = () => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <div className="movie-row">
      <div className="row-header">
        <h2 className="row-title">{title}</h2>
        <button className="view-all" onClick={onViewAll}>
          View All <i className="fas fa-chevron-right"></i>
        </button>
      </div>
      
      <div className="row-container">
        {showLeftArrow && (
          <button className="scroll-btn left" onClick={scrollLeft}>
            <i className="fas fa-chevron-left"></i>
          </button>
        )}
        
        <div 
          className="movie-row-container" 
          ref={rowRef}
          onScroll={handleScroll}
        >
          {movies.map((movie) => (
            <div 
              key={movie.id} 
              className="movie-card"
              onClick={() => onMovieClick(movie)}
            >
              <div className="movie-poster">
                <img src={movie.poster} alt={movie.title} />
                <div className="movie-overlay">
                  <button className="play-overlay-btn">
                    <i className="fas fa-play"></i>
                  </button>
                </div>
              </div>
              <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>
                <div className="movie-meta">
                  <span className="rating">
                    <i className="fas fa-star"></i> {movie.rating}
                  </span>
                  <span>{movie.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {showRightArrow && (
          <button className="scroll-btn right" onClick={scrollRight}>
            <i className="fas fa-chevron-right"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieRow;