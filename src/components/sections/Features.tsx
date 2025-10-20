import { motion } from 'framer-motion';
import { Globe, Shield, Award, Check } from 'lucide-react';
import { COMPANY_FULL_NAME } from '../../utils/env';
import { useTranslation, Trans } from 'react-i18next';

const About = () => {
  const { t } = useTranslation('common');

  // A sua lógica de array original, mas com as descrições vindo de `t()`
  const values = [
    {
      icon: <Shield size={24} />,
      title: t('values.integrity'),
      description: t('values.integrity.desc'), // Traduzido
      color: 'gem-pink',
    },
    {
      icon: <Check size={24} />,
      title: t('values.responsibility'),
      description: t('values.responsibility.desc'), // Traduzido
      color: 'gem-purple',
    },
    {
      icon: <Award size={24} />,
      title: t('values.excellence'),
      description: t('values.excellence.desc'), // Traduzido
      color: 'gem-violet',
    },
    {
      icon: <Globe size={24} />,
      title: t('values.compliance'),
      description: t('values.compliance.desc'), // Traduzido
      color: 'gem-blue',
    },
  ];

  return (
    <section id="about" className="py-20 bg-black-900 relative overflow-hidden">
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gem-pink via-gem-purple to-gem-blue bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Trans i18nKey="about.title" values={{ company: COMPANY_FULL_NAME }} />
          </motion.h2>
          <motion.p
            className="text-xl text-white/90 max-w-3xl mx-auto font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t('about.subtitle')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            className="bg-black-900/90 p-8 rounded-lg shadow-lg border border-gem-pink/40 relative group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <h3 className="text-2xl font-semibold text-white mb-4 border-b border-gem-pink/30 pb-2">
                {t('about.whoweare')}
              </h3>
              <p className="text-white/90 mb-4">
                <Trans i18nKey="about.text1" values={{ company: COMPANY_FULL_NAME }} />
              </p>
              <p className="text-white/90">{t('about.text2')}</p>
            </div>
          </motion.div>

          <motion.div
            className="bg-black-900/90 p-8 rounded-lg shadow-lg border border-gem-blue/40 relative group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <h3 className="text-2xl font-semibold text-white mb-4 border-b border-gem-blue/30 pb-2">
                {t('about.missionvision')}
              </h3>
              <div className="mb-4">
                <h4 className="font-semibold text-gem-pink mb-1">{t('about.mission')}</h4>
                <p className="text-white/90">{t('about.mission.text')}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gem-cyan mb-1">{t('about.vision')}</h4>
                <p className="text-white/90">{t('about.vision.text')}</p>
              </div>
            </div>
          </motion.div>
        </div>

        <h3 className="text-2xl font-semibold text-white mb-8 text-center">{t('about.values')}</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              className={`bg-black-900/90 p-6 rounded-lg shadow-lg border border-${value.color}/40 hover:shadow-${value.color === 'gem-pink' ? 'neon-pink' : value.color === 'gem-purple' ? 'neon-purple' : value.color === 'gem-violet' ? 'neon-violet' : 'neon-blue'} transition-all duration-300 relative group`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className={`absolute -inset-0.5 bg-${value.color} rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-1000`} />
              <div className="relative">
                <div className={`w-12 h-12 bg-${value.color}/20 text-${value.color} rounded-lg flex items-center justify-center mb-4`}>
                  {value.icon}
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">{value.title}</h4>
                <p className="text-white/90">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;