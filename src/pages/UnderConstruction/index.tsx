import { Helmet } from 'react-helmet-async';
import UnderConstructionLayout from '@/components/layout/UnderConstructionLayout';
import { motion } from 'framer-motion';

const UnderConstruction = () => {
  return (
    <UnderConstructionLayout>
      <Helmet>
        <title>Site em Construção | Gemstone</title>
        <meta name="description" content="Nosso site está em construção. Em breve estaremos de volta com novidades." />
      </Helmet>

      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Decorative gems at the top */}
              <div className="flex justify-center space-x-4 mb-8">
                {['gem-pink', 'gem-purple', 'gem-violet', 'gem-blue', 'gem-cyan'].map((color, index) => (
                  <motion.div
                    key={color}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                    className={`w-3 h-3 rounded-full bg-${color.replace('gem-', 'gem-')}`}
                    style={{ 
                      backgroundColor: 
                        color === 'gem-pink' ? '#D1497E' : 
                        color === 'gem-purple' ? '#A674E3' : 
                        color === 'gem-violet' ? '#7676F0' : 
                        color === 'gem-blue' ? '#4F9EF4' : 
                        '#3BC8F5' 
                    }}
                  />
                ))}
              </div>

              <motion.h1 
                className="text-6xl font-bold text-gold-400 mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
              >
                Site em Construção
              </motion.h1>

              {/* Construction icon with animation */}
              <motion.div 
                className="w-32 h-32 mx-auto mb-10 relative"
                initial={{ rotate: -5 }}
                animate={{ rotate: 5 }}
                transition={{ repeat: Infinity, repeatType: "reverse", duration: 2 }}
              >
                <div className="absolute inset-0 bg-gold-100 rounded-full opacity-20 animate-pulse"></div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gold-500 w-full h-full">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                </svg>
              </motion.div>

              <motion.div
                className="bg-black-800 p-8 rounded-lg shadow-lg border border-gold-500/30 mb-10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-white mb-4">Estamos trabalhando para melhorar sua experiência</h2>
                <p className="text-xl text-gold-100 mb-6">
                  Nosso site está passando por atualizações. Em breve estaremos de volta com novidades incríveis.
                </p>
                <p className="text-lg text-gold-200 mb-4">
                  Agradecemos sua paciência e compreensão.
                </p>
              </motion.div>

              {/* Progress bar */}
              <motion.div 
                className="w-full max-w-md mx-auto h-3 bg-black-700 rounded-full overflow-hidden mb-8"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <motion.div 
                  className="h-full bg-gradient-to-r from-gem-pink via-gem-violet to-gem-cyan"
                  initial={{ width: "0%" }}
                  animate={{ width: "70%" }}
                  transition={{ delay: 1, duration: 3, repeat: Infinity, repeatType: "reverse" }}
                ></motion.div>
              </motion.div>

              <motion.div 
                className="mt-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                <p className="text-gold-400 font-semibold text-xl">
                  GEMSTONE U.S.A. Diamond's & Gold LLC
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </UnderConstructionLayout>
  );
};

export default UnderConstruction;