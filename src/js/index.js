import { fetchGenreList } from './fetchGenre';
import { handleResponse, markupGalleryItem } from './markup';
import { fetchPopularMovies } from './fetchmvs';

const currentPage = 1;

const getGalleryElement = () => document.querySelector('.gallery');

const initialize = async () => {
  const galleryElement = getGalleryElement();
  if (!galleryElement) {
    return;
  }
};

const initializeApp = async () => {
  try {
    const genreList = await fetchGenreList();
    const popularMovies = await fetchPopularMovies(currentPage);
    handleResponse(popularMovies, true, genreList);
  } catch (error) {
    console.error('Error - popular movies: ', error);
  }

  initialize();
};

initializeApp();
