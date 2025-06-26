import { motion } from 'framer-motion';
import { Globe, Shield, Award, Check } from 'lucide-react';

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
      {/* Background neon elements */}
      <div className="absolute top-40 right-0 w-96 h-96 rounded-full bg-gem-purple/10 blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-gem-blue/10 blur-3xl"></div>

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <motion.h2
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gem-pink via-gem-purple to-gem-blue bg-clip-text text-transparent mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
          >
            Sobre a Gemstone
          </motion.h2>
          <motion.p 
            className="text-xl text-white/90 max-w-3xl mx-auto font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Uma trading internacional de metais preciosos com foco na comercialização ética de ouro e diamantes
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
                A Gemstone é uma trading internacional de metais preciosos com foco na comercialização ética de ouro e diamantes. Nascemos com o propósito de elevar os padrões do setor, oferecendo uma operação confiável, transparente e 100% alinhada às exigências regulatórias globais.
              </p>
              <p className="text-white/90">
                Com sede nos Estados Unidos e presença ativa em mercados estratégicos como Emirados Árabes, América Latina e África, operamos com eficiência e responsabilidade, conectando exportadores, refinarias e compradores institucionais.
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
