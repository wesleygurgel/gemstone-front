import { motion } from 'framer-motion';
import { Briefcase, Package, Search, FileCheck, HelpCircle } from 'lucide-react';

const services = [
  {
    icon: <Briefcase size={24} />,
    title: 'Hand Carry – Dubai',
    description: 'Procedimentos seguros e personalizados para importação de ouro em bagagem de mão. Atuamos com Transguard Security e refinarias certificadas.'
  },
  {
    icon: <Package size={24} />,
    title: 'Importação via Carga (Cargo Carry)',
    description: 'Coordenação logística para envio aéreo com documentação completa, inspeção e liberação alfandegária em Dubai.'
  },
  {
    icon: <Search size={24} />,
    title: 'Assay e Refino',
    description: 'Análise técnica em refinarias parceiras, com emissão de laudo (assay) antes da finalização da compra.'
  },
  {
    icon: <FileCheck size={24} />,
    title: 'Compliance e Due Diligence',
    description: 'Acompanhamento completo na validação de documentos e KYC (Know Your Customer) de vendedores e exportadores.'
  },
  {
    icon: <HelpCircle size={24} />,
    title: 'Consultoria e Suporte',
    description: 'Apoio na estruturação de operações de exportação, orientações sobre licenças, impostos e certificações internacionais.'
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-black-50">
      <div className="container">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-black-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Soluções completas em importação e comércio de metais preciosos
          </motion.h2>
          <motion.p 
            className="text-xl text-black-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Oferecemos serviços especializados para cada etapa do processo de comercialização de ouro
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-lg shadow-lg border border-gold-100 hover:border-gold-300 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className="w-16 h-16 bg-gold-100 text-gold-600 rounded-full flex items-center justify-center mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-black-900 mb-3">{service.title}</h3>
              <p className="text-black-600">{service.description}</p>
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
          <a href="#contact" className="btn bg-gold-500 text-black-900 hover:bg-gold-400">
            Entre em contato para mais informações
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;