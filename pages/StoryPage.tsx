import React, { useEffect, useRef, useState } from 'react';
import SEO from '../components/SEO';

interface SectionData {
    id: number;
    imageUrl: string;
    title?: string;
    paragraphs: string[];
}

const storyData: SectionData[] = [
    {
        id: 1,
        imageUrl: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg',
        title: "LA MODE EST MORTE D'ENNUI.",
        paragraphs: ["C'est par ce constat qu'est née Aura Paris."]
    },
    {
        id: 2,
        imageUrl: 'https://images.pexels.com/photos/3155736/pexels-photo-3155736.jpeg',
        paragraphs: [
            "L'histoire ne commence pas à Paris, mais dans un penthouse surplombant le désert doré. Un groupe d'entrepreneurs et d'influenceurs parmi les plus secrets du monde s'y est réuni. Le même constat sur toutes les lèvres : l'ennui.",
            "Las de voir des millions de jeunes femmes magnifiquement complexes, intenses et dangereuses, forcées de s'habiller comme tout le monde.",
            "Cette nuit-là, ils n'ont pas décidé de créer une marque. Ils ont décidé de lancer une chasse."
        ]
    },
    {
        id: 3,
        imageUrl: 'https://images.pexels.com/photos/9748831/pexels-photo-9748831.jpeg',
        paragraphs: [
            "La mission d'Aura Paris est simple : trouver les exceptions.",
            "Celles qui ne suivent pas les tendances, mais qui pourraient en devenir une. Celles dont l'énergie brute et l'impatience magnifique crèvent l'écran. Celles qui, comme nous, s'ennuient mortellement dans un monde qui manque de saveur.",
            "Nous ne créons pas des vêtements pour tout le monde. Nous créons des uniformes pour celles qui ont décidé de ne plus jouer selon les règles."
        ]
    },
    {
        id: 4,
        imageUrl: 'https://images.pexels.com/photos/3314930/pexels-photo-3314930.jpeg',
        paragraphs: [
            "Nos collections sont conçues pour la \"fille de vendredi soir\". La Déesse de la Nuit.",
            "Nos vêtements ne sont pas faits pour le lundi matin. Ils sont faits pour que le lundi matin ait enfin un goût de victoire.",
            "Aura Paris n'est pas une marque que l'on porte. C'est un cercle que l'on rejoint.",
            "La vraie question n'est pas si vous voulez de nous. C'est de savoir si nous voulons de vous."
        ]
    }
];

const FadeInSection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Stop observing once visible to avoid re-triggering (optional, keeps it cleaner)
                    if (domRef.current) observer.unobserve(domRef.current);
                }
            });
        }, { threshold: 0.5 }); // Trigger when 50% visible

        if (domRef.current) {
            observer.observe(domRef.current);
        }

        return () => {
            if (domRef.current) observer.unobserve(domRef.current);
        };
    }, []);

    return (
        <div
            ref={domRef}
            className={`transition-all duration-1000 ease-out transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
        >
            {children}
        </div>
    );
};

const StoryPage: React.FC = () => {
    return (
        <div className="w-full bg-black">
            <SEO 
                title="Notre Histoire | AURA PARIS" 
                description="L'origine d'Aura Paris. La chasse aux exceptions commence ici." 
            />
            {storyData.map((section) => (
                <section 
                    key={section.id} 
                    className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
                >
                    {/* Background Parallax Image */}
                    <div 
                        className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat bg-fixed"
                        style={{ backgroundImage: `url(${section.imageUrl})` }}
                    />
                    
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 z-0 bg-black bg-opacity-60" />

                    {/* Content */}
                    <div className="relative z-10 container mx-auto px-6 max-w-4xl text-center">
                        <FadeInSection>
                            {section.title && (
                                <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-[#E0C097] mb-8 leading-tight">
                                    {section.title}
                                </h1>
                            )}
                            <div className="space-y-6">
                                {section.paragraphs.map((paragraph, index) => (
                                    <p 
                                        key={index} 
                                        className="text-gray-200 text-lg md:text-xl lg:text-2xl font-light leading-relaxed tracking-wide"
                                    >
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </FadeInSection>
                    </div>
                </section>
            ))}
        </div>
    );
};

export default StoryPage;