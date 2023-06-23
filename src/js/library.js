import { displayWatchedMovies, displayQueueMovies } from './storage';
import { getGalleryElement } from './utils';
import { showLoader, hideLoader } from './loader.js';
import { openModal, initializeModal, handleWatched } from './modal';

const initialize = () => {
  getGalleryElement();
};

const savedMoviesList = document.getElementById('savedMoviesList');
const queueMoviesList = document.getElementById('queueMoviesList');
const watchedMenuItem = document.querySelector(
  '.header__menu__list__item.header__navigation__menu--selected'
);
const queueMenuItem = document.querySelector(
  '.header__menu__list__item:not(.header__navigation__menu--selected)'
);

watchedMenuItem.addEventListener('click', () => {
  savedMoviesList.style.display = 'block';
  queueMoviesList.style.display = 'none';

  watchedMenuItem.classList.add('header__navigation__menu--selected');
  queueMenuItem.classList.remove('header__navigation__menu--selected');
});

queueMenuItem.addEventListener('click', () => {
  savedMoviesList.style.display = 'none';
  queueMoviesList.style.display = 'block';

  queueMenuItem.classList.add('header__navigation__menu--selected');
  watchedMenuItem.classList.remove('header__navigation__menu--selected');
});
const initializeApp = async () => {
  try {
    initializeModal();
    displayWatchedMovies();
    displayQueueMovies();
    showLoader();
    hideLoader();
 
    const libraryContainer = document.querySelector('.library__container');

    if (savedMoviesList.childElementCount === 0 && queueMoviesList.childElementCount === 0) {
      libraryContainer.style.display = 'block';
    } else {
      libraryContainer.style.display = 'none';
    }
  } catch (error) {
    console.error('Error', error);
  }
};

initialize();
initializeApp();