
import React from 'react';
import SEO from '../components/SEO';
import BurningHeart from '../components/BurningHeart';

const RecruitmentPage: React.FC = () => {
  return (
    <div className="pt-24 pb-12 min-h-screen flex flex-col">
      <SEO 
        title="Casting & Recrutement | AURA PARIS" 
        description="Rejoignez l'aventure Aura Paris. Nous ne cherchons pas des mannequins, mais des personnalités authentiques. Postulez maintenant." 
      />
      <div className="container mx-auto px-6 max-w-5xl flex-grow flex items-center">
        <div className="flex flex-col md:flex-row items-center gap-12 w-full">
            
            {/* Section Animation Coeur */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-start h-[400px] md:h-[600px] relative">
                <BurningHeart />
            </div>

            {/* Section Texte */}
            <div className="w-full md:w-1/2 prose prose-invert prose-p:text-gray-300 prose-headings:font-light prose-headings:text-white">
                <h1 className="text-4xl md:text-5xl tracking-wider mb-8">ON NE CHERCHE PAS UN MANNEQUIN. <br/><span className="italic text-pink-200 opacity-80">ON VOUS CHERCHE, VOUS.</span></h1>
                <p className="text-lg leading-relaxed">
                    Oubliez les standards, les podiums et les poses figées. Chez Aura Paris, nous célébrons l'authenticité brute, l'énergie de la 'girl next door', la beauté qui ne s'excuse pas d'être réelle.
                </p>
                <p className="text-lg leading-relaxed">
                    Nous ne recrutons pas des modèles, nous révélons des Auras. Et la prochaine pourrait être la vôtre.
                </p>

                <div className="my-8 p-6 border-l-2 border-white bg-white bg-opacity-5 rounded-r-lg">
                    <h2 className="text-2xl !mt-0 mb-4">Nous offrons :</h2>
                    <ul className="list-none pl-0 space-y-2 text-gray-300">
                        <li>✦ Une expérience dans un univers bienveillant.</li>
                        <li>✦ Un contrat rémunéré adapté à la mission.</li>
                        <li>✦ Une chance de devenir l'égérie de nos campagnes.</li>
                    </ul>
                </div>
                
                <h2 className="text-2xl mt-8">Le profil idéal ?</h2>
                 <ul className="list-disc pl-5 space-y-2 text-gray-300 marker:text-white">
                    <li>Jeunes femmes entre 18 et 25 ans.</li>
                    <li>Toutes les morphologies sont les bienvenues.</li>
                    <li>Aucune expérience requise. L'authenticité prime.</li>
                </ul>

                 <p className="mt-10 text-xl font-light tracking-wide border-b border-gray-700 pb-2 inline-block">
                    Prête à révéler votre Aura ?
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentPage;
