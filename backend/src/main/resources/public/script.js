let currentPage = 1;
let totalPages = 1;

const moviesDiv = document.getElementById('movies');
const pageInfo = document.getElementById('page-info');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

function loadMovies(page) {
    fetchWithCache(`/api/movies?page=${page}`)
        .then(data => renderMovies(data))
        .catch(err => console.error(err));
}

prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        loadMovies(currentPage - 1);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
        loadMovies(currentPage + 1);
    }
});

async function fetchWithCache(url) {
    const cached = localStorage.getItem(url);
    if (cached) {
        return JSON.parse(cached);
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const text = await res.text();
    if (!text) throw new Error("Empty response");

    const data = JSON.parse(text);
    localStorage.setItem(url, JSON.stringify(data));
    return data;
}

// ---------- 2. Favorites helpers ----------
function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
}

function saveFavorites(favs) {
    localStorage.setItem('favorites', JSON.stringify(favs));
}

function toggleFavorite(id) {
    const favs = getFavorites();
    const index = favs.indexOf(id);
    if (index >= 0) {
        favs.splice(index, 1); // remove
    } else {
        favs.push(id); // add
    }
    saveFavorites(favs);
}

// ---------- 3. Render function ----------
function renderMovies(data) {
    const moviesDiv = document.getElementById('movies');
    moviesDiv.innerHTML = '';

    const favorites = getFavorites();

    data.results.forEach(movie => {
        const div = document.createElement('div');
        div.className = 'movie-card';

        const isFav = favorites.includes(movie.id);

        div.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <span class="favorite ${isFav ? 'active' : ''}">★</span>
    `;

        div.addEventListener('click', () => {
            window.location.href = `/movie.html?id=${movie.id}`;
        });

        div.querySelector('.favorite').addEventListener('click', e => {
            e.stopPropagation();
            toggleFavorite(movie.id);
            e.target.classList.toggle('active');
        });

        moviesDiv.appendChild(div);
    });
}

// ---------- 4. Fetch and render ----------
let page = 1;

fetchWithCache(`/api/movies?page=${page}`)
    .then(data => renderMovies(data))
    .catch(err => console.error(err));

// initial load
loadMovies(currentPage);
