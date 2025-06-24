import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";

const Loader = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-500"></div>
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="text-center p-4 my-4 bg-red-900 text-white rounded-lg shadow-md">
    <p>
      <span className="font-bold">Error:</span> {message}
    </p>
  </div>
);

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          signal,
        };

        const response = await fetch(`${apiUrl}/movies`, options);

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();

        if (data.status === "ok") {
          setMovies(data.data.results);
        } else {
          throw new Error(
            data.msg || "Error al obtener las películas desde el backend"
          );
        }
      } catch (e) {
        if (e.name === "AbortError") {
          console.log("Petición fetch abortada.");
        } else {
          console.error("Error al obtener las películas:", e);
          setError(e.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();

    return () => {
      abortController.abort();
    };
  }, [apiUrl]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Películas en cartelera
      </h2>
      {error && <ErrorMessage message={error} />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Home;
