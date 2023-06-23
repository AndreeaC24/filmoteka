import { openModal, initializeModal } from './modal.js';

function markupGalleryItem(movieData) {
  const { cover, title, genre, year } = movieData;

  const itemContent = `
    <div class="gallery__items">
      <div class="gallery__items__img">
        <img src="${cover}" alt="${title}" />
      </div>
      <div class="gallery__items__details">
        <h3 class="gallery__items__details--title">${title}</h3>
        <p class="gallery__items__details--genres">${genre}</p>
        <p class="gallery__items__details--year">${year}</p>
      </div>
    </div>
  `;

  return itemContent;
}

function displaySavedMovies() {
  const savedMoviesList = document.getElementById('savedMoviesList');
  //console.log(savedMoviesList);
  const savedData = JSON.parse(localStorage.getItem('savedData'));
  if (savedData && Array.isArray(savedData)) {
    savedData.forEach(movieData => {
      const movieItem = document.createElement('li');
      movieItem.classList.add('save-movie__items');
      movieItem.setAttribute('data-id', movieData.id);

      const itemContent = markupGalleryItem(movieData);
      movieItem.innerHTML = itemContent;

      movieItem.addEventListener('click', () => {
        openModal(movieData.id);
        console.log(movieData.id);
        initializeModal();
      });

      savedMoviesList.appendChild(movieItem);
    });
  }
}

function displayQueueMovies() {
  const queueMoviesList = document.getElementById('queueMoviesList');
  console.log(queueMoviesList);
  const savedData = JSON.parse(localStorage.getItem('savedData'));

  if (savedData && Array.isArray(savedData)) {
    savedData.forEach(movieData => {
      const movieItem = document.createElement('li');
      movieItem.classList.add('queue-movie__items');
      movieItem.setAttribute('data-id', movieData.id);

      const itemContent = markupGalleryItem(movieData);
      movieItem.innerHTML = itemContent;

      movieItem.addEventListener('click', () => {
        openModal(movieData.id);
        console.log(movieData.id);
        initializeModal();
      });

      queueMoviesList.appendChild(movieItem);
    });
  }
}

export { displaySavedMovies, displayQueueMovies };
