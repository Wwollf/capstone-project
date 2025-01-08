import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import MovieDetails from './components/MovieDetails';
import BadgePage from './components/BadgePage';

const API_KEY = '12e2e7bb107b1946b8fd934c6903bcbf';
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=`;

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

const App = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);

  const debouncedQuery = useDebounce(searchQuery, 500);  // 500ms debounce delay

  // Fetch movies on page load or when page changes
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${API_URL}${page}`);
        console.log('Fetched Movies:', response.data); // Log the entire response
        setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [page]);

  // Effect to filter movies based on debounced query
  useEffect(() => {
    console.log('Debounced Search Query:', debouncedQuery);  // Log the debounced search query
    if (debouncedQuery.trim() === '') {
      setFilteredMovies(movies);  // No query, show all movies
    } else {
      const lowerCaseQuery = debouncedQuery.toLowerCase();
      const filtered = movies.filter((movie) =>
        movie.title.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredMovies(filtered);
    }
  }, [debouncedQuery, movies]);  // Trigger when debounced query or movie list changes

  const handleMovieClick = async (movie) => {
    const imdbRating = await fetchImdbRating(movie.id);
    const updatedMovie = { ...movie, imdbRating };
    setSelectedMovie(updatedMovie);
  };

  const fetchImdbRating = async (movieId) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/external_ids?api_key=${API_KEY}`
      );
      return response.data.imdb_id ? `https://www.imdb.com/title/${response.data.imdb_id}` : 'N/A';
    } catch (error) {
      console.error('Error fetching IMDb rating:', error);
      return 'N/A';
    }
  };

  const loadMoreMovies = () => {
    setPage(page + 1);
  };

  return (
    <Router>
      <div className="bg-gray-900 text-white min-h-screen p-5 flex flex-col items-center">
        {/* Logo and Site Name */}
        <div className="absolute top-5 left-5 text-4xl font-extrabold text-white">
          <div className="group relative inline-block">
            <span className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-indigo-500 transition-all duration-300 transform group-hover:scale-110" />
            <span className="relative z-10">🎬 Movie Nest</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="absolute top-5 right-5 flex space-x-4">
          <Link
            to="/new-movies"
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-300"
          >
            New Movies
          </Link>
          <Link
            to="/old-movies"
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-300"
          >
            Old Movies
          </Link>
          <Link
            to="/top-rated"
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-300"
          >
            Top Rated
          </Link>
        </nav>

        {/* Search Bar - Centered */}
        <div className="mt-20 w-full md:w-1/2 flex justify-center">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // This updates the search query state
              placeholder="Search movies..."
              className="w-full p-3 rounded-xl bg-gradient-to-r from-gray-700 via-gray-800 to-black text-white focus:outline-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            />
            <FaSearch className="absolute top-3 right-3 text-white text-xl" />
          </div>
        </div>

        {/* Routes for Different Categories */}
        <Routes>
          <Route path="/new-movies" element={<BadgePage category="new" />} />
          <Route path="/old-movies" element={<BadgePage category="old" />} />
          <Route path="/top-rated" element={<BadgePage category="top-rated" />} />
          <Route path="/" element={(
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 w-full">
              {filteredMovies.length > 0 ? filteredMovies.map((movie) => (
                <div
                  key={movie.id}
                  className="bg-gray-800 p-5 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700 hover:scale-105 transition-all duration-300 transform"
                  onClick={() => handleMovieClick(movie)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="rounded-lg mb-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  />
                  <h2 className="text-xl font-semibold">{movie.title}</h2>
                  <p className="text-sm text-gray-400">{movie.release_date}</p>
                </div>
              )) : (
                <div className="col-span-full text-center text-xl text-white">
                  No movies found
                </div>
              )}
            </div>
          )} />
        </Routes>

        {/* Load More Button */}
        <div className="flex justify-center mt-12">
          <button
            onClick={loadMoreMovies}
            className="bg-indigo-600 text-white py-3 px-6 rounded-xl hover:bg-indigo-700 transition-all duration-300 shadow-xl transform hover:scale-105 hover:animate-bounce"
          >
            Load More Movies
          </button>
        </div>

        {/* Modal for displaying movie details */}
        {selectedMovie && <MovieDetails movie={selectedMovie} />}
      </div>
    </Router>
  );
};

export default App;

