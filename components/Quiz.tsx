import React, { useState, useEffect } from 'react';

interface QuizProps {
  isOpen: boolean;
  onClose: () => void;
}

const quizData = [
    {
        question: "L'amphi est bondé, le cours est interminable. Votre esprit s'échappe. Où va-t-il ?",
        backgroundUrl: 'https://picsum.photos/seed/paris/1920/1080',
        choices: [
            "Sur un rooftop à New York, un cocktail à la main, dominant la ville.",
            "Dans une crique secrète en Thaïlande, loin de tout, le soleil sur la peau.",
            "Au volant d'une décapotable, sur une route déserte de Californie, la musique à fond."
        ]
    },
    {
        question: "Vous êtes à une soirée dans un manoir. Vous découvrez une porte dérobée avec une pancarte : 'NE PAS ENTRER'. Que faites-vous ?",
        backgroundUrl: 'https://picsum.photos/seed/door/1920/1080',
        choices: [
            "Je respecte l'interdit. Ce n'est pas ma place.",
            "J'attends que personne ne regarde et je jette un coup d'œil rapide, juste par curiosité.",
            "Je l'ouvre sans hésiter. Les meilleures histoires commencent toujours par un avertissement."
        ]
    },
    {
        question: "Vous recevez un message d'un inconnu. Il contient juste une adresse, une heure, et ces mots : 'Si vous voulez vraiment vivre, soyez-y.' Votre premier réflexe ?",
        backgroundUrl: 'https://picsum.photos/seed/message/1920/1080',
        choices: [
            "Bloquer le numéro. C'est sûrement une arnaque ou un danger.",
            "C'est intrigant, mais trop risqué. Je n'irai pas.",
            "Le cœur qui bat. L'adrénaline. C'est la seule réponse qui compte. J'y vais."
        ]
    },
    {
        question: "Une seule nuit pour changer de vie. Vous choisissez :",
        backgroundUrl: 'https://picsum.photos/seed/casino/1920/1080',
        choices: [
            "Une rencontre avec un artiste célèbre qui pourrait devenir votre mentor.",
            "Un vol de dernière minute pour une destination inconnue, sans plan de retour.",
            "Une partie de poker clandestine à très hauts enjeux où vous misez tout ce que vous avez."
        ]
    }
];

type QuizStep = 'question' | 'calculating' | 'result' | 'submitted';

const Quiz: React.FC<QuizProps> = ({ isOpen, onClose }) => {
    const [currentStep, setCurrentStep] = useState<QuizStep>('question');
    const [questionIndex, setQuestionIndex] = useState(0);
    const [instagram, setInstagram] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (!isOpen) {
            // Reset state when closed
            setTimeout(() => {
                setQuestionIndex(0);
                setCurrentStep('question');
                setInstagram('');
                setEmail('');
            }, 500); // Delay reset to allow for closing animation
        }
    }, [isOpen]);
    
    const handleAnswerClick = () => {
        if (questionIndex < quizData.length - 1) {
            setQuestionIndex(prev => prev + 1);
        } else {
            setCurrentStep('calculating');
            setTimeout(() => {
                setCurrentStep('result');
            }, 5000);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setCurrentStep('submitted');
        setTimeout(() => {
            onClose();
        }, 3000);
    };

    if (!isOpen) {
        return null;
    }
    
    const currentQuestion = quizData[questionIndex];

    const renderContent = () => {
        switch (currentStep) {
            case 'question':
                return (
                     <>
                        <div className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000" style={{ backgroundImage: `url(${currentQuestion.backgroundUrl})` }}></div>
                        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                        <div className="relative z-10 text-center p-8 max-w-3xl">
                             <h2 className="text-3xl md:text-4xl font-light text-white mb-12">{currentQuestion.question}</h2>
                             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {currentQuestion.choices.map((choice, index) => (
                                    <button 
                                        key={index} 
                                        onClick={handleAnswerClick}
                                        className="bg-black bg-opacity-40 border border-gray-700 text-white px-6 py-4 rounded-lg hover:bg-white hover:text-black transition-colors duration-300"
                                    >
                                        {choice}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </>
                );
            case 'calculating':
                 return (
                    <>
                        <div className="absolute inset-0 bg-black"></div>
                        <div className="relative z-10 text-center">
                            <h2 className="text-3xl font-light tracking-widest animate-pulse">CALCUL DE VOTRE PROFIL AURA...</h2>
                        </div>
                    </>
                 );
             case 'result':
                return (
                    <>
                         <div className="absolute inset-0 bg-black"></div>
                         <div className="relative z-10 text-center p-8 max-w-lg">
                            <h2 className="text-3xl font-light tracking-wider mb-4">PROFIL IDENTIFIÉ.</h2>
                            <p className="text-gray-300 mb-8">
                                Votre Aura est rare. Votre combinaison de réponses a débloqué un potentiel que nous recherchons activement. 
                                Pour recevoir votre profil détaillé et valider votre chance d'être choisie, laissez-nous le canal pour vous contacter. 
                                Les Auras les plus puissantes seront contactées personnellement.
                            </p>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <input 
                                    type="text"
                                    value={instagram}
                                    onChange={(e) => setInstagram(e.target.value)}
                                    placeholder="@Instagram"
                                    required
                                    className="w-full bg-transparent border-b border-gray-600 text-white p-2 text-center focus:border-white focus:outline-none transition-colors"
                                />
                                <input 
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    required
                                    className="w-full bg-transparent border-b border-gray-600 text-white p-2 text-center focus:border-white focus:outline-none transition-colors"
                                />
                                <button 
                                    type="submit"
                                    className="w-full bg-white text-black px-8 py-3 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors duration-300"
                                >
                                    RÉVÉLER MON AURA
                                </button>
                            </form>
                         </div>
                    </>
                );
            case 'submitted':
                 return (
                    <>
                        <div className="absolute inset-0 bg-black"></div>
                        <div className="relative z-10 text-center p-8 max-w-lg">
                             <h2 className="text-3xl font-light">MERCI.</h2>
                            <p className="text-gray-300 mt-4">Si votre Aura correspond, nous vous contacterons.</p>
                        </div>
                    </>
                );
        }
    }


    return (
        <div className={`fixed inset-0 bg-black z-50 flex items-center justify-center transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            {renderContent()}
        </div>
    );
};

export default Quiz;