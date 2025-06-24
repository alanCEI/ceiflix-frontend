import React from 'react';
import { Routes, Route } from 'react-router';
import Home from './components/Home.jsx';

function App() {
  return (
    <div className="App bg-gray-900 min-h-screen text-white">
      <header className="p-4 bg-gray-800 shadow-md">
        <h1 className="text-3xl font-bold text-center text-red-500">
          Ceiflix
        </h1>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;