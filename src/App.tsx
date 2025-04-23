import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import RewordThisPage from './pages/RewordThisPage';
import AdminLogin from './pages/admin/AdminLogin';
import WaitlistDashboard from './pages/admin/WaitlistDashboard';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import SignUpPage from './pages/Auth/SignUpPage';
import SignInPage from './pages/Auth/SignInPage';
import Slide01ProjectPage from './pages/BoringDesign/BoringSlides/Slide01ProjectPage';
import Slide02ProjectPage from './pages/BoringDesign/BoringSlides/Slide02ProjectPage';
import Slide03ProjectPage from './pages/BoringDesign/BoringSlides/Slide03ProjectPage';
import DesignSystem01ProjectPage from './pages/BoringDesign/BoringDesignSystem/DesignSystem01ProjectPage';
import Interaction01ProjectPage from './pages/BoringDesign/BoringInteractions/Interaction01ProjectPage';
import { AuthProvider } from './context/AuthContext';
import './App.css';
import UpdatePasswordPage from './pages/Auth/UpdatePasswordPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import { ThemeProvider } from './context/ThemeContext';

function App() {

  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            {/* <Route 
              path="/home" 
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              } 
            /> */}
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />
            <Route path="/reword-this" element={<RewordThisPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<SignInPage />} />
            <Route path="/projects/slide-01" element={<Slide01ProjectPage />} />
            <Route path="/projects/slide-02" element={<Slide02ProjectPage />} />
            <Route path="/projects/slide-03" element={<Slide03ProjectPage />} />
            <Route path="/projects/design-system-01" element={<DesignSystem01ProjectPage />} />
            <Route path="/projects/interaction-01" element={<Interaction01ProjectPage />} />
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
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
