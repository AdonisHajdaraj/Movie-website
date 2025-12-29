import React from 'react';
import MovieRow from './MovieRow';
import './MoviesPage.css';

const MoviesPage = ({ moviesData, onBack, onMovieClick, onViewAll }) => {
  // Filter only movies (not TV shows)
  const movieCategories = {
    trending: moviesData.trending?.filter(m => !m.type || m.type !== 'tv') || [],
    action: moviesData.action || [],
    comedy: moviesData.comedy || [],
    drama: moviesData.drama || [],
    sciFi: moviesData.sciFi || []
  };

  return (
    <div className="movies-page">
      <div className="page-header">
        <button className="back-button" onClick={onBack}>
          <i className="fas fa-arrow-left"></i>
          Back to Home
        </button>
        <h1>Movies</h1>
        <p className="page-subtitle">Browse all movies available on MovieFlix</p>
      </div>

      <div className="movies-content">
        <div className="categories-section">
          <div className="categories-header">
            <h2>Movie Categories</h2>
            <div className="categories-grid">
              <div className="category-card" onClick={() => onViewAll('trending')}>
                <div className="category-icon trending">
                  <i className="fas fa-fire"></i>
                </div>
                <h3>Trending</h3>
                <p>Most popular movies right now</p>
              </div>
              <div className="category-card" onClick={() => onViewAll('action')}>
                <div className="category-icon action">
                  <i className="fas fa-explosion"></i>
                </div>
                <h3>Action</h3>
                <p>Thrilling adventures</p>
              </div>
              <div className="category-card" onClick={() => onViewAll('comedy')}>
                <div className="category-icon comedy">
                  <i className="fas fa-laugh"></i>
                </div>
                <h3>Comedy</h3>
                <p>Laugh out loud movies</p>
              </div>
              <div className="category-card" onClick={() => onViewAll('drama')}>
                <div className="category-icon drama">
                  <i className="fas fa-theater-masks"></i>
                </div>
                <h3>Drama</h3>
                <p>Emotional stories</p>
              </div>
            </div>
          </div>
        </div>

        <div className="movies-sections">
          {Object.entries(movieCategories).map(([category, movies]) => (
            movies.length > 0 && (
              <MovieRow
                key={category}
                title={category.charAt(0).toUpperCase() + category.slice(1)}
                movies={movies}
                onMovieClick={onMovieClick}
                onViewAll={() => onViewAll(category)}
              />
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviesPage;