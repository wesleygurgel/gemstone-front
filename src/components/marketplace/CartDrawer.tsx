import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { useTranslation } from 'react-i18next';

const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    closeCart,
    totalItems,
    totalPrice,
    updateItem,
    removeItem,
    loading,
  } = useCart();
  const { showToast } = useToast();
  const { t } = useTranslation('marketplace');

  const drawerVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
    exit: { x: '100%', opacity: 0, transition: { ease: 'easeInOut', duration: 0.3 } },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  // Atualizar quantidade
  const handleQuantityChange = async (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      const success = await updateItem(itemId, newQuantity);
      if (success) {
        const item = cart?.items.find((i) => i.id === itemId);
        if (item) {
          showToast(
            `${t('products.added')}: ${item.product_details.name} × ${newQuantity}`,
            'info'
          );
        }
      }
    } catch {
      showToast(t('errors.filterFailed'), 'error');
    }
  };

  // Remover item
  const handleRemoveItem = async (itemId: number) => {
    try {
      const item = cart?.items.find((i) => i.id === itemId);
      const itemName = item?.product_details.name || t('products.noImage');
      const success = await removeItem(itemId);
      if (success) showToast(`${itemName} ${t('products.added')}`, 'success');
    } catch {
      showToast(t('errors.filterFailed'), 'error');
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Fundo escuro */}
          <motion.div
            className="fixed inset-0 bg-black-900 bg-opacity-80 backdrop-blur-sm z-40"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeCart}
          />

          {/* Drawer lateral */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full sm:w-96 bg-black-900 shadow-lg z-50 flex flex-col"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Cabeçalho */}
            <div className="p-4 border-b border-gem-purple/20 flex justify-between items-center bg-black-800 text-white">
              <h2 className="text-xl font-semibold bg-gradient-to-r from-gem-pink to-gem-purple bg-clip-text text-transparent">
                {t('cart.title')}
              </h2>
              <div className="flex items-center">
                <span className="mr-4 px-2 py-1 bg-black-700 border border-gem-purple/30 rounded-md font-medium bg-gradient-to-r from-gem-purple to-gem-pink bg-clip-text text-transparent">
                  {t('cart.itemsCount', { count: totalItems })}
                </span>
                <button
                  onClick={closeCart}
                  className="p-1 rounded-full hover:bg-black-700 hover:text-gem-pink transition-colors"
                  aria-label="Close cart"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Conteúdo */}
            <div className="flex-1 overflow-y-auto p-4">
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gem-purple"></div>
                </div>
              ) : !cart || !cart.items || cart.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-4">
                  <ShoppingBag size={64} className="text-gem-purple/30 mb-4" />
                  <h3 className="text-xl font-medium text-white mb-2">
                    {t('cart.emptyTitle')}
                  </h3>
                  <p className="text-white/60 mb-6">{t('cart.emptyHint')}</p>
                  <button
                    onClick={closeCart}
                    className="px-6 py-2 bg-gradient-to-r from-gem-purple to-gem-blue text-white rounded-md hover:shadow-neon-purple transition-all duration-300"
                  >
                    {t('cart.continue')}
                  </button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {cart.items.map((item) => (
                    <li
                      key={item.id}
                      className="border border-gem-purple/20 rounded-lg p-3 flex bg-black-800"
                    >
                      {/* Imagem */}
                      <div className="w-20 h-20 bg-black-700 rounded-md overflow-hidden flex-shrink-0">
                        {item.product_details.main_image && (
                          <img
                            src={item.product_details.main_image.image}
                            alt={
                              item.product_details.main_image.alt_text ||
                              item.product_details.name
                            }
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>

                      {/* Detalhes */}
                      <div className="ml-3 flex-1">
                        <h3 className="text-sm font-medium text-white">
                          {item.product_details.name}
                        </h3>

                        <p className="text-sm text-white/60 mt-1">
                          R${' '}
                          {parseFloat(
                            item.product_details.price_discount ||
                              item.product_details.price
                          ).toFixed(2)}{' '}
                          {t('products.unavailable')}
                        </p>
                        <p className="text-sm font-medium bg-gradient-to-r from-gem-purple to-gem-pink bg-clip-text text-transparent mt-1">
                          R$ {parseFloat(item.total_price).toFixed(2)}
                        </p>

                        {/* Quantidade / Remover */}
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center border border-gem-purple/30 rounded-md bg-black-900">
                            <button
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity - 1)
                              }
                              className="px-2 py-1 text-white/80 hover:text-gem-blue transition-colors"
                              disabled={loading}
                              aria-label={t('cart.decreaseQuantity')}
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-2 py-1 text-white min-w-[30px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity + 1)
                              }
                              className="px-2 py-1 text-white/80 hover:text-gem-blue transition-colors"
                              disabled={loading}
                              aria-label={t('cart.increaseQuantity')}
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-white/60 hover:text-gem-pink transition-colors"
                            disabled={loading}
                            aria-label={t('cart.removeItem')}
                          >
                            <Trash size={18} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Rodapé */}
            {cart && cart.items && cart.items.length > 0 && (
              <div className="border-t border-gem-purple/20 p-4 bg-black-800">
                <div className="flex justify-between mb-2">
                  <span className="text-white/80">{t('cart.subtotal')}</span>
                  <span className="font-medium text-white">
                    R$ {parseFloat(totalPrice).toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between mb-4">
                  <span className="text-white/80">{t('cart.shipping')}</span>
                  <span className="font-medium text-white">
                    {t('cart.shippingCalc')}
                  </span>
                </div>

                <div className="flex justify-between mb-4 text-lg font-bold">
                  <span className="text-white">{t('cart.total')}</span>
                  <span className="bg-gradient-to-r from-gem-purple to-gem-pink bg-clip-text text-transparent">
                    R$ {parseFloat(totalPrice).toFixed(2)}
                  </span>
                </div>

                <Link
                  to="/checkout"
                  onClick={closeCart}
                  className="w-full py-3 bg-gradient-to-r from-gem-purple to-gem-blue text-white rounded-md font-medium text-center block hover:shadow-neon-purple transition-all duration-300"
                >
                  {t('cart.checkout')}
                </Link>

                <button
                  onClick={closeCart}
                  className="w-full py-2 mt-2 text-white/60 font-medium text-center block hover:text-gem-cyan transition-colors"
                >
                  {t('cart.continue')}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
