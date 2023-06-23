import { displaySavedMovies, displayQueueMovies } from './storage';
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
    displaySavedMovies();
    displayQueueMovies();
    showLoader();
    hideLoader();

    const savedMoviesList = document.getElementById('savedMoviesList');
    const libraryContainer = document.querySelector('.library__container');

    if (savedMoviesList.childElementCount > 0) {
      libraryContainer.classList.add('hidden');
    } else {
      libraryContainer.classList.remove('hidden');
    }
  } catch (error) {
    console.error('Error', error);
  }
};

initialize();
initializeApp();
