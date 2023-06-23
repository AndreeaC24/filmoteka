
import { getGalleryElement } from './utils';
import { fetchGenreList } from './fetchGenre';
import { handleResponse, getGalleryElement } from './markup';
import { fetchPopularMovies } from './fetchmvs';
import { showLoader, hideLoader } from './loader.js';
import { showPage }  from './page.js';   

import { initializeModal } from './modal'; 
import './search'; 

const currentPage = 1;

const initialize = () => {
  getGalleryElement(); 
};

const initializeApp = async () => {
  try {
    showPage(currentPage);    
    const genreList = await fetchGenreList();
    const popularMovies = await fetchPopularMovies(currentPage); 
    handleResponse(popularMovies, true, genreList);  
    //displaySavedMovies();
    initializeModal();  
    showLoader();
    hideLoader(); 
  } catch (error) {
    console.error('Error', error);
  }
  initialize();
}; 
initializeApp();
