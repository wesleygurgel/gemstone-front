import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Heart, AlertCircle } from 'lucide-react';
import MarketplaceLayout from '@/components/marketplace/MarketplaceLayout';
import Breadcrumb from '@/components/marketplace/Breadcrumb';
import ProductCard from '@/components/marketplace/ProductCard';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';
import { motion } from 'framer-motion';

const Favorites: React.FC = () => {
  const { wishlist, loading, error, totalItems, removeItem, loadWishlist } = useWishlist();
  const { showToast } = useToast();

  // Handle remove from wishlist
  const handleRemoveFromWishlist = async (productId: number) => {
    try {
      const success = await removeItem(productId);
      if (success) {
        showToast('Produto removido dos favoritos', 'success');
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      showToast('Erro ao remover produto dos favoritos', 'error');
    }
  };

  // Animation variants
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

  return (
    <MarketplaceLayout>
      <Helmet>
        <title>Meus Favoritos - Gemstone</title>
        <meta name="description" content="Seus produtos favoritos na Gemstone" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-4">
          <Breadcrumb 
            items={[
              { label: 'Marketplace', path: '/marketplace', isLast: false },
              { label: 'Meus Favoritos', path: '/marketplace/favorites', isLast: true }
            ]}
          />
        </div>

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-gem-pink via-gem-purple to-gem-blue bg-clip-text text-transparent">
            Meus Favoritos
          </h1>
          <p className="text-white/70">
            Produtos que você adicionou à sua lista de desejos
          </p>
        </div>

        {/* Wishlist items */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Lista de Favoritos</h2>
            <div className="text-white/70">
              {totalItems} {totalItems === 1 ? 'item' : 'itens'}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gem-purple"></div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center p-12 text-center bg-black-800 border border-gem-purple/20 rounded-lg">
              <AlertCircle size={48} className="text-gem-pink mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">Erro ao carregar favoritos</h3>
              <p className="text-white/60 mb-6">Não foi possível carregar seus produtos favoritos.</p>
              <button 
                onClick={() => loadWishlist()}
                className="px-6 py-2 bg-gradient-to-r from-gem-purple to-gem-blue text-white rounded-md hover:shadow-neon-purple transition-all duration-300"
              >
                Tentar Novamente
              </button>
            </div>
          ) : wishlist?.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center bg-black-800 border border-gem-purple/20 rounded-lg">
              <Heart size={48} className="text-gem-purple/30 mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">Sua lista de favoritos está vazia</h3>
              <p className="text-white/60 mb-6">Adicione produtos à sua lista de favoritos para vê-los aqui.</p>
              <Link 
                to="/marketplace"
                className="px-6 py-2 bg-gradient-to-r from-gem-purple to-gem-blue text-white rounded-md hover:shadow-neon-purple transition-all duration-300"
              >
                Explorar Produtos
              </Link>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {wishlist?.items.map((item) => (
                <motion.div key={item.id} variants={item}>
                  <ProductCard 
                    product={{
                      id: item.product.id,
                      name: item.product.name,
                      slug: item.product.slug,
                      price: item.product.price,
                      price_discount: item.product.price_discount,
                      available: item.product.available,
                      category: item.product.category,
                      category_name: item.product.category_name || '',
                      featured: item.product.featured,
                      main_image: item.product.main_image || null
                    }}
                    onAddToWishlist={handleRemoveFromWishlist}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </MarketplaceLayout>
  );
};

export default Favorites;
