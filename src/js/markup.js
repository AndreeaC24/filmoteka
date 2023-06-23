import { getGenres } from './fetchGenre';
import { fetchGenreList, getGenres } from './fetchGenre';
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

  const markup = data.results
    .map((result, index) => {
      if (isPopular) {
        return markupGalleryItem(result, index, genreList, true);
      } else {
        return markupGalleryItem(result, index, genreList);
      }
    })
    .join('');
  galleryElement.insertAdjacentHTML('beforeend', markup);
};

const markupGalleryItem = (result, index, genreList, isPopular = false) => {
  const { title, release_date, poster_path, genre_ids, id } = result;
  const coverUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : nullPoster;
  const genres = genre_ids ? getGenres(genre_ids, genreList) : ['Unknown'];
  const year = release_date ? release_date.slice(0, 4) : 'N/A';
  return `
    <li class="gallery__items" data-id="${id}">
    <div class="gallery__items__img">
       <img src="${coverUrl}" alt="${title}" loading="lazy" /> 
    </div>
    <div class="gallery__items__details">
      <p class="gallery__items__details--title">
        ${title}
      </p>
      
       <p class="gallery__items__details--genres">
     ${genres.join(', ')}
      </p>

      <p class="gallery__items__details--year">
        ${year}
      </p>
    </div>
  </li>
    `;
};
const getGalleryElement = () => document.querySelector('.gallery');

export { handleResponse, markupGalleryItem, getGalleryElement, nullPoster };
