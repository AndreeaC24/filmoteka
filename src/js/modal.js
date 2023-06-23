import { fetchMovieDetails } from './fetchmvs';
import {
  handleResponse,
  markupGalleryItem,
  getGalleryElement,
  nullPoster,
} from './markup';

const modal = document.querySelector('.modal');
const modalContent = modal.querySelector('.modal-dialog');

const toggleModal = () => {
  modal.classList.toggle('show');
};

const createModalContent = movie => {
  const genres = movie.genres
    ? movie.genres.map(genre => genre.name)
    : ['Unknown'];

  const coverUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : nullPoster;

  const markup = ` 
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">${movie.title}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <img src="${coverUrl}" alt="${
    movie.title
  }" loading="lazy" class="img_movie" />
          <li class="gallery__modal">
          <p class="vote__count"> Vote/Votes 
          <b class="details">  ${movie.vote_average}</b>
           <b >/</b>
           <b >${movie.vote_count}</b>
          </p>
          </li>
            <li class="gallery__modal">
            <p class="vote__count > 
            <b class="details"> popularity ${movie.popularity}</b>
            </p>
            </li>
            <li class="gallery__modal">
            <p class="vote__count>
            <b class="details">Original Title ${movie.original_title}</b>
            </p>
            </li>
            <li class="gallery__modal">
                <p class="vote__count> 
                <b class="details">Genre${genres.join(', ')}</b>
                </p>
            </li>
            <li class="gallery__modal">
            <h3 class="details__info">about</h3>
                <p class="text__modal">${movie.overview}</p>
            </li>

        </div>
        <div class="modal-footer"> 
        <button type="button" class="btn-watched btn btn-primary">${getWatchedButtonText(
          movie.id
        )}</button>
        <button type="button" class="btn-queue btn btn-primary">${getQueueButtonText(
          movie.id
        )}</button>
      </div>
      </div>
    </div>
  `;

  modalContent.innerHTML = markup;
  const closeButton = modalContent.querySelector('.close');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      toggleModal();
    });
  }
};

const openModal = async movieId => {
  console.log('Open modal called with ID:', movieId);

  const movie = await fetchMovieDetails(movieId);

  if (movie) {
    createModalContent(movie);
    toggleModal();

    const galleryItem = document.querySelector(`[data-id="${movieId}"]`);
    const watchedButton = modalContent.querySelector('.btn-watched');
    const queueButton = modalContent.querySelector('.btn-queue');

    watchedButton.addEventListener('click', () => {
      handleSave(galleryItem, true, false);
    });

    queueButton.addEventListener('click', () => {
      handleSave(galleryItem, false, true);
    });

    const savedData = JSON.parse(localStorage.getItem('savedData')) || [];
    const existingMovie = savedData.find(movie => movie.id === movieId);

    if (existingMovie) {
      if (existingMovie.watched) {
        watchedButton.textContent = 'Remove from Watched';
      }
      if (existingMovie.queue) {
        queueButton.textContent = 'Remove from Queue';
      }
    }
  }
};
const handleSave = (galleryItem, isWatched, isQueue) => {
  console.log(`Changes saved for ${isWatched ? 'Watched' : 'Queue'}!`);
  console.log('Changes saved!');
  console.log('Gallery Item:', galleryItem);

  const cover = galleryItem
    .querySelector('.gallery__items__img img')
    .getAttribute('src');
  const title = galleryItem.querySelector(
    '.gallery__items__details--title'
  ).textContent;
  const genre = galleryItem.querySelector(
    '.gallery__items__details--genres'
  ).textContent;
  const year = galleryItem.querySelector(
    '.gallery__items__details--year'
  ).textContent;
  const id = galleryItem.getAttribute('data-id');

  let savedData = JSON.parse(localStorage.getItem('savedData')) || [];
  const existingMovieIndex = savedData.findIndex(movie => movie.id === id);

  if (existingMovieIndex !== -1) {
    const existingMovie = savedData[existingMovieIndex];
    if (isWatched !== false) {
      existingMovie.watched = isWatched;
    }
    if (isQueue !== false) {
      existingMovie.queue = isQueue;
    }
    if (isWatched === false && isQueue === false) {
      savedData.splice(existingMovieIndex, 1);
      console.log('Movie removed from localStorage!');
    } else {
      console.log('Movie updated!');
    }
  } else {
    const movieData = {
      cover,
      title,
      genre,
      year,
      id,
      watched: isWatched,
      queue: isQueue,
    };
    savedData.unshift(movieData);
    console.log(' Add to localStorage!');
  }

  localStorage.setItem('savedData', JSON.stringify(savedData));

  const watchedButton = modal.querySelector('.btn-watched');
  const queueButton = modal.querySelector('.btn-queue');

  if (watchedButton && queueButton) {
    watchedButton.textContent = getWatchedButtonText(id);
    queueButton.textContent = getQueueButtonText(id);
  }

  if (window.location.pathname.includes('library.html')) {
    window.location.reload();
  }
};

const handleWatched = galleryItem => {
  const isWatched = true;
  const isQueue = false;
  handleSave(galleryItem, isWatched, isQueue);
};

const handleQueue = galleryItem => {
  const isWatched = false;
  const isQueue = true;
  handleSave(galleryItem, isWatched, isQueue);
};

const getWatchedButtonText = id => {
  const savedData = JSON.parse(localStorage.getItem('savedData')) || [];
  const existingMovie = savedData.find(movie => movie.id === id);
  return existingMovie && existingMovie.watched
    ? 'Remove from Watched'
    : 'Watched';
};

const getQueueButtonText = id => {
  const savedData = JSON.parse(localStorage.getItem('savedData')) || [];
  const existingMovie = savedData.find(movie => movie.id === id);
  return existingMovie && existingMovie.queue ? 'Remove from Queue' : 'Queue';
};

const initializeModal = () => {
  const galleryElements = document.querySelectorAll('.gallery__items');

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
      const galleryItem = document.querySelector('.gallery__items.selected');
      handleWatched(galleryItem);
    });
  }

  if (queueButton) {
    queueButton.addEventListener('click', () => {
      const galleryItem = document.querySelector('.gallery__items.selected');
      handleQueue(galleryItem);
    });
  }
};

export { openModal, initializeModal, handleSave };
