
import React, { useState } from 'react';
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

const Header: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleLockedClick = () => {
    setIsPopupOpen(true);
  };

  const navLinkClasses = "px-4 py-2 transition-colors duration-300";
  const activeLinkClasses = "text-white";
  const inactiveLinkClasses = "text-gray-400 hover:text-white";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-light tracking-widest">
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
                    to="/nous-recrutons"
                    className={({ isActive }) =>
                      `${navLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`
                    }
                >
                    <span className="relative z-10">NOUS RECRUTONS</span>
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
          </div>
        </nav>
      </header>
      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        message="Un peu de patience... L'icône se dévoilera à la fin du compte à rebours."
      />
    </>
  );
};

export default Header;
