
import React, { useState, useEffect } from 'react';

const Countdown: React.FC = () => {
  // CONSIGNE : Commencer à partir du 15/11/2025 + 90 jours
  // Point de départ : 15 Novembre 2025
  const START_DATE_REF = new Date('2025-11-15T00:00:00').getTime();
  // Durée : 90 Jours (en millisecondes)
  const DURATION_DAYS = 90;
  const DURATION_MS = DURATION_DAYS * 24 * 60 * 60 * 1000;
  
  // CIBLE FINALE = 15/11/2025 + 90 jours
  const TARGET_DATE = START_DATE_REF + DURATION_MS;

  const [timeLeft, setTimeLeft] = useState(TARGET_DATE - Date.now());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const interval = setInterval(() => {
      const now = Date.now();
      const distance = TARGET_DATE - now;
      setTimeLeft(distance);

      if (distance < 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [TARGET_DATE]);

  const isFinished = timeLeft <= 0;
  const displayTime = isFinished ? 0 : timeLeft;

  // Calcul des unités de temps
  const days = Math.floor(displayTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor((displayTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((displayTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((displayTime % (1000 * 60)) / 1000);

  const formatTime = (time: number) => time.toString().padStart(2, '0');

  if (!isClient) {
      return null; 
  }

  return (
    <div className="text-center">
      {isFinished ? (
        <div className="mb-8 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-light tracking-[0.2em] text-white">BIENVENUE</h2>
            <div className="h-px w-24 bg-white mx-auto my-6"></div>
            <p className="text-lg text-gray-300 font-light uppercase tracking-widest">L'ère Aura commence maintenant.</p>
        </div>
      ) : (
        <p className="text-xs md:text-sm font-medium tracking-[0.3em] text-gray-400 mb-8 uppercase">
            Lancement Officiel : Hiver 2026
        </p>
      )}
      
      <div className="flex justify-center items-start space-x-4 md:space-x-10 text-white">
        {/* Jours */}
        <div className="flex flex-col items-center">
          <span className="text-4xl md:text-7xl font-thin tracking-tighter tabular-nums leading-none">
            {formatTime(days)}
          </span>
          <span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest mt-2">Jours</span>
        </div>

        <span className="text-2xl md:text-5xl font-thin text-gray-600 mt-2 md:mt-4">:</span>

        {/* Heures */}
        <div className="flex flex-col items-center">
          <span className="text-4xl md:text-7xl font-thin tracking-tighter tabular-nums leading-none">
            {formatTime(hours)}
          </span>
          <span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest mt-2">Heures</span>
        </div>

        <span className="text-2xl md:text-5xl font-thin text-gray-600 mt-2 md:mt-4">:</span>

        {/* Minutes */}
        <div className="flex flex-col items-center">
          <span className="text-4xl md:text-7xl font-thin tracking-tighter tabular-nums leading-none">
            {formatTime(minutes)}
          </span>
          <span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest mt-2">Minutes</span>
        </div>

        <span className="text-2xl md:text-5xl font-thin text-gray-600 mt-2 md:mt-4">:</span>

        {/* Secondes */}
        <div className="flex flex-col items-center">
          <span className="text-4xl md:text-7xl font-thin tracking-tighter tabular-nums leading-none w-[1.5em]">
            {formatTime(seconds)}
          </span>
          <span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest mt-2">Secondes</span>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
