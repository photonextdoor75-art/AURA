
import React, { useState } from 'react';
import SEO from '../components/SEO';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Renseignement',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // Enregistrement dans la collection 'messages' de Firestore
      await addDoc(collection(db, "messages"), {
        ...formData,
        createdAt: serverTimestamp(),
        source: 'website_contact_form'
      });

      setStatus('success');
      setFormData({ name: '', email: '', subject: 'Renseignement', message: '' });
    } catch (error) {
      console.error("Erreur lors de l'envoi : ", error);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-12 bg-black">
      <SEO 
        title="Contactez-nous | AURA PARIS" 
        description="Une question ? Une candidature ? Contactez l'équipe Aura Paris directement." 
      />
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Informations de gauche */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-light tracking-wider text-white mb-6">NOUS CONTACTER</h1>
              <div className="h-1 w-20 bg-pink-900 mb-8"></div>
              <p className="text-gray-300 text-lg font-light leading-relaxed">
                Pour toute demande presse, partenariat ou information sur nos collections, veuillez utiliser le formulaire sécurisé.
              </p>
            </div>

            <div className="space-y-4 text-gray-400 font-light">
              <p>
                <span className="block text-white font-medium uppercase tracking-widest text-xs mb-1">Email Direct</span>
                casting.auraparis@protonmail.com
              </p>
              <p>
                <span className="block text-white font-medium uppercase tracking-widest text-xs mb-1">Siège Social</span>
                Paris, VIIIe Arrondissement<br/>
                (Adresse privée sur rendez-vous)
              </p>
            </div>
          </div>

          {/* Formulaire de droite */}
          <div className="bg-white bg-opacity-5 border border-gray-800 p-8 rounded-lg backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Votre Nom</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-black bg-opacity-50 border border-gray-700 text-white p-3 focus:border-white focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Votre Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-black bg-opacity-50 border border-gray-700 text-white p-3 focus:border-white focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Sujet</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-black bg-opacity-50 border border-gray-700 text-white p-3 focus:border-white focus:outline-none transition-colors"
                >
                  <option value="Renseignement">Renseignement Général</option>
                  <option value="Presse">Presse & Médias</option>
                  <option value="Casting">Problème Candidature</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-black bg-opacity-50 border border-gray-700 text-white p-3 focus:border-white focus:outline-none transition-colors resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'submitting' || status === 'success'}
                className={`w-full py-4 px-8 uppercase tracking-[0.2em] text-xs font-bold transition-all duration-300 ${
                  status === 'success' 
                    ? 'bg-green-900 text-white cursor-default' 
                    : 'bg-white text-black hover:bg-gray-200'
                }`}
              >
                {status === 'submitting' ? 'Envoi en cours...' : status === 'success' ? 'Message Envoyé' : 'Envoyer'}
              </button>

              {status === 'error' && (
                <p className="text-red-500 text-xs text-center mt-4">Une erreur est survenue. Veuillez réessayer.</p>
              )}
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;
