import { useState, useEffect } from "react";
import "./index.css";

const API_URL = "http://localhost:3001/movies";

function App() {
  const [movies, setMovies] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          signal: controller.signal,
        };

        const response = await fetch(API_URL, options);

        if (!response.ok) {
          throw new Error("La respuesta de la red no fue válida");
        }

        const data = await response.json();

        if (data.status === "ok") {
          setMovies(data.data.results);
        } else {
          throw new Error(
            "El formato de la respuesta de la API no es el esperado"
          );
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();

    return () => {
      controller.abort();
    };
  }, []);

  if (loading) {
    return <p className="message">Cargando películas...</p>;
  }

  if (error) {
    return <p className="message error">Error: {error}</p>;
  }

  return (
    <div className="container">
      <h1>Ceiflix</h1>
      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
