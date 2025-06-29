import { useState, useEffect } from 'react';
import { X, SlidersHorizontal, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Define filter types
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

// Centralized filter state
interface FilterState {
  priceRange: {
    active: boolean;
    min: number;
    max: number;
  };
  productTypes: {
    active: boolean;
    selected: string[];
  };
  weights: {
    active: boolean;
    selected: string[];
  };
  sort: string;
}

interface ProductFiltersProps {
  className?: string;
  onFilterChange?: (filters: FilterState) => void;
  onSortChange?: (sort: string) => void;
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

const ProductFilters = ({
  className = '',
  onFilterChange,
  onSortChange,
  isMobile = false,
  isOpen = false,
  onClose
}: ProductFiltersProps) => {
  // Initialize centralized filter state
  const initialFilterState: FilterState = {
    priceRange: {
      active: false,
      min: 1000,
      max: 50000
    },
    productTypes: {
      active: false,
      selected: []
    },
    weights: {
      active: false,
      selected: []
    },
    sort: 'relevance'
  };

  // Centralized filter state
  const [filters, setFilters] = useState<FilterState>(initialFilterState);

  // Temporary states for inputs
  const [currentMin, setCurrentMin] = useState<number>(filters.priceRange.min);
  const [currentMax, setCurrentMax] = useState<number>(filters.priceRange.max);

  // Filter sections state
  const [filterSections, setFilterSections] = useState<FilterSection[]>([
    {
      id: 'product-type',
      title: 'Tipo de Produto',
      expanded: true,
      options: [
        { id: 'barra', label: 'Barra', count: 12 },
        { id: 'joia', label: 'Joia', count: 24 },
        { id: 'bruto', label: 'Bruto', count: 8 },
        { id: 'certificado', label: 'Certificado', count: 15 }
      ]
    },
    {
      id: 'weight',
      title: 'Peso / Quilates',
      expanded: true,
      options: [
        { id: '1g', label: '1g', count: 5 },
        { id: '10g', label: '10g', count: 8 },
        { id: '50g', label: '50g', count: 10 },
        { id: '100g', label: '100g', count: 7 },
        { id: '1ct', label: '1ct', count: 12 },
        { id: '2ct', label: '2ct', count: 9 }
      ]
    }
  ]);

  // Sort options
  const sortOptions: SortOption[] = [
    { value: 'relevance', label: 'Relevância' },
    { value: 'price-asc', label: 'Preço: Menor para Maior' },
    { value: 'price-desc', label: 'Preço: Maior para Menor' },
    { value: 'bestselling', label: 'Mais Vendidos' }
  ];

  // Toggle filter section expanded state
  const toggleSection = (sectionId: string) => {
    setFilterSections(sections =>
      sections.map(section =>
        section.id === sectionId
          ? { ...section, expanded: !section.expanded }
          : section
      )
    );
  };

  // Handle checkbox change
  const handleCheckboxChange = (sectionId: string, optionId: string, checked: boolean) => {
    setFilters(prev => {
      // Determine which section is being updated
      const sectionKey = sectionId === 'product-type' ? 'productTypes' : 'weights';
      const selected = [...prev[sectionKey].selected];

      if (checked) {
        if (!selected.includes(optionId)) {
          selected.push(optionId);
        }
      } else {
        const index = selected.indexOf(optionId);
        if (index !== -1) {
          selected.splice(index, 1);
        }
      }

      return {
        ...prev,
        [sectionKey]: {
          active: selected.length > 0,
          selected
        }
      };
    });
  };

  // Handle price range change
  const handlePriceChange = (type: 'min' | 'max', value: number) => {
    if (type === 'min') {
      setCurrentMin(value);
    } else {
      setCurrentMax(value);
    }
  };

  // Apply price range
  const applyPriceRange = () => {
    // Ensure min is not greater than max
    const validMin = Math.min(currentMin, currentMax);
    const validMax = Math.max(currentMin, currentMax);

    setFilters(prev => ({
      ...prev,
      priceRange: {
        active: true,
        min: validMin,
        max: validMax
      }
    }));
  };

  // Handle sort change
  const handleSortChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      sort: value
    }));

    if (onSortChange) {
      onSortChange(value);
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters(initialFilterState);
    setCurrentMin(initialFilterState.priceRange.min);
    setCurrentMax(initialFilterState.priceRange.max);
  };

  // Notify parent component when filters change
  useEffect(() => {
    if (onFilterChange) {
      onFilterChange(filters);
    }
  }, [filters, onFilterChange]);

  // Prevent body scrolling when drawer is open
  useEffect(() => {
    if (isMobile && isOpen) {
      // Disable scrolling on the body
      document.body.style.overflow = 'hidden';

      // Re-enable scrolling when drawer closes or component unmounts
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isMobile, isOpen]);

  // Count total active filters
  const countActiveFilters = (): number => {
    let count = 0;

    if (filters.priceRange.active) count++;
    if (filters.productTypes.active) count += filters.productTypes.selected.length;
    if (filters.weights.active) count += filters.weights.selected.length;

    return count;
  };

  const activeFiltersCount = countActiveFilters();

  // Mobile drawer variant
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
            <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
            <div className="relative ml-auto w-4/5 max-w-md h-full bg-black-800 shadow-lg flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-gem-purple/20">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <SlidersHorizontal size={18} className="mr-2 text-gem-purple" />
                  Filtros
                  {activeFiltersCount > 0 && (
                    <span className="ml-2 px-2 py-0.5 text-xs bg-gem-purple/20 text-gem-purple rounded-full">
                      {activeFiltersCount}
                    </span>
                  )}
                </h3>
                <button
                  onClick={onClose}
                  className="p-1 text-white/70 hover:text-gem-pink transition-colors"
                  aria-label="Fechar"
                >
                  <X size={20} />
                </button>
              </div>

              <div 
                className="flex-grow overflow-y-auto p-4"
                onTouchMove={(e) => e.stopPropagation()}
              >
                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium text-white mb-3">Faixa de Preço</h4>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-2/5">
                      <label className="text-white/70 text-xs mb-1 block">Mínimo</label>
                      <input
                        type="number"
                        value={currentMin}
                        onChange={(e) => handlePriceChange('min', Number(e.target.value))}
                        className="w-full p-2 bg-black-900 border border-gem-purple/30 rounded-md focus:outline-none focus:ring-1 focus:ring-gem-purple text-white"
                      />
                    </div>
                    <span className="text-white/50">-</span>
                    <div className="w-2/5">
                      <label className="text-white/70 text-xs mb-1 block">Máximo</label>
                      <input
                        type="number"
                        value={currentMax}
                        onChange={(e) => handlePriceChange('max', Number(e.target.value))}
                        className="w-full p-2 bg-black-900 border border-gem-purple/30 rounded-md focus:outline-none focus:ring-1 focus:ring-gem-purple text-white"
                      />
                    </div>
                  </div>
                  <button
                    onClick={applyPriceRange}
                    className="w-full py-2 bg-gem-purple/20 text-gem-purple hover:bg-gem-purple/30 transition-colors rounded-md text-sm"
                  >
                    Aplicar
                  </button>
                </div>

                {/* Filter Sections */}
                {filterSections.map((section) => (
                  <div key={section.id} className="mb-6">
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="flex items-center justify-between w-full text-left font-medium text-white mb-3"
                    >
                      <span>{section.title}</span>
                      {section.expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>

                    <AnimatePresence>
                      {section.expanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-2">
                            {section.options.map((option) => (
                              <label key={option.id} className="flex items-center text-white/90 hover:text-white cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={
                                    section.id === 'product-type'
                                      ? filters.productTypes.selected.includes(option.id)
                                      : filters.weights.selected.includes(option.id)
                                  }
                                  onChange={(e) => handleCheckboxChange(section.id, option.id, e.target.checked)}
                                  className="mr-2 h-4 w-4 rounded border-gem-purple/50 text-gem-purple focus:ring-gem-purple/50 focus:ring-offset-black-800"
                                />
                                <span>{option.label}</span>
                                <span className="ml-auto text-white/50 text-sm">({option.count})</span>
                              </label>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                {/* Sort Options */}
                <div className="mb-6">
                  <h4 className="font-medium text-white mb-3">Ordenar Por</h4>
                  <select
                    value={filters.sort}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="w-full p-2 bg-black-900 border border-gem-purple/30 rounded-md focus:outline-none focus:ring-1 focus:ring-gem-purple text-white"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="p-4 border-t border-gem-purple/20">
                <button
                  onClick={resetFilters}
                  className="flex items-center justify-center w-full py-2 bg-black-900 text-white/80 hover:text-gem-pink transition-colors rounded-md"
                >
                  <RotateCcw size={16} className="mr-2" />
                  Limpar Filtros
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // Desktop sidebar variant
  return (
    <div className={`bg-black-800 rounded-lg border border-gem-purple/20 p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <SlidersHorizontal size={18} className="mr-2 text-gem-purple" />
          Filtros
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
            Limpar
          </button>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-medium text-white mb-3">Faixa de Preço</h4>
        <div className="flex items-center justify-between mb-2">
          <div className="w-2/5">
            <label className="text-white/70 text-xs mb-1 block">Mínimo</label>
            <input
              type="number"
              value={currentMin}
              onChange={(e) => handlePriceChange('min', Number(e.target.value))}
              className="w-full p-2 bg-black-900 border border-gem-purple/30 rounded-md focus:outline-none focus:ring-1 focus:ring-gem-purple text-white"
            />
          </div>
          <span className="text-white/50">-</span>
          <div className="w-2/5">
            <label className="text-white/70 text-xs mb-1 block">Máximo</label>
            <input
              type="number"
              value={currentMax}
              onChange={(e) => handlePriceChange('max', Number(e.target.value))}
              className="w-full p-2 bg-black-900 border border-gem-purple/30 rounded-md focus:outline-none focus:ring-1 focus:ring-gem-purple text-white"
            />
          </div>
        </div>
        <button
          onClick={applyPriceRange}
          className="w-full py-2 bg-gem-purple/20 text-gem-purple hover:bg-gem-purple/30 transition-colors rounded-md text-sm"
        >
          Aplicar
        </button>
      </div>

      {/* Filter Sections */}
      {filterSections.map((section) => (
        <div key={section.id} className="mb-6">
          <button
            onClick={() => toggleSection(section.id)}
            className="flex items-center justify-between w-full text-left font-medium text-white mb-3"
          >
            <span>{section.title}</span>
            {section.expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          <AnimatePresence>
            {section.expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="space-y-2">
                  {section.options.map((option) => (
                    <label key={option.id} className="flex items-center text-white/90 hover:text-white cursor-pointer">
                      <input
                        type="checkbox"
                        checked={
                          section.id === 'product-type'
                            ? filters.productTypes.selected.includes(option.id)
                            : filters.weights.selected.includes(option.id)
                        }
                        onChange={(e) => handleCheckboxChange(section.id, option.id, e.target.checked)}
                        className="mr-2 h-4 w-4 rounded border-gem-purple/50 text-gem-purple focus:ring-gem-purple/50 focus:ring-offset-black-800"
                      />
                      <span>{option.label}</span>
                      <span className="ml-auto text-white/50 text-sm">({option.count})</span>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}

      {/* Sort Options */}
      <div>
        <h4 className="font-medium text-white mb-3">Ordenar Por</h4>
        <select
          value={filters.sort}
          onChange={(e) => handleSortChange(e.target.value)}
          className="w-full p-2 bg-black-900 border border-gem-purple/30 rounded-md focus:outline-none focus:ring-1 focus:ring-gem-purple text-white"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ProductFilters;
