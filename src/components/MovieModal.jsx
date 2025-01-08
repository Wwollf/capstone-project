import React from 'react';

const MovieModal = ({ movie, onClose }) => {
  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
      onClick={onClose} // Close the modal when the background is clicked
    >
      <div
        className="bg-white p-6 rounded-lg w-3/4 md:w-1/2 lg:w-1/3 transition-transform transform scale-95 opacity-0 animate__animated animate__fadeIn animate__delay-0.5s"
        onClick={(e) => e.stopPropagation()} // Prevent close if modal content is clicked
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">{movie.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-72 object-cover mt-4 rounded-lg"
        />

        <p className="mt-4 text-gray-700">{movie.overview}</p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-gray-600">Release Date: {movie.release_date}</span>
          <span className="text-sm text-gray-600">Rating: {movie.vote_average}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
