import { motion } from 'framer-motion';
import { FileText, Shield, Users, Globe, Download } from 'lucide-react';

const complianceItems = [
  {
    icon: <Globe size={24} />,
    text: 'Adesão às normas da OECD, LBMA, RJC e legislação dos EUA',
    color: 'gem-blue'
  },
  {
    icon: <Shield size={24} />,
    text: 'Política rígida contra lavagem de dinheiro e financiamento ao terrorismo',
    color: 'gem-violet'
  },
  {
    icon: <Users size={24} />,
    text: 'Proibição de envolvimento com áreas de conflito ou violações de direitos humanos',
    color: 'gem-pink'
  },
  {
    icon: <FileText size={24} />,
    text: 'Código de Conduta para colaboradores e parceiros comerciais',
    color: 'gem-purple'
  },
  {
    icon: <Shield size={24} />,
    text: 'Processos de Due Diligence rigorosos em toda a cadeia de fornecimento',
    color: 'gem-cyan'
  }
];

const documents = [
  {
    icon: <FileText size={20} />,
    title: 'Código de Conduta',
    link: '#',
    color: 'gem-pink'
  },
  {
    icon: <FileText size={20} />,
    title: 'Política de Supply Chain',
    link: '#',
    color: 'gem-violet'
  },
  {
    icon: <FileText size={20} />,
    title: 'Procedimentos Operacionais',
    link: '#',
    color: 'gem-blue'
  }
];

const Compliance = () => {
  return (
    <section id="compliance" className="py-20 bg-black-800 relative overflow-hidden">
      {/* Modern subtle particle background */}
      <div className="absolute top-0 left-0 w-full h-full bg-black-900 opacity-50"></div>
      <div className="absolute inset-0 overflow-hidden">
        {/* Top left particles */}
        <div className="absolute top-20 left-20 w-1 h-1 rounded-full bg-gem-violet/30"></div>
        <div className="absolute top-40 left-40 w-1.5 h-1.5 rounded-full bg-gem-purple/25"></div>
        <div className="absolute top-60 left-60 w-2 h-2 rounded-full bg-gem-pink/20"></div>
        <div className="absolute top-80 left-80 w-1 h-1 rounded-full bg-gem-blue/30"></div>
        <div className="absolute top-100 left-100 w-1.5 h-1.5 rounded-full bg-gem-cyan/25"></div>

        {/* Bottom right particles */}
        <div className="absolute bottom-20 right-20 w-1.5 h-1.5 rounded-full bg-gem-pink/30"></div>
        <div className="absolute bottom-40 right-40 w-1 h-1 rounded-full bg-gem-purple/25"></div>
        <div className="absolute bottom-60 right-60 w-2 h-2 rounded-full bg-gem-violet/20"></div>
        <div className="absolute bottom-80 right-80 w-1 h-1 rounded-full bg-gem-blue/30"></div>
        <div className="absolute bottom-100 right-100 w-1.5 h-1.5 rounded-full bg-gem-cyan/25"></div>

        {/* Diagonal particles */}
        <div className="absolute top-1/4 right-1/4 w-1 h-1 rounded-full bg-gem-pink/30"></div>
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 rounded-full bg-gem-purple/25"></div>
        <div className="absolute bottom-1/4 left-1/4 w-1 h-1 rounded-full bg-gem-blue/30"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 rounded-full bg-gem-cyan/25"></div>
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
            Compromisso com a legalidade, responsabilidade e direitos humanos
          </motion.h2>
          <motion.p 
            className="text-xl text-white/80 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Na Gemstone, a conformidade é inegociável. Atuamos segundo os mais altos padrões internacionais de ética, governança e responsabilidade.
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
            <div className="absolute -inset-0.5 bg-gradient-to-r from-gem-violet to-gem-blue rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
            <div className="relative">
              <h3 className="text-2xl font-semibold mb-6 text-gem-violet border-b border-gem-violet/30 pb-2">
                Nossas diretrizes incluem:
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
                    <p className="text-white/90">{item.text}</p>
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
              Baixe nossos documentos institucionais:
            </h3>
            <div className="space-y-4">
              {documents.map((doc, index) => (
                <motion.a
                  key={index}
                  href={doc.link}
                  className={`flex items-center p-4 bg-black-900/60 border border-${doc.color}/30 rounded-lg hover:bg-black-900/80 hover:shadow-${doc.color === 'gem-pink' ? 'neon-pink' : doc.color === 'gem-violet' ? 'neon-violet' : 'neon-blue'} transition-all duration-300 group relative`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <div className={`absolute -inset-0.5 bg-${doc.color} rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-300`}></div>
                  <div className="relative flex items-center w-full">
                    <div className={`w-10 h-10 bg-${doc.color}/10 text-${doc.color} rounded-full flex items-center justify-center mr-4`}>
                      {doc.icon}
                    </div>
                    <span className="text-white font-medium">{doc.title}</span>
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
              Todos os nossos procedimentos são auditados regularmente por entidades independentes para garantir a conformidade com as normas internacionais.
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
          <div className="absolute -inset-0.5 bg-gradient-to-r from-gem-blue to-gem-cyan rounded-lg blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
          <div className="relative">
            <h3 className="text-xl font-semibold text-gem-cyan mb-3">
              Compromisso com a transparência
            </h3>
            <p className="text-white/80 max-w-3xl mx-auto">
              Acreditamos que a transparência é fundamental para construir confiança. Por isso, disponibilizamos todas as informações necessárias sobre nossos processos, parcerias e certificações.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Compliance;
