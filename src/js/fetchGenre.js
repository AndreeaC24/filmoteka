import axios from 'axios';

const API_KEY = '44cd7d40e9c9ffc80f6b2e51bac6d9ee';
const URL = 'https://api.themoviedb.org/3';

const getGenres = (genreIds, genres) => {
  const arr = [];

  for (const id of genreIds) {
    const genre = genres.find(genre => genre.id === id);
    if (genre) {
      arr.push(genre.name);
    }
  }

  if (arr.length === 0) {
    arr.push('Other');
  }

  return arr;
};

const fetchGenreList = async () => {
  try {
    const response = await axios.get(
      `${URL}/genre/movie/list?api_key=${API_KEY}`
    );
    const genres = response.data.genres;
    return genres;
  } catch (error) {
    console.error('Error: ', error);
    return [];
  }
};

export { fetchGenreList, getGenres };
