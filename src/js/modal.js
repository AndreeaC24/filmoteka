import { fetchMovieDetails } from './fetchmvs'; 
//import { getGalleryElement } from './markup';

const modal = document.querySelector('.modal');
const modalContent = modal.querySelector('.modal__content');

const toggleModal = () => {
  modal.classList.toggle('modal__is-hidden');
};

const createModalContent = movie => {
  const genres = movie.genres ? movie.genres.map(genre => genre.name): ['Unknown'];

  const coverUrl = movie.poster_path  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`: nullPoster;
  //console.log(movie.genre_ids);
  const markup = `
    <section class="section__modal"> 
                <img src="${coverUrl}" alt="${
    movie.title
  }" loading="lazy" class="img_movie" />
  <h1 class="title__modal">${movie.title} </h1>
            <ul  class="ul__list">
           
             <li class="gallery__modal">
                <p class="vote__count">  <b class="details"> Vote/Votes ${
                  movie.vote_average
                }</b></p></li>
               <li class="gallery__modal"> <p class="vote__count"> Vote <b class="details">${
                 movie.vote_count
               }</b></p>
            </li>
            <li class="gallery__modal">
            <p class="vote__count > 
            <b class="details"> popularity ${movie.popularity}</b>
            </p>
            </li>
            <li class="gallery__modal">
            <p class="vote__count>
            <b class="details">  Original Title ${movie.original_title}</b>
            </p>
            </li>
            <li class="gallery__modal">
                <p class="vote__count> 
                 <b class="details"> Genre  ${genres.join(', ')}</b>
                </p>
            </li>
            <li class="gallery__modal">
            <h3 class="details__info">about</h3>
                <p class="text__modal">${movie.overview}</p>
            </li>
           <ul class="button_list">
            <li>
            <button class="modal__button__item-queue" type="button">add to watched</button>
            </li>
            <li>
            <button class="modal__button__item-queue" type="button"> add to queue</button>
            </li>
            </ul>
        </ul>
        </section>
    `;
  modalContent.innerHTML = markup;
};

const openModal = async movieId => {
  console.log('Open modal called with ID:', movieId);

  const movie = await fetchMovieDetails(movieId);

  if (movie) {
    createModalContent(movie);
    toggleModal();
  }
};

const initializeModal = () => {
  const galleryElements = document.querySelectorAll('.gallery__items');
  galleryElements.forEach(element => {
    element.addEventListener('click', async event => {
      const movieId = event.currentTarget.dataset.id;

      openModal(movieId);
    });
  });

  const closeModalBtn = document.querySelector('[data-modal-close]');
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', toggleModal);
  }
};

export { openModal, initializeModal };
