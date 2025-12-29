import React, { useEffect } from 'react';
import './MovieModal.css';

const MovieModal = ({ movie, onClose, onAddToWatchlist, isInWatchlist, onRemoveFromWatchlist }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!movie) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        
        <div className="modal-header" style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.5)), url(${movie.background || movie.poster})` }}>
          <div className="modal-header-content">
            <h2 className="modal-title">{movie.title}</h2>
            <div className="modal-meta">
              <span className="modal-rating">
                <i className="fas fa-star"></i> {movie.rating}
              </span>
              <span>{movie.year}</span>
              <span>{movie.duration}</span>
              <span className="modal-age-rating">{movie.ageRating}</span>
            </div>
          </div>
        </div>
        
        <div className="modal-body">
          <div className="modal-poster">
            <img src={movie.poster} alt={movie.title} />
          </div>
          
          <div className="modal-details">
            <p className="modal-description">{movie.description}</p>
            
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Director:</span>
                <span className="detail-value">{movie.director}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Cast:</span>
                <span className="detail-value">{movie.cast?.join(', ')}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Genre:</span>
                <span className="detail-value">{movie.genre}</span>
              </div>
            </div>
            
            <div className="modal-actions">
              <button className="modal-play-btn">
                <i className="fas fa-play"></i>
                <span>Play Now</span>
              </button>
              <button className="modal-trailer-btn">
                <i className="fas fa-play-circle"></i>
                <span>Watch Trailer</span>
              </button>
              {isInWatchlist ? (
                <button className="modal-remove-btn" onClick={onRemoveFromWatchlist}>
                  <i className="fas fa-check"></i>
                  <span>In Watchlist</span>
                </button>
              ) : (
                <button className="modal-add-btn" onClick={onAddToWatchlist}>
                  <i className="fas fa-plus"></i>
                  <span>Add to Watchlist</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;