import React, { useState } from 'react';

const ShareIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
    </svg>
);

const SocialShare: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent("Découvrez Aura Paris, une nouvelle ère de la mode.");

  const shareLinks = [
    { name: 'Facebook', url: `https://www.facebook.com/sharer/sharer.php?u=${url}` },
    { name: 'X', url: `https://twitter.com/intent/tweet?url=${url}&text=${text}` },
    { name: 'LinkedIn', url: `https://www.linkedin.com/sharing/share-offsite/?url=${url}` },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {isOpen && (
            <div className="flex flex-col gap-2 mb-2 animate-fade-in-up">
                {shareLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-black px-4 py-2 rounded-full text-xs font-semibold hover:bg-gray-200 transition-all shadow-lg uppercase tracking-wider"
                    >
                        {link.name}
                    </a>
                ))}
            </div>
        )}
        <button 
            onClick={() => setIsOpen(!isOpen)}
            className="bg-white text-black p-4 rounded-full hover:bg-gray-200 transition-transform hover:scale-105 shadow-lg"
            aria-label="Share"
        >
            <ShareIcon className="w-5 h-5" />
        </button>
    </div>
  );
};

export default SocialShare;