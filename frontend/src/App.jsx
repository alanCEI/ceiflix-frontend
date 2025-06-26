import { useState } from "react";
import { Routes, Route, Link, NavLink } from "react-router";

import HomePage from "./pages/HomePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import WatchedListPage from "./pages/WatchedListPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  const [user, setUser] = useState(null);
  const [watchedMovies, setWatchedMovies] = useState([]);
  
  const handleLogin = (email) => {
    setUser({
      id: 1,
      name: "Usuario Demo",
      email,
      avatar: "https://placehold.co/100x100/e8e8e8/2e2e2e?text=UD",
    });
  };

  const handleRegister = (name, email) => {
    setUser({
      id: Date.now(),
      name,
      email,
      avatar: `https://placehold.co/100x100/e8e8e8/2e2e2e?text=${name.charAt(
        0
      )}`,
    });
  };

  const handleLogout = () => {
    setUser(null);
    setWatchedMovies([]);
  };

  const handleWatchedToggle = (movieToAddOrRemove) => {
    setWatchedMovies((prevWatched) => {
      const isWatched = prevWatched.some((m) => m.id === movieToAddOrRemove.id);
      if (isWatched) {
        return prevWatched.filter((m) => m.id !== movieToAddOrRemove.id);
      } else {
        return [...prevWatched, { ...movieToAddOrRemove, userRating: 0 }];
      }
    });
  };

  const handleRateMovie = (movieId, rating) => {
    setWatchedMovies((prevWatched) =>
      prevWatched.map((movie) =>
        movie.id === movieId ? { ...movie, userRating: rating } : movie
      )
    );
  };

  const appContext = {
    user,
    watchedMovies,
    handleLogin,
    handleRegister,
    handleLogout,
    handleWatchedToggle,
    handleRateMovie,
  };

  return (
    
      <div className="min-h-screen bg-gray-900 text-white font-sans">
        <nav className="bg-gray-800 shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="text-2xl font-bold text-red-600">
                  CEIFLiX
                </Link>
                <div className="hidden md:block ml-10">
                  <div className="flex items-baseline space-x-4">
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        `px-3 py-2 rounded-md text-sm font-medium ${
                          isActive
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700"
                        }`
                      }
                    >
                      Inicio
                    </NavLink>
                    {user && (
                      <NavLink
                        to="/watched"
                        className={({ isActive }) =>
                          `px-3 py-2 rounded-md text-sm font-medium ${
                            isActive
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700"
                          }`
                        }
                      >
                        Mi Lista
                      </NavLink>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                {user ? (
                  <>
                    <span className="text-gray-300 mr-3 hidden md:block">
                      {user.name}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="ml-4 px-3 py-1 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="space-x-2">
                    <Link
                      to="/login"
                      className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="px-3 py-2 rounded-md text-sm font-medium bg-red-600 hover:bg-red-700 text-white"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        <main className="">
          <Routes>
            <Route path="/" element={<HomePage context={appContext} />} />
            <Route
              path="/movie/:movieId"
              element={<MovieDetailsPage context={appContext} />}
            />
            <Route
              path="/watched"
              element={<WatchedListPage context={appContext} />}
            />
            <Route path="/login" element={<LoginPage context={appContext} />} />
            <Route
              path="/register"
              element={<RegisterPage context={appContext} />}
            />
          </Routes>
        </main>
      </div>
    
  );
}

export default App;
