import React from 'react';
import MovieRow from './MovieRow';
import './NewPopularPage.css';

const NewPopularPage = ({ newPopularData, onBack, onMovieClick, onViewAll }) => {
  return (
    <div className="newpopular-page">
      <div className="page-header">
        <button className="back-button" onClick={onBack}>
          <i className="fas fa-arrow-left"></i>
          Back to Home
        </button>
        <h1>New & Popular</h1>
        <p className="page-subtitle">Discover the latest releases and trending content</p>
      </div>

      <div className="newpopular-content">
        <div className="hero-section">
          <div className="hero-info">
            <h2>Trending Now</h2>
            <p>What everyone is watching this week</p>
            <div className="trending-stats">
              <div className="stat">
                <i className="fas fa-eye"></i>
                <span>1.2M views this week</span>
              </div>
              <div className="stat">
                <i className="fas fa-heart"></i>
                <span>850K likes</span>
              </div>
            </div>
          </div>
        </div>

        <div className="new-releases-section">
          <h2>New Releases</h2>
          <p className="section-subtitle">Fresh content added recently</p>
          
          <div className="releases-grid">
            {newPopularData.latest?.map((item, index) => (
              <div 
                key={item.id} 
                className={`release-card ${index === 0 ? 'featured' : ''}`}
                onClick={() => onMovieClick(item)}
              >
                <div className="release-poster">
                  <img src={item.poster} alt={item.title} />
                  {item.isNew && (
                    <div className="new-badge">
                      <i className="fas fa-star"></i> NEW
                    </div>
                  )}
                  <div className="release-overlay">
                    <button className="play-btn">
                      <i className="fas fa-play"></i>
                    </button>
                  </div>
                </div>
                <div className="release-info">
                  <h3>{item.title}</h3>
                  <div className="release-meta">
                    <span>{item.year}</span>
                    <span>•</span>
                    <span>{item.duration}</span>
                    <span>•</span>
                    <span className="rating">
                      <i className="fas fa-star"></i> {item.rating}
                    </span>
                  </div>
                  <p className="release-description">{item.description?.substring(0, 100)}...</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {newPopularData.latest && newPopularData.latest.length > 0 && (
          <MovieRow
            title="Latest Releases"
            movies={newPopularData.latest}
            onMovieClick={onMovieClick}
            onViewAll={() => onViewAll('latest')}
          />
        )}
      </div>
    </div>
  );
};

export default NewPopularPage;