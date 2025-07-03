import { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Menu } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import MarketplaceLayout from '@/components/marketplace/MarketplaceLayout';
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

  // Get search parameters from URL
  const [searchParams, setSearchParams] = useSearchParams();

  // Function to clear URL parameters
  const handleClearUrlParams = useCallback(() => {
    // Create a new URLSearchParams object without the category_id parameter
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('category_id');
    setSearchParams(newParams);
  }, [searchParams, setSearchParams]);

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        // Check if category_id is present in the URL
        const categoryId = searchParams.get('category_id');

        // Create params object for API call
        const params: any = {};

        // Apply category filter if present in URL
        if (categoryId) {
          params.category_id = categoryId;
        }

        const response = await productService.getProducts(params);
        setProducts(response);
        setError(null);
      } catch (err) {
        setError('Falha ao carregar produtos. Por favor, tente novamente.');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  // Handle filter changes
  const handleFilterChange = useCallback(async (newFilters: any) => {
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

    // Apply category filter if active
    if (newFilters.categories.active && newFilters.categories.selectedId) {
      params.category_id = newFilters.categories.selectedId;
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
      setError('Falha ao filtrar produtos. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle sort changes
  const handleSortChange = useCallback(async (newSort: string) => {
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
      setError('Falha ao ordenar produtos. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  }, []);


  // Handle add to wishlist
  const handleAddToWishlist = (productId: number) => {
    // Implement wishlist functionality
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
            {/* Filters */}
            <ProductFilters 
              initialCategoryId={searchParams.get('category_id') ? Number(searchParams.get('category_id')) : null}
              onFilterChange={handleFilterChange}
              onSortChange={handleSortChange}
              onClearUrlParams={handleClearUrlParams}
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
        initialCategoryId={searchParams.get('category_id') ? Number(searchParams.get('category_id')) : null}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
        onClearUrlParams={handleClearUrlParams}
      />
    </MarketplaceLayout>
  );
};

export default Marketplace;
