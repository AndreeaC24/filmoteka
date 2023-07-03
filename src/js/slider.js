import { Swiper, Navigation, Autoplay } from 'swiper';
import 'swiper/swiper.scss';
import { fetchTrailer, fetchUpcoming } from './fetchmvs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

let currentPage = 1;
const swiperWrapper = document.querySelector('.swiper-wrapper');

//Responsive breakpoints
const swiper = new Swiper('.swiper', {
  modules: [Navigation, Autoplay],
  slidesPerView: 10,
  spaceBetween: 10,
  autoplay: {
    enabled: true,
    delay: 2000,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
    clickable: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 7,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 5,
    },
    1200: {
      slidesPerView: 7,
      spaceBetween: 7,
    },
  },
});
const markupSlider = data => {
  const markup = data
    .map(({ id, title, poster_path }) => {
      return `
      <li class="swiper-slide">
        <a class="swiper-link" href="#" data-id="${id}">
        <img src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title}" />
        <button class="swiper-backdrop">
            <svg class="swiper-backdrop-icon-play" viewBox="0 0 512 512">
              <path style="fill:#FFFFFF;" d="M187.368,146.928 187.368,355.8 382.992,251.368 "></path> 
              <path style="fill:#DB2B42;" d="M256,0.376C114.616,0.376,0,114.824,0,256s114.616,255.624,256,255.624S512,397.176,512,256 S397.384,0.376,256,0.376z M184.496,146.928l195.624,104.44L184.496,355.8V146.928z"></path>
            </svg>
          </button>
        </a>
      </li>`;
    }).join('');
  swiperWrapper.insertAdjacentHTML('beforeend', markup);
};
const markupLoad = async () => {
  try {
    const { results } = await fetchUpcoming(currentPage);
    markupSlider(results);
    eventSlider();
    for (const movie of results) {
      const trailer = await fetchTrailer(movie.id);
    }
  } catch (error) {
    console.error(error.message);
  }
};
const eventSlider = () => {
  const swiperLinks = document.querySelectorAll('.swiper-link');
  swiperLinks.forEach(link => {
    link.addEventListener('click', async evt => {
      evt.preventDefault();
      const movieId = link.dataset.id;
      if (!movieId) return;
      try {
        const { results } = await fetchTrailer(movieId);
        const { key } = results[results.length - 1];
        const instance = basicLightbox.create(
          `<button id="closeButton">X</button>
            <iframe id="player" type="text/html" src="https://www.youtube.com/embed/${key}?enablejsapi=1&origin=http://example.com"
            frameborder="0" allowfullscreen></iframe>`
        );
        instance.show();
        const closeButton = instance.element().querySelector('#closeButton');
        closeButton.addEventListener('click', () => {
          instance.close();
        });
      } catch (error) {
        console.error(error.message);
      }
    });
  });
};
export { swiper, markupLoad, eventSlider };
