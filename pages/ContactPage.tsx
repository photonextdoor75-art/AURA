
import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="container mx-auto px-6 text-center max-w-2xl">
        <div className="bg-black bg-opacity-30 border border-gray-800 p-10 rounded-lg">
            <h1 className="text-4xl font-light tracking-wider mb-6">CONTACT & CANDIDATURES</h1>
            <p className="text-gray-300 max-w-lg mx-auto mb-8">
                Pour toute question ou pour postuler à notre casting, veuillez nous contacter exclusivement via l'un des canaux suivants. Une réponse vous sera apportée sous 24h.
            </p>
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                    <span className="font-semibold">Email :</span>
                    <a href="mailto:casting.auraparis@protonmail.com" className="text-pink-300 hover:text-white transition-colors duration-300 break-all">
                        casting.auraparis@protonmail.com
                    </a>
                </div>
                 <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                    <span className="font-semibold">Canal direct (Telegram) :</span>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="text-pink-300 hover:text-white transition-colors duration-300">
                        Cliquez ici pour contacter notre Directeur de Casting
                    </a>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
