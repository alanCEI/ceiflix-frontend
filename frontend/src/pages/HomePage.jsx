import React, { useState, useEffect } from 'react';
import { getPopularMovies } from '../services/api';
import MovieCard from '../components/MovieCard';

function HomePage({ context }) {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const movies = await getPopularMovies({ signal: controller.signal });
        setPopularMovies(movies);
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
    return () => controller.abort();
  }, []);

  if (loading) return <div className="text-center p-10 text-xl">Cargando películas...</div>;
  if (error) return <div className="text-center p-10 text-xl text-red-500">Error: {error}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">Películas Populares</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {popularMovies.map(movie => (
          <MovieCard 
            key={movie.id}
            movie={movie}
            context={context}
            onWatchedToggle={context.handleWatchedToggle}
            isWatched={context.watchedMovies.some(m => m.id === movie.id)}
          />
        ))}
      </div>
    </div>
  );
}
export default HomePage;