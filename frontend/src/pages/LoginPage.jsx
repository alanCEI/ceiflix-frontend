import { useState } from "react";
import { useNavigate, Link } from "react-router";

function LoginPage({ context }) {
  const [email, setEmail] = useState("demo@ceiflix.com");
  const [password, setPassword] = useState("123456");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    context.handleLogin(email, password);
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <div className="w-full max-w-sm mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          Iniciar Sesión en CEIFLiX
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
          >
            Entrar
          </button>
          <p className="text-center mt-4 text-sm text-gray-400">
            ¿No tienes cuenta?{" "}
            <Link to="/register" className="text-red-500 hover:underline">
              Regístrate aquí
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
export default LoginPage;
