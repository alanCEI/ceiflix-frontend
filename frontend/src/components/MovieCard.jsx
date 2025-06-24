import React from 'react';

function MovieCard({ movie }) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://placehold.co/500x750/1f2937/ef4444?text=No+Disponible';

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <img
        src={imageUrl}
        alt={`Póster de ${movie.title}`}
        className="w-full h-auto object-cover"
        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/500x750/1f2937/ef4444?text=No+Disponible'; }}
      />
      <div className="p-4">
        <h3 className="font-bold text-lg truncate" title={movie.title}>{movie.title}</h3>
        <p className="text-gray-400 text-sm mt-2 line-clamp-3">{movie.overview}</p>
      </div>
    </div>
  );
}

export default MovieCard;