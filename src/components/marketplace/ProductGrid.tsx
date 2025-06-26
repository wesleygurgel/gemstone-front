import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ProductListItem } from '@/types/api';
import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';

interface ProductGridProps {
  products?: ProductListItem[];
  loading?: boolean;
  error?: string | null;
  onAddToCart?: (productId: number, quantity: number) => void;
  onAddToWishlist?: (productId: number) => void;
  className?: string;
}

const ProductGrid = ({
  products = [],
  loading = false,
  error = null,
  onAddToCart,
  onAddToWishlist,
  className = ''
}: ProductGridProps) => {
  // If there's an error, display error message
  if (error) {
    return (
      <div className={`bg-black-800/50 rounded-lg p-6 text-center ${className}`}>
        <p className="text-red-500">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-gem-purple/20 text-gem-purple hover:bg-gem-purple/30 transition-colors rounded-md"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  // If loading, display skeleton cards
  if (loading) {
    return (
      <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${className}`}>
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    );
  }

  // If no products and not loading, display empty state
  if (products.length === 0 && !loading) {
    return (
      <div className={`bg-black-800/50 rounded-lg p-6 text-center ${className}`}>
        <p className="text-white/70">Nenhum produto encontrado.</p>
        <p className="text-white/50 mt-2">Tente ajustar os filtros ou buscar por outro termo.</p>
      </div>
    );
  }

  // Stagger animation for product cards
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // Render product grid
  return (
    <motion.div 
      className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${className}`}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={item}>
          <ProductCard 
            product={product} 
            onAddToCart={onAddToCart}
            onAddToWishlist={onAddToWishlist}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProductGrid;