import { motion } from 'framer-motion';
import { Briefcase, Package, Search, FileCheck, HelpCircle, ShoppingBag, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const servicesData = [
  { icon: <Briefcase size={24} />, color: 'gem-pink', baseKey: 'services.items.0' },
  { icon: <Package size={24} />, color: 'gem-purple', baseKey: 'services.items.1' },
  { icon: <Search size={24} />, color: 'gem-violet', baseKey: 'services.items.2' },
  { icon: <FileCheck size={24} />, color: 'gem-blue', baseKey: 'services.items.3' },
  { icon: <HelpCircle size={24} />, color: 'gem-cyan', baseKey: 'services.items.4' },
  { icon: <ShoppingBag size={24} />, color: 'gem-pink', baseKey: 'services.items.5' }
];

const Services = () => {
  const { t } = useTranslation('common');

  return (
    <section id="services" className="py-20 bg-black-900 relative overflow-hidden">
      {/* Fundo decorativo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-1 h-1 rounded-full bg-gem-pink/30"></div>
        <div className="absolute top-20 left-30 w-1.5 h-1.5 rounded-full bg-gem-purple/25"></div>
        <div className="absolute top-40 left-20 w-2 h-2 rounded-full bg-gem-violet/20"></div>
        <div className="absolute top-60 left-40 w-1 h-1 rounded-full bg-gem-blue/30"></div>
        <div className="absolute top-80 left-60 w-1.5 h-1.5 rounded-full bg-gem-cyan/25"></div>
        <div className="absolute bottom-10 right-10 w-1.5 h-1.5 rounded-full bg-gem-cyan/30"></div>
        <div className="absolute bottom-30 right-30 w-1 h-1 rounded-full bg-gem-blue/25"></div>
        <div className="absolute bottom-50 right-20 w-2 h-2 rounded-full bg-gem-violet/20"></div>
        <div className="absolute bottom-70 right-40 w-1 h-1 rounded-full bg-gem-purple/30"></div>
        <div className="absolute bottom-90 right-60 w-1.5 h-1.5 rounded-full bg-gem-pink/25"></div>
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gem-violet to-gem-blue bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t('services.title')}
          </motion.h2>
          <motion.p 
            className="text-xl text-white/80 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t('services.subtitle')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              className="bg-black-800 rounded-xl shadow-lg border border-black-700 flex flex-col h-full relative overflow-hidden group transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className="relative flex flex-col h-full">
                <div className="bg-black-800 p-6 relative">
                  <div className="flex items-center mb-2">
                    <div className={`w-14 h-14 bg-${service.color}/10 rounded-full flex items-center justify-center mr-4 shadow-md relative group-hover:shadow-${service.color === 'gem-pink' ? 'neon-pink' : service.color === 'gem-purple' ? 'neon-purple' : service.color === 'gem-violet' ? 'neon-violet' : service.color === 'gem-blue' ? 'neon-blue' : 'neon-cyan'} transition-all duration-300`}>
                      <span className={`text-${service.color}`}>
                        {service.icon}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {t(`${service.baseKey}.title`)}
                      </h3>
                      {t(`${service.baseKey}.subtitle`) && (
                        <p className="text-sm font-medium text-white/60 mt-1">
                          {t(`${service.baseKey}.subtitle`)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Divisor colorido */}
                <div className={`h-1 bg-gradient-to-r from-${service.color} to-transparent`}></div>

                <div className="p-6 flex-grow">
                  <p className="text-white/80 mb-6">{t(`${service.baseKey}.description`)}</p>
                  <div className="space-y-3">
                    {/* Renderiza dinamicamente os 3 benefícios de cada serviço */}
                    {[0, 1, 2].map(i => (
                      <div key={i} className="flex items-start">
                        <CheckCircle size={18} className={`text-${service.color} mr-2 mt-0.5 flex-shrink-0`} />
                        <p className="text-white/70 text-sm">{t(`${service.baseKey}.benefits.${i}`)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a href="#contact" className="btn bg-gradient-to-r from-gem-violet to-gem-blue text-white px-8 py-4 text-lg shadow-md hover:shadow-neon-violet transition-all duration-300">
            {t('services.cta')}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;