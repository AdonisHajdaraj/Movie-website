import React from 'react';
import './WatchlistPage.css';

const WatchlistPage = ({ watchlistMovies, onBack, onMovieClick, onRemoveFromWatchlist, userProfile }) => {
  return (
    <div className="watchlist-page">
      <div className="page-header">
        <button className="back-button" onClick={onBack}>
          <i className="fas fa-arrow-left"></i>
          Back to Home
        </button>
        <h1>My Watchlist</h1>
        <p className="page-subtitle">Your personal collection of movies and TV shows</p>
      </div>

      <div className="watchlist-content">
        <div className="watchlist-stats">
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-film"></i>
            </div>
            <div className="stat-info">
              <h3>{watchlistMovies.length}</h3>
              <p>Total Items</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-clock"></i>
            </div>
            <div className="stat-info">
              <h3>{Math.round(watchlistMovies.length * 2.5)}</h3>
              <p>Hours of Content</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-star"></i>
            </div>
            <div className="stat-info">
              <h3>{watchlistMovies.length > 0 ? (watchlistMovies.reduce((acc, movie) => acc + movie.rating, 0) / watchlistMovies.length).toFixed(1) : '0.0'}</h3>
              <p>Average Rating</p>
            </div>
          </div>
        </div>

        {watchlistMovies.length > 0 ? (
          <div className="watchlist-grid">
            {watchlistMovies.map(movie => (
              <div key={movie.id} className="watchlist-item">
                <div className="watchlist-poster" onClick={() => onMovieClick(movie)}>
                  <img src={movie.poster} alt={movie.title} />
                  <div className="watchlist-overlay">
                    <button className="play-btn">
                      <i className="fas fa-play"></i>
                    </button>
                  </div>
                </div>
                <div className="watchlist-info">
                  <h3 onClick={() => onMovieClick(movie)}>{movie.title}</h3>
                  <div className="watchlist-meta">
                    <span>{movie.year}</span>
                    <span>•</span>
                    <span>{movie.duration}</span>
                    <span>•</span>
                    <span className="rating">
                      <i className="fas fa-star"></i> {movie.rating}
                    </span>
                  </div>
                  <p className="watchlist-description">{movie.description?.substring(0, 120)}...</p>
                  <div className="watchlist-actions">
                    <button className="watch-btn" onClick={() => onMovieClick(movie)}>
                      <i className="fas fa-play"></i> Watch Now
                    </button>
                    <button className="remove-btn" onClick={() => onRemoveFromWatchlist(movie.id)}>
                      <i className="fas fa-trash"></i> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-watchlist">
            <div className="empty-content">
              <i className="fas fa-heart"></i>
              <h2>Your watchlist is empty</h2>
              <p>Start adding movies and TV shows to watch later</p>
              <button className="browse-btn" onClick={onBack}>
                <i className="fas fa-compass"></i>
                Browse Content
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchlistPage;