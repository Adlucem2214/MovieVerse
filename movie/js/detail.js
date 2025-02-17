import { API_Token } from "../config.js";

const API_TOKEN = API_Token; 


const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');
const apiEndpoints = {
    search: 'https://api.themoviedb.org/3/search/movie',
    details: 'https://api.themoviedb.org/3/movie/',
  };


async function fetchMovieDetails() {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
      }
    });
    const data = await response.json();
    renderMovieDetails(data);
  } catch (error) {
    console.error('Error fetching movie details:', error);
  }
}


async function fetchMovieTrailer() {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
      }
    });
    const data = await response.json();
    renderTrailer(data.results);
  } catch (error) {
    console.error('Error fetching movie trailer:', error);
  }
}


function renderMovieDetails(movie) {
  document.getElementById('movie-title').textContent = movie.title;
  document.getElementById('movie-rating').textContent = `⭐ ${movie.vote_average}`;
  document.getElementById('movie-runtime').textContent = `${movie.runtime} min`;
  document.getElementById('movie-genres').textContent = `# ${movie.genres.map(genre => genre.name).join(' # ')}`;
  document.getElementById('movie-overview').textContent = movie.overview;


  const backdropUrl = `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`;
  document.getElementById('movie-details').style.backgroundImage = `url('${backdropUrl}')`;
}


function renderTrailer(videos) {
  const trailer = videos.find(video => video.type === 'Trailer');
  if (trailer) {
    document.getElementById('trailer-video').src = `https://www.youtube.com/embed/${trailer.key}`;
  }
}


document.getElementById('trailer-button').addEventListener('click', (e) => {
  e.preventDefault(); 
  document.getElementById('trailer-section').scrollIntoView({ behavior: 'smooth' });
});


const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

searchInput.addEventListener('input', async (e) => {
  const query = e.target.value;
  if (query.length > 2) {
    const response = await fetch(`${apiEndpoints.search}?query=${query}`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
      }
    });
    const data = await response.json();
    displaySearchResults(data.results);
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
  results.forEach(movie => {
    const resultCard = document.createElement('div');
    resultCard.className = 'search-result-card';
    resultCard.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
      <h3>${movie.title}</h3>
    `;
    resultCard.addEventListener('click', () => {
      window.location.href =  `detail.html?id=${movie.id}`;
    });
    searchResults.appendChild(resultCard);
  });
  searchResults.classList.add('active');
}


window.onload = () => {
  fetchMovieDetails();
  fetchMovieTrailer();
};