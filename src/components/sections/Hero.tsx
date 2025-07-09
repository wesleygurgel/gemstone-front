import { motion } from 'framer-motion';
import heroImage from '../../assets/images/hero.webp';
import { COMPANY_FULL_NAME } from '../../utils/env';

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-black-900 to-black-800 text-white py-20 relative overflow-hidden">
      {/* Modern subtle particle background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top left particles */}
        <div className="absolute top-10 left-10 w-1 h-1 rounded-full bg-gem-pink/30"></div>
        <div className="absolute top-20 left-30 w-1.5 h-1.5 rounded-full bg-gem-purple/25"></div>
        <div className="absolute top-40 left-20 w-2 h-2 rounded-full bg-gem-violet/20"></div>
        <div className="absolute top-60 left-40 w-1 h-1 rounded-full bg-gem-blue/30"></div>
        <div className="absolute top-80 left-60 w-1.5 h-1.5 rounded-full bg-gem-cyan/25"></div>

        {/* Bottom right particles */}
        <div className="absolute bottom-10 right-10 w-1.5 h-1.5 rounded-full bg-gem-cyan/30"></div>
        <div className="absolute bottom-30 right-30 w-1 h-1 rounded-full bg-gem-blue/25"></div>
        <div className="absolute bottom-50 right-20 w-2 h-2 rounded-full bg-gem-violet/20"></div>
        <div className="absolute bottom-70 right-40 w-1 h-1 rounded-full bg-gem-purple/30"></div>
        <div className="absolute bottom-90 right-60 w-1.5 h-1.5 rounded-full bg-gem-pink/25"></div>

        {/* Center right particles */}
        <div className="absolute top-1/4 right-1/4 w-1 h-1 rounded-full bg-gem-purple/30"></div>
        <div className="absolute top-1/3 right-1/5 w-1.5 h-1.5 rounded-full bg-gem-pink/25"></div>
        <div className="absolute top-2/5 right-1/3 w-2 h-2 rounded-full bg-gem-blue/20"></div>

        {/* Subtle gradient overlay */}
        <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 bg-gradient-to-br from-gem-pink/5 to-gem-cyan/5 blur-2xl opacity-30"></div>
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gem-pink via-gem-purple to-gem-cyan bg-clip-text text-transparent">
              Negócios éticos.<br/>
              Ouro legítimo.<br/>
              Parcerias globais.
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Somos especialistas em importação e comercialização de metais preciosos com total transparência, segurança e conformidade internacional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="btn bg-gradient-to-r from-gem-pink to-gem-purple text-white hover:shadow-neon-pink transition-all duration-300">
                Fale com a {COMPANY_FULL_NAME}
              </a>
              <a href="#about" className="btn btn-outline border-gem-violet text-white hover:bg-gem-violet/10 hover:border-gem-cyan transition-all duration-300">
                Saiba Mais
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Hero image with neon border */}
              <div className="w-full h-96 rounded-lg shadow-xl relative group overflow-hidden">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-gem-pink via-gem-purple to-gem-cyan rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-1000 z-10"></div>
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <img 
                    src={heroImage} 
                    alt="Barras de ouro em ambiente futurista com luzes neon" 
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>

              {/* Floating elements with logo colors */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gem-purple rounded-lg opacity-20 blur-sm"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gem-pink rounded-full opacity-20 blur-sm"></div>
              <div className="absolute top-1/2 -right-10 transform -translate-y-1/2 w-16 h-16 bg-gem-cyan rounded-full opacity-20 blur-sm"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
