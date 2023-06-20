
import { getGalleryElement } from './utils';
import { fetchGenreList } from './fetchGenre';
import { handleResponse, getGalleryElement } from './markup';
import { fetchPopularMovies } from './fetchmvs';
import './search'; 
import { initializeModal } from './modal';
import { showLoader, hideLoader } from './loader.js';
import { showPage }  from './page.js'; 

const currentPage = 1;

const initialize = () => {
  getGalleryElement(); 
};

const initializeApp = async () => {
  try {
    showLoader();
    showPage(currentPage);    
    const genreList = await fetchGenreList();
    const popularMovies = await fetchPopularMovies(currentPage); 
    handleResponse(popularMovies, true, genreList);  
    initializeModal();
    hideLoader(); 
  } catch (error) {
    console.error('Error', error);
  }
  initialize();
}; 
initializeApp();
