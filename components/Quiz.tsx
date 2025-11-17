import React, { useState, useEffect } from 'react';

interface QuizProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Choice {
    text: string;
    score: number;
}

interface Question {
    question: string;
    backgroundUrl: string;
    choices: Choice[];
}

const quizData: Question[] = [
    {
        question: "L'amphi est bondé, le cours est interminable. Votre esprit s'échappe. Où va-t-il ?",
        backgroundUrl: 'https://picsum.photos/seed/paris/1920/1080',
        choices: [
            { text: "Sur un rooftop à New York, un cocktail à la main, dominant la ville.", score: 2 },
            { text: "Dans une crique secrète en Thaïlande, loin de tout, le soleil sur la peau.", score: 1 },
            { text: "Au volant d'une décapotable, sur une route déserte de Californie, la musique à fond.", score: 3 }
        ]
    },
    {
        question: "Vous êtes à une soirée dans un manoir. Vous découvrez une porte dérobée avec une pancarte : 'NE PAS ENTRER'. Que faites-vous ?",
        backgroundUrl: 'https://picsum.photos/seed/door/1920/1080',
        choices: [
            { text: "Je respecte l'interdit. Ce n'est pas ma place.", score: 1 },
            { text: "J'attends que personne ne regarde et je jette un coup d'œil rapide, juste par curiosité.", score: 2 },
            { text: "Je l'ouvre sans hésiter. Les meilleures histoires commencent toujours par un avertissement.", score: 3 }
        ]
    },
    {
        question: "Vous recevez un message d'un inconnu. Il contient juste une adresse, une heure, et ces mots : 'Si vous voulez vraiment vivre, soyez-y.' Votre premier réflexe ?",
        backgroundUrl: 'https://picsum.photos/seed/message/1920/1080',
        choices: [
            { text: "Bloquer le numéro. C'est sûrement une arnaque ou un danger.", score: 1 },
            { text: "C'est intrigant, mais trop risqué. Je n'irai pas.", score: 2 },
            { text: "Le cœur qui bat. L'adrénaline. C'est la seule réponse qui compte. J'y vais.", score: 3 }
        ]
    },
    {
        question: "Une seule nuit pour changer de vie. Vous choisissez :",
        backgroundUrl: 'https://picsum.photos/seed/casino/1920/1080',
        choices: [
            { text: "Une rencontre avec un artiste célèbre qui pourrait devenir votre mentor.", score: 1 },
            { text: "Un vol de dernière minute pour une destination inconnue, sans plan de retour.", score: 3 },
            { text: "Une partie de poker clandestine à très hauts enjeux où vous misez tout ce que vous avez.", score: 2 }
        ]
    }
];

type QuizStep = 'question' | 'calculating' | 'resultWin' | 'resultLose' | 'submitted';

const Quiz: React.FC<QuizProps> = ({ isOpen, onClose }) => {
    const [currentStep, setCurrentStep] = useState<QuizStep>('question');
    const [questionIndex, setQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [auraPercentage, setAuraPercentage] = useState(0);
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
                setScore(0);
                setAuraPercentage(0);
            }, 500); // Delay reset to allow for closing animation
        }
    }, [isOpen]);
    
    const handleAnswerClick = (choiceScore: number) => {
        const newScore = score + choiceScore;
        setScore(newScore);

        if (questionIndex < quizData.length - 1) {
            setQuestionIndex(prev => prev + 1);
        } else {
            setCurrentStep('calculating');
            setTimeout(() => {
                const threshold = 9;
                if (newScore >= threshold) {
                    setCurrentStep('resultWin');
                } else {
                    const randomPercent = Math.floor(Math.random() * 6) + 10; // 10-15
                    setAuraPercentage(randomPercent);
                    setCurrentStep('resultLose');
                }
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
                                        onClick={() => handleAnswerClick(choice.score)}
                                        className="bg-black bg-opacity-40 border border-gray-700 text-white px-6 py-4 rounded-lg hover:bg-white hover:text-black transition-colors duration-300"
                                    >
                                        {choice.text}
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
                            <h2 className="text-3xl font-light tracking-widest animate-pulse">ANALYSE DE VOTRE AURA...</h2>
                        </div>
                    </>
                 );
             case 'resultWin':
                return (
                    <>
                         <div className="absolute inset-0 bg-black"></div>
                         <div className="relative z-10 text-center p-8 max-w-lg">
                            <h2 className="text-3xl font-light tracking-wider mb-4">VOTRE AURA EST EXCEPTIONNELLE.</h2>
                            <p className="text-gray-300 mb-8">
                                Vous n'êtes pas comme les autres. Votre audace est ce que nous recherchons.
                                Nous vous offrons une opportunité unique : devenir l'un de nos prochains modèles.
                                Un privilège réservé aux profils les plus rares. Si vous êtes prête à saisir cette chance,
                                laissez vos informations. Nous vous contacterons personnellement.
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
                                    SAISIR MA CHANCE
                                </button>
                            </form>
                         </div>
                    </>
                );
            case 'resultLose':
                 return (
                    <>
                        <div className="absolute inset-0 bg-black"></div>
                        <div className="relative z-10 text-center p-8 max-w-lg">
                             <h2 className="text-3xl font-light">VOTRE SCORE D'AUDACE : {auraPercentage}%</h2>
                            <p className="text-gray-300 mt-4 mb-8">
                                Votre Aura est prometteuse, mais elle n'a pas encore révélé toute son audace. 
                                Continuez d'explorer votre potentiel et retentez votre chance bientôt.
                            </p>
                             <button 
                                onClick={onClose}
                                className="bg-white text-black px-8 py-3 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors duration-300"
                            >
                                Fermer
                            </button>
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