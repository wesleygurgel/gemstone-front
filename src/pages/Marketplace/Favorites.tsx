import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Heart, AlertCircle } from 'lucide-react';
import MarketplaceLayout from '@/components/marketplace/MarketplaceLayout';
import Breadcrumb from '@/components/marketplace/Breadcrumb';
import ProductCard from '@/components/marketplace/ProductCard';
import { useWishlist } from '@/context/WishlistContext';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Favorites: React.FC = () => {
  const { wishlist, loading, error, totalItems, loadWishlist } = useWishlist();
  const { t } = useTranslation('marketplace');

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <MarketplaceLayout>
      <Helmet>
        <title>{t('favorites.meta.title', { defaultValue: 'My Favorites - Gemstone' })}</title>
        <meta
          name="description"
          content={t('favorites.meta.description', { defaultValue: 'Your favorite products on Gemstone' })}
        />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-4">
          <Breadcrumb
            items={[
              { label: t('breadcrumb.marketplace', { defaultValue: 'Marketplace' }), path: '/marketplace', isLast: false },
              { label: t('favorites.title', { defaultValue: 'My Favorites' }), path: '/marketplace/favorites', isLast: true },
            ]}
          />
        </div>

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-gem-pink via-gem-purple to-gem-blue bg-clip-text text-transparent">
            {t('favorites.title', { defaultValue: 'My Favorites' })}
          </h1>
          <p className="text-white/70">
            {t('favorites.subtitle', { defaultValue: 'Products you added to your wishlist' })}
          </p>
        </div>

        {/* Wishlist items */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">
              {t('favorites.list.title', { defaultValue: 'Favorites List' })}
            </h2>
            <div className="text-white/70">
              {totalItems}{' '}
              {totalItems === 1
                ? t('favorites.list.single', { defaultValue: 'item' })
                : t('favorites.list.plural', { defaultValue: 'items' })}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gem-purple"></div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center p-12 text-center bg-black-800 border border-gem-purple/20 rounded-lg">
              <AlertCircle size={48} className="text-gem-pink mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">
                {t('favorites.error.title', { defaultValue: 'Error loading favorites' })}
              </h3>
              <p className="text-white/60 mb-6">
                {t('favorites.error.subtitle', { defaultValue: 'Could not load your favorite products.' })}
              </p>
              <button
                onClick={() => loadWishlist()}
                className="px-6 py-2 bg-gradient-to-r from-gem-purple to-gem-blue text-white rounded-md hover:shadow-neon-purple transition-all duration-300"
              >
                {t('favorites.error.retry', { defaultValue: 'Try Again' })}
              </button>
            </div>
          ) : wishlist?.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center bg-black-800 border border-gem-purple/20 rounded-lg">
              <Heart size={48} className="text-gem-purple/30 mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">
                {t('favorites.empty.title', { defaultValue: 'Your favorites list is empty' })}
              </h3>
              <p className="text-white/60 mb-6">
                {t('favorites.empty.subtitle', {
                  defaultValue: 'Add products to your favorites list to see them here.',
                })}
              </p>
              <Link
                to="/marketplace"
                className="px-6 py-2 bg-gradient-to-r from-gem-purple to-gem-blue text-white rounded-md hover:shadow-neon-purple transition-all duration-300"
              >
                {t('favorites.empty.explore', { defaultValue: 'Explore Products' })}
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
                <motion.div key={item.id} variants={itemVariant}>
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
                      main_image: item.product.main_image || undefined,
                      view_count: 0,
                      sales_count: 0,
                    }}
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
