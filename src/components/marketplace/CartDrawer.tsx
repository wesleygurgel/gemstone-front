import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';

const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    closeCart, 
    totalItems, 
    totalPrice, 
    updateItem, 
    removeItem,
    loading
  } = useCart();

  // Animation variants for the drawer
  const drawerVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 30 
      }
    },
    exit: { 
      x: '100%', 
      opacity: 0,
      transition: { 
        ease: 'easeInOut', 
        duration: 0.3 
      }
    }
  };

  // Animation variants for the overlay
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.3 
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.3 
      }
    }
  };

  // Handle quantity change
  const handleQuantityChange = async (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    await updateItem(itemId, newQuantity);
  };

  // Handle remove item
  const handleRemoveItem = async (itemId: number) => {
    await removeItem(itemId);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black-900 bg-opacity-80 backdrop-blur-sm z-40"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full sm:w-96 bg-black-900 shadow-lg z-50 flex flex-col"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="p-4 border-b border-gem-purple/20 flex justify-between items-center bg-black-800 text-white">
              <h2 className="text-xl font-semibold bg-gradient-to-r from-gem-pink to-gem-purple bg-clip-text text-transparent">Seu Carrinho</h2>
              <div className="flex items-center">
                <span className="mr-4 text-white/80">{totalItems} itens</span>
                <button 
                  onClick={closeCart}
                  className="p-1 rounded-full hover:bg-black-700 hover:text-gem-pink transition-colors"
                  aria-label="Close cart"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Cart content */}
            <div className="flex-1 overflow-y-auto p-4">
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gem-purple"></div>
                </div>
              ) : !cart || !cart.items || cart.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-4">
                  <ShoppingBag size={64} className="text-gem-purple/30 mb-4" />
                  <h3 className="text-xl font-medium text-white mb-2">Seu carrinho está vazio</h3>
                  <p className="text-white/60 mb-6">Parece que você ainda não adicionou nenhum item ao seu carrinho.</p>
                  <button 
                    onClick={closeCart}
                    className="px-6 py-2 bg-gradient-to-r from-gem-purple to-gem-blue text-white rounded-md hover:shadow-neon-purple transition-all duration-300"
                  >
                    Continuar Comprando
                  </button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {cart.items.map((item) => (
                    <li key={item.id} className="border border-gem-purple/20 rounded-lg p-3 flex bg-black-800">
                      {/* Product image */}
                      <div className="w-20 h-20 bg-black-700 rounded-md overflow-hidden flex-shrink-0">
                        {item.product_details.main_image && (
                          <img 
                            src={item.product_details.main_image.image} 
                            alt={item.product_details.main_image.alt_text || item.product_details.name} 
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>

                      {/* Product details */}
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between">
                          <h3 className="text-sm font-medium text-white">{item.product_details.name}</h3>
                          <p className="text-sm font-medium bg-gradient-to-r from-gem-purple to-gem-pink bg-clip-text text-transparent">
                            R$ {parseFloat(item.total_price).toFixed(2)}
                          </p>
                        </div>

                        <p className="text-sm text-white/60 mt-1">
                          R$ {parseFloat(item.product_details.price_discount || item.product_details.price).toFixed(2)} cada
                        </p>

                        {/* Quantity controls and remove button */}
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center border border-gem-purple/30 rounded-md bg-black-900">
                            <button 
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="px-2 py-1 text-white/80 hover:text-gem-blue transition-colors"
                              disabled={loading}
                              aria-label="Decrease quantity"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-2 py-1 text-white min-w-[30px] text-center">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="px-2 py-1 text-white/80 hover:text-gem-blue transition-colors"
                              disabled={loading}
                              aria-label="Increase quantity"
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          <button 
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-white/60 hover:text-gem-pink transition-colors"
                            disabled={loading}
                            aria-label="Remove item"
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

            {/* Footer with summary and checkout button */}
            {cart && cart.items && cart.items.length > 0 && (
              <div className="border-t border-gem-purple/20 p-4 bg-black-800">
                <div className="flex justify-between mb-2">
                  <span className="text-white/80">Subtotal</span>
                  <span className="font-medium text-white">R$ {parseFloat(totalPrice).toFixed(2)}</span>
                </div>

                <div className="flex justify-between mb-4">
                  <span className="text-white/80">Frete</span>
                  <span className="font-medium text-white">Calculado no checkout</span>
                </div>

                <div className="flex justify-between mb-4 text-lg font-bold">
                  <span className="text-white">Total</span>
                  <span className="bg-gradient-to-r from-gem-purple to-gem-pink bg-clip-text text-transparent">R$ {parseFloat(totalPrice).toFixed(2)}</span>
                </div>

                <Link 
                  to="/checkout"
                  className="w-full py-3 bg-gradient-to-r from-gem-purple to-gem-blue text-white rounded-md font-medium text-center block hover:shadow-neon-purple transition-all duration-300"
                >
                  Finalizar Compra
                </Link>

                <button 
                  onClick={closeCart}
                  className="w-full py-2 mt-2 text-white/60 font-medium text-center block hover:text-gem-cyan transition-colors"
                >
                  Continuar Comprando
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
