
import React from 'react';

const RecruitmentPage: React.FC = () => {
  return (
    <div className="pt-24 pb-12">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="w-full md:w-1/2">
                <img 
                    src="https://picsum.photos/seed/shooting/800/1000" 
                    alt="Fashion photoshoot" 
                    className="rounded-lg shadow-2xl object-cover w-full h-full"
                />
            </div>
            <div className="w-full md:w-1/2 prose prose-invert prose-p:text-gray-300 prose-headings:font-light prose-headings:text-white">
                <h1 className="text-4xl tracking-wider">DEVENEZ LE VISAGE D'AURA PARIS</h1>
                <p>
                    Pour le lancement de notre première collection, nous ne cherchons pas des mannequins. 
                    Nous cherchons des personnalités.
                </p>
                <p>
                    Aura Paris est plus qu'une marque, c'est un état d'esprit. Nous croyons en une mode qui révèle, 
                    qui donne le pouvoir, qui célèbre la confiance en soi.
                </p>

                <h2 className="text-2xl mt-8">Nous offrons :</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li>Une expérience professionnelle dans le monde de la mode.</li>
                    <li>Un contrat à la mission, avec une rémunération attractive et évolutive (20€ net/heure pour commencer).</li>
                    <li>Une chance unique de devenir l'égérie de nos futures campagnes.</li>
                </ul>
                
                <h2 className="text-2xl mt-8">Profil recherché :</h2>
                 <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li>Jeunes femmes entre 18 et 25 ans.</li>
                    <li>Toutes morphologies.</li>
                    <li>Aucune expérience requise. L'authenticité est votre seul CV.</li>
                </ul>

                 <p className="mt-8 font-semibold">
                    Pour postuler, envoyez votre candidature via notre canal sécurisé.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentPage;
