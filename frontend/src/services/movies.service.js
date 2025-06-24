// Leemos la dirección del backend desde el archivo .env del frontend
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getMoviesFromBackend = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/movies`);
    const data = await response.json();
    return data.data.results; // Devolvemos solo la lista de películas
  } catch (error) {
    console.error("ERROR: No se pudo conectar con el backend.", error);
  }
};