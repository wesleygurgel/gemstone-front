import { motion } from 'framer-motion';
import { ProductListItem } from '@/types/api';
import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';
import { useTranslation } from 'react-i18next';

interface ProductGridProps {
  products?: ProductListItem[];
  loading?: boolean;
  error?: string | null;
  className?: string;
}

const ProductGrid = ({
  products = [],
  loading = false,
  error = null,
  className = '',
}: ProductGridProps) => {
  const { t } = useTranslation('marketplace');

  // Mensagem de erro
  if (error) {
    return (
      <div className={`bg-black-800/50 rounded-lg p-6 text-center ${className}`}>
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-gem-purple/20 text-gem-purple hover:bg-gem-purple/30 transition-colors rounded-md"
        >
          {t('grid.retry')}
        </button>
      </div>
    );
  }

  // Estado de carregamento
  if (loading) {
    return (
      <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${className}`}>
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Estado vazio
  if (products.length === 0 && !loading) {
    return (
      <div className={`bg-black-800/50 rounded-lg p-6 text-center ${className}`}>
        <p className="text-white/70">{t('grid.empty.title')}</p>
        <p className="text-white/50 mt-2">{t('grid.empty.suggestion')}</p>
      </div>
    );
  }

  // Animação dos cards
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${className}`}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={item}>
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProductGrid;
