import { motion } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';
import { FileText, Shield, Users, Globe, Download } from 'lucide-react';
import { COMPANY_FULL_NAME } from '../../utils/env';

// Dados não-traduzíveis
const complianceItems = [
  { icon: <Globe size={24} />, color: 'gem-blue' },
  { icon: <Shield size={24} />, color: 'gem-violet' },
  { icon: <Users size={24} />, color: 'gem-pink' },
  { icon: <FileText size={24} />, color: 'gem-purple' },
  { icon: <Shield size={24} />, color: 'gem-cyan' }
];

const documents = [
  { icon: <FileText size={20} />, link: '#', color: 'gem-pink' },
  { icon: <FileText size={20} />, link: '#', color: 'gem-violet' },
  { icon: <FileText size={20} />, link: '#', color: 'gem-blue' }
];

const Compliance = () => {
  const { t } = useTranslation('common');

  return (
    <section id="compliance" className="py-20 bg-black-800 relative overflow-hidden">
      {/* Fundo decorativo */}
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gem-pink via-gem-purple to-gem-blue bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t('compliance.title')}
          </motion.h2>
          <motion.p
            className="text-xl text-white/80 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Trans i18nKey="compliance.subtitle" values={{ company: COMPANY_FULL_NAME }} />
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            className="bg-black-900/80 text-white p-8 rounded-lg shadow-lg border border-gem-violet/30 relative group"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <h3 className="text-2xl font-semibold mb-6 text-gem-violet border-b border-gem-violet/30 pb-2">
                {t('compliance.guidelines_title')}
              </h3>
              <ul className="space-y-4">
                {complianceItems.map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <div className={`mr-3 mt-1 text-${item.color}`}>
                      {item.icon}
                    </div>
                    <p className="text-white/90">{t(`compliance.guidelines.${index}`)}</p>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-semibold text-white mb-6">
              {t('compliance.documents_title')}
            </h3>
            <div className="space-y-4">
              {documents.map((doc, index) => (
                <motion.a
                  key={index}
                  href={doc.link}
                  className={`flex items-center p-4 bg-black-900/60 border border-${doc.color}/30 rounded-lg hover:bg-black-900/80 transition-all duration-300 group relative`}
                >
                  <div className="relative flex items-center w-full">
                    <div className={`w-10 h-10 bg-${doc.color}/10 text-${doc.color} rounded-full flex items-center justify-center mr-4`}>
                      {doc.icon}
                    </div>
                    <span className="text-white font-medium">{t(`compliance.documents.${index}`)}</span>
                    <Download size={18} className={`ml-auto text-${doc.color} group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                </motion.a>
              ))}
            </div>
            <motion.p
              className="mt-6 text-white/60 italic"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {t('compliance.documents_footer')}
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          className="text-center bg-black-900/60 p-8 rounded-lg border border-gem-cyan/30 relative group"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <h3 className="text-xl font-semibold text-gem-cyan mb-3">
              {t('compliance.transparency_title')}
            </h3>
            <p className="text-white/80 max-w-3xl mx-auto">
              {t('compliance.transparency_text')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Compliance;