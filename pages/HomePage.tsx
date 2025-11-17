import React, { useState, useEffect } from 'react';
import Countdown from '../components/Countdown';
import Quiz from '../components/Quiz';

const backgroundImages = [
  'https://picsum.photos/seed/robe/1920/1080', // Le décolleté plongeant d'une robe en satin.
  'https://picsum.photos/seed/hanche/1920/1080', // La découpe audacieuse d'un maillot de bain sur une hanche.
  'https://picsum.photos/seed/dentelle/1920/1080', // La dentelle d'un body en transparence.
  'https://picsum.photos/seed/bikini/1920/1080', // La lanière d'un bikini qui se noue dans le dos.
];

const HomePage: React.FC = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isQuizOpen, setIsQuizOpen] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(timer);
    }, []);

  return (
    <>
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-12">
        {/* Background Slideshow */}
        <div className="absolute inset-0 z-0">
            {backgroundImages.map((src, index) => (
                 <div
                    key={src}
                    className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
                    style={{ 
                        backgroundImage: `url(${src})`,
                        opacity: index === currentImageIndex ? 1 : 0
                    }}
                 />
            ))}
             <div className="absolute inset-0 bg-black bg-opacity-50 filter backdrop-blur-xl"></div>
        </div>
      
        {/* Foreground Content */}
        <div className="relative z-10 p-8 max-w-3xl w-full text-center">
            <h1 className="text-5xl md:text-7xl font-light tracking-widest mb-4">AURA PARIS</h1>
            <p className="text-lg italic text-gray-300 mb-12">"La mode n'est pas faite pour se cacher."</p>
            <div className="bg-black bg-opacity-50 p-6 md:p-10 rounded-lg">
                <Countdown />
            </div>
        </div>

        {/* Quiz Section */}
        <div className="relative z-10 mt-16 p-8 max-w-3xl w-full text-center bg-black bg-opacity-20 rounded-lg">
            <h2 className="text-3xl font-light tracking-wider text-white">QUEL TYPE D'AURA GIRL ÊTES-VOUS ?</h2>
            <p className="text-gray-300 mt-4 max-w-xl mx-auto">
                Oubliez ce que vous croyez savoir sur vous-même. En chaque femme sommeille une énergie secrète. 
                Une Aura qui ne demande qu'à être révélée. Ce test n'est pas un jeu. C'est une porte. 
                Découvrez la vôtre et, peut-être, soyez choisie pour devenir notre égérie et remporter 1000€ de bons d'achat.
            </p>
            <button 
                onClick={() => setIsQuizOpen(true)}
                className="mt-8 bg-white text-black px-8 py-3 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors duration-300"
            >
                DÉVOILER VOTRE AURA
            </button>
        </div>
    </div>
    <Quiz isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </>
  );
};

export default HomePage;