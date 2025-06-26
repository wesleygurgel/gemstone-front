import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({
    type: null,
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        type: 'error',
        message: 'Por favor, preencha todos os campos.',
      });
      return;
    }

    // In a real application, you would send this data to your API
    // For now, we'll just simulate a successful submission
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset form
      setFormData({
        name: '',
        email: '',
        message: '',
      });

      // Show success message
      setFormStatus({
        type: 'success',
        message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
      });
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: 'Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.',
      });
    }
  };

  return (
    <section id="contact" className="py-20 bg-black-800 relative overflow-hidden">
      {/* Modern subtle particle background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top left particles */}
        <div className="absolute top-20 left-20 w-1 h-1 rounded-full bg-gem-pink/30"></div>
        <div className="absolute top-40 left-40 w-1.5 h-1.5 rounded-full bg-gem-purple/25"></div>
        <div className="absolute top-60 left-30 w-2 h-2 rounded-full bg-gem-violet/20"></div>
        <div className="absolute top-80 left-50 w-1 h-1 rounded-full bg-gem-blue/30"></div>
        <div className="absolute top-100 left-70 w-1.5 h-1.5 rounded-full bg-gem-cyan/25"></div>

        {/* Bottom right particles */}
        <div className="absolute bottom-20 right-20 w-1.5 h-1.5 rounded-full bg-gem-cyan/30"></div>
        <div className="absolute bottom-40 right-40 w-1 h-1 rounded-full bg-gem-blue/25"></div>
        <div className="absolute bottom-60 right-30 w-2 h-2 rounded-full bg-gem-violet/20"></div>
        <div className="absolute bottom-80 right-50 w-1 h-1 rounded-full bg-gem-purple/30"></div>
        <div className="absolute bottom-100 right-70 w-1.5 h-1.5 rounded-full bg-gem-pink/25"></div>

        {/* Center particles */}
        <div className="absolute top-1/2 left-1/3 w-1 h-1 rounded-full bg-gem-purple/30"></div>
        <div className="absolute top-1/2 left-1/3 translate-x-10 translate-y-10 w-1.5 h-1.5 rounded-full bg-gem-pink/25"></div>
        <div className="absolute top-1/2 left-1/3 translate-x-20 translate-y-20 w-2 h-2 rounded-full bg-gem-blue/20"></div>
        <div className="absolute top-1/2 left-1/3 translate-x-30 translate-y-30 w-1 h-1 rounded-full bg-gem-violet/30"></div>
        <div className="absolute top-1/2 left-1/3 translate-x-40 translate-y-40 w-1.5 h-1.5 rounded-full bg-gem-cyan/25"></div>

        {/* Subtle gradient overlay */}
        <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 bg-gradient-to-br from-gem-pink/5 to-gem-cyan/5 blur-2xl opacity-20"></div>
      </div>

      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gem-pink to-gem-cyan bg-clip-text text-transparent mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Entre em contato com a Gemstone
            </motion.h2>
            <motion.p 
              className="text-xl text-white/80 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Quer saber mais sobre nossos serviços ou iniciar uma parceria? Preencha o formulário abaixo ou entre em contato pelos canais oficiais.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="h-full"
            >
              <a 
                href="https://maps.google.com/?q=417+NW+6th+St,+Downtown,+Miami,+FL+33136,+Estados+Unidos" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-black-900/80 rounded-xl shadow-lg border border-gem-pink/30 flex flex-col h-full relative overflow-hidden group transition-all duration-300 hover:shadow-neon-pink hover:translate-y-[-4px]"
                aria-label="Ver endereço no Google Maps"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-gem-pink to-gem-purple rounded-lg blur opacity-10 group-hover:opacity-30 transition duration-1000"></div>
                <div className="relative flex flex-col h-full">
                  <div className="bg-gradient-to-r from-gem-pink to-gem-purple text-white p-6 flex items-center">
                    <div className="w-14 h-14 bg-black-900 rounded-full flex items-center justify-center mr-4 shadow-md">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gem-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">Endereço</h3>
                  </div>
                  <div className="p-6 flex-grow flex flex-col justify-center items-center text-center">
                    <p className="text-white/90 text-lg mb-1">417 NW 6th St, Downtown</p>
                    <p className="text-white/90 text-lg mb-1">Miami, FL 33136</p>
                    <p className="text-white/90 text-lg">Estados Unidos</p>
                  </div>
                  <div className="p-4 bg-black-800/60 text-gem-pink text-center font-medium border-t border-gem-pink/20 group-hover:bg-black-800/80 transition-colors duration-300">
                    Ver no Google Maps
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="h-full"
            >
              <a 
                href="tel:+17863036211" 
                className="bg-black-900/80 rounded-xl shadow-lg border border-gem-violet/30 flex flex-col h-full relative overflow-hidden group transition-all duration-300 hover:shadow-neon-violet hover:translate-y-[-4px]"
                aria-label="Ligar para Gemstone"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-gem-violet to-gem-blue rounded-lg blur opacity-10 group-hover:opacity-30 transition duration-1000"></div>
                <div className="relative flex flex-col h-full">
                  <div className="bg-gradient-to-r from-gem-violet to-gem-blue text-white p-6 flex items-center">
                    <div className="w-14 h-14 bg-black-900 rounded-full flex items-center justify-center mr-4 shadow-md">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gem-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">Telefone</h3>
                  </div>
                  <div className="p-6 flex-grow flex flex-col justify-center items-center text-center">
                    <p className="text-white/90 text-xl font-medium">+1 (786) 303-6211</p>
                    <p className="text-white/60 mt-2">Disponível em horário comercial</p>
                  </div>
                  <div className="p-4 bg-black-800/60 text-gem-violet text-center font-medium border-t border-gem-violet/20 group-hover:bg-black-800/80 transition-colors duration-300">
                    Ligar agora
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-full"
            >
              <a 
                href="mailto:contact@gemstonemiami.com" 
                className="bg-black-900/80 rounded-xl shadow-lg border border-gem-cyan/30 flex flex-col h-full relative overflow-hidden group transition-all duration-300 hover:shadow-neon-cyan hover:translate-y-[-4px]"
                aria-label="Enviar email para Gemstone"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-gem-blue to-gem-cyan rounded-lg blur opacity-10 group-hover:opacity-30 transition duration-1000"></div>
                <div className="relative flex flex-col h-full">
                  <div className="bg-gradient-to-r from-gem-blue to-gem-cyan text-white p-6 flex items-center">
                    <div className="w-14 h-14 bg-black-900 rounded-full flex items-center justify-center mr-4 shadow-md">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gem-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">Email</h3>
                  </div>
                  <div className="p-6 flex-grow flex flex-col justify-center items-center text-center">
                    <p className="text-white/90 text-xl font-medium">contact@gemstonemiami.com</p>
                    <p className="text-white/60 mt-2">Responderemos em até 24 horas</p>
                  </div>
                  <div className="p-4 bg-black-800/60 text-gem-cyan text-center font-medium border-t border-gem-cyan/20 group-hover:bg-black-800/80 transition-colors duration-300">
                    Enviar email
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </a>
            </motion.div>
          </div>

          <motion.div
            className="mb-12 rounded-lg overflow-hidden shadow-lg border border-gem-violet/30 relative group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-gem-violet to-gem-blue rounded-lg blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
            <div className="relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3592.6878806471!2d-80.20212492394026!3d25.77893770992881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b6a3a4d29c33%3A0x1c5e1d3d5c1d3d5c!2s417%20NW%206th%20St%2C%20Miami%2C%20FL%2033136%2C%20USA!5e0!3m2!1sen!2sbr!4v1650000000000!5m2!1sen!2sbr" 
                width="100%" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Gemstone Location"
                aria-label="Google Maps showing Gemstone's location"
                className="grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              ></iframe>
            </div>
          </motion.div>

          <motion.div
            className="bg-black-900/80 p-8 rounded-lg shadow-lg border border-gem-purple/30 relative group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-gem-pink to-gem-purple rounded-lg blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
            <div className="relative">
              {formStatus.type && (
                <div 
                  className={`mb-6 p-4 rounded-lg ${
                    formStatus.type === 'success' 
                      ? 'bg-green-900/30 text-green-300 border border-green-500/30' 
                      : 'bg-red-900/30 text-red-300 border border-red-500/30'
                  }`}
                >
                  {formStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-white mb-2">
                      Nome
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-black-800 border border-gem-purple/30 text-white focus:outline-none focus:ring-2 focus:ring-gem-purple focus:border-transparent placeholder-white/50"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-white mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-black-800 border border-gem-purple/30 text-white focus:outline-none focus:ring-2 focus:ring-gem-purple focus:border-transparent placeholder-white/50"
                      placeholder="seu.email@exemplo.com"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="company" className="block text-white mb-2">
                    Empresa
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-black-800 border border-gem-purple/30 text-white focus:outline-none focus:ring-2 focus:ring-gem-purple focus:border-transparent placeholder-white/50"
                    placeholder="Nome da sua empresa"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-white mb-2">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-black-800 border border-gem-purple/30 text-white focus:outline-none focus:ring-2 focus:ring-gem-purple focus:border-transparent placeholder-white/50"
                    placeholder="Como podemos ajudar?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn bg-gradient-to-r from-gem-pink to-gem-purple text-white hover:shadow-neon-pink w-full md:w-auto flex items-center justify-center transition-all duration-300"
                >
                  <Send size={18} className="mr-2" />
                  Enviar Mensagem
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
