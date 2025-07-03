import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, ShoppingCart, Heart, Clock, TruckIcon, ShieldCheck, AlertCircle } from 'lucide-react';
import MarketplaceLayout from '@/components/marketplace/MarketplaceLayout';
import { productService } from '@/services';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { Product, ProductListItem } from '@/types/api';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { showToast } = useToast();

  // State for product
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for related products
  const [relatedProducts, setRelatedProducts] = useState<ProductListItem[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(true);

  // State for cart actions
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  // State for selected image
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Fetch product on component mount
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const productData = await productService.getById(id);
        setProduct(productData);
        setError(null);

        // Find the main image index
        const mainImageIndex = productData.images.findIndex(img => img.is_main);
        setSelectedImageIndex(mainImageIndex >= 0 ? mainImageIndex : 0);

        // Fetch related products from the same category
        setLoadingRelated(true);
        const related = await productService.getProducts({ 
          category_id: productData.category
        });
        // Filter out the current product and limit to 4 related products
        const filteredRelated = related.filter(item => item.id !== productData.id).slice(0, 4);
        setRelatedProducts(filteredRelated);
      } catch (err) {
        setError('Falha ao carregar o produto. Por favor, tente novamente.');
        setProduct(null);
      } finally {
        setLoading(false);
        setLoadingRelated(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Format price with Brazilian currency
  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(parseFloat(price));
  };

  // Calculate discount percentage if price_discount exists
  const calculateDiscountPercentage = () => {
    if (!product || !product.price_discount) return null;

    const originalPrice = parseFloat(product.price);
    const discountPrice = parseFloat(product.price_discount);

    if (originalPrice <= 0 || discountPrice >= originalPrice) return null;

    const discountPercentage = ((originalPrice - discountPrice) / originalPrice) * 100;
    return Math.round(discountPercentage);
  };

  const discountPercentage = product?.price_discount ? calculateDiscountPercentage() : null;

  // Handle add to cart
  const handleAddToCart = async () => {
    if (!product || isAddingToCart) return;

    setIsAddingToCart(true);

    try {
      // Use the addItem function from the cart context
      const success = await addItem(product.id, 1);

      if (success) {
        setIsAddedToCart(true);
        // Show success toast
        showToast(`${product.name} adicionado ao carrinho`, 'success');
        setTimeout(() => setIsAddedToCart(false), 2000);
      }
    } catch (error) {
      showToast('Erro ao adicionar item ao carrinho', 'error');
    } finally {
      setIsAddingToCart(false);
    }
  };

  // Handle buy now
  const handleBuyNow = async () => {
    if (!product || isAddingToCart) return;

    setIsAddingToCart(true);

    try {
      // Use the addItem function from the cart context
      const success = await addItem(product.id, 1);

      if (success) {
        navigate('/checkout');
      } else {
        showToast('Erro ao adicionar item ao carrinho', 'error');
        setIsAddingToCart(false);
      }
    } catch (error) {
      showToast('Erro ao adicionar item ao carrinho', 'error');
      setIsAddingToCart(false);
    }
  };

  // Handle add to wishlist
  const handleAddToWishlist = () => {
    if (!product) return;

    // Implement wishlist functionality
    setIsInWishlist(!isInWishlist);
  };

  // Loading state
  if (loading) {
    return (
      <MarketplaceLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-6 bg-black-800 rounded w-1/3 mb-4"></div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/2">
                <div className="aspect-square bg-black-800 rounded-lg mb-4"></div>
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((_, index) => (
                    <div key={index} className="w-20 h-20 bg-black-800 rounded"></div>
                  ))}
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="h-8 bg-black-800 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-black-800 rounded w-1/4 mb-6"></div>
                <div className="h-6 bg-black-800 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-black-800 rounded w-1/2 mb-6"></div>
                <div className="h-10 bg-black-800 rounded mb-4"></div>
                <div className="h-10 bg-black-800 rounded mb-6"></div>
                <div className="h-4 bg-black-800 rounded w-full mb-2"></div>
                <div className="h-4 bg-black-800 rounded w-full mb-2"></div>
                <div className="h-4 bg-black-800 rounded w-3/4 mb-6"></div>
              </div>
            </div>
          </div>
        </div>
      </MarketplaceLayout>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <MarketplaceLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-black-800/50 rounded-lg p-6 text-center">
            <p className="text-red-500">{error || 'Produto não encontrado'}</p>
            <div className="mt-4 flex justify-center gap-4">
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-gem-purple/20 text-gem-purple hover:bg-gem-purple/30 transition-colors rounded-md"
              >
                Tentar novamente
              </button>
              <Link 
                to="/marketplace"
                className="px-4 py-2 bg-black-700 text-white/70 hover:text-white transition-colors rounded-md"
              >
                Voltar para a loja
              </Link>
            </div>
          </div>
        </div>
      </MarketplaceLayout>
    );
  }

  return (
    <MarketplaceLayout>
      <Helmet>
        <title>{product.name} - Gemstone</title>
        <meta name="description" content={product.description.substring(0, 160)} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm mb-6 text-white/60">
          <Link to="/" className="hover:text-gem-purple transition-colors">Home</Link>
          <ChevronRight size={16} className="mx-2" />
          <Link to="/marketplace" className="hover:text-gem-purple transition-colors">Marketplace</Link>
          <ChevronRight size={16} className="mx-2" />
          <Link 
            to={`/marketplace?category_id=${product.category}`} 
            className="hover:text-gem-purple transition-colors"
          >
            {product.category_name}
          </Link>
          <ChevronRight size={16} className="mx-2" />
          <span className="text-white/90 truncate">{product.name}</span>
        </nav>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Images */}
          <div className="w-full md:w-1/2">
            {/* Main image */}
            <div className="bg-black-800 rounded-lg overflow-hidden mb-4 aspect-square">
              {product.images && product.images.length > 0 ? (
                <img 
                  src={product.images[selectedImageIndex].image} 
                  alt={product.images[selectedImageIndex].alt_text || product.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full bg-black-700 flex items-center justify-center">
                  <span className="text-white/50">Sem imagem</span>
                </div>
              )}
            </div>

            {/* Thumbnail images */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-20 h-20 rounded-md overflow-hidden flex-shrink-0 border-2 ${
                      selectedImageIndex === index 
                        ? 'border-gem-purple' 
                        : 'border-transparent'
                    }`}
                  >
                    <img 
                      src={image.image} 
                      alt={image.alt_text || `${product.name} - imagem ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="w-full md:w-1/2">
            {/* Product title */}
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{product.name}</h1>

            {/* Category */}
            <div className="text-gem-purple mb-6">{product.category_name}</div>

            {/* Price section */}
            <div className="mb-6">
              {product.price_discount ? (
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-white">
                    {formatPrice(product.price_discount)}
                  </span>
                  <span className="text-lg line-through text-white/50">
                    {formatPrice(product.price)}
                  </span>
                  {discountPercentage && (
                    <span className="bg-red-500/20 text-red-500 px-2 py-1 rounded text-sm font-medium">
                      -{discountPercentage}%
                    </span>
                  )}
                </div>
              ) : (
                <span className="text-2xl font-bold text-white">
                  {formatPrice(product.price)}
                </span>
              )}

              {/* Payment options */}
              <div className="mt-2 text-white/70 text-sm">
                <p>Em até 12x sem juros</p>
                <p className="text-green-500">
                  10% de desconto no PIX ou Boleto ({formatPrice(parseFloat(product.price_discount || product.price) * 0.9)})
                </p>
              </div>
            </div>

            {/* Stock status */}
            <div className="mb-6">
              {product.available ? (
                <div className="flex items-center text-green-500">
                  <ShieldCheck size={16} className="mr-1" />
                  <span>Em estoque - {product.stock} unidades disponíveis</span>
                </div>
              ) : (
                <div className="flex items-center text-red-500">
                  <AlertCircle size={16} className="mr-1" />
                  <span>Produto indisponível</span>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3 mb-8">
              <button
                onClick={handleBuyNow}
                disabled={!product.available || isAddingToCart}
                className={`w-full py-3 rounded-md font-medium transition-colors ${
                  !product.available
                    ? 'bg-black-700 text-white/50 cursor-not-allowed'
                    : 'bg-gradient-to-r from-gem-purple to-gem-blue text-white hover:shadow-neon-purple'
                }`}
              >
                {!product.available ? 'Indisponível' : isAddingToCart ? 'Processando...' : 'Comprar agora'}
              </button>

              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.available || isAddingToCart}
                  className={`flex-grow py-3 rounded-md font-medium flex items-center justify-center ${
                    !product.available
                      ? 'bg-black-700 text-white/50 cursor-not-allowed'
                      : isAddedToCart
                      ? 'bg-green-500/20 text-green-500'
                      : 'bg-black-700 text-white hover:bg-black-600 transition-colors'
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
                      Adicionado ao carrinho
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <ShoppingCart size={16} className="mr-2" />
                      Adicionar ao carrinho
                    </span>
                  )}
                </button>

                <button
                  onClick={handleAddToWishlist}
                  className={`p-3 rounded-md ${
                    isInWishlist 
                      ? 'bg-gem-pink/20 text-gem-pink' 
                      : 'bg-black-700 text-white/70 hover:text-gem-pink hover:bg-black-600'
                  } transition-colors`}
                  aria-label={isInWishlist ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                >
                  <Heart size={20} fill={isInWishlist ? "currentColor" : "none"} />
                </button>
              </div>
            </div>

            {/* Quick info */}
            <div className="bg-black-800 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3 mb-3">
                <TruckIcon size={20} className="text-gem-purple flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium text-white">Entrega</h3>
                  <p className="text-white/70 text-sm">Frete grátis para todo o Brasil</p>
                  <p className="text-white/70 text-sm">Entrega expressa disponível</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck size={20} className="text-gem-purple flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium text-white">Garantia</h3>
                  <p className="text-white/70 text-sm">12 meses de garantia</p>
                  <p className="text-white/70 text-sm">30 dias para devolução</p>
                </div>
              </div>
            </div>

            {/* Urgency elements */}
            <div className="bg-black-800/50 rounded-lg p-4 mb-6 border border-yellow-500/20">
              <div className="flex items-center text-yellow-500">
                <Clock size={16} className="mr-2" />
                <span className="font-medium">Oferta por tempo limitado!</span>
              </div>
              <p className="text-white/70 text-sm mt-1">Restam apenas {product.stock < 10 ? product.stock : '10+'} unidades em estoque</p>
            </div>
          </div>
        </div>

        {/* Product description */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-white mb-4">Descrição do Produto</h2>
          <div className="bg-black-800 rounded-lg p-6">
            <div className="prose prose-invert max-w-none">
              {product.description.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-white/80">{paragraph}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-white mb-4">Produtos Relacionados</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map(relatedProduct => (
                <Link 
                  key={relatedProduct.id} 
                  to={`/marketplace/product/${relatedProduct.id}`}
                  className="bg-black-800 rounded-lg overflow-hidden border border-gem-purple/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="aspect-square overflow-hidden">
                    {relatedProduct.main_image ? (
                      <img
                        src={relatedProduct.main_image.image}
                        alt={relatedProduct.main_image.alt_text || relatedProduct.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-black-700 flex items-center justify-center">
                        <span className="text-white/50">Sem imagem</span>
                      </div>
                    )}
                  </div>

                  <div className="p-3">
                    <div className="text-gem-purple text-xs mb-1">{relatedProduct.category_name}</div>
                    <h3 className="font-medium text-white mb-2 line-clamp-1">{relatedProduct.name}</h3>
                    <div className="text-sm font-semibold text-white">{formatPrice(relatedProduct.price)}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </MarketplaceLayout>
  );
};

export default ProductDetail;
