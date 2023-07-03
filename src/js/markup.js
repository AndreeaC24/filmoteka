import { getGenres } from './fetchGenre';
import { clearGallery } from './galleryClear';

const nullPoster = `https://tacm.com/wp-content/uploads/2018/01/no-image-available.jpeg`;

const handleResponse = (data, isPopular = false, genreList) => {
  if (!data.results) {
    console.error('Invalid API response');
    return;
  }
  clearGallery();

  const galleryElement = getGalleryElement();
  if (!galleryElement) {
    return;
  }

  const markup = data.results.map((result, index) => {
      if (isPopular) {
        return markupGalleryItem(result, index, genreList, true);
      } else {
        return markupGalleryItem(result, index, genreList);
      }
    }).join('');
  galleryElement.insertAdjacentHTML('beforeend', markup);
};

const markupGalleryItem = (result, index, genreList, isPopular = false) => {
  const { title, release_date, poster_path, genre_ids, id, vote_average } = result;
  const coverUrl = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : nullPoster;
  const genres = genre_ids ? getGenres(genre_ids, genreList) : ['Unknown'];
  const year = release_date ? release_date.slice(0, 4) : 'N/A';

  let voteClass = '';
  if (vote_average < 5) {
    voteClass = 'red-vote';
  } else if (vote_average > 5) {
    voteClass = 'green-vote';
  }
  return ` 
    <li class="movie__gallery__items ${voteClass}" data-id="${id}">
      <ul class="movie__gallery__details">
        <li class="movie__gallery__details--img">
          <img src="${coverUrl}" alt="${title}" loading="lazy" /> 
        </li>
        <li class="movie__gallery__details--title">${title}</li> 
        <li class="movie__gallery__details--genres">${genres.join(', ')}</li>
        <li class="movie__gallery__details--year">${year}</li> 
      </ul>  
      <span class="movie__gallery__vote">${vote_average.toFixed(2)}</span>
    </li>
  `;
};

const getGalleryElement = () => document.querySelector('.movie__gallery');

export { handleResponse, markupGalleryItem, getGalleryElement, nullPoster };
