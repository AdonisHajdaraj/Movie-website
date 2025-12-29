import React from 'react';
import MovieRow from './MovieRow';
import './TVShowsPage.css';

const TVShowsPage = ({ tvShowsData, onBack, onMovieClick, onViewAll }) => {
  return (
    <div className="tvshows-page">
      <div className="page-header">
        <button className="back-button" onClick={onBack}>
          <i className="fas fa-arrow-left"></i>
          Back to Home
        </button>
        <h1>TV Shows</h1>
        <p className="page-subtitle">Browse all TV shows available on MovieFlix</p>
      </div>

      <div className="tvshows-content">
        <div className="categories-section">
          <div className="categories-header">
            <h2>TV Show Categories</h2>
            <div className="categories-grid">
              <div className="category-card" onClick={() => onViewAll('popularTV')}>
                <div className="category-icon popular">
                  <i className="fas fa-tv"></i>
                </div>
                <h3>Popular</h3>
                <p>Most watched TV shows</p>
              </div>
              <div className="category-card" onClick={() => onViewAll('dramaTV')}>
                <div className="category-icon drama">
                  <i className="fas fa-theater-masks"></i>
                </div>
                <h3>Drama</h3>
                <p>Emotional TV series</p>
              </div>
            </div>
          </div>
        </div>

        <div className="tvshows-sections">
          {Object.entries(tvShowsData).map(([category, shows]) => (
            shows.length > 0 && (
              <MovieRow
                key={category}
                title={category === 'popularTV' ? 'Popular TV Shows' : 'Drama TV Shows'}
                movies={shows}
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

export default TVShowsPage;