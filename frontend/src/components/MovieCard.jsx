// src/components/MovieCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function MovieCard({ movie, onWatchedToggle, isWatched, context }) {
  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onWatchedToggle) {
      onWatchedToggle(movie);
    }
  };

  return (
    <Link to={`/movie/${movie.id}`} className="block bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105 group">
      <div className="relative">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-auto object-cover aspect-[2/3]"
          onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/500x750?text=Error'; }}
        />
        {context.user && onWatchedToggle && (
            <button
              onClick={handleToggle}
              className={`absolute top-2 right-2 p-2 rounded-full text-white transition-opacity duration-300 md:opacity-0 group-hover:opacity-100 ${isWatched ? 'bg-red-600 hover:bg-red-700' : 'bg-black bg-opacity-50 hover:bg-opacity-75'}`}
              title={isWatched ? 'Quitar de mi lista' : 'Añadir a mi lista'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d={isWatched ? "M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" : "M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"} clipRule="evenodd" />
              </svg>
            </button>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold truncate" title={movie.title}>{movie.title}</h3>
        <div className="flex justify-between items-center text-sm text-gray-400 mt-1">
          <span>{movie.releaseDate ? movie.releaseDate.substring(0, 4) : 'N/A'}</span>
          <span className="flex items-center font-bold text-yellow-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {movie.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
