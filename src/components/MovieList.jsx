import React, { useState } from 'react';
import { fetchMovies } from '../utils/api';  // Adjust the import path if needed
import MovieModal from './MovieModal';  // Import the modal component

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Fetch movies on component mount
  React.useEffect(() => {
    const getMovies = async () => {
      const data = await fetchMovies();
      setMovies(data.results);
    };
    getMovies();
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true); // Open the modal when a movie is clicked
  };

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => handleMovieClick(movie)}
            className="cursor-pointer p-4 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 ease-in-out"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="text-white text-lg mt-2">{movie.title}</h3>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <MovieModal movie={selectedMovie} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default MovieList;
