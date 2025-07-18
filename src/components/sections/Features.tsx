import { motion } from 'framer-motion';
import { Globe, Shield, Award, Check } from 'lucide-react';
import { COMPANY_FULL_NAME } from '../../utils/env';

const values = [
  {
    icon: <Shield size={24} />,
    title: 'Integridade',
    description: 'Operamos com os mais altos padrões éticos e transparência em todas as nossas transações.',
    color: 'gem-pink'
  },
  {
    icon: <Check size={24} />,
    title: 'Responsabilidade',
    description: 'Assumimos compromisso com práticas sustentáveis e responsáveis em toda a cadeia de fornecimento.',
    color: 'gem-purple'
  },
  {
    icon: <Award size={24} />,
    title: 'Excelência',
    description: 'Buscamos a excelência em todos os processos, garantindo qualidade e segurança em cada operação.',
    color: 'gem-violet'
  },
  {
    icon: <Globe size={24} />,
    title: 'Conformidade',
    description: 'Seguimos rigorosamente as normas internacionais e regulamentações do setor de metais preciosos.',
    color: 'gem-blue'
  }
];

const About = () => {
  return (
    <section id="about" className="py-20 bg-black-900 relative overflow-hidden">
      {/* Modern subtle particle background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-1 h-1 rounded-full bg-gem-purple/30"></div>
        <div className="absolute top-40 right-20 w-2 h-2 rounded-full bg-gem-pink/20"></div>
        <div className="absolute top-60 right-40 w-1.5 h-1.5 rounded-full bg-gem-blue/25"></div>
        <div className="absolute top-80 right-60 w-1 h-1 rounded-full bg-gem-cyan/20"></div>
        <div className="absolute top-30 right-80 w-2 h-2 rounded-full bg-gem-violet/15"></div>

        <div className="absolute bottom-20 left-10 w-1.5 h-1.5 rounded-full bg-gem-pink/25"></div>
        <div className="absolute bottom-40 left-20 w-1 h-1 rounded-full bg-gem-purple/20"></div>
        <div className="absolute bottom-60 left-40 w-2 h-2 rounded-full bg-gem-blue/30"></div>
        <div className="absolute bottom-80 left-60 w-1 h-1 rounded-full bg-gem-violet/20"></div>
        <div className="absolute bottom-30 left-80 w-1.5 h-1.5 rounded-full bg-gem-cyan/25"></div>

        {/* Subtle gradient overlay */}
        <div className="absolute top-1/4 right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-gem-purple/5 to-gem-blue/5 blur-2xl opacity-30"></div>
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <motion.h2
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gem-pink via-gem-purple to-gem-blue bg-clip-text text-transparent mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
          >
            Sobre a {COMPANY_FULL_NAME}
          </motion.h2>
          <motion.p 
            className="text-xl text-white/90 max-w-3xl mx-auto font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Especialistas em mineração, exportação e importação de ouro e pedras preciosas ao redor do mundo
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
            <div className="absolute -inset-0.5 bg-gradient-to-r from-gem-pink to-gem-purple rounded-lg blur opacity-30 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative">
              <h3 className="text-2xl font-semibold text-white mb-4 border-b border-gem-pink/30 pb-2">Quem Somos</h3>
              <p className="text-white/90 mb-4">
                A {COMPANY_FULL_NAME} é atuante na área de mineração de ouro e pedras preciosas como diamantes, esmeraldas, turmalinas, rubi e água marinha, especialista e com vasta experiência prática na exportação e importação de todo esse minerio ao redor do mundo.
              </p>
              <p className="text-white/90">
                Com sede em Miami - Estados Unidos e escritórios em Dubai, Roma, África & Brasil, operamos com eficiência e responsabilidade, conectando exportadores, refinarias e compradores institucionais.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="bg-black-900/90 p-8 rounded-lg shadow-lg border border-gem-blue/40 relative group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-gem-blue to-gem-cyan rounded-lg blur opacity-30 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative">
              <h3 className="text-2xl font-semibold text-white mb-4 border-b border-gem-blue/30 pb-2">Missão e Visão</h3>
              <div className="mb-4">
                <h4 className="font-semibold text-gem-pink mb-1">Missão:</h4>
                <p className="text-white/90">Garantir operações de comércio de metais preciosos seguras, transparentes e éticas em todo o mundo.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gem-cyan mb-1">Visão:</h4>
                <p className="text-white/90">Ser referência internacional em excelência, conformidade e inovação no setor de metais preciosos.</p>
              </div>
            </div>
          </motion.div>
        </div>

        <h3 className="text-2xl font-semibold text-white mb-8 text-center">Nossos Valores</h3>

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
              <div className={`absolute -inset-0.5 bg-${value.color} rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-1000`}></div>
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
