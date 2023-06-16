import { fetchGenreList, getGenres } from './fetchGenre';
import { fetchMovies, fetchPopularMovies } from './fetchmvs';
import { handleResponse, markupGalleryItem } from './markup';
import './search';


let currentPage = 1;

const initialize = async () => {
  const getGalleryElement = () => document.querySelector('.gallery');
};
const initializeApp = async () => {
  try {
   // genreList = await fetchGenreList();
    const popularMovies = await fetchPopularMovies(currentPage);
    handleResponse(popularMovies, true);
  } catch (error) {
    console.error('Error - popular movies: ', error);
  }
  initialize();
};

initializeApp();
