import { motion } from 'framer-motion';
import heroImage from '../../assets/images/hero.webp';

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-black-900 to-black-800 text-white py-20 relative overflow-hidden">
      {/* Background neon elements */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gem-pink/5 blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-gem-cyan/5 blur-3xl"></div>
      <div className="absolute top-40 right-1/4 w-40 h-40 rounded-full bg-gem-purple/5 blur-3xl"></div>

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
                Fale com a Gemstone
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
