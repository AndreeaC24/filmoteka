
import {fetchMovieDetails }from './fetchmvs'; 

const modal = document.querySelector(".modal");
const modalContent = modal.querySelector(".modal__content"); 

const toggleModal = () => {
  modal.classList.toggle("modal__is-hidden");
};

const createModalContent = (movie) => {
    //console.log(movie);
    const genres = movie.genres ? movie.genres.map(genre => genre.name) : ['Unknown'];

    const coverUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : nullPoster;
    //console.log(movie.genre_ids);
    const markup = `
        <ul>
            <li> 
                <img src="${coverUrl}" alt="${movie.title}" loading="lazy" style="height:200px; width:200px;" />
            </li>
            <li>
                <p class="gallery__items__details--info">
                    <b>Genres: ${genres.join(", ")}</b>
                </p>
            </li>
            <li>
                <p>${movie.overview}</p>
            </li>
            <li>
                <p>Vote Average: ${movie.vote_average}</p>
                <p>Vote Count: ${movie.vote_count}</p>
            </li>
        </ul>
    `;

    modalContent.innerHTML = markup;
};


const openModal = async (movieId) => {
    console.log("Open modal called with ID:", movieId);  
  
    const movie = await fetchMovieDetails(movieId);
  
    if (movie) {
      createModalContent(movie);
      toggleModal();
    }
  };
  
  const initializeModal = () => {
    const galleryElements = document.querySelectorAll(".gallery__items");
    galleryElements.forEach((element) => {
      element.addEventListener("click", async (event) => {
        const movieId = event.currentTarget.dataset.id;
        //const movie = await fetchMovieDetails(movieId);
        openModal(movieId);
      });
    });
  
    const closeModalBtn = document.querySelector("[data-modal-close]");
    if (closeModalBtn) {
      closeModalBtn.addEventListener("click", toggleModal);
    }
  };

export { openModal, initializeModal };
