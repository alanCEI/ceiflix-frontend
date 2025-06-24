import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

function WatchedListPage({ context }) {
  const { user, watchedMovies, handleWatchedToggle } = context;

  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (watchedMovies.length === 0) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold mb-2">Mi Lista de Películas</h1>
        <p className="text-gray-400 text-lg">Aún no has añadido ninguna película.</p>
        <Link to="/" className="mt-6 inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg">Explorar películas</Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Mi Lista ({watchedMovies.length})</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {watchedMovies.map(movie => (
          <MovieCard 
            key={movie.id}
            movie={movie}
            context={context}
            onWatchedToggle={handleWatchedToggle}
            isWatched={true}
          />
        ))}
      </div>
    </div>
  );
}
export default WatchedListPage;