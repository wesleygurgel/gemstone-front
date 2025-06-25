import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import MainLayout from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>Página não encontrada | Gemstone</title>
        <meta name="description" content="A página que você está procurando não foi encontrada." />
      </Helmet>
      
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-6xl font-bold text-primary-600 mb-6">404</h1>
              <h2 className="text-3xl font-bold text-secondary-900 mb-4">Página não encontrada</h2>
              <p className="text-xl text-secondary-600 mb-8">
                A página que você está procurando não existe ou foi movida.
              </p>
              <Link to="/" className="btn btn-primary">
                Voltar para a página inicial
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default NotFound;