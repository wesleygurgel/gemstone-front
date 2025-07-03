import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronRight, ChevronDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { categoryService, productService } from '@/services';
import { Category, ProductListItem } from '@/types/api';

interface CategoryNavigationProps {
  className?: string;
  variant?: 'sidebar' | 'horizontal';
  onCategorySelect?: (products: ProductListItem[]) => void;
}

const CategoryNavigation = ({ className = '', variant = 'sidebar', onCategorySelect }: CategoryNavigationProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | string | null>(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null);
  const location = useLocation();

  // Mock subcategories for demonstration (in a real app, these would come from the API)
  const subcategories: Record<number, { id: number; name: string; slug: string }[]> = {
    1: [
      { id: 101, name: 'Lingotes', slug: 'ouro-lingotes' },
      { id: 102, name: 'Barras', slug: 'ouro-barras' },
      { id: 103, name: 'Moedas', slug: 'ouro-moedas' },
    ],
    2: [
      { id: 201, name: 'Certificados GIA', slug: 'diamantes-certificados-gia' },
      { id: 202, name: 'Brutos', slug: 'diamantes-brutos' },
      { id: 203, name: 'Lapidados', slug: 'diamantes-lapidados' },
    ],
    3: [
      { id: 301, name: 'Anéis', slug: 'joias-aneis' },
      { id: 302, name: 'Colares', slug: 'joias-colares' },
      { id: 303, name: 'Brincos', slug: 'joias-brincos' },
    ],
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await categoryService.getAllCategories();
        setCategories(data);
        setError(null);
      } catch (err) {
        setError('Falha ao carregar categorias. Por favor, tente novamente.');
        // Fallback to mock data for demonstration
        setCategories([
          { id: 1, name: 'Ouro', slug: 'ouro', description: 'Produtos de ouro' },
          { id: 2, name: 'Diamantes', slug: 'diamantes', description: 'Diamantes certificados' },
          { id: 3, name: 'Joias', slug: 'joias', description: 'Joias exclusivas' },
          { id: 4, name: 'Serviços Logísticos', slug: 'servicos-logisticos', description: 'Serviços de logística' },
          { id: 5, name: 'Barramentos', slug: 'barramentos', description: 'Barramentos de metais preciosos' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const toggleCategory = (categoryId: number) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
  };

  const handleCategorySelect = async (categoryId: number | string, categoryName?: string) => {
    if (onCategorySelect) {
      try {
        // Set the selected category
        setSelectedCategoryId(categoryId);

        // Find the category name if not provided
        if (!categoryName) {
          const category = categories.find(c => c.id === categoryId || c.slug === categoryId);
          if (category) {
            categoryName = category.name;
          } else {
            // Check if it's a subcategory
            for (const catId in subcategories) {
              const subcat = subcategories[Number(catId)]?.find(
                sc => sc.id === categoryId || sc.slug === categoryId
              );
              if (subcat) {
                categoryName = subcat.name;
                break;
              }
            }
          }
        }

        setSelectedCategoryName(categoryName || String(categoryId));

        const categoryData = await categoryService.getProductsByCategory(categoryId);
        // Check if the response is a category object with a products array
        if (categoryData && typeof categoryData === 'object' && 'products' in categoryData) {
          onCategorySelect(categoryData.products);
        } else {
          // If it's already an array of products, pass it directly
          onCategorySelect(categoryData);
        }
      } catch (error) {
      }
    }
  };

  const handleResetFilter = async () => {
    if (onCategorySelect) {
      try {
        setSelectedCategoryId(null);
        setSelectedCategoryName(null);

        // Fetch all products
        const products = await productService.getProducts();
        onCategorySelect(products);
      } catch (error) {
        console.error('Failed to fetch all products:', error);
      }
    }
  };

  if (variant === 'sidebar') {
    return (
      <div className={`bg-black-800 rounded-lg border border-gem-purple/20 p-4 ${className}`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">Categorias</h3>
          {selectedCategoryId && (
            <button
              onClick={handleResetFilter}
              className="flex items-center text-sm text-gem-pink hover:text-gem-purple transition-colors"
              title="Limpar filtro"
            >
              <X size={16} className="mr-1" />
              Limpar
            </button>
          )}
        </div>

        {selectedCategoryName && (
          <div className="mb-4 px-3 py-2 bg-gem-purple/10 border border-gem-purple/30 rounded-md">
            <p className="text-sm text-white/80">
              Filtrando por: <span className="text-gem-pink font-medium">{selectedCategoryName}</span>
            </p>
          </div>
        )}

        {loading ? (
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-8 bg-black-700 animate-pulse rounded"></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-red-500 text-sm">{error}</div>
        ) : (
          <ul className="space-y-1">
            {categories.map((category) => (
              <li key={category.id} className="mb-2">
                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => handleCategorySelect(category.id, category.name)}
                    className={`flex-grow py-1 text-left transition-colors ${
                      selectedCategoryId === category.id 
                        ? 'text-gem-pink font-medium' 
                        : 'text-white/90 hover:text-gem-pink'
                    }`}
                  >
                    {category.name}
                    {selectedCategoryId === category.id && ' ✓'}
                  </button>
                  {subcategories[category.id] && (
                    <button 
                      onClick={() => toggleCategory(category.id)}
                      className="p-1 text-white/70 hover:text-gem-purple transition-colors"
                    >
                      {activeCategory === category.id ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </button>
                  )}
                </div>

                <AnimatePresence>
                  {activeCategory === category.id && subcategories[category.id] && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-4 mt-1 overflow-hidden"
                    >
                      {subcategories[category.id].map((subcat) => (
                        <li key={subcat.id}>
                          <button 
                            onClick={() => handleCategorySelect(subcat.id, subcat.name)}
                            className={`py-1 block text-sm text-left w-full transition-colors ${
                              selectedCategoryId === subcat.id 
                                ? 'text-gem-cyan font-medium' 
                                : 'text-white/70 hover:text-gem-cyan'
                            }`}
                          >
                            {subcat.name}
                            {selectedCategoryId === subcat.id && ' ✓'}
                          </button>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  // Horizontal variant
  return (
    <div className={`${className}`}>
      <div className="flex items-center justify-between mb-2">
        {selectedCategoryName && (
          <div className="flex items-center">
            <span className="text-sm text-white/80 mr-2">
              Filtrando por: <span className="text-gem-pink font-medium">{selectedCategoryName}</span>
            </span>
            <button
              onClick={handleResetFilter}
              className="flex items-center text-xs text-gem-pink hover:text-gem-purple transition-colors"
              title="Limpar filtro"
            >
              <X size={14} className="mr-1" />
              Limpar
            </button>
          </div>
        )}
      </div>
      <nav className="flex items-center space-x-1 overflow-x-auto pb-2 hide-scrollbar">
        {loading ? (
          <div className="flex space-x-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-8 w-24 bg-black-700 animate-pulse rounded"></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-red-500 text-sm">{error}</div>
        ) : (
          categories.map((category) => (
            <div key={category.id} className="relative group">
              <button 
                onClick={() => handleCategorySelect(category.id, category.name)}
                className={`px-3 py-2 whitespace-nowrap flex items-center transition-colors ${
                  selectedCategoryId === category.id 
                    ? 'text-gem-pink font-medium bg-black-700/50 rounded' 
                    : 'text-white/90 hover:text-gem-pink'
                }`}
              >
                {category.name}
                {selectedCategoryId === category.id && ' ✓'}
                {subcategories[category.id] && (
                  <ChevronDown size={16} className="ml-1 text-white/70" />
                )}
              </button>

              {subcategories[category.id] && (
                <div className="absolute left-0 mt-1 w-48 bg-black-800 rounded-md shadow-lg py-1 z-50 border border-gem-violet/30 hidden group-hover:block">
                  {subcategories[category.id].map((subcat) => (
                    <button 
                      key={subcat.id}
                      onClick={() => handleCategorySelect(subcat.id, subcat.name)}
                      className={`block px-4 py-2 text-sm w-full text-left transition-colors ${
                        selectedCategoryId === subcat.id 
                          ? 'text-gem-cyan font-medium bg-black-700' 
                          : 'text-white/80 hover:bg-black-700 hover:text-gem-cyan'
                      }`}
                    >
                      {subcat.name}
                      {selectedCategoryId === subcat.id && ' ✓'}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </nav>
    </div>
  );
};

export default CategoryNavigation;
