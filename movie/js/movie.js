import { API_Token } from "../config.js";

const API_TOKEN = API_Token;
const apiEndpoints = {
  trending: 'https://api.themoviedb.org/3/trending/movie/day',
  toprated: 'https://api.themoviedb.org/3/movie/top_rated', // Updated key
  popular: 'https://api.themoviedb.org/3/movie/popular',
  upcoming: 'https://api.themoviedb.org/3/movie/upcoming',
  search: 'https://api.themoviedb.org/3/search/movie',
  details: 'https://api.themoviedb.org/3/movie/',
};

let currentPage = 1;
let currentCategory = 'trending';
let totalPages = 1;

async function fetchMovies() {
  console.log(`Fetching movies for category: ${currentCategory}`); // Log the category
  console.log(`API URL: ${apiEndpoints[currentCategory]}?page=${currentPage}`); // Log the URL

  if (!apiEndpoints[currentCategory]) {
    console.error(`Invalid category: ${currentCategory}`);
    return;
  }

  try {
    const response = await fetch(`${apiEndpoints[currentCategory]}?page=${currentPage}`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(`Data for ${currentCategory}:`, data); // Log API response
    renderMovies(data.results);
    updatePagination(data.page, data.total_pages);
  } catch (error) {
    console.error('Error fetching movie data:', error);
  }
}

function renderMovies(movies) {
  const movieContainer = document.getElementById('movie-container');
  movieContainer.innerHTML = '';
  movies.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.setAttribute('role', 'listitem');
    card.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="w-full h-full object-cover">
    `;
    card.addEventListener('click', () => {
      window.location.href = `detail.html?id=${movie.id}`;
    });
    movieContainer.appendChild(card);
  });
}

function updatePagination(current, total) {
  console.log(`Current Page: ${current}, Total Pages: ${total}`); // Log pagination values
  totalPages = total;
  const prevButton = document.getElementById('prevButton');
  const nextButton = document.getElementById('nextButton');
  prevButton.disabled = current === 1;
  nextButton.disabled = current === total;
}

function changePage(page) {
  if (page < 1 || page > totalPages) {
    console.log(`Invalid page: ${page}`); // Log invalid page attempts
    return;
  }
  currentPage = page;
  console.log(`Changing to page: ${currentPage}`); // Log page change
  fetchMovies();
}

function setCategory(category) {
  console.log(`Setting category to: ${category}`); // Log the category
  currentCategory = category;
  currentPage = 1;
  fetchMovies();
  updateCategoryButtons(category);
}

function updateCategoryButtons(selectedCategory) {
  const buttons = document.querySelectorAll('.category-button');
  buttons.forEach(button => {
    if (button.textContent.toLowerCase().replace(' ', '') === selectedCategory) {
      button.classList.remove('unselected');
      button.classList.add('selected');
    } else {
      button.classList.remove('selected');
      button.classList.add('unselected');
    }
  });
}

// Event listeners
document.querySelectorAll('.category-button').forEach(button => {
  button.addEventListener('click', () => {
    const category = button.textContent.toLowerCase().replace(' ', '');
    console.log(`Button clicked: ${category}`); // Log the button click
    setCategory(category);
  });
});

document.getElementById('prevButton').addEventListener('click', () => changePage(currentPage - 1));
document.getElementById('nextButton').addEventListener('click', () => changePage(currentPage + 1));

const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');


searchInput.addEventListener('input', async (e) => {
  const query = e.target.value;
  if (query.length > 2) {
    try {
      const response = await fetch(`${apiEndpoints.search}?query=${query}`, {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
        }
      });
      const data = await response.json();
      displaySearchResults(data.results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  } else {
    searchResults.classList.remove('active');
  }
});


document.addEventListener('click', (e) => {
  if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
    searchResults.classList.remove('active');
  }
});


function displaySearchResults(results) {
  searchResults.innerHTML = '';
  if (results.length === 0) {
    searchResults.innerHTML = '<p class="text-white p-2">No results found.</p>';
  } else {
    results.forEach(movie => {
      const resultCard = document.createElement('div');
      resultCard.className = 'search-result-card';
      resultCard.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
        <h3>${movie.title}</h3>
      `;
      resultCard.addEventListener('click', () => {
        window.location.href = `detail.html?id=${movie.id}`;
      });
      searchResults.appendChild(resultCard);
    });
  }
  searchResults.classList.add('active');
}

window.onload = () => {
  fetchMovies();
};