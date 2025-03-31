import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RewordThisPage from './pages/RewordThisPage';
import AdminLogin from './pages/admin/AdminLogin';
import WaitlistDashboard from './pages/admin/WaitlistDashboard';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reword-this" element={<RewordThisPage />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedAdminRoute>
              <WaitlistDashboard />
            </ProtectedAdminRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
