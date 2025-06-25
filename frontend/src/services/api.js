const API_BASE_URL = "https://api.themoviedb.org/3";
const API_TOKEN = import.meta.env.VITE_TOKEN_API_TMDB;
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

const fetchFromAPI = async (endpoint, options = {}) => {
  if (!API_TOKEN || API_TOKEN === "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODVhZjk4MDFhOTc5OGYxNjU2MzY1OTciLCJ1c2VybmFtZSI6IkFsZWphbmRybyIsImlhdCI6MTc1MDc5MjgwMCwiZXhwIjoxNzUwODAwMDAwfQ.rDJVS044VuCWy7JpuhpNL9O4r7ZjzxTJr4GvmEPffYA") {
    throw new Error("El token de API de TMDB no está configurado.");
  }

  const config = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    ...options,
  };

  const response = await fetch(`${API_BASE_URL}/${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.status_message || "Error al conectar con la API de TMDB."
    );
  }
  return response.json();
};

const processMovieData = (movie) => ({
  id: movie.id,
  title: movie.title,
  poster: movie.poster_path
    ? `${IMAGE_BASE_URL}w500${movie.poster_path}`
    : "https://placehold.co/500x750?text=No+Poster",
  backdrop: movie.backdrop_path
    ? `${IMAGE_BASE_URL}w1280${movie.backdrop_path}`
    : "https://placehold.co/1280x720?text=No+Backdrop",
  overview: movie.overview || "Sin descripción disponible.",
  rating: movie.vote_average.toFixed(1),
  releaseDate: movie.release_date,
  genres: movie.genres ? movie.genres.map((g) => g.name) : [], // Para detalles
});

export const getPopularMovies = async (options) => {
  const data = await fetchFromAPI(
    "movie/popular?language=es-ES&page=1",
    options
  );
  return data.results.map(processMovieData);
};

export const getMovieDetails = async (movieId, options) => {
  const data = await fetchFromAPI(`movie/${movieId}?language=es-ES`, options);
  return processMovieData(data);
};
