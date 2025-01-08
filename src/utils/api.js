const API_KEY = '12e2e7bb107b1946b8fd934c6903bcbf'; // Replace with your TMDb API key
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async () => {
  const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}`);
  const data = await response.json();
  return data;
};

// Fetch a single "featured" movie (for example, the first movie from the list)
export const fetchFeaturedMovie = async () => {
  const response = await fetch(`${BASE_URL}/movie/550?api_key=${API_KEY}`); // Replace with any movie ID
  const data = await response.json();
  return data;
};
