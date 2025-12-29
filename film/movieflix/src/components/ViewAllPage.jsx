import React from 'react';
import './ViewAllPage.css';

const ViewAllPage = ({ category, movies, onBack, onMovieClick }) => {
  const getCategoryTitle = (cat) => {
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  return (
    <div className="view-all-page">
      <div className="view-all-header">
        <button className="back-button" onClick={onBack}>
          <i className="fas fa-arrow-left"></i>
          Back to Home
        </button>
        <h1>{getCategoryTitle(category)}</h1>
        <p className="movies-count">{movies.length} movies & TV shows</p>
      </div>

      {movies.length > 0 ? (
        <div className="view-all-grid">
          {movies.map(movie => (
            <div 
              key={movie.id} 
              className="movie-card-large"
              onClick={() => onMovieClick(movie)}
            >
              <div className="movie-poster-large">
                <img src={movie.poster} alt={movie.title} />
                <div className="movie-overlay-large">
                  <button className="play-btn-large">
                    <i className="fas fa-play"></i>
                  </button>
                </div>
              </div>
              <div className="movie-info-large">
                <h3>{movie.title}</h3>
                <div className="movie-meta-large">
                  <span className="year">{movie.year}</span>
                  <span>•</span>
                  <span className="duration">{movie.duration}</span>
                  <span>•</span>
                  <span className="rating">
                    <i className="fas fa-star"></i> {movie.rating}
                  </span>
                </div>
                <p className="movie-description">{movie.description?.substring(0, 150)}...</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-results">
          <i className="fas fa-film"></i>
          <h2>No movies found</h2>
          <p>Try browsing other categories</p>
        </div>
      )}
    </div>
  );
};

export default ViewAllPage;