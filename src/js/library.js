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
    initializeModal();
    displayWatchedMovies();
    displayQueueMovies();
    showLoader();
    hideLoader();
 
    const libraryContainer = document.querySelector('.library__container');

    if (savedMoviesList.childElementCount === 0 && queueMoviesList.childElementCount === 0) {
      libraryContainer.style.display = 'flex';
    } else {
      libraryContainer.style.display = 'none';
    }
    document.addEventListener("DOMContentLoaded", function() {
        // Verificăm dacă ne aflăm în pagina "library.html"
        if (window.location.pathname.includes("library.html")) {
          // Verificăm dacă lățimea ferestrei este mai mare sau egală cu 768px
          if (window.innerWidth >= 768) {
            // Selectăm elementul cu clasa "footer__container"
            var footerContainer = document.querySelector(".footer__container");
          
            // Adăugăm stilurile CSS dorite
            footerContainer.style.position = "fixed";
            footerContainer.style.bottom = "0";
          }
        }
      });
      
  } catch (error) {
    console.error('Error', error);
  }
};

initialize();
initializeApp();