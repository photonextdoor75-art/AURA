
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Popup from './Popup';

const LockIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-4 w-4 inline-block ml-1 transition-opacity duration-300 ${className}`}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 2a3 3 0 00-3 3v1H6a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2V8a2 2 0 00-2-2h-1V5a3 3 0 00-3-3zM8 5a2 2 0 114 0v1H8V5z"
      clipRule="evenodd"
    />
  </svg>
);

const MenuIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
);
  
const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className}`} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"/>
    </svg>
);

const Header: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const handleLockedClick = () => {
    setIsMenuOpen(false);
    setIsPopupOpen(true);
  };

  const closeMenu = () => setIsMenuOpen(false);

  const navLinkClasses = "px-4 py-2 transition-colors duration-300";
  const activeLinkClasses = "text-white";
  const inactiveLinkClasses = "text-gray-400 hover:text-white";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-light tracking-widest" onClick={closeMenu}>
            AURA PARIS
          </Link>
          <div className="hidden md:flex items-center space-x-2 text-sm uppercase tracking-wider">
            <div className="relative group">
              <button
                onClick={handleLockedClick}
                className="px-4 py-2 text-gray-500 cursor-pointer flex items-center"
              >
                Prêt-à-porter
                <LockIcon className="opacity-0 group-hover:opacity-100" />
              </button>
            </div>
            <div className="relative group">
              <button
                onClick={handleLockedClick}
                className="px-4 py-2 text-gray-500 cursor-pointer flex items-center"
              >
                Bikinis
                <LockIcon className="opacity-0 group-hover:opacity-100" />
              </button>
            </div>
            <div className="relative group">
               <button
                onClick={handleLockedClick}
                className="px-4 py-2 text-gray-500 cursor-pointer flex items-center"
              >
                Lingerie
                <LockIcon className="opacity-0 group-hover:opacity-100" />
              </button>
            </div>
            <div className="relative">
                 <NavLink
                    to="/devenez-modele"
                    className={({ isActive }) =>
                      `${navLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`
                    }
                >
                    <span className="relative z-10">DEVENEZ MODÈLE</span>
                    <span className="absolute -inset-1 bg-pink-300 opacity-20 blur-lg animate-pulse"></span>
                 </NavLink>
            </div>
             <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `${navLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`
                }
            >
              Contact
            </NavLink>
             <a href="#" target="_blank" rel="noopener noreferrer" className={`${inactiveLinkClasses} ${navLinkClasses}`}>
                <InstagramIcon />
            </a>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(true)} aria-label="Open menu">
              <MenuIcon />
            </button>
          </div>
        </nav>
      </header>
      
      {/* Mobile Menu Overlay */}
       <div
        className={`fixed inset-0 bg-black z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
             <Link to="/" className="text-2xl font-light tracking-widest" onClick={closeMenu}>
                AURA PARIS
            </Link>
            <button onClick={closeMenu} aria-label="Close menu">
                <CloseIcon />
            </button>
        </div>
        <div className="flex flex-col items-center justify-center h-full -mt-16 space-y-8 text-xl uppercase tracking-widest">
            <button onClick={handleLockedClick} className="text-gray-400 hover:text-white transition-colors">Prêt-à-porter</button>
            <button onClick={handleLockedClick} className="text-gray-400 hover:text-white transition-colors">Bikinis</button>
            <button onClick={handleLockedClick} className="text-gray-400 hover:text-white transition-colors">Lingerie</button>
            <NavLink to="/devenez-modele" onClick={closeMenu} className={({ isActive }) => `${isActive ? activeLinkClasses : inactiveLinkClasses}`}>DEVENEZ MODÈLE</NavLink>
            <NavLink to="/contact" onClick={closeMenu} className={({ isActive }) => `${isActive ? activeLinkClasses : inactiveLinkClasses}`}>Contact</NavLink>
             <div className="absolute bottom-16">
                 <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                    <InstagramIcon className="h-8 w-8" />
                </a>
            </div>
        </div>
      </div>

      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        message="Un peu de patience... L'icône se dévoilera à la fin du compte à rebours."
      />
    </>
  );
};

export default Header;