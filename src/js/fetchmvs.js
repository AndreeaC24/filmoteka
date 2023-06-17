import axios from 'axios';

const API_KEY = '44cd7d40e9c9ffc80f6b2e51bac6d9ee';
const URL = 'https://api.themoviedb.org/3';

const fetchMovies = async (searchQuery, page) => {
  try {
    const response = await axios.get(
      `${URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}&include_adult=false&language=en-US&page=${page}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Something went wrong with the API search fetch: ' + error);
  }
};

const fetchPopularMovies = async page => {
  try {
    const TOP_URL = `${URL}/trending/movie/week?api_key=${API_KEY}&page=${page}`;
    const response = await fetch(TOP_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error - popular movies: ', error);
    throw error;
  }
};
export { fetchMovies, fetchPopularMovies };
