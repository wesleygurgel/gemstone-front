import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Menu } from 'lucide-react';
import MarketplaceLayout from '@/components/marketplace/MarketplaceLayout';
import CategoryNavigation from '@/components/marketplace/CategoryNavigation';
import Breadcrumb from '@/components/marketplace/Breadcrumb';
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
        setProducts(response.results);
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

  // Handle filter changes (non-functional for now)
  const handleFilterChange = (newFilters: any) => {
    console.log('Filter change (non-functional):', newFilters);
    // Filters are kept in the UI but don't affect the product list
  };

  // Handle sort changes (non-functional for now)
  const handleSortChange = (newSort: string) => {
    console.log('Sort change (non-functional):', newSort);
    // Sorting is kept in the UI but doesn't affect the product list
  };

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

  return (
    <MarketplaceLayout>
      <Helmet>
        <title>Marketplace - Gemstone</title>
        <meta name="description" content="Explore nossa seleção exclusiva de metais preciosos e pedras com certificação e procedência garantida." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6" />

        {/* Horizontal category navigation (visible on all screens) */}
        <div className="mb-6">
          <CategoryNavigation variant="horizontal" />
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar - visible on md and up */}
          <div className="hidden md:block w-64 flex-shrink-0">
            {/* Category navigation (sidebar variant) */}
            <CategoryNavigation className="mb-6" />

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
        onClose={() => setIsFilterDrawerOpen(false)}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
      />
    </MarketplaceLayout>
  );
};

export default Marketplace;
