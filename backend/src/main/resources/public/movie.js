const params = new URLSearchParams(window.location.search);
const movieId = params.get('id');

const container = document.getElementById('movie-details');
const backBtn = document.getElementById('back');

backBtn.addEventListener('click', () => {
    window.history.back();
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

// 2️⃣ Fetch movie details
const urlParams = new URLSearchParams(window.location.search);

fetchWithCache(`/api/movie?id=${movieId}`)
    .then(movie => renderMovieDetails(movie))
    .catch(err => console.error(err));

// 3️⃣ Render function
function renderMovieDetails(movie) {
    const container = document.getElementById('movie-details');
    container.innerHTML = `
    <h1>${movie.title}</h1>
    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
    <p>${movie.overview}</p>
    <button onclick="window.history.back()">Back</button>
  `;
}