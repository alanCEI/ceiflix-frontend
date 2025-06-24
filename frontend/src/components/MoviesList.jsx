import { useState, useEffect } from 'react';
import { getMoviesFromBackend } from '../services/movies.service.js';

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    getMoviesFromBackend().then(data => {
      setMovies(data);
      setLoading(false);
    });
  }, []); 

  if (loading) {
    return <h1>Cargando películas...</h1>;
  }


  return (
    <div>
      <h1>Películas en Cartelera</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
        {movies.map(movie => (
          <div key={movie.id} style={{ border: '1px solid gray', padding: '10px', width: '200px' }}>
            <img 
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
              alt={movie.title}
              style={{ width: '100%' }}
            />
            <h4>{movie.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesList;