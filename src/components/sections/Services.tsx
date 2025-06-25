import { motion } from 'framer-motion';
import { Briefcase, Package, Search, FileCheck, HelpCircle, CheckCircle } from 'lucide-react';

const services = [
  {
    icon: <Briefcase size={24} />,
    title: 'Hand Carry – Dubai',
    subtitle: '',
    description: 'Procedimentos seguros e personalizados para importação de ouro em bagagem de mão. Atuamos com Transguard Security e refinarias certificadas.',
    benefits: [
      'Segurança garantida pela Transguard',
      'Processo ágil e eficiente',
      'Acompanhamento em tempo real'
    ]
  },
  {
    icon: <Package size={24} />,
    title: 'Importação via Carga',
    subtitle: '(Cargo Carry)',
    description: 'Coordenação logística para envio aéreo com documentação completa, inspeção e liberação alfandegária em Dubai.',
    benefits: [
      'Documentação completa e precisa',
      'Inspeção e verificação rigorosa',
      'Liberação alfandegária facilitada'
    ]
  },
  {
    icon: <Search size={24} />,
    title: 'Assay e Refino',
    subtitle: '',
    description: 'Análise técnica em refinarias parceiras, com emissão de laudo (assay) antes da finalização da compra.',
    benefits: [
      'Parcerias com refinarias certificadas',
      'Laudos técnicos detalhados',
      'Garantia de pureza e qualidade'
    ]
  },
  {
    icon: <FileCheck size={24} />,
    title: 'Compliance e Due Diligence',
    subtitle: '',
    description: 'Acompanhamento completo na validação de documentos e KYC (Know Your Customer) de vendedores e exportadores.',
    benefits: [
      'Verificação rigorosa de documentos',
      'Processo KYC completo e seguro',
      'Conformidade com normas internacionais'
    ]
  },
  {
    icon: <HelpCircle size={24} />,
    title: 'Consultoria e Suporte',
    subtitle: '',
    description: 'Apoio na estruturação de operações de exportação, orientações sobre licenças, impostos e certificações internacionais.',
    benefits: [
      'Consultoria especializada no setor',
      'Orientação sobre licenças e impostos',
      'Suporte para certificações internacionais'
    ]
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:justify-items-center">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg border-2 border-gold-200 flex flex-col h-full relative overflow-hidden group transition-all duration-300 hover:shadow-xl hover:border-gold-400 hover:translate-y-[-4px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              {/* Header with solid background */}
              <div className="bg-white p-6">
                <div className="flex items-center mb-2">
                  <div className="w-14 h-14 bg-gold-50 rounded-full flex items-center justify-center mr-4 shadow-md">
                    <span className="text-gold-500">
                      {service.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-black-900">
                      {service.title}
                    </h3>
                    {service.subtitle && (
                      <p className="text-sm font-medium text-black-600 mt-1">
                        {service.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Gold divider with animation effect */}
              <div className="h-1 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300 animate-pulse"></div>

              {/* Main content */}
              <div className="p-6 flex-grow">
                <p className="text-black-700 mb-6">{service.description}</p>

                {/* Benefits list */}
                <div className="space-y-3">
                  {service.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start">
                      <CheckCircle size={18} className="text-gold-500 mr-2 mt-0.5 flex-shrink-0" />
                      <p className="text-black-600 text-sm">{benefit}</p>
                    </div>
                  ))}
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
          <a href="#contact" className="btn bg-gold-500 text-black-900 hover:bg-gold-400 px-8 py-4 text-lg shadow-md hover:shadow-lg transition-all duration-300">
            Entre em contato para mais informações
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
