import { openModal, initializeModal } from './modal.js';

function markupGalleryItem(movieData) {
    const { cover, title, genre, year, vote_average } = movieData;
    let voteClass = '';
    if (vote_average < 5) {
      voteClass = 'red-vote';
    } else if (vote_average > 5) {
      voteClass = 'green-vote';
  }
  const itemContent = `
      <div class="movie__gallery__items ${voteClass}">
      <ul class="movie__gallery__details">
      <li class="movie__gallery__details--img">
          <img src="${cover}" alt="${title}" />
        </li> 
        <li class="movie__gallery__details--title">${title}</li>
        <li class="movie__gallery__details--genres">${genre}</li>
        <li class="movie__gallery__details--year">${year}</li> 
        </ul>
        <span class="movie__gallery__vote">${vote_average}</span>
      </div>
  `;
  return itemContent;
}

function displayWatchedMovies() {
  const savedMoviesList = document.getElementById('savedMoviesList');
  const savedData = JSON.parse(localStorage.getItem('savedData'));

  if (savedData && Array.isArray(savedData)) {
    savedData.forEach(movieData => {
      if (movieData.watched) {
        const movieItem = document.createElement('li');
        movieItem.classList.add('save-movie__items');
        movieItem.setAttribute('data-id', movieData.id);

        const itemContent = markupGalleryItem(movieData);
        movieItem.innerHTML = itemContent;

        movieItem.addEventListener('click', () => {
          openModal(movieData.id);
          initializeModal();
        });

        savedMoviesList.appendChild(movieItem);
      }
    });
  }
}

function displayQueueMovies() {
  const queueMoviesList = document.getElementById('queueMoviesList');
  const savedData = JSON.parse(localStorage.getItem('savedData'));

  if (savedData && Array.isArray(savedData)) {
    savedData.forEach(movieData => {
      if (movieData.queue) {
        const movieItem = document.createElement('li');
        movieItem.classList.add('queue-movie__items');
        movieItem.setAttribute('data-id', movieData.id);

        const itemContent = markupGalleryItem(movieData);
        movieItem.innerHTML = itemContent;

        movieItem.addEventListener('click', () => {
          openModal(movieData.id);
          initializeModal();
        });
        queueMoviesList.appendChild(movieItem);
      }
    });
  }
}

export { displayWatchedMovies, displayQueueMovies };