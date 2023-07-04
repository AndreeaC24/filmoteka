import { displayWatchedMovies, displayQueueMovies } from './storage';
import { getGalleryElement } from './utils';
import { showLoader, hideLoader } from './loader.js';
import { initializeModal } from './modal';

const initialize = () => {
  getGalleryElement();
};
const savedMoviesList = document.getElementById('savedMoviesList');
const queueMoviesList = document.getElementById('queueMoviesList');
const watchedMenuItem = document.querySelector('.header__menu__list__item.header__navigation__menu--selected');
const queueMenuItem = document.querySelector('.header__menu__list__item:not(.header__navigation__menu--selected)');

watchedMenuItem.addEventListener('click', () => {
  savedMoviesList.style.display = 'flex';
  queueMoviesList.style.display = 'none';
  watchedMenuItem.classList.add('header__navigation__menu--selected');
  queueMenuItem.classList.remove('header__navigation__menu--selected');
});

queueMenuItem.addEventListener('click', () => {
  savedMoviesList.style.display = 'none';
  queueMoviesList.style.display = 'flex';
  queueMenuItem.classList.add('header__navigation__menu--selected');
  watchedMenuItem.classList.remove('header__navigation__menu--selected');
});
const initializeApp = async () => {
  try {
    showLoader();
    displayWatchedMovies();
    displayQueueMovies();
    initializeModal();
    const libraryContainer = document.querySelector('.library__container');
    if (savedMoviesList.childElementCount === 0 && queueMoviesList.childElementCount === 0) {
      libraryContainer.style.display = 'flex';
    } else {
      libraryContainer.style.display = 'none';
    }
    hideLoader();
    document.addEventListener("DOMContentLoaded", function() {  
           queueMoviesList.style.display = 'none'; 
           if (window.innerWidth >= 768) {
            var footerContainer = document.querySelector(".footer__container");
            footerContainer.style.position = "fixed";
            footerContainer.style.bottom = "0";
            footerContainer.style.left = "50%";
            footerContainer.style.transform = "translateX(-50%)"; 
          }
      });
      
  } catch (error) {
    console.error('Error', error);
  }
};
initialize();
initializeApp();