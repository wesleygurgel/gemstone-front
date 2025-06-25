import { motion } from 'framer-motion';
import { FileText, Shield, Users, Globe, Download } from 'lucide-react';

const complianceItems = [
  {
    icon: <Globe size={24} />,
    text: 'Adesão às normas da OECD, LBMA, RJC e legislação dos EUA'
  },
  {
    icon: <Shield size={24} />,
    text: 'Política rígida contra lavagem de dinheiro e financiamento ao terrorismo'
  },
  {
    icon: <Users size={24} />,
    text: 'Proibição de envolvimento com áreas de conflito ou violações de direitos humanos'
  },
  {
    icon: <FileText size={24} />,
    text: 'Código de Conduta para colaboradores e parceiros comerciais'
  },
  {
    icon: <Shield size={24} />,
    text: 'Processos de Due Diligence rigorosos em toda a cadeia de fornecimento'
  }
];

const documents = [
  {
    icon: <FileText size={20} />,
    title: 'Código de Conduta',
    link: '#'
  },
  {
    icon: <FileText size={20} />,
    title: 'Política de Supply Chain',
    link: '#'
  },
  {
    icon: <FileText size={20} />,
    title: 'Procedimentos Operacionais',
    link: '#'
  }
];

const Compliance = () => {
  return (
    <section id="compliance" className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-black-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Compromisso com a legalidade, responsabilidade e direitos humanos
          </motion.h2>
          <motion.p 
            className="text-xl text-black-600 max-w-3xl mx-auto"
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
            className="bg-black-900 text-white p-8 rounded-lg shadow-lg"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-semibold mb-6 text-gold-400 border-b border-gold-500 pb-2">
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
                  <div className="mr-3 mt-1 text-gold-400">
                    {item.icon}
                  </div>
                  <p>{item.text}</p>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-semibold text-black-900 mb-6">
              Baixe nossos documentos institucionais:
            </h3>
            <div className="space-y-4">
              {documents.map((doc, index) => (
                <motion.a
                  key={index}
                  href={doc.link}
                  className="flex items-center p-4 border border-gold-200 rounded-lg hover:bg-gold-50 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <div className="w-10 h-10 bg-gold-100 text-gold-600 rounded-full flex items-center justify-center mr-4">
                    {doc.icon}
                  </div>
                  <span className="text-black-800 font-medium">{doc.title}</span>
                  <Download size={18} className="ml-auto text-gold-500" />
                </motion.a>
              ))}
            </div>
            
            <motion.p
              className="mt-6 text-black-600 italic"
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
          className="text-center bg-gold-50 p-8 rounded-lg border border-gold-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold text-black-900 mb-3">
            Compromisso com a transparência
          </h3>
          <p className="text-black-700 max-w-3xl mx-auto">
            Acreditamos que a transparência é fundamental para construir confiança. Por isso, disponibilizamos todas as informações necessárias sobre nossos processos, parcerias e certificações.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Compliance;