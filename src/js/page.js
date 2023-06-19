import { fetchGenreList } from './fetchGenre';
import { handleResponse } from './markup';  

import { fetchMovies, fetchPopularMovies } from './fetchmvs';


// const showPage = async (page) => {
//   try {
//     // showLoader();

//     const genreList = await fetchGenreList();
//     const popularMovies = await fetchPopularMovies(page);

//     handleResponse(popularMovies, true, genreList);

//     // hideLoader();
//   } catch (error) {
//     console.error('Error', error);
//   }
// };
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
    } catch (error) {
      console.error('Error', error);
    }
  };
 
const paginationButtons = document.querySelectorAll('#pagination-button');

// paginationButtons.forEach((button, index) => {
//   button.addEventListener('click', () => {
//     const page = index + 1;
//     showPage(page);
//   });
// });
paginationButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      const page = index + 1;
      const isSearch = button.dataset.search === 'true'; 
      const searchQuery = ''; 
      showPage(page, isSearch, searchQuery);
    });
  });
export { showPage, paginationButtons };

