
import React, { useState, useEffect } from 'react';

// Set a fixed target date 90 days from now.
// This calculation runs only once when the code is first interpreted.
const futureDate = new Date();
futureDate.setDate(futureDate.getDate() + 90);
const TARGET_DATE = futureDate.getTime();


const useCountdown = (targetDate: number) => {
  const [timeLeft, setTimeLeft] = useState(targetDate - new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(targetDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  
  return { days, hours, minutes, seconds };
};

const Countdown: React.FC = () => {
  const { days, hours, minutes, seconds } = useCountdown(TARGET_DATE);

  const formatTime = (time: number) => time.toString().padStart(2, '0');

  return (
    <div className="text-center">
        <p className="text-sm tracking-widest text-gray-400 mb-4">OUVERTURE DANS :</p>
        <div className="flex justify-center items-center space-x-4 md:space-x-8">
            <div className="flex flex-col items-center">
                <span className="text-4xl md:text-7xl font-thin tracking-tighter">{formatTime(days)}</span>
                <span className="text-xs text-gray-500 mt-1">Jours</span>
            </div>
             <span className="text-4xl md:text-7xl font-thin text-gray-600">:</span>
            <div className="flex flex-col items-center">
                <span className="text-4xl md:text-7xl font-thin tracking-tighter">{formatTime(hours)}</span>
                <span className="text-xs text-gray-500 mt-1">Heures</span>
            </div>
             <span className="text-4xl md:text-7xl font-thin text-gray-600">:</span>
            <div className="flex flex-col items-center">
                <span className="text-4xl md:text-7xl font-thin tracking-tighter">{formatTime(minutes)}</span>
                <span className="text-xs text-gray-500 mt-1">Minutes</span>
            </div>
             <span className="text-4xl md:text-7xl font-thin text-gray-600">:</span>
            <div className="flex flex-col items-center">
                <span className="text-4xl md:text-7xl font-thin tracking-tighter">{formatTime(seconds)}</span>
                <span className="text-xs text-gray-500 mt-1">Secondes</span>
            </div>
        </div>
    </div>
  );
};

export default Countdown;
