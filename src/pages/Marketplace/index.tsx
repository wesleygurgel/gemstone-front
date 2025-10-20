import { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Menu } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import MarketplaceLayout from '@/components/marketplace/MarketplaceLayout';
import ProductFilters from '@/components/marketplace/ProductFilters';
import ProductGrid from '@/components/marketplace/ProductGrid';
import { productService } from '@/services';
import { ProductListItem } from '@/types/api';
import { useTranslation } from 'react-i18next';

const Marketplace = () => {
  const { t } = useTranslation('marketplace');

  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClearUrlParams = useCallback(() => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('category_id');
    setSearchParams(newParams);
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const categoryId = searchParams.get('category_id');
        const params: any = {};
        if (categoryId) params.category_id = categoryId;

        const response = await productService.getProducts(params);
        const sorted = [...response].sort((a, b) => b.view_count - a.view_count);
        setProducts(sorted);
        setError(null);
      } catch {
        setError(
          t('marketplace.errors.loadProducts', {
            defaultValue: 'Failed to load products. Please try again.',
          })
        );
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchParams, t]);

  const handleFilterChange = useCallback(
    async (filters: any) => {
      const params: any = {};
      if (filters.priceRange.active) {
        params.min_price = filters.priceRange.min;
        params.max_price = filters.priceRange.max;
      }
      if (filters.productTypes.active && filters.productTypes.selected.length > 0) {
        params.product_type = filters.productTypes.selected.join(',');
      }
      if (filters.weights.active && filters.weights.selected.length > 0) {
        params.weight = filters.weights.selected.join(',');
      }
      if (filters.categories.active && filters.categories.selectedId) {
        params.category_id = filters.categories.selectedId;
      }

      setLoading(true);
      try {
        const response = await productService.getProducts(params);
        let sorted = [...response];
        switch (filters.sort) {
          case 'price-asc':
            sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            break;
          case 'price-desc':
            sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
            break;
          case 'bestselling':
            sorted.sort((a, b) => b.sales_count - a.sales_count);
            break;
          default:
            sorted.sort((a, b) => b.view_count - a.view_count);
        }
        setProducts(sorted);
        setError(null);
      } catch {
        setError(
          t('marketplace.errors.filterProducts', {
            defaultValue: 'Failed to filter products. Please try again.',
          })
        );
      } finally {
        setLoading(false);
      }
    },
    [t]
  );

  const handleSortChange = useCallback(
    (sort: string) => {
      const sorted = [...products];
      switch (sort) {
        case 'price-asc':
          sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
          break;
        case 'price-desc':
          sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
          break;
        case 'bestselling':
          sorted.sort((a, b) => b.sales_count - a.sales_count);
          break;
        default:
          sorted.sort((a, b) => b.view_count - a.view_count);
      }
      setProducts(sorted);
    },
    [products]
  );

  return (
    <MarketplaceLayout>
      <Helmet>
        <title>{t('marketplace.meta.title', { defaultValue: 'Marketplace - Gemstone' })}</title>
        <meta
          name="description"
          content={t('marketplace.meta.description', {
            defaultValue:
              'Explore our exclusive selection of certified precious metals and gemstones.',
          })}
        />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Desktop Sidebar */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <ProductFilters
              initialCategoryId={
                searchParams.get('category_id')
                  ? Number(searchParams.get('category_id'))
                  : null
              }
              onFilterChange={handleFilterChange}
              onSortChange={handleSortChange}
              onClearUrlParams={handleClearUrlParams}
            />
          </div>

          {/* Main */}
          <div className="flex-grow">
            <div className="flex justify-between items-center mb-4 md:hidden">
              <h2 className="text-xl font-semibold text-white">
                {t('marketplace.products.title', { defaultValue: 'Products' })}
              </h2>
              <button
                onClick={() => setIsFilterDrawerOpen(true)}
                className="flex items-center px-3 py-2 bg-black-800 rounded-lg border border-gem-purple/20 text-white/90 hover:text-gem-purple transition-colors"
              >
                <Menu size={18} className="mr-2" />
                {t('marketplace.filters.title', { defaultValue: 'Filters' })}
              </button>
            </div>

            <ProductGrid products={products} loading={loading} error={error} />
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <ProductFilters
        isMobile
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        initialCategoryId={
          searchParams.get('category_id')
            ? Number(searchParams.get('category_id'))
            : null
        }
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
        onClearUrlParams={handleClearUrlParams}
      />
    </MarketplaceLayout>
  );
};

export default Marketplace;
