
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import RecruitmentPage from './pages/RecruitmentPage';
import ContactPage from './pages/ContactPage';

const App: React.FC = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/devenez-modele" element={<RecruitmentPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;