import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RewordThisPage from './pages/RewordThisPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reword-this" element={<RewordThisPage />} />
      </Routes>
    </Router>
  );
}

export default App;
