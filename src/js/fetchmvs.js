import axios from 'axios';

const API_KEY = '44cd7d40e9c9ffc80f6b2e51bac6d9ee';
const URL = 'https://api.themoviedb.org/3';

const fetchMovies = async (searchQuery, page) => {
  try {
    const response = await axios.get(`${URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}&language=en-US&page=${page}`);   
    return response.data;
  } catch (error) {
    console.error('Something went wrong with the API search fetch: ' + error);
  }
}; 
const fetchUpcoming = async (page) => {
  try {
    const URL_upcoming = `${URL}/movie/upcoming?api_key=${API_KEY}&page=${page}`;
    const response = await axios.get(URL_upcoming);
    const { results } = response.data;
    const movieIds = results.map(movie => movie.id); 
    return response.data;
  } catch (error) {
    console.error('Error - rated movies: ', error);
    throw error;
  }
};

const fetchTrailer = async id => {
  try {
    const response = await axios.get(`${URL}/movie/${id}/videos?api_key=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Something went wrong with the trailer fetch: ' + error);
  }
};
const fetchPopularMovies = async page => {
  try {
    const TOP_URL = `${URL}/trending/movie/week?api_key=${API_KEY}&page=${page}`;
    const response = await axios.get(TOP_URL); 
    return response.data;
  } catch (error) {
    console.error('Error - popular movies: ', error);
    throw error;
  }
};
const fetchrated = async (page) => {
  try {
    const RATED_URL = `${URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`;
    const response = await axios.get(RATED_URL); 
    return response.data;
  } catch (error) {
    console.error('Error - rated movies: ', error);
    throw error;
  }
};
const fetchMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(`${URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=external_ids`); 
    return response.data;
  } catch (error) {
    console.error('Error - movie details: ', error);
    throw error;
  }
};

export { fetchMovies, fetchTrailer, fetchPopularMovies, fetchMovieDetails, fetchUpcoming, fetchrated };
