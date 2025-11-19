import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center transition-opacity duration-500">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-light tracking-[0.3em] text-white animate-pulse">
          AURA PARIS
        </h1>
        <div className="mt-6 h-px w-0 bg-gradient-to-r from-transparent via-white to-transparent mx-auto animate-[width_2s_ease-in-out_forwards]" style={{ width: '100px' }}></div>
      </div>
    </div>
  );
};

export default Loader;