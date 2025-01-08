// BadgePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = '12e2e7bb107b1946b8fd934c6903bcbf';

const BadgePage = ({ category }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      let apiUrl;

      if (category === 'new') {
        apiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;
      } else if (category === 'old') {
        apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
      } else if (category === 'top-rated') {
        apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
      }

      try {
        const response = await axios.get(apiUrl);
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [category]);

  return (
    <div className="w-full p-5 mt-10">
      <h2 className="text-2xl font-bold text-white mb-5">{category.replace('-', ' ')} Movies</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-gray-800 p-5 rounded-lg shadow-lg">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold text-white">{movie.title}</h3>
            <p className="text-sm text-gray-400">{movie.release_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BadgePage;
