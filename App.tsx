import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import RecruitmentPage from './pages/RecruitmentPage';
import ContactPage from './pages/ContactPage';
import StoryPage from './pages/StoryPage';
import Loader from './components/Loader';
import SocialShare from './components/SocialShare';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simule un temps de chargement pour l'expérience utilisateur
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-black min-h-screen text-white">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/notre-histoire" element={<StoryPage />} />
              <Route path="/devenez-modele" element={<RecruitmentPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
          <SocialShare />
        </>
      )}
    </div>
  );
};

export default App;