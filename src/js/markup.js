import { getGenres } from './fetchGenre'; 

const nullPoster = `https://tacm.com/wp-content/uploads/2018/01/no-image-available.jpeg`;

const handleResponse = (data, isPopular = false, genreList) => {
  if (!data.results) {
    console.error('Invalid API response');
    return;
  }

  const galleryElement = getGalleryElement();
  if (!galleryElement) {
    return;
  }

  const markup = data.results
    .map((result, index) => {
      if (isPopular) {
        return markupGalleryItem(result, index, genreList);
      } 
      else {
        return markupGalleryItem(result, index, genreList);
      }
    })
    .join('');
  galleryElement.insertAdjacentHTML('beforeend', markup);
};


const markupGalleryItem = (result, index, genreList, isPopular = false) => {
  const { title, release_date, poster_path, genre_ids } = result;
  const coverUrl = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : nullPoster;
  const genres = genre_ids ? getGenres(genre_ids, genreList) : ['Unknown'];
  const year = release_date ? release_date.slice(0, 4) : 'N/A';
  return `
    <li class="gallery__items">
    <div class="gallery__items__img">
      <a href="${coverUrl}" data-lightbox="group-${index}">
        <img src="${coverUrl}" alt="${title}" loading="lazy" />
      </a>
    </div>
    <div class="gallery__items__details">
      <p class="gallery__items__details--info">
        <b>${title}</b>
      </p>
      
       <p class="gallery__items__details--info">
      <b>Genres: ${genres.join(', ')}</b>
      </p>

      <p class="gallery__items__details--info">
        <b>${year}</b>
      </p>
    </div>
  </li>
    `;
};
const getGalleryElement = () => document.querySelector('.gallery');
export { handleResponse, markupGalleryItem };
