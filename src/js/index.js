import { fetchGenreList } from './fetchGenre';
import { handleResponse, getGalleryElement } from './markup';
import { fetchPopularMovies } from './fetchmvs';
import './search'; 
import './footer'; 
import { initializeModal } from './modal';
import { showLoader, hideLoader } from './loader.js';
import { showPage } from './page.js'; 
import { getGalleryElement } from './utils';

const currentPage = 1;
//let searchQuery = '';
//const getGalleryElement = () => document.querySelector('.gallery');

const initialize = async () => {
  getGalleryElement();
};

const initializeApp = async () => {
  try {
    showLoader();
    const genreList = await fetchGenreList();
    const popularMovies = await fetchPopularMovies(currentPage); 
    handleResponse(popularMovies, true, genreList);  
    initializeModal();
    hideLoader(); 
  } catch (error) {
    console.error('Error', error);
  }

  initialize();
  showPage(currentPage);   
};

initializeApp();
