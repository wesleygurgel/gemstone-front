import { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Menu } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import MarketplaceLayout from '@/components/marketplace/MarketplaceLayout';
import ProductFilters from '@/components/marketplace/ProductFilters';
import ProductGrid from '@/components/marketplace/ProductGrid';
import { productService, cartService } from '@/services';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { useWishlist } from '@/context/WishlistContext';
import { ProductListItem } from '@/types/api';

const Marketplace = () => {
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const { isItemInWishlist, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlist();

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

        // Apply default sorting (relevance - by view_count) to the initial products
        const sortedProducts = [...response];
        sortedProducts.sort((a, b) => b.view_count - a.view_count);

        setProducts(sortedProducts);
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

    // Note: We don't apply sorting parameter to the API call anymore
    // as sorting is now handled locally

    // Fetch filtered products
    setLoading(true);
    try {
      const response = await productService.getProducts(params);

      // Apply the current sort to the filtered products
      let sortedProducts = [...response];

      // Apply sorting based on the filter's sort value
      switch (newFilters.sort) {
        case 'relevance':
          // Sort by view_count (highest first)
          sortedProducts.sort((a, b) => b.view_count - a.view_count);
          break;
        case 'price-asc':
          // Sort by price (lowest first)
          sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
          break;
        case 'price-desc':
          // Sort by price (highest first)
          sortedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
          break;
        case 'bestselling':
          // Sort by sales_count (highest first)
          sortedProducts.sort((a, b) => b.sales_count - a.sales_count);
          break;
        default:
          // Default to relevance
          sortedProducts.sort((a, b) => b.view_count - a.view_count);
      }

      setProducts(sortedProducts);
      setError(null);
    } catch (err) {
      setError('Falha ao filtrar produtos. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle sort changes - now done locally without API calls
  const handleSortChange = useCallback((newSort: string) => {
    // Sort the products locally based on the selected sort option
    const sortedProducts = [...products];

    switch (newSort) {
      case 'relevance':
        // Sort by view_count (highest first)
        sortedProducts.sort((a, b) => b.view_count - a.view_count);
        break;
      case 'price-asc':
        // Sort by price (lowest first)
        sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'price-desc':
        // Sort by price (highest first)
        sortedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case 'bestselling':
        // Sort by sales_count (highest first)
        sortedProducts.sort((a, b) => b.sales_count - a.sales_count);
        break;
      default:
        // Default to relevance
        sortedProducts.sort((a, b) => b.view_count - a.view_count);
    }

    // Update the products state with the sorted products
    setProducts(sortedProducts);
  }, [products]);


  // Handle add to wishlist
  const handleAddToWishlist = async (productId: number) => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      showToast('Faça login para adicionar itens aos favoritos', 'warning');
      return;
    }

    try {
      // Check if product is already in wishlist
      const isInWishlist = await isItemInWishlist(productId);

      if (isInWishlist) {
        // Remove from wishlist
        const success = await removeFromWishlist(productId);
        if (success) {
          showToast('Produto removido dos favoritos', 'success');
        }
      } else {
        // Add to wishlist
        const success = await addToWishlist(productId);
        if (success) {
          showToast('Produto adicionado aos favoritos', 'success');
        }
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
      showToast('Erro ao atualizar favoritos', 'error');
    }
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
