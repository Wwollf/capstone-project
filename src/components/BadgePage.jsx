import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieDetails from './MovieDetails'; // Assuming you have a MovieDetails component

const API_KEY = '12e2e7bb107b1946b8fd934c6903bcbf';

// Helper function to get the correct API URL based on the category
const getApiUrl = (category) => {
  if (category === 'new') {
    return `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;
  } else if (category === 'old') {
    return `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
  } else if (category === 'top-rated') {
    return `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
  }
  return ''; // In case the category doesn't match
};

const BadgePage = ({ category, searchQuery }) => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null); // State to hold the selected movie

  useEffect(() => {
    const fetchMovies = async () => {
      const apiUrl = getApiUrl(category);

      if (!apiUrl) return;

      try {
        const response = await axios.get(apiUrl);
        setMovies(response.data.results);
        setFilteredMovies(response.data.results); // Initialize filteredMovies with all fetched movies
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [category]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredMovies(movies); // No query, show all movies
    } else {
      const filtered = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMovies(filtered);
    }
  }, [searchQuery, movies]);

  // Function to handle when a movie is clicked
  const handleMovieClick = (movie) => {
    setSelectedMovie(movie); // Set the selected movie to show details
  };

  return (
    <div className="w-full p-5 mt-10">
      <h2 className="text-2xl font-bold text-white mb-5">{category.replace('-', ' ')} Movies</h2>
      
      {/* Movie List */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 p-5 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700 hover:scale-105 transition-all duration-300 transform"
              onClick={() => handleMovieClick(movie)} // Add click event
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-lg mb-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              />
              <h3 className="text-xl font-semibold text-white">{movie.title}</h3>
              <p className="text-sm text-gray-400">{movie.release_date}</p>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-xl text-white">
            No movies found
          </div>
        )}
      </div>

      {/* Modal for displaying movie details */}
      {selectedMovie && <MovieDetails movie={selectedMovie} />}
    </div>
  );
};

export default BadgePage;
