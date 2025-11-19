
import React from 'react';
import SEO from '../components/SEO';

const RecruitmentPage: React.FC = () => {
  return (
    <div className="pt-24 pb-12">
      <SEO 
        title="Casting & Recrutement | AURA PARIS" 
        description="Rejoignez l'aventure Aura Paris. Nous ne cherchons pas des mannequins, mais des personnalités authentiques. Postulez maintenant." 
      />
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
                <h1 className="text-4xl tracking-wider">ON NE CHERCHE PAS UN MANNEQUIN. ON VOUS CHERCHE, VOUS.</h1>
                <p>
                    Oubliez les standards, les podiums et les poses figées. Chez Aura Paris, nous célébrons l'authenticité brute, l'énergie de la 'girl next door', la beauté qui ne s'excuse pas d'être réelle.
                </p>
                <p>
                    Nous ne recrutons pas des modèles, nous révélons des Auras. Et la prochaine pourrait être la vôtre.
                </p>

                <h2 className="text-2xl mt-8">Nous offrons :</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li>Une expérience professionnelle dans un univers bienveillant et créatif.</li>
                    <li>Un contrat à la mission, avec une rémunération horaire attractive, définie selon le type de shooting.</li>
                    <li>Une chance unique de devenir l'égérie de nos futures campagnes et de lancer votre carrière.</li>
                </ul>
                
                <h2 className="text-2xl mt-8">Le profil idéal, c'est vous :</h2>
                 <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li>Jeunes femmes entre 18 et 25 ans.</li>
                    <li>Toutes les morphologies sont les bienvenues. Votre corps est le bon.</li>
                    <li>Aucune expérience requise. L'authenticité est votre seul CV.</li>
                    <li>Que vous soyez étudiante, artiste, ou que vous cherchiez simplement votre voie, votre histoire nous intéresse.</li>
                </ul>

                 <p className="mt-8 font-semibold">
                    Prête à révéler votre Aura ? Postulez via notre canal sécurisé.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentPage;