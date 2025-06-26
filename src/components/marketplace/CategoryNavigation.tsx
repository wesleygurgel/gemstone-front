import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { categoryService } from '@/services';
import { Category } from '@/types/api';

interface CategoryNavigationProps {
  className?: string;
  variant?: 'sidebar' | 'horizontal';
}

const CategoryNavigation = ({ className = '', variant = 'sidebar' }: CategoryNavigationProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
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
        console.error('Failed to fetch categories:', err);
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

  if (variant === 'sidebar') {
    return (
      <div className={`bg-black-800 rounded-lg border border-gem-purple/20 p-4 ${className}`}>
        <h3 className="text-xl font-semibold mb-4 text-white">Categorias</h3>
        
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
                  <Link 
                    to={`/marketplace/category/${category.slug}`}
                    className="text-white/90 hover:text-gem-pink transition-colors flex-grow py-1"
                  >
                    {category.name}
                  </Link>
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
                          <Link 
                            to={`/marketplace/category/${subcat.slug}`}
                            className="text-white/70 hover:text-gem-cyan transition-colors py-1 block text-sm"
                          >
                            {subcat.name}
                          </Link>
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
              <Link 
                to={`/marketplace/category/${category.slug}`}
                className="px-3 py-2 text-white/90 hover:text-gem-pink transition-colors whitespace-nowrap flex items-center"
              >
                {category.name}
                {subcategories[category.id] && (
                  <ChevronDown size={16} className="ml-1 text-white/70" />
                )}
              </Link>
              
              {subcategories[category.id] && (
                <div className="absolute left-0 mt-1 w-48 bg-black-800 rounded-md shadow-lg py-1 z-50 border border-gem-violet/30 hidden group-hover:block">
                  {subcategories[category.id].map((subcat) => (
                    <Link 
                      key={subcat.id}
                      to={`/marketplace/category/${subcat.slug}`}
                      className="block px-4 py-2 text-sm text-white/80 hover:bg-black-700 hover:text-gem-cyan transition-colors"
                    >
                      {subcat.name}
                    </Link>
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