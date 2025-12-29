import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MovieRow from './components/MovieRow';
import Footer from './components/Footer';
import MovieModal from './components/MovieModal';
import ProfilePage from './components/ProfilePage';
import NotificationsPage from './components/NotificationsPage';
import ViewAllPage from './components/ViewAllPage';
import SearchResultsPage from './components/SearchResultsPage';
import LoginPage from './components/LoginPage';
import MoviesPage from './components/MoviesPage';
import TVShowsPage from './components/TVShowsPage';
import NewPopularPage from './components/NewPopularPage';
import WatchlistPage from './components/WatchlistPage';
import './App.css';

function App() {
  const [moviesData, setMoviesData] = useState({});
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [notifications, setNotifications] = useState([]);

  // Sample movie data
  const movieData = {
    trending: [
      {
        "id": 1,
        "title": "Dune: Part Two",
        "year": 2024,
        "genre": "Sci-Fi, Adventure",
        "duration": "2h 46m",
        "rating": 8.7,
        "description": "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe, he must prevent a terrible future only he can foresee.",
        "poster": "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        "background": "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        "cast": ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"],
        "director": "Denis Villeneuve",
        "ageRating": "PG-13",
        "isFeatured": true
      },
      {
        "id": 2,
        "title": "Oppenheimer",
        "year": 2023,
        "genre": "Biography, Drama",
        "duration": "3h 0m",
        "rating": 8.3,
        "description": "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.",
        "poster": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        "background": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        "cast": ["Cillian Murphy", "Emily Blunt", "Matt Damon"],
        "director": "Christopher Nolan",
        "ageRating": "R"
      },
      {
        "id": 3,
        "title": "The Batman",
        "year": 2022,
        "genre": "Action, Crime",
        "duration": "2h 56m",
        "rating": 7.8,
        "description": "When the Riddler, a sadistic serial killer, begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
        "poster": "https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        "background": "https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        "cast": ["Robert Pattinson", "Zoë Kravitz", "Paul Dano"],
        "director": "Matt Reeves",
        "ageRating": "PG-13"
      }
    ],
    popular: [
      {
        "id": 4,
        "title": "Stranger Things",
        "year": 2016,
        "genre": "Sci-Fi, Horror",
        "duration": "4 Seasons",
        "rating": 8.7,
        "description": "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
        "poster": "https://images.unsplash.com/photo-1489599809516-9827b6d1cf13?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        "background": "https://images.unsplash.com/photo-1489599809516-9827b6d1cf13?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        "cast": ["Millie Bobby Brown", "Finn Wolfhard", "Winona Ryder"],
        "director": "Duffer Brothers",
        "ageRating": "TV-14",
        "type": "tv"
      },
      {
        "id": 5,
        "title": "The Crown",
        "year": 2016,
        "genre": "Drama, History",
        "duration": "6 Seasons",
        "rating": 8.6,
        "description": "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the twentieth century.",
        "poster": "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        "background": "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        "cast": ["Claire Foy", "Olivia Colman", "Imelda Staunton"],
        "director": "Peter Morgan",
        "ageRating": "TV-MA",
        "type": "tv"
      }
    ],
    action: [
      {
        "id": 6,
        "title": "John Wick: Chapter 4",
        "year": 2023,
        "genre": "Action, Thriller",
        "duration": "2h 49m",
        "rating": 8.0,
        "description": "John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe.",
        "poster": "https://images.unsplash.com/photo-1551029506-0807df4e2031?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        "cast": ["Keanu Reeves", "Donnie Yen", "Bill Skarsgård"],
        "director": "Chad Stahelski",
        "ageRating": "R"
      },
      {
        "id": 7,
        "title": "Mission: Impossible - Dead Reckoning",
        "year": 2023,
        "genre": "Action, Adventure",
        "duration": "2h 43m",
        "rating": 7.9,
        "description": "Ethan Hunt and his IMF team must track down a terrifying new weapon that threatens all of humanity if it falls into the wrong hands.",
        "poster": "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        "cast": ["Tom Cruise", "Hayley Atwell", "Ving Rhames"],
        "director": "Christopher McQuarrie",
        "ageRating": "PG-13"
      }
    ],
    comedy: [
      {
        "id": 8,
        "title": "Barbie",
        "year": 2023,
        "genre": "Comedy, Adventure",
        "duration": "1h 54m",
        "rating": 7.0,
        "description": "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.",
        "poster": "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        "cast": ["Margot Robbie", "Ryan Gosling", "America Ferrera"],
        "director": "Greta Gerwig",
        "ageRating": "PG-13"
      }
    ],
    drama: [
      {
        "id": 9,
        "title": "The Shawshank Redemption",
        "year": 1994,
        "genre": "Drama",
        "duration": "2h 22m",
        "rating": 9.3,
        "description": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        "poster": "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
        "cast": ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
        "director": "Frank Darabont",
        "ageRating": "R"
      }
    ],
    sciFi: [
      {
        "id": 10,
        "title": "Interstellar",
        "year": 2014,
        "genre": "Sci-Fi, Drama",
        "duration": "2h 49m",
        "rating": 8.6,
        "description": "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        "poster": "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        "cast": ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
        "director": "Christopher Nolan",
        "ageRating": "PG-13"
      }
    ]
  };

  // TV Shows data
  const tvShowsData = {
    popularTV: [
      {
        "id": 11,
        "title": "Breaking Bad",
        "year": 2008,
        "genre": "Crime, Drama",
        "duration": "5 Seasons",
        "rating": 9.5,
        "description": "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.",
        "poster": "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
        "type": "tv",
        "ageRating": "TV-MA"
      },
      {
        "id": 12,
        "title": "Game of Thrones",
        "year": 2011,
        "genre": "Action, Adventure",
        "duration": "8 Seasons",
        "rating": 9.2,
        "description": "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.",
        "poster": "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
        "type": "tv",
        "ageRating": "TV-MA"
      }
    ],
    dramaTV: [
      {
        "id": 13,
        "title": "The Last of Us",
        "year": 2023,
        "genre": "Action, Drama",
        "duration": "1 Season",
        "rating": 8.8,
        "description": "After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl who may be humanity's last hope.",
        "poster": "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
        "type": "tv",
        "ageRating": "TV-MA"
      }
    ]
  };

  // New & Popular data (latest releases)
  const newPopularData = {
    latest: [
      {
        "id": 14,
        "title": "Everything Everywhere All at Once",
        "year": 2022,
        "genre": "Action, Adventure",
        "duration": "2h 19m",
        "rating": 7.8,
        "description": "An aging Chinese immigrant is swept up in an insane adventure, where she alone can save the world by exploring other universes connecting with the lives she could have led.",
        "poster": "https://images.unsplash.com/photo-1551029506-0807df4e2031?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
        "isNew": true
      },
      {
        "id": 15,
        "title": "Top Gun: Maverick",
        "year": 2022,
        "genre": "Action, Drama",
        "duration": "2h 10m",
        "rating": 8.3,
        "description": "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN's elite graduates.",
        "poster": "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        "isNew": true
      }
    ]
  };

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        // Check if user is logged in from localStorage
        const savedUser = localStorage.getItem('movieflix_user');
        
        if (savedUser) {
          setUserProfile(JSON.parse(savedUser));
          setIsAuthenticated(true);
        }
        
        // Load all movie data
        const allData = {
          ...movieData,
          ...tvShowsData,
          ...newPopularData
        };
        
        setMoviesData(allData);
        
        if (movieData.trending && movieData.trending.length > 0) {
          setFeaturedMovie(movieData.trending[0]);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedMovie(null);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      setCurrentView('home');
    } else {
      const allMovies = Object.values(moviesData).flat();
      const results = allMovies.filter(movie =>
        movie.title.toLowerCase().includes(query.toLowerCase()) ||
        movie.genre.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
      setCurrentView('search');
    }
  };

  const handleViewAll = (category) => {
    setSelectedCategory(category);
    setCurrentView('viewAll');
  };

  const handleNotificationClick = () => {
    setCurrentView('notifications');
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      setCurrentView('profile');
    } else {
      setCurrentView('login');
    }
  };

  const handleLogin = (userData) => {
    setUserProfile(userData);
    setIsAuthenticated(true);
    setCurrentView('home');
    localStorage.setItem('movieflix_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserProfile(null);
    setCurrentView('home');
    localStorage.removeItem('movieflix_user');
  };

  const addToWatchlist = (movieId) => {
    if (!userProfile) {
      setCurrentView('login');
      return;
    }
    
    const updatedProfile = {
      ...userProfile,
      watchlist: [...(userProfile.watchlist || []), movieId]
    };
    setUserProfile(updatedProfile);
    localStorage.setItem('movieflix_user', JSON.stringify(updatedProfile));
  };

  const removeFromWatchlist = (movieId) => {
    if (!userProfile) return;
    
    const updatedProfile = {
      ...userProfile,
      watchlist: (userProfile.watchlist || []).filter(id => id !== movieId)
    };
    setUserProfile(updatedProfile);
    localStorage.setItem('movieflix_user', JSON.stringify(updatedProfile));
  };

  const getWatchlistMovies = () => {
    if (!userProfile?.watchlist) return [];
    const allMovies = Object.values(moviesData).flat();
    return allMovies.filter(movie => userProfile.watchlist.includes(movie.id));
  };

  // Handle navbar navigation
  const handleNavClick = (section) => {
    setCurrentView(section);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner">
          <i className="fas fa-film"></i>
        </div>
        <p>Loading movies...</p>
      </div>
    );
  }

  const renderContent = () => {
    switch (currentView) {
      case 'login':
        return <LoginPage onLogin={handleLogin} />;
      
      case 'profile':
        return (
          <ProfilePage 
            user={userProfile} 
            onLogout={handleLogout}
            onBack={() => setCurrentView('home')}
            watchlistMovies={moviesData}
            onMovieClick={handleMovieClick}
            onRemoveFromWatchlist={removeFromWatchlist}
          />
        );
      
      case 'notifications':
        return (
          <NotificationsPage
            notifications={notifications}
            onBack={() => setCurrentView('home')}
          />
        );
      
      case 'viewAll':
        return (
          <ViewAllPage
            category={selectedCategory}
            movies={moviesData[selectedCategory] || []}
            onBack={() => setCurrentView('home')}
            onMovieClick={handleMovieClick}
          />
        );
      
      case 'search':
        return (
          <SearchResultsPage
            query={searchQuery}
            results={searchResults}
            onBack={() => setCurrentView('home')}
            onMovieClick={handleMovieClick}
          />
        );
      
      case 'movies':
        return (
          <MoviesPage
            moviesData={moviesData}
            onBack={() => setCurrentView('home')}
            onMovieClick={handleMovieClick}
            onViewAll={handleViewAll}
          />
        );
      
      case 'tvShows':
        return (
          <TVShowsPage
            tvShowsData={tvShowsData}
            onBack={() => setCurrentView('home')}
            onMovieClick={handleMovieClick}
            onViewAll={handleViewAll}
          />
        );
      
      case 'newPopular':
        return (
          <NewPopularPage
            newPopularData={newPopularData}
            onBack={() => setCurrentView('home')}
            onMovieClick={handleMovieClick}
            onViewAll={handleViewAll}
          />
        );
      
      case 'watchlist':
        if (!isAuthenticated) {
          setCurrentView('login');
          return null;
        }
        return (
          <WatchlistPage
            watchlistMovies={getWatchlistMovies()}
            onBack={() => setCurrentView('home')}
            onMovieClick={handleMovieClick}
            onRemoveFromWatchlist={removeFromWatchlist}
            userProfile={userProfile}
          />
        );
      
      case 'home':
      default:
        return (
          <>
            {featuredMovie && (
              <Hero 
                movie={featuredMovie} 
                onPlayClick={() => handleMovieClick(featuredMovie)}
              />
            )}
            
            <main className="main-content">
              {Object.entries(movieData).map(([category, movies]) => (
                <MovieRow
                  key={category}
                  title={category.charAt(0).toUpperCase() + category.slice(1)}
                  movies={movies}
                  onMovieClick={handleMovieClick}
                  onViewAll={() => handleViewAll(category)}
                />
              ))}
            </main>
          </>
        );
    }
  };

  return (
    <div className="App">
      {currentView !== 'login' && (
        <Navbar 
          onSearch={handleSearch}
          onNotificationClick={handleNotificationClick}
          onProfileClick={handleProfileClick}
          isAuthenticated={isAuthenticated}
          userProfile={userProfile}
          currentView={currentView}
          onHomeClick={() => setCurrentView('home')}
          onMoviesClick={() => handleNavClick('movies')}
          onTVShowsClick={() => handleNavClick('tvShows')}
          onNewPopularClick={() => handleNavClick('newPopular')}
          onWatchlistClick={() => handleNavClick('watchlist')}
        />
      )}
      
      {renderContent()}
      
      {currentView === 'home' && <Footer />}
      
      {modalOpen && selectedMovie && (
        <MovieModal 
          movie={selectedMovie} 
          onClose={closeModal}
          onAddToWatchlist={() => addToWatchlist(selectedMovie.id)}
          isInWatchlist={userProfile?.watchlist?.includes(selectedMovie.id) || false}
          onRemoveFromWatchlist={() => removeFromWatchlist(selectedMovie.id)}
        />
      )}
    </div>
  );
}

export default App;