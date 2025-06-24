import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { getMovieDetails } from "../services/api";

function StarRating({ rating, onRate, movieId }) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onRate(movieId, star)}
          className={`text-3xl focus:outline-none ${
            star <= rating ? "text-yellow-400" : "text-gray-600"
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function MovieDetailsPage({ context }) {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isWatched = movie
    ? context.watchedMovies.some((m) => m.id === movie.id)
    : false;
  const watchedMovie = isWatched
    ? context.watchedMovies.find((m) => m.id === movie.id)
    : null;

  useEffect(() => {
    const controller = new AbortController();
    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError("");
        const details = await getMovieDetails(movieId, {
          signal: controller.signal,
        });
        setMovie(details);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
    return () => controller.abort();
  }, [movieId]);

  if (loading)
    return <div className="text-center p-10 text-xl">Cargando detalles...</div>;
  if (error)
    return (
      <div className="text-center p-10 text-xl text-red-500">
        Error: {error}
      </div>
    );
  if (!movie)
    return (
      <div className="text-center p-10 text-xl">Película no encontrada.</div>
    );

  return (
    <div>
      <Link
        to="/"
        className="inline-block mb-6 text-red-500 hover:text-red-400 flex items-center"
      >
        <svg
          className="h-5 w-5 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
        Volver a Inicio
      </Link>
      <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden mb-8">
        <img
          src={movie.backdrop}
          alt={`Fondo de ${movie.title}`}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50"></div>
      </div>
      <div className="md:flex gap-8">
        <div className="md:w-1/3 flex-shrink-0">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-auto rounded-lg shadow-lg -mt-24 md:-mt-32 relative z-10"
          />
        </div>
        <div className="md:w-2/3 mt-6 md:mt-0">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <p className="text-gray-400 mt-1">{movie.releaseDate}</p>
          <div className="flex flex-wrap gap-2 my-4">
            {movie.genres.map((genre) => (
              <span
                key={genre}
                className="bg-gray-700 px-3 py-1 rounded-full text-sm"
              >
                {genre}
              </span>
            ))}
          </div>
          <h2 className="text-2xl font-semibold mt-6 mb-2">Sinopsis</h2>
          <p className="text-gray-300">{movie.overview}</p>

          {context.user && (
            <div className="mt-8">
              <button
                onClick={() => context.handleWatchedToggle(movie)}
                className={`px-6 py-2 rounded font-bold ${
                  isWatched
                    ? "bg-gray-700 text-gray-300"
                    : "bg-red-600 text-white"
                }`}
              >
                {isWatched ? "Quitar de Mi Lista" : "Añadir a Mi Lista"}
              </button>
              {isWatched && watchedMovie && (
                <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                  <p className="text-lg font-semibold mb-2">
                    Valora esta película:
                  </p>
                  <StarRating
                    rating={watchedMovie.userRating}
                    onRate={context.handleRateMovie}
                    movieId={movie.id}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default MovieDetailsPage;
