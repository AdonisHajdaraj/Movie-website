import React, { useState } from 'react';
import './ProfilePage.css';

const ProfilePage = ({ user, onLogout, onBack, watchlistMovies, onMovieClick, onRemoveFromWatchlist }) => {
  const [activeTab, setActiveTab] = useState('watchlist');

  const getWatchlistMovies = () => {
    if (!user?.watchlist || !watchlistMovies) return [];
    
    const allMovies = Object.values(watchlistMovies).flat();
    return allMovies.filter(movie => user.watchlist.includes(movie.id));
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <button className="back-button" onClick={onBack}>
          <i className="fas fa-arrow-left"></i>
          Back to Home
        </button>
        <h1>My Profile</h1>
      </div>

      <div className="profile-content">
        <div className="profile-sidebar">
          <div className="profile-card">
            <div className="profile-avatar">
              <img src={user?.avatar || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"} alt="Profile" />
            </div>
            <h2>{user?.name || 'Guest User'}</h2>
            <p className="profile-email">{user?.email || 'guest@example.com'}</p>
            <p className="profile-membership">Premium Member</p>
            
            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-value">{user?.watchlist?.length || 0}</span>
                <span className="stat-label">Movies in Watchlist</span>
              </div>
            </div>
          </div>

          <div className="profile-menu">
            <button 
              className={`menu-item ${activeTab === 'watchlist' ? 'active' : ''}`}
              onClick={() => setActiveTab('watchlist')}
            >
              <i className="fas fa-heart"></i>
              My Watchlist
              <span className="menu-badge">{user?.watchlist?.length || 0}</span>
            </button>
            <button className="menu-item logout" onClick={onLogout}>
              <i className="fas fa-sign-out-alt"></i>
              Sign Out
            </button>
          </div>
        </div>

        <div className="profile-main">
          {activeTab === 'watchlist' && (
            <div className="watchlist-section">
              <h2>My Watchlist</h2>
              {getWatchlistMovies().length > 0 ? (
                <div className="watchlist-grid">
                  {getWatchlistMovies().map(movie => (
                    <div key={movie.id} className="watchlist-item">
                      <img src={movie.poster} alt={movie.title} />
                      <div className="watchlist-item-info">
                        <h3>{movie.title}</h3>
                        <div className="watchlist-meta">
                          <span>{movie.year}</span>
                          <span>•</span>
                          <span>{movie.duration}</span>
                          <span>•</span>
                          <span className="rating">
                            <i className="fas fa-star"></i> {movie.rating}
                          </span>
                        </div>
                        <p>{movie.description?.substring(0, 100)}...</p>
                        <div className="watchlist-actions">
                          <button className="play-btn" onClick={() => onMovieClick(movie)}>
                            <i className="fas fa-play"></i> Play
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
                  <i className="fas fa-heart"></i>
                  <h3>Your watchlist is empty</h3>
                  <p>Add movies and TV shows to your watchlist to watch later</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;