import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart } from 'lucide-react';
import { ProductListItem } from '@/types/api';

interface ProductCardProps {
  product: ProductListItem;
  onAddToCart?: (productId: number, quantity: number) => void;
  onAddToWishlist?: (productId: number) => void;
  className?: string;
}

const ProductCard = ({ product, onAddToCart, onAddToWishlist, className = '' }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  // Format price with Brazilian currency
  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(parseFloat(price));
  };

  // Calculate discount percentage if price_discount exists
  const calculateDiscountPercentage = () => {
    if (!product.price_discount) return null;

    const originalPrice = parseFloat(product.price);
    const discountPrice = parseFloat(product.price_discount);

    if (originalPrice <= 0 || discountPrice >= originalPrice) return null;

    const discountPercentage = ((originalPrice - discountPrice) / originalPrice) * 100;
    return Math.round(discountPercentage);
  };

  const discountPercentage = product.price_discount ? calculateDiscountPercentage() : null;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!product.available || isAddingToCart) return;

    setIsAddingToCart(true);

    try {
      if (onAddToCart) {
        await onAddToCart(product.id, 1);
      }
      setIsAddedToCart(true);
      setTimeout(() => setIsAddedToCart(false), 2000);
    } catch (error) {
      console.error('Failed to add product to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (onAddToWishlist) {
      onAddToWishlist(product.id);
    }

    setIsInWishlist(!isInWishlist);
  };

  return (
    <motion.div
      className={`bg-black-800 rounded-lg overflow-hidden border border-gem-purple/20 transition-all duration-300 ${className}`}
      whileHover={{ 
        y: -5,
        boxShadow: '0 10px 25px -5px rgba(124, 58, 237, 0.1), 0 8px 10px -6px rgba(124, 58, 237, 0.1)'
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link to={`/marketplace/product/${product.id}`} className="block">
        <div className="relative overflow-hidden aspect-square">
          {/* Product image */}
          {product.main_image ? (
            <motion.img
              src={product.main_image.image}
              alt={product.main_image.alt_text || product.name}
              className="w-full h-full object-cover"
              initial={{ scale: 1 }}
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <div className="w-full h-full bg-black-700 flex items-center justify-center">
              <span className="text-white/50">Sem imagem</span>
            </div>
          )}

          {/* Featured badge */}
          {product.featured && (
            <div className="absolute top-2 left-2 bg-gradient-to-r from-gem-pink to-gem-purple px-2 py-1 rounded text-xs font-medium text-white">
              Destaque
            </div>
          )}

          {/* Discount badge */}
          {discountPercentage && (
            <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-red-600 px-2 py-1 rounded-full text-xs font-bold text-white shadow-lg transform -rotate-12 flex items-center justify-center" style={{ marginTop: product.featured ? '28px' : '0' }}>
              <span className="animate-pulse">-{discountPercentage}%</span>
            </div>
          )}

          {/* Wishlist button */}
          <button
            onClick={handleAddToWishlist}
            className={`absolute top-2 right-2 p-2 rounded-full ${
              isInWishlist 
                ? 'bg-gem-pink/20 text-gem-pink' 
                : 'bg-black-900/50 text-white/70 hover:text-gem-pink'
            } transition-colors`}
            aria-label={isInWishlist ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          >
            <Heart size={18} fill={isInWishlist ? "currentColor" : "none"} />
          </button>

          {/* Add to cart button - appears on hover */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black-900/90 to-black-900/0 p-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={handleAddToCart}
              disabled={!product.available || isAddingToCart}
              className={`w-full py-2 rounded-md flex items-center justify-center transition-colors ${
                !product.available
                  ? 'bg-black-700 text-white/50 cursor-not-allowed'
                  : isAddedToCart
                  ? 'bg-green-500/20 text-green-500'
                  : 'bg-gradient-to-r from-gem-purple to-gem-blue text-white hover:shadow-neon-purple'
              }`}
            >
              {!product.available ? (
                'Indisponível'
              ) : isAddingToCart ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adicionando...
                </span>
              ) : isAddedToCart ? (
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Adicionado
                </span>
              ) : (
                <span className="flex items-center">
                  <ShoppingCart size={16} className="mr-1" />
                  Adicionar
                </span>
              )}
            </button>
          </motion.div>
        </div>

        <div className="p-4">
          {/* Category */}
          <div className="text-gem-purple text-xs mb-1">{product.category_name}</div>

          {/* Product name */}
          <h3 className="font-medium text-white mb-2 line-clamp-2 h-12">{product.name}</h3>

          {/* Price */}
          {product.price_discount ? (
            <div className="mt-2">
              {/* Discounted price with original price */}
              <div className="flex flex-col">
                <div className="flex items-center">
                  <span className="text-xl font-bold bg-gradient-to-r from-gem-purple to-gem-pink bg-clip-text text-transparent">{formatPrice(product.price_discount)}</span>
                  <span className="text-xs line-through text-white/40 ml-2">{formatPrice(product.price)}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-lg font-semibold text-white mt-2">{formatPrice(product.price)}</div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
