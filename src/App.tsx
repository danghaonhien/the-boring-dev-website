import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import RewordThisPage from './pages/RewordThisPage';
import AdminLogin from './pages/admin/AdminLogin';
import WaitlistDashboard from './pages/admin/WaitlistDashboard';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import Slide01ProjectPage from './pages/BoringDesign/BoringSlides/Slide01ProjectPage';
import Slide02ProjectPage from './pages/BoringDesign/BoringSlides/Slide02ProjectPage';
import Slide03ProjectPage from './pages/BoringDesign/BoringSlides/Slide03ProjectPage';
import DesignSystem01ProjectPage from './pages/BoringDesign/BoringDesignSystem/DesignSystem01ProjectPage';
import Interaction01ProjectPage from './pages/BoringDesign/BoringInteractions/Interaction01ProjectPage';
import './App.css';

function App() {

  useEffect(() => {
    const mobileBreakpoint = 768; // Tailwind's default md breakpoint
    const htmlElement = document.documentElement;

    const updateMobileTheme = () => {
      const isMobile = window.innerWidth < mobileBreakpoint;

      if (isMobile) {
        // Force light mode on mobile by removing the dark class
        if (htmlElement.classList.contains('dark')) {
          htmlElement.classList.remove('dark');
          // Optional: Set a flag to remember dark *would* have been active
          // htmlElement.dataset.forcedLight = 'true';
        }
      } else {
        // On desktop, remove the forced light flag (if used)
        // delete htmlElement.dataset.forcedLight;

        // Allow main theme logic to re-apply 'dark' if needed.
        // This script only *removes* dark on mobile.
        // Ensure your theme init/toggle logic correctly handles
        // adding 'dark' back based on preference (e.g., from localStorage)
        // when transitioning from mobile to desktop.
      }
    };

    // Debounce resize listener
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateMobileTheme, 150);
    };

    // Initial check
    updateMobileTheme();

    // Listen for resize events
    window.addEventListener('resize', handleResize);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      // Optional: Clean up dataset flag
      // delete htmlElement.dataset.forcedLight;
    };
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/reword-this" element={<RewordThisPage />} />
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
  );
}

export default App;
