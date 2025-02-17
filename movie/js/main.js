import { API_Token } from "../config.js";

const bearerToken = API_Token; 
       
        async function fetchMovies(url) {
            try {
                const response = await axios.get(url, {
                    headers: { Authorization: `Bearer ${bearerToken}` }
                });
                return response.data.results;
            } catch (error) {
                console.error('Error fetching movie data:', error);
            }
        }

        
        function renderMovies(movies, containerId, isPopular = false) {
            const container = document.getElementById(containerId);
            container.innerHTML = '';  

            movies.forEach(movie => {
                const movieCard = document.createElement('div');
                movieCard.className = isPopular ? 'popular-card relative fade-in' : 'top-rated-card relative fade-in';
                movieCard.innerHTML = `
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="w-full h-full">
                    <div class="details">
                        <h3 class="text-left">${movie.title}</h3>
                        <p><span class="star-rating">${renderStars(movie.vote_average)}</span></p>
                    </div>
                `;
                movieCard.addEventListener('click', () => {
                    window.location.href = `detail.html?id=${movie.id}`;
                });
                container.appendChild(movieCard);
            });
        }

        
        function renderStars(rating) {
            const fullStars = Math.floor(rating / 2);
            const emptyStars = 5 - fullStars;
            let stars = '';

            for (let i = 0; i < fullStars; i++) {
                stars += '<span>★</span>';
            }
            for (let i = 0; i < emptyStars; i++) {
                stars += '<span>☆</span>';
            }

            return stars;
        }

        
        fetchMovies('https://api.themoviedb.org/3/movie/top_rated').then(movies => {
            renderMovies(movies, 'topRatedMovies');
        });

        
        fetchMovies('https://api.themoviedb.org/3/movie/popular').then(movies => {
            renderMovies(movies, 'popularMovies', true);
        });


const apiEndpoints = {
  search: 'https://api.themoviedb.org/3/search/movie',
};

const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');


searchInput.addEventListener('input', async (e) => {
  const query = e.target.value;
  if (query.length > 2) {
    try {
      const response = await fetch(`${apiEndpoints.search}?query=${query}`, {
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
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