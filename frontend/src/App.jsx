import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MoviesList from './components/MoviesList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MoviesList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;