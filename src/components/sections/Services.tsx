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
    ],
    color: 'gem-pink'
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
    ],
    color: 'gem-purple'
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
    ],
    color: 'gem-violet'
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
    ],
    color: 'gem-blue'
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
    ],
    color: 'gem-cyan'
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-black-900 relative overflow-hidden">
      {/* Background neon elements */}
      <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-gem-violet/5 blur-3xl"></div>
      <div className="absolute bottom-40 left-10 w-96 h-96 rounded-full bg-gem-pink/5 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-96 bg-gradient-to-r from-gem-pink/5 via-gem-purple/5 to-gem-cyan/5 blur-3xl opacity-30"></div>

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gem-violet to-gem-blue bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Soluções completas em importação e comércio de metais preciosos
          </motion.h2>
          <motion.p 
            className="text-xl text-white/80 max-w-3xl mx-auto"
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
              className="bg-black-800 rounded-xl shadow-lg border border-black-700 flex flex-col h-full relative overflow-hidden group transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              {/* Neon glow effect on hover */}
              {/*<div className={`absolute -inset-0.5 bg-${service.color} rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-300`}></div>*/}

              <div className="relative flex flex-col h-full">
                {/* Header with dark background */}
                <div className="bg-black-800 p-6 relative">
                  <div className="flex items-center mb-2">
                    <div className={`w-14 h-14 bg-${service.color}/10 rounded-full flex items-center justify-center mr-4 shadow-md relative group-hover:shadow-${service.color === 'gem-pink' ? 'neon-pink' : service.color === 'gem-purple' ? 'neon-purple' : service.color === 'gem-violet' ? 'neon-violet' : service.color === 'gem-blue' ? 'neon-blue' : 'neon-cyan'} transition-all duration-300`}>
                      <span className={`text-${service.color}`}>
                        {service.icon}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {service.title}
                      </h3>
                      {service.subtitle && (
                        <p className="text-sm font-medium text-white/60 mt-1">
                          {service.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Colored divider with animation effect */}
                {service.color === 'gem-pink' ? (
                  <div className="h-1 bg-gradient-to-r from-transparent via-gem-pink to-transparent animate-pulse"></div>
                ) : service.color === 'gem-purple' ? (
                  <div className="h-1 bg-gradient-to-r from-transparent via-gem-purple to-transparent animate-pulse"></div>
                ) : service.color === 'gem-violet' ? (
                  <div className="h-1 bg-gradient-to-r from-transparent via-gem-violet to-transparent animate-pulse"></div>
                ) : service.color === 'gem-blue' ? (
                  <div className="h-1 bg-gradient-to-r from-transparent via-gem-blue to-transparent animate-pulse"></div>
                ) : (
                  <div className="h-1 bg-gradient-to-r from-transparent via-gem-cyan to-transparent animate-pulse"></div>
                )}

                {/* Main content */}
                <div className="p-6 flex-grow">
                  <p className="text-white/80 mb-6">{service.description}</p>

                  {/* Benefits list */}
                  <div className="space-y-3">
                    {service.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start">
                        <CheckCircle size={18} className={`text-${service.color} mr-2 mt-0.5 flex-shrink-0`} />
                        <p className="text-white/70 text-sm">{benefit}</p>
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
            Entre em contato para mais informações
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
