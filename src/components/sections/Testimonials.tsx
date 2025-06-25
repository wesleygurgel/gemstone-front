import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "A plataforma Gemstone revolucionou a forma como desenvolvemos nossos projetos. A colaboração se tornou muito mais eficiente e os resultados são impressionantes.",
    author: "Ana Silva",
    role: "CTO, TechSolutions",
    avatar: "/avatars/avatar-1.jpg"
  },
  {
    quote: "Desde que começamos a usar o Gemstone, conseguimos reduzir o tempo de desenvolvimento em 40%. A interface intuitiva e as ferramentas poderosas fazem toda a diferença.",
    author: "Carlos Mendes",
    role: "Desenvolvedor Sênior, InnovateX",
    avatar: "/avatars/avatar-2.jpg"
  },
  {
    quote: "O suporte ao cliente é excepcional. Sempre que tivemos dúvidas ou problemas, a equipe do Gemstone esteve pronta para nos ajudar com soluções rápidas e eficazes.",
    author: "Mariana Costa",
    role: "Gerente de Projetos, CreativeMinds",
    avatar: "/avatars/avatar-3.jpg"
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-secondary-50">
      <div className="container">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            O Que Nossos Clientes Dizem
          </motion.h2>
          <motion.p 
            className="text-xl text-secondary-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Histórias de sucesso de quem já transformou suas ideias em realidade com nossa plataforma
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-lg shadow-lg border border-secondary-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className="mb-6">
                {/* Quote icon */}
                <svg className="w-10 h-10 text-primary-300" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
              </div>
              
              <p className="text-secondary-700 mb-6">"{testimonial.quote}"</p>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                  {/* Placeholder for avatar */}
                  <span className="text-primary-600 font-bold">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-secondary-900">{testimonial.author}</h4>
                  <p className="text-secondary-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;