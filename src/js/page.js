import { fetchGenreList } from './fetchGenre';
import Pagination from 'tui-pagination';
import { handleResponse } from './markup';
import {fetchMovies, fetchPopularMovies, fetchrated,} from './fetchmvs';
import { clearGallery } from './galleryClear';
import { searchQuery } from './search';
import { initializeModal } from './modal';

const currentPage = 1;
const popularButton = document.querySelector('.movie__popular__items[value="popular"]');
const topRatedButton = document.querySelector('.movie__popular__items[value="top-rated"]'); 
const nodeList = document.querySelectorAll('.movie__gallery__items');

const showPage = async (page, isSearch = false, searchQuery = '') => {
  try {
    const genreList = await fetchGenreList();
    let response;
    if (isSearch) {
      response = await fetchMovies(searchQuery, page);
    } else {
      response = await fetchPopularMovies(page);
    }
    handleResponse(response, isSearch, genreList);
    initializeModal();
  } catch (error) {
    console.error('Error', error);
  }
};
const showTopRated = async page => {
  try {
    const genreList = await fetchGenreList();
    const response = await fetchrated(page);
    handleResponse(response, false, genreList);
    initializeModal();
  } catch (error) {
    console.error('Error', error);
  }
};
const moviePopularSection = document.querySelector('.movie__popular');
const movieTopRatedSection = document.querySelector('.movie__popular');

const container = document.getElementById('pagination');
const options = {
  totalItems: 20000,
  itemsPerPage: 20,
  visiblePages: 5,
  page: currentPage,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
};

const pagination = new Pagination(container, options); 
const initializePagination = () => {
  pagination.on('afterMove', async event => {
    const newPage = event.page;
    if (newPage > 500) {
      pagination.movePageTo(500);
      return;
    }
    clearGallery();
    if (popularButton.classList.contains('active')) {
      await showPage(newPage);
    } else if (topRatedButton.classList.contains('active')) {
      await showTopRated(newPage);
    }
    if (searchQuery !== '') {
      await showPage(newPage, true, searchQuery); 
      const nodeList = document.querySelectorAll('.movie__gallery__items');  
      if (nodeList.length === 0 && newPage !== 1) {
        pagination.movePageTo(1);  
      }
    } 
    moviePopularSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    movieTopRatedSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  pagination.movePageTo(currentPage);
};
export { showPage, showTopRated, initializePagination, pagination, options };
