import { useState, useEffect } from 'react';
import { X, SlidersHorizontal, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { categoryService } from '@/services';
import { Category } from '@/types/api';
import { useTranslation } from 'react-i18next';

// -------------------- Tipagens --------------------
interface FilterOption {
  id: string;
  label: string;
  count: number;
}

interface FilterSection {
  id: string;
  title: string;
  options: FilterOption[];
  expanded: boolean;
}

interface SortOption {
  value: string;
  label: string;
}

interface FilterState {
  priceRange: { active: boolean; min: number; max: number };
  productTypes: { active: boolean; selected: string[] };
  weights: { active: boolean; selected: string[] };
  categories: { active: boolean; selectedId: number | null; selectedName: string | null };
  sort: string;
}

interface ProductFiltersProps {
  className?: string;
  onFilterChange?: (filters: FilterState) => void;
  onSortChange?: (sort: string) => void;
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  initialCategoryId?: number | null;
  onClearUrlParams?: () => void;
}

// -------------------- Componente --------------------
const ProductFilters = ({
  className = '',
  onFilterChange,
  onSortChange,
  isMobile = false,
  isOpen = false,
  onClose,
  initialCategoryId = null,
  onClearUrlParams,
}: ProductFiltersProps) => {
  const { t } = useTranslation('marketplace');

  // -------------------- Estado inicial --------------------
  const initialFilterState: FilterState = {
    priceRange: { active: false, min: 1000, max: 50000 },
    productTypes: { active: false, selected: [] },
    weights: { active: false, selected: [] },
    categories: {
      active: initialCategoryId !== null,
      selectedId: initialCategoryId,
      selectedName: null,
    },
    sort: 'relevance',
  };

  const [filters, setFilters] = useState<FilterState>(initialFilterState);
  const [isInitialMount, setIsInitialMount] = useState(true);
  const [currentMin, setCurrentMin] = useState<number>(initialFilterState.priceRange.min);
  const [currentMax, setCurrentMax] = useState<number>(initialFilterState.priceRange.max);

  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);

  const [filterSections, setFilterSections] = useState<FilterSection[]>([
    {
      id: 'product-type',
      title: t('filters.sections.productType'),
      expanded: true,
      options: [
        { id: 'barra', label: t('filters.sections.productTypeOptions.barra'), count: 12 },
        { id: 'joia', label: t('filters.sections.productTypeOptions.joia'), count: 24 },
        { id: 'bruto', label: t('filters.sections.productTypeOptions.bruto'), count: 8 },
        { id: 'certificado', label: t('filters.sections.productTypeOptions.certificado'), count: 15 },
      ],
    },
    {
      id: 'weight',
      title: t('filters.sections.weight'),
      expanded: true,
      options: [
        { id: '1g', label: t('filters.sections.weightOptions.1g'), count: 5 },
        { id: '10g', label: t('filters.sections.weightOptions.10g'), count: 8 },
        { id: '50g', label: t('filters.sections.weightOptions.50g'), count: 10 },
        { id: '100g', label: t('filters.sections.weightOptions.100g'), count: 7 },
        { id: '1ct', label: t('filters.sections.weightOptions.1ct'), count: 12 },
        { id: '2ct', label: t('filters.sections.weightOptions.2ct'), count: 9 },
      ],
    },
  ]);

  const sortOptions: SortOption[] = [
    { value: 'relevance', label: t('filters.sortOptions.relevance') },
    { value: 'price-asc', label: t('filters.sortOptions.priceAsc') },
    { value: 'price-desc', label: t('filters.sortOptions.priceDesc') },
    { value: 'bestselling', label: t('filters.sortOptions.bestselling') },
  ];

  // -------------------- Handlers --------------------
  const toggleSection = (sectionId: string) => {
    setFilterSections((sections) =>
      sections.map((section) =>
        section.id === sectionId ? { ...section, expanded: !section.expanded } : section,
      ),
    );
  };

  const handleCheckboxChange = (sectionId: string, optionId: string, checked: boolean) => {
    setFilters((prev) => {
      const key = sectionId === 'product-type' ? 'productTypes' : 'weights';
      const selected = [...prev[key].selected];

      if (checked) {
        if (!selected.includes(optionId)) selected.push(optionId);
      } else {
        const idx = selected.indexOf(optionId);
        if (idx !== -1) selected.splice(idx, 1);
      }

      return { ...prev, [key]: { active: selected.length > 0, selected } };
    });
  };

  const handlePriceChange = (type: 'min' | 'max', value: number) => {
    if (type === 'min') setCurrentMin(value);
    else setCurrentMax(value);
  };

  const applyPriceRange = () => {
    const validMin = Math.min(currentMin, currentMax);
    const validMax = Math.max(currentMin, currentMax);
    setFilters((prev) => ({ ...prev, priceRange: { active: true, min: validMin, max: validMax } }));
  };

  const handleSortChange = (value: string) => {
    setFilters((prev) => ({ ...prev, sort: value }));
    onSortChange?.(value);
  };

  const handleCategorySelect = (categoryId: number, categoryName: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: { active: true, selectedId: categoryId, selectedName: categoryName },
    }));
  };

  const clearCategorySelection = () => {
    setFilters((prev) => ({
      ...prev,
      categories: { active: false, selectedId: null, selectedName: null },
    }));
    onClearUrlParams?.();
  };

  const resetFilters = () => {
    setFilters(initialFilterState);
    setCurrentMin(initialFilterState.priceRange.min);
    setCurrentMax(initialFilterState.priceRange.max);
    onClearUrlParams?.();
  };

  // -------------------- Efeitos --------------------
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const data = await categoryService.getAllCategories();
        setCategories(data);
        setCategoriesError(null);
      } catch {
        // ✅ Fallback — categorias conforme o PDF Gemstone
        setCategoriesError(null);
        setCategories([
          { id: 1, name: t('categories.metals.title'), slug: 'metais', description: t('categories.metals.desc') },
          { id: 2, name: t('categories.precious_stones.title'), slug: 'pedras-preciosas', description: t('categories.precious_stones.desc') },
          { id: 3, name: t('categories.jewels.title'), slug: 'joias', description: t('categories.jewels.desc') },
          { id: 4, name: t('categories.exotics.title'), slug: 'exoticos', description: t('categories.exotics.desc') },
        ]);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, [t]);

  useEffect(() => {
    if (onFilterChange && !isInitialMount) onFilterChange(filters);
    setIsInitialMount(false);
  }, [filters, onFilterChange, isInitialMount]);

  // Bloquear scroll body quando drawer aberto no mobile
  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isMobile, isOpen]);

  const countActiveFilters = (): number => {
    let count = 0;
    if (filters.priceRange.active) count++;
    if (filters.productTypes.active) count += filters.productTypes.selected.length;
    if (filters.weights.active) count += filters.weights.selected.length;
    if (filters.categories.active) count++;
    return count;
  };

  const activeFiltersCount = countActiveFilters();

  // -------------------- MOBILE --------------------
  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex"
          >
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />

            <div className="relative ml-auto w-4/5 max-w-md h-full bg-black-800 shadow-lg flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-gem-purple/20">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <SlidersHorizontal size={18} className="mr-2 text-gem-purple" />
                  {t('filters.title')}
                  {activeFiltersCount > 0 && (
                    <span className="ml-2 px-2 py-0.5 text-xs bg-gem-purple/20 text-gem-purple rounded-full">
                      {activeFiltersCount}
                    </span>
                  )}
                </h3>
                <button
                  onClick={onClose}
                  className="p-1 text-white/70 hover:text-gem-pink transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Conteúdo */}
              <div className="flex-grow overflow-y-auto p-4">
                {/* Preço */}
                <div className="mb-6">
                  <h4 className="font-medium text-white mb-3">{t('filters.priceRange')}</h4>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-2/5">
                      <label className="text-white/70 text-xs mb-1 block">{t('filters.min')}</label>
                      <input
                        type="number"
                        value={currentMin}
                        onChange={(e) => handlePriceChange('min', Number(e.target.value))}
                        className="w-full p-2 bg-black-900 border border-gem-purple/30 rounded-md text-white"
                      />
                    </div>
                    <span className="text-white/50">-</span>
                    <div className="w-2/5">
                      <label className="text-white/70 text-xs mb-1 block">{t('filters.max')}</label>
                      <input
                        type="number"
                        value={currentMax}
                        onChange={(e) => handlePriceChange('max', Number(e.target.value))}
                        className="w-full p-2 bg-black-900 border border-gem-purple/30 rounded-md text-white"
                      />
                    </div>
                  </div>
                  <button
                    onClick={applyPriceRange}
                    className="w-full py-2 bg-gem-purple/20 text-gem-purple hover:bg-gem-purple/30 rounded-md text-sm"
                  >
                    {t('filters.apply')}
                  </button>
                </div>

                {/* Categorias */}
                <div className="mb-6">
                  <h4 className="font-medium text-white mb-3">{t('filters.category')}</h4>
                  {loadingCategories ? (
                    <div className="space-y-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-8 bg-black-700 animate-pulse rounded" />
                      ))}
                    </div>
                  ) : categoriesError ? (
                    <div className="text-red-500 text-sm">{categoriesError}</div>
                  ) : (
                    <ul className="space-y-1">
                      {categories.map((category) => (
                        <li key={category.id} className="mb-2">
                          <button
                            onClick={() => handleCategorySelect(category.id, category.name)}
                            className={`flex-grow py-1 text-left transition-colors ${
                              filters.categories.selectedId === category.id
                                ? 'text-gem-pink font-medium'
                                : 'text-white/90 hover:text-gem-pink'
                            }`}
                          >
                            {category.name}
                            {filters.categories.selectedId === category.id && ' ✓'}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="p-4 border-t border-gem-purple/20">
                <button
                  onClick={resetFilters}
                  className="flex items-center justify-center w-full py-2 bg-black-900 text-white/80 hover:text-gem-pink rounded-md"
                >
                  <RotateCcw size={16} className="mr-2" />
                  {t('filters.clear')}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // -------------------- DESKTOP --------------------
  return (
    <div className={`bg-black-800 rounded-lg border border-gem-purple/20 p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <SlidersHorizontal size={18} className="mr-2 text-gem-purple" />
          {t('filters.title')}
          {activeFiltersCount > 0 && (
            <span className="ml-2 px-2 py-0.5 text-xs bg-gem-purple/20 text-gem-purple rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </h3>
        {activeFiltersCount > 0 && (
          <button
            onClick={resetFilters}
            className="text-sm text-white/70 hover:text-gem-pink flex items-center transition-colors"
          >
            <RotateCcw size={14} className="mr-1" />
            {t('filters.clearOne')}
          </button>
        )}
      </div>

      {/* Categorias */}
      <div className="mb-6">
        <h4 className="font-medium text-white mb-3">{t('filters.category')}</h4>
        {loadingCategories ? (
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-8 bg-black-700 animate-pulse rounded" />
            ))}
          </div>
        ) : categoriesError ? (
          <div className="text-red-500 text-sm">{categoriesError}</div>
        ) : (
          <ul className="space-y-1">
            {categories.map((category) => (
              <li key={category.id} className="mb-2">
                <button
                  onClick={() => handleCategorySelect(category.id, category.name)}
                  className={`flex-grow py-1 text-left transition-colors ${
                    filters.categories.selectedId === category.id
                      ? 'text-gem-pink font-medium'
                      : 'text-white/90 hover:text-gem-pink'
                  }`}
                >
                  {category.name}
                  {filters.categories.selectedId === category.id && ' ✓'}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProductFilters;
