import { fetchMovies } from './fetchmvs';
import { handleResponse } from './markup';
import { fetchGenreList } from './fetchGenre';
import { resetPage } from './galleryClear'; 
import { showPage, initializePagination } from './page';

const searchForm = document.querySelector('#form__search');
const searchError = document.querySelector('#searchError');
const popularButton = document.querySelector('.movie__popular__items[value="popular"]');
const topRatedButton = document.querySelector('.movie__popular__items[value="top-rated"]');
let currentPage = 1;
let searchQuery = '';
let genreList = [];  

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
    resetPage();
    initializePagination(); 
  }  
  try {
    const response = await fetchMovies(searchQuery, currentPage);
    genreList = await fetchGenreList();
    handleResponse(response, true, genreList); 
    await showPage(currentPage, true, searchQuery); 
    popularButton.classList.add('hidden');
    topRatedButton.classList.add('hidden');
    if (currentPage === 1 && !response.results.length) {
      searchError.textContent = 'Please enter the correct movie name.'; 
      document.getElementById('pagination').style.display = 'none';
    }else {
      document.getElementById('pagination').style.display ='';
    }
    searchForm.reset();
  } catch (error) {
    console.error(error);
    searchError.textContent = 'Error occurred. Please try again later.';
  }
});
 
resetPage();

export {searchQuery};