import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';

const Navbar = ({ 
  onSearch, 
  onNotificationClick, 
  onProfileClick, 
  isAuthenticated, 
  userProfile,
  currentView,
  onHomeClick,
  onMoviesClick,
  onTVShowsClick,
  onNewPopularClick,
  onWatchlistClick
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput);
      setSearchInput('');
      setSearchOpen(false);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    onSearch(value);
  };

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
    if (!searchOpen) {
      setTimeout(() => {
        document.querySelector('.search-input')?.focus();
      }, 100);
    } else {
      setSearchInput('');
      onSearch('');
    }
  };

  const handleProfileToggle = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const handleNavItemClick = (view) => {
    switch(view) {
      case 'home':
        onHomeClick();
        break;
      case 'movies':
        onMoviesClick();
        break;
      case 'tvShows':
        onTVShowsClick();
        break;
      case 'newPopular':
        onNewPopularClick();
        break;
      case 'watchlist':
        onWatchlistClick();
        break;
      default:
        onHomeClick();
    }
    setMobileMenuOpen(false);
  };

  const isActive = (view) => {
    return currentView === view ? 'active' : '';
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo" onClick={() => handleNavItemClick('home')} style={{ cursor: 'pointer' }}>
          <div className="logo-container">
            <i className="fas fa-film logo-icon"></i>
            <span className="logo-text">MOVIEFLIX</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-links">
          <ul className="nav-menu">
            <li className="nav-item">
              <button 
                className={`nav-link ${isActive('home')}`}
                onClick={() => handleNavItemClick('home')}
              >
                <i className="fas fa-home"></i>
                <span>Home</span>
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${isActive('movies')}`}
                onClick={() => handleNavItemClick('movies')}
              >
                <i className="fas fa-film"></i>
                <span>Movies</span>
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${isActive('tvShows')}`}
                onClick={() => handleNavItemClick('tvShows')}
              >
                <i className="fas fa-tv"></i>
                <span>TV Shows</span>
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${isActive('newPopular')}`}
                onClick={() => handleNavItemClick('newPopular')}
              >
                <i className="fas fa-bolt"></i>
                <span>New & Popular</span>
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${isActive('watchlist')}`}
                onClick={() => handleNavItemClick('watchlist')}
              >
                <i className="fas fa-heart"></i>
                <span>My List</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Right Side Actions */}
        <div className="navbar-actions">
          {/* Search Bar */}
          <div className={`search-container ${searchOpen ? 'active' : ''}`}>
            <form onSubmit={handleSearchSubmit} className="search-form">
              <button 
                type="button"
                className="search-toggle" 
                onClick={handleSearchToggle}
              >
                <i className={`fas ${searchOpen ? 'fa-times' : 'fa-search'}`}></i>
              </button>
              <input 
                type="text" 
                className="search-input" 
                placeholder="Search movies..."
                value={searchInput}
                onChange={handleSearchChange}
              />
            </form>
          </div>

          {/* Notifications */}
          <div className="notifications">
            <button className="notification-btn" onClick={onNotificationClick}>
              <i className="fas fa-bell"></i>
            </button>
          </div>

          {/* Profile Dropdown */}
          <div className="profile-dropdown" ref={profileRef}>
            <button className="profile-btn" onClick={handleProfileToggle}>
              {isAuthenticated && userProfile ? (
                <img 
                  src={userProfile.avatar || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"} 
                  alt="Profile" 
                  className="profile-img"
                />
              ) : (
                <div className="profile-placeholder">
                  <i className="fas fa-user"></i>
                </div>
              )}
              <i className="fas fa-chevron-down"></i>
            </button>
            
            {profileDropdownOpen && (
              <div className="dropdown-menu">
                {isAuthenticated && userProfile ? (
                  <>
                    <div className="dropdown-profile-info">
                      <img 
                        src={userProfile.avatar || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"} 
                        alt="Profile" 
                        className="dropdown-profile-img"
                      />
                      <div>
                        <h4>{userProfile.name}</h4>
                        <p>{userProfile.email}</p>
                      </div>
                    </div>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item" onClick={() => { onProfileClick(); setProfileDropdownOpen(false); }}>
                      <i className="fas fa-user"></i>
                      <span>Profile</span>
                    </button>
                    <button className="dropdown-item" onClick={() => { handleNavItemClick('watchlist'); setProfileDropdownOpen(false); }}>
                      <i className="fas fa-heart"></i>
                      <span>My Watchlist</span>
                      <span className="badge">{userProfile.watchlist?.length || 0}</span>
                    </button>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item" onClick={() => { onProfileClick(); setProfileDropdownOpen(false); }}>
                      <i className="fas fa-sign-out-alt"></i>
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button className="dropdown-item" onClick={() => { onProfileClick(); setProfileDropdownOpen(false); }}>
                      <i className="fas fa-sign-in-alt"></i>
                      <span>Sign In</span>
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <div className="mobile-menu-header">
            {isAuthenticated && userProfile ? (
              <div className="mobile-profile" onClick={() => { onProfileClick(); setMobileMenuOpen(false); }}>
                <img 
                  src={userProfile.avatar || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&q=80"} 
                  alt="Profile" 
                />
                <div>
                  <h4>{userProfile.name}</h4>
                  <p>Premium Member</p>
                </div>
              </div>
            ) : (
              <div className="mobile-profile" onClick={() => { onProfileClick(); setMobileMenuOpen(false); }}>
                <div className="mobile-profile-placeholder">
                  <i className="fas fa-user"></i>
                </div>
                <div>
                  <h4>Guest User</h4>
                  <p>Sign in to access features</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="mobile-menu-content">
            <button className={`mobile-menu-item ${isActive('home')}`} onClick={() => handleNavItemClick('home')}>
              <i className="fas fa-home"></i>
              <span>Home</span>
            </button>
            <button className={`mobile-menu-item ${isActive('movies')}`} onClick={() => handleNavItemClick('movies')}>
              <i className="fas fa-film"></i>
              <span>Movies</span>
            </button>
            <button className={`mobile-menu-item ${isActive('tvShows')}`} onClick={() => handleNavItemClick('tvShows')}>
              <i className="fas fa-tv"></i>
              <span>TV Shows</span>
            </button>
            <button className={`mobile-menu-item ${isActive('newPopular')}`} onClick={() => handleNavItemClick('newPopular')}>
              <i className="fas fa-bolt"></i>
              <span>New & Popular</span>
            </button>
            <button className={`mobile-menu-item ${isActive('watchlist')}`} onClick={() => handleNavItemClick('watchlist')}>
              <i className="fas fa-heart"></i>
              <span>My List</span>
            </button>
            
            <div className="mobile-menu-divider"></div>
            
            {isAuthenticated ? (
              <>
                <button className="mobile-menu-item" onClick={() => { onProfileClick(); setMobileMenuOpen(false); }}>
                  <i className="fas fa-user"></i>
                  <span>Profile</span>
                </button>
                <button className="mobile-menu-item" onClick={() => { onProfileClick(); setMobileMenuOpen(false); }}>
                  <i className="fas fa-sign-out-alt"></i>
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <button className="mobile-menu-item" onClick={() => { onProfileClick(); setMobileMenuOpen(false); }}>
                  <i className="fas fa-sign-in-alt"></i>
                  <span>Sign In</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;