import { fetchMovies } from './fetchmvs';
import { handleResponse } from './markup';

const searchForm = document.querySelector('#form__search');
const searchError = document.querySelector('#searchError');
let currentPage = 1;
let searchQuery = '';

searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  const newSearchQuery = searchForm.querySelector('[name="searchQuery"]').value;
  if (newSearchQuery === '') {
    searchError.textContent = 'Please write something';
    return;
  } else {
    searchError.textContent = '';
  }

  if (searchQuery !== newSearchQuery) {
    searchQuery = newSearchQuery;
    currentPage = 1;
    clearGallery();
  }
  try {
    const response = await fetchMovies(searchQuery, currentPage);
    handleResponse(response);
    if (currentPage === 1 && !response.results.length) {
      searchError.textContent =
        'Search result not successful. Enter the correct movie name.';
    }
    searchForm.reset();
  } catch (error) {
    console.error(error);
    searchError.textContent = 'Error occurred. Please try again later.';
  }
});

const clearGallery = () => {
  const galleryElement = document.querySelector('.gallery');
  if (galleryElement) {
    galleryElement.innerHTML = '';
  }
};
