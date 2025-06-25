import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-black-900 to-black-800 text-white py-20">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Negócios éticos.<br/>
              Ouro legítimo.<br/>
              Parcerias globais.
            </h1>
            <p className="text-xl mb-8 text-gold-300">
              Somos especialistas em importação e comercialização de metais preciosos com total transparência, segurança e conformidade internacional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="btn bg-gold-500 text-black-900 hover:bg-gold-400">
                📩 Fale com a Gemstone
              </a>
              <a href="#about" className="btn btn-outline border-gold-500 text-white hover:bg-black-700">
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
              {/* Placeholder for hero image */}
              <div className="w-full h-96 bg-black-700 rounded-lg shadow-xl flex items-center justify-center border border-gold-500">
                <span className="text-gold-300 text-lg">Imagem de barras de ouro ou operações logísticas</span>
              </div>

              {/* Floating elements for visual interest */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gold-500 rounded-lg opacity-50"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gold-600 rounded-full opacity-50"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
