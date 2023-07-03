import { fetchMovieDetails, fetchTrailer, fetchExternal } from './fetchmvs';
import { nullPoster } from './markup';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const modal = document.querySelector('.modal');
const modalContent = modal.querySelector('.modal__dialog');

const toggleModal = () => {
  modal.classList.toggle('show');
};

const createModalContent = movie => {
  const genres = movie.genres ? movie.genres.map(genre => genre.name) : ['Unknown'];
  const coverUrl = movie.poster_path  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : nullPoster;

  const markup = `
    <div class="modal__content">
      <div class="modal__header">
        <button type="button" class="modal__close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal__body">
        <img src="${coverUrl}" alt="${movie.title}" loading="lazy" class="img_movie" />
        <ul class="modal__list">
          <li class="modal__item"><h3 class="modal__title">${movie.title}</h3></li>
          <li class="modal__item">Vote/Votes:<span class="modal__item__average">${movie.vote_average.toFixed(2)}</span>/<span>${movie.vote_count}</span></li>
          <li class="modal__item">Popularity:<span>${movie.popularity.toFixed(1)}</span></li>
          <li class="modal__item">Original Title: <span>${movie.original_title}</span></li>
          <li class="modal__item">Genre:<span>${genres.join(', ')}</span></li>
          <li class="modal__item"><h3 class="modal__subtitle">About</h3><p class="modal__text">${movie.overview}</p>
          </li>
        </ul>
      </div>
      <div class="modal__footer">
      <ul class="modal__footer__list">        
          <li class="modal__footer__item modal__footer__item__extern">
          <button type="button" class="modal__footer__item--btn-trailer"><svg height="200px" width="200px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-51.2 -51.2 614.40 614.40" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"><rect x="-51.2" y="-51.2" width="614.40" height="614.40" rx="0" fill="#db2b42" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <polygon style="fill:#FFFFFF;" points="187.368,146.928 187.368,355.8 382.992,251.368 "></polygon> <path style="fill:#DB2B42;" d="M256,0.376C114.616,0.376,0,114.824,0,256s114.616,255.624,256,255.624S512,397.176,512,256 S397.384,0.376,256,0.376z M184.496,146.928l195.624,104.44L184.496,355.8V146.928z"></path> </g></svg></button>
          <a href="https://www.imdb.com/title/${movie.imdb_id}" target="_blank" class="modal__item__imdb">
          <button type="button" class="modal__footer__item--btn-imdb">IMDb</button></a>
          </li>
          <li class="modal__footer__item">
          <button type="button" class="btn-watched modal__footer__item--btn">${getWatchedButtonText(movie.id)}</button> 
         <button type="button" class="btn-queue modal__footer__item--btn">${getQueueButtonText(movie.id)}</button> 
      </div>
    </div>
  `;
  modalContent.innerHTML = markup;

  const closeButton = modalContent.querySelector('.modal__close');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      toggleModal();
    });
  }
  const openTrailerModal = async movieId => {
    try {
      const { results } = await fetchTrailer(movieId);
      const { key } = results[results.length - 1];

      const instance = basicLightbox.create(
        `<button id="closeButton">X</button>
        <iframe id="player" type="text/html" src="https://www.youtube.com/embed/${key}?enablejsapi=1&origin=http://example.com" frameborder="0" allowfullscreen></iframe>`
      );
      instance.show();

      const closeButton = instance.element().querySelector('#closeButton');
      closeButton.addEventListener('click', () => {
        instance.close();
      });
    } catch (error) {
      console.log('Error fetching trailer:', error);
    }
  };

  const trailerButton = modalContent.querySelector('.modal__footer__item--btn-trailer');
  trailerButton.addEventListener('click', () => {
    openTrailerModal(movie.id);
  });
};

const openModal = async movieId => {
  const movie = await fetchMovieDetails(movieId);
  if (movie) {
    createModalContent(movie);
    toggleModal();

    const galleryItem = document.querySelector(`[data-id="${movieId}"]`);
    const watchedButton = modalContent.querySelector('.btn-watched');
    const queueButton = modalContent.querySelector('.btn-queue');

    watchedButton.textContent = getWatchedButtonText(movieId);
    queueButton.textContent = getQueueButtonText(movieId);

    watchedButton.addEventListener('click', () => {
      handleSave(galleryItem, 'watched');
    });

    queueButton.addEventListener('click', () => {
      handleSave(galleryItem, 'queue');
    });
  }
};
const handleSave = (galleryItem, type) => {
  const id = galleryItem.getAttribute('data-id');

  let savedData = JSON.parse(localStorage.getItem('savedData')) || [];
  const existingMovieIndex = savedData.findIndex(movie => movie.id === id);

  if (existingMovieIndex !== -1) {
    const existingMovie = savedData[existingMovieIndex];
    if (type === 'watched') {
      existingMovie.watched = !existingMovie.watched;
    }
    if (type === 'queue') {
      existingMovie.queue = !existingMovie.queue;
    }

    if (!existingMovie.watched && !existingMovie.queue) {
      savedData.splice(existingMovieIndex, 1);
      console.log('Removed from localStorage!');
    }
  } else {
    const cover = galleryItem
      .querySelector('.movie__gallery__details--img img').getAttribute('src');
    const title = galleryItem.querySelector('.movie__gallery__details--title').textContent;
    const genre = galleryItem.querySelector('.movie__gallery__details--genres').textContent;
    const year = galleryItem.querySelector('.movie__gallery__details--year').textContent;
    const vote_average = galleryItem.querySelector('.movie__gallery__vote').textContent;
    const movieData = {id, cover, title, genre, year, vote_average, watched: type === 'watched', queue: type === 'queue',};
    savedData.unshift(movieData);
    console.log('Added to localStorage!');
  }

  localStorage.setItem('savedData', JSON.stringify(savedData));

  const watchedButton = modal.querySelector('.btn-watched');
  const queueButton = modal.querySelector('.btn-queue');

  watchedButton.textContent = getWatchedButtonText(id);
  queueButton.textContent = getQueueButtonText(id);

  if (window.location.pathname.includes('library.html')) {
    window.location.reload();
  }
};
const getWatchedButtonText = id => {
  const savedData = JSON.parse(localStorage.getItem('savedData')) || [];
  const existingMovie = savedData.find(movie => movie.id === id);
  return existingMovie && existingMovie.watched ? 'Remove from Watched'  : 'Watched';
};
const getQueueButtonText = id => {
  const savedData = JSON.parse(localStorage.getItem('savedData')) || [];
  const existingMovie = savedData.find(movie => movie.id === id);
  return existingMovie && existingMovie.queue ? 'Remove from Queue' : 'Queue';
};
const initializeModal = () => {
  const galleryElements = document.querySelectorAll('.movie__gallery__items'); 
  galleryElements.forEach(element => { 
    element.addEventListener('click', async event => {
      const movieId = event.currentTarget.dataset.id; 
      openModal(movieId);
      galleryElements.forEach(el => {
        el.classList.remove('selected');
      });
      event.currentTarget.classList.add('selected');
    });
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      toggleModal();
    }
  });
  modal.addEventListener('click', event => {
    if (!modal.contains(event.target) || event.target === modal) {
      toggleModal();
    }
  });
  const watchedButton = modalContent.querySelector('.btn-watched');
  const queueButton = modalContent.querySelector('.btn-queue');

  if (watchedButton) {
    watchedButton.addEventListener('click', () => {
      const galleryItem = document.querySelector('.movie__gallery__items.selected');
      handleSave(galleryItem, 'watched');
      watchedButton.textContent = getWatchedButtonText(galleryItem.dataset.id);
    });
  }
  if (queueButton) {
    queueButton.addEventListener('click', () => {
      const galleryItem = document.querySelector('.movie__gallery__items.selected');
      handleSave(galleryItem, 'queue');
      queueButton.textContent = getQueueButtonText(galleryItem.dataset.id);
    });
  }
};
export { openModal, initializeModal, handleSave };
