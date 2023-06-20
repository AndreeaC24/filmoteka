import { fetchGenreList } from './fetchGenre';
import { handleResponse } from './markup';
import { fetchMovies, fetchPopularMovies } from './fetchmvs';

const btnsContainer = document.querySelector('.number-buttons');
const createButtons2 = (page, numberButtonsContainer) => {
  numberButtonsContainer.innerHTML = '';

  if (currentPage < 5) {
    for (let i = 2; i <= 6; i++) {
      const pageBtn = createButton(i - 1);
      if (currentPage === i - 1) {
        pageBtn.classList.add('active');
      }
      numberButtonsContainer.appendChild(pageBtn);
    }
    createNextButton();
    createPreviousButton();
    if (currentPage !== page) {
      numberButtonsContainer.appendChild(createButton(page));
    }
  } else if (currentPage >= 3 && currentPage < page) {
    numberButtonsContainer.appendChild(createButton(1));
    createNextButton();
    createPreviousButton();
    for (let i = currentPage; i <= currentPage + 1; i++) {
      const pageBtn = createButton(i);
      numberButtonsContainer.appendChild(pageBtn);
    }
    createNextButton();
    createPreviousButton();
    if (currentPage !== page) {
      numberButtonsContainer.appendChild(createButton(page));
    }
  }
};

const numberButtonsContainer = document.getElementById('numberButtonsContainer');
const currentPage = 1;

createButtons2(currentPage, numberButtonsContainer);
function createButton(num) {
  const btn = document.createElement('button');
  btn.innerText = num;
  btn.classList.add('pagination__button');
  btn.setAttribute('data-page', num);
  return btn;
}
let groupStart = 1;

function createPaginationButtons() {
  const groupSize = 5;
  const startPage = groupStart;
  const endPage = startPage + groupSize - 1;

  const existingButtons = document.querySelectorAll(
    '.number-buttons .pagination__button'
  );
  existingButtons.forEach(button => {
    numberButtonsContainer.removeChild(button);
  });

  for (let i = startPage; i <= endPage; i++) {
    const pageBtn = createButton(i);
    numberButtonsContainer.appendChild(pageBtn);
    pageBtn.addEventListener('click', () => {
      const page = pageBtn.getAttribute('data-page');
      showPage(page);
    });
  }
}
function createNextButton() {
  const nextBtn = document.createElement('button');
  nextBtn.innerText = '►';
  nextBtn.classList.add('next-btn');
  nextBtn.disabled = false;

  nextBtn.addEventListener('click', () => {
    const groupSize = 5;
    groupStart += groupSize;

    createPaginationButtons();
  });

  const container = document.getElementById('numberButtonsContainer');
  container.parentNode.insertBefore(nextBtn, container.nextSibling);
}
function createPreviousButton() {
  const prevBtn = document.createElement('button');
  prevBtn.innerText = '◄';
  prevBtn.classList.add('prev-btn');
  prevBtn.disabled = false;

  prevBtn.addEventListener('click', () => {
    const groupSize = 5;
    groupStart -= groupSize;
    if (groupStart < 1) {
      groupStart = 1;
    }
    createPaginationButtons();
  });

  const container = document.getElementById('numberButtonsContainer');
  container.parentNode.insertBefore(prevBtn, container);
}

createPaginationButtons();

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

const paginationButtons = document.querySelectorAll('.pagination__button');

paginationButtons.forEach(button => {
  button.addEventListener('click', () => {
    const page = button.dataset.page;
    const isSearch = button.dataset.search === 'true';
    const searchQuery = '';
    showPage(page, isSearch, searchQuery);
  });
});

export { showPage, createButtons2, paginationButtons };
