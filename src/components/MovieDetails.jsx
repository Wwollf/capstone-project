import React from 'react'; // Keep only this import

const MovieDetails = ({ movie }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-900 text-white p-8 rounded-lg max-w-lg w-full transform transition-all">
        <button
          className="absolute top-2 right-2 text-white text-2xl"
          onClick={() => window.location.reload()} // Close button reloads the page
        >
          &times;
        </button>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-auto rounded mb-5"
        />
        <h2 className="text-2xl font-semibold mb-3">{movie.title}</h2>
        <p className="text-lg mb-3">{movie.release_date}</p>
        <p className="text-sm">{movie.overview}</p>
        
        {/* Display IMDb Rating */}
        <div className="mt-4 text-sm text-gray-400">
          <strong>IMDb Rating: </strong>
          {movie.imdbRating === 'N/A' ? (
            <span>No IMDb rating available</span>
          ) : (
            <a
              href={movie.imdbRating}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View on IMDb
            </a>
          )}
        </div>

        {/* Add Rotten Tomatoes rating here if you can fetch it */}
      </div>
    </div>
  );
};

export default MovieDetails;
