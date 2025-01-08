import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../utils/api'; // Use fetchMovies

const HeroSection = () => {
  const [featuredMovie, setFeaturedMovie] = useState(null);

  useEffect(() => {
    const getFeaturedMovie = async () => {
      const data = await fetchMovies();  // Fetch the movies
      setFeaturedMovie(data.results[0]); // Set the first movie as featured
    };
    
    getFeaturedMovie();
  }, []);

  return (
    <div className="hero-section">
      {featuredMovie ? (
        <div className="bg-gray-800 text-white p-10 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold">{featuredMovie.title}</h1>
          <p>{featuredMovie.overview}</p>
          <img
            src={`https://image.tmdb.org/t/p/w500${featuredMovie.poster_path}`}
            alt={featuredMovie.title}
            className="mt-4 w-full h-auto rounded-lg"
          />
        </div>
      ) : (
        <p>Loading featured movie...</p>
      )}
    </div>
  );
};

export default HeroSection;
