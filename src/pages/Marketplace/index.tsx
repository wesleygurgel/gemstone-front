import { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Menu } from 'lucide-react';
import MarketplaceLayout from '@/components/marketplace/MarketplaceLayout';
import CategoryNavigation from '@/components/marketplace/CategoryNavigation';
import ProductFilters from '@/components/marketplace/ProductFilters';
import ProductGrid from '@/components/marketplace/ProductGrid';
import { productService, cartService } from '@/services';
import { ProductListItem } from '@/types/api';

const Marketplace = () => {
  // State for products
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for mobile drawer
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productService.getProducts();
        console.log('API Response:', response);
        // The productService.getProducts() now returns the array of products directly
        console.log('Products from API:', response);
        setProducts(response);
        console.log('Products state after setting:', response);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Falha ao carregar produtos. Por favor, tente novamente.');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle filter changes
  const handleFilterChange = useCallback(async (newFilters: any) => {
    console.log('Filter change:', newFilters);

    // Create params object for API call
    const params: any = {};

    // Apply price range filter if active
    if (newFilters.priceRange.active) {
      params.min_price = newFilters.priceRange.min;
      params.max_price = newFilters.priceRange.max;
    }

    // Apply product type filters if active
    if (newFilters.productTypes.active && newFilters.productTypes.selected.length > 0) {
      params.product_type = newFilters.productTypes.selected.join(',');
    }

    // Apply weight filters if active
    if (newFilters.weights.active && newFilters.weights.selected.length > 0) {
      params.weight = newFilters.weights.selected.join(',');
    }

    // Apply sorting
    if (newFilters.sort && newFilters.sort !== 'relevance') {
      params.sort = newFilters.sort;
    }

    // Fetch filtered products
    setLoading(true);
    try {
      const response = await productService.getProducts(params);
      setProducts(response);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch filtered products:', err);
      setError('Falha ao filtrar produtos. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle sort changes
  const handleSortChange = useCallback(async (newSort: string) => {
    console.log('Sort change:', newSort);

    // Create params object for API call
    const params: any = {};

    // Apply sorting if it's not the default
    if (newSort && newSort !== 'relevance') {
      params.sort = newSort;
    }

    // Fetch sorted products
    setLoading(true);
    try {
      const response = await productService.getProducts(params);
      setProducts(response);
      setError(null);
    } catch (err) {
      console.error('Failed to sort products:', err);
      setError('Falha ao ordenar produtos. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle add to cart
  const handleAddToCart = async (productId: number, quantity: number) => {
    try {
      await cartService.addItem({ product: productId, quantity });
      // You could add a toast notification here
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      // Handle error (show toast, etc.)
    }
  };

  // Handle add to wishlist
  const handleAddToWishlist = (productId: number) => {
    // Implement wishlist functionality
    console.log('Add to wishlist:', productId);
  };

  // @ts-ignore
  // @ts-ignore
  return (
    <MarketplaceLayout>
      <Helmet>
        <title>Marketplace - Gemstone</title>
        <meta name="description" content="Explore nossa seleção exclusiva de metais preciosos e pedras com certificação e procedência garantida." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar - visible on md and up */}
          <div className="hidden md:block w-64 flex-shrink-0">
            {/* Category navigation (sidebar variant) */}
            <CategoryNavigation 
              className="mb-6" 
              onCategorySelect={setProducts} 
            />

            {/* Filters */}
            <ProductFilters 
              onFilterChange={handleFilterChange}
              onSortChange={handleSortChange}
            />
          </div>

          {/* Main content */}
          <div className="flex-grow">
            {/* Mobile filter button */}
            <div className="flex justify-between items-center mb-4 md:hidden">
              <h2 className="text-xl font-semibold text-white">Produtos</h2>
              <button
                onClick={() => setIsFilterDrawerOpen(true)}
                className="flex items-center px-3 py-2 bg-black-800 rounded-lg border border-gem-purple/20 text-white/90 hover:text-gem-purple transition-colors"
              >
                <Menu size={18} className="mr-2" />
                Filtros
              </button>
            </div>

            {/* Product grid */}
            {console.log('Before rendering ProductGrid - products:', products)}
            <ProductGrid 
              products={products}
              loading={loading}
              error={error}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
            />
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <ProductFilters 
        isMobile={true}
        isOpen={isFilterDrawerOpen}
        onClose={() => {setIsFilterDrawerOpen(false)}}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
      />
    </MarketplaceLayout>
  );
};

export default Marketplace;
