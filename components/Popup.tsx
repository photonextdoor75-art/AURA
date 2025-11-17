
import React from 'react';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity"
      onClick={onClose}
    >
      <div
        className="bg-black border border-gray-700 p-8 rounded-lg shadow-2xl text-center max-w-sm mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-white mb-6">{message}</p>
        <button
          onClick={onClose}
          className="bg-white text-black px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors"
        >
          Fermer
        </button>
      </div>
    </div>
  );
};

export default Popup;
