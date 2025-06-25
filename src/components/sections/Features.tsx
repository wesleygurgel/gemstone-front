import { motion } from 'framer-motion';
import { Globe, Shield, Award, Check } from 'lucide-react';

const values = [
  {
    icon: <Shield size={24} />,
    title: 'Integridade',
    description: 'Operamos com os mais altos padrões éticos e transparência em todas as nossas transações.'
  },
  {
    icon: <Check size={24} />,
    title: 'Responsabilidade',
    description: 'Assumimos compromisso com práticas sustentáveis e responsáveis em toda a cadeia de fornecimento.'
  },
  {
    icon: <Award size={24} />,
    title: 'Excelência',
    description: 'Buscamos a excelência em todos os processos, garantindo qualidade e segurança em cada operação.'
  },
  {
    icon: <Globe size={24} />,
    title: 'Conformidade',
    description: 'Seguimos rigorosamente as normas internacionais e regulamentações do setor de metais preciosos.'
  }
];

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-black-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Sobre a Gemstone
          </motion.h2>
          <motion.p 
            className="text-xl text-black-600 max-w-3xl mx-auto"
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
            className="bg-white p-8 rounded-lg shadow-lg border border-gold-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-semibold text-black-900 mb-4 border-b border-gold-300 pb-2">Quem Somos</h3>
            <p className="text-black-700 mb-4">
              A Gemstone é uma trading internacional de metais preciosos com foco na comercialização ética de ouro e diamantes. Nascemos com o propósito de elevar os padrões do setor, oferecendo uma operação confiável, transparente e 100% alinhada às exigências regulatórias globais.
            </p>
            <p className="text-black-700">
              Com sede nos Estados Unidos e presença ativa em mercados estratégicos como Emirados Árabes, América Latina e África, operamos com eficiência e responsabilidade, conectando exportadores, refinarias e compradores institucionais.
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg border border-gold-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-black-900 mb-4 border-b border-gold-300 pb-2">Missão e Visão</h3>
            <div className="mb-4">
              <h4 className="font-semibold text-gold-600 mb-1">Missão:</h4>
              <p className="text-black-700">Garantir operações de comércio de metais preciosos seguras, transparentes e éticas em todo o mundo.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gold-600 mb-1">Visão:</h4>
              <p className="text-black-700">Ser referência internacional em excelência, conformidade e inovação no setor de metais preciosos.</p>
            </div>
          </motion.div>
        </div>

        <h3 className="text-2xl font-semibold text-black-900 mb-8 text-center">Nossos Valores</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg border border-gold-100 hover:border-gold-300 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className="w-12 h-12 bg-gold-100 text-gold-600 rounded-lg flex items-center justify-center mb-4">
                {value.icon}
              </div>
              <h4 className="text-xl font-semibold text-black-900 mb-2">{value.title}</h4>
              <p className="text-black-600">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
