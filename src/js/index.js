import { getGalleryElement } from './utils';
import { clearGallery } from './galleryClear';
import { initializePagination, pagination } from './page.js';
import { markupLoad, eventSlider } from './slider.js';
import { showLoader, hideLoader } from './loader.js';
import './search';


const popularButton = document.querySelector('.movie__popular__items[value="popular"]');
const topRatedButton = document.querySelector('.movie__popular__items[value="top-rated"]');
const initialize = () => {
  getGalleryElement();
};
const initializeApp = async () => {
  try { 
    showLoader();
    popularButton.addEventListener('click', function () {
      if (!this.classList.contains('active')) {
        this.classList.add('active');
        topRatedButton.classList.remove('active');
        clearGallery();
        pagination.movePageTo(1);
        }
    });
    topRatedButton.addEventListener('click', function () {
      if (!this.classList.contains('active')) {
        this.classList.add('active');
        popularButton.classList.remove('active');
        clearGallery();
        pagination.movePageTo(1);
        }
    });
    initializePagination();
    hideLoader();
    markupLoad();
    eventSlider(); 
  } catch (error) {
    console.error('Error', error);
  }
  initialize();
};
initializeApp();
