import { fetchMovieDetails } from './fetchmvs';
import { nullPoster } from './markup';

const modal = document.querySelector('.modal');
const modalContent = modal.querySelector('.modal-dialog');

const toggleModal = () => {
  modal.classList.toggle('show');
};

const createModalContent = movie => {
  const genres = movie.genres ? movie.genres.map(genre => genre.name) : ['Unknown'];
  const coverUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : nullPoster; 

  const markup = `
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">${movie.title}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <img src="${coverUrl}" alt="${movie.title}" loading="lazy" class="img_movie" />
        <ul class="gallery__modal">
          <li class="vote__count">Vote/Votes: <b class="details">${movie.vote_average}</b>/<b>${movie.vote_count}</b></li>
          <li class="vote__count">Popularity: <b class="details">${movie.popularity}</b></li>
          <li class="vote__count">Original Title: <b class="details">${movie.original_title}</b></li>
          <li class="vote__count">Genre: <b class="details">${genres.join(', ')}</b></li>
          <li class="vote__count">
            <h3 class="details__info">About</h3>
            <p class="text__modal">${movie.overview}</p>
          </li>
        </ul>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn-watched btn btn-primary">${getWatchedButtonText(movie.id)}</button>
        <button type="button" class="btn-queue btn btn-primary">${getQueueButtonText(movie.id)}</button>
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
  console.log('Modal ID:', movieId);

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
    const cover = galleryItem.querySelector('.gallery__items__img img').getAttribute('src');
    const title = galleryItem.querySelector('.gallery__items__details--title').textContent;
    const genre = galleryItem.querySelector('.gallery__items__details--genres').textContent;
    const year = galleryItem.querySelector('.gallery__items__details--year').textContent;

    const movieData = {
      id,
      cover,
      title,
      genre,
      year,
      watched: type === 'watched',
      queue: type === 'queue',
    };

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
  return existingMovie && existingMovie.watched ? 'Remove from Watched' : 'Watched';
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
      handleSave(galleryItem, 'watched');
      watchedButton.textContent = getWatchedButtonText(galleryItem.dataset.id);
    });
  }
  if (queueButton) {
    queueButton.addEventListener('click', () => {
      const galleryItem = document.querySelector('.gallery__items.selected');
     handleSave(galleryItem, 'queue');
      queueButton.textContent = getQueueButtonText(galleryItem.dataset.id);
    });
  }
};

export { openModal, initializeModal, handleSave };
