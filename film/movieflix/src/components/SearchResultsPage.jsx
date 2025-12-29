import React from 'react';
import './SearchResultsPage.css';

const SearchResultsPage = ({ query, results, onBack, onMovieClick }) => {
  return (
    <div className="search-results-page">
      <div className="search-results-header">
        <button className="back-button" onClick={onBack}>
          <i className="fas fa-arrow-left"></i>
          Back to Home
        </button>
        <h1>Search Results for "{query}"</h1>
        <p className="results-count">{results.length} {results.length === 1 ? 'result' : 'results'} found</p>
      </div>

      {results.length > 0 ? (
        <div className="search-results-grid">
          {results.map(movie => (
            <div 
              key={movie.id} 
              className="search-result-card"
              onClick={() => onMovieClick(movie)}
            >
              <div className="result-poster">
                <img src={movie.poster} alt={movie.title} />
                <div className="result-overlay">
                  <button className="play-btn-result">
                    <i className="fas fa-play"></i>
                  </button>
                </div>
              </div>
              <div className="result-info">
                <h3>{movie.title}</h3>
                <div className="result-meta">
                  <span>{movie.year}</span>
                  <span>•</span>
                  <span>{movie.duration}</span>
                  <span>•</span>
                  <span className="rating">
                    <i className="fas fa-star"></i> {movie.rating}
                  </span>
                </div>
                <p className="result-description">{movie.description?.substring(0, 120)}...</p>
                <div className="result-details">
                  <span className="detail">
                    <i className="fas fa-film"></i> {movie.genre}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-search-results">
          <i className="fas fa-search"></i>
          <h2>No results found for "{query}"</h2>
          <p>Try searching for something else</p>
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;