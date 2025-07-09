import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path: string;
  isLast: boolean;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb = ({ items, className = '' }: BreadcrumbProps) => {
  const location = useLocation();
  
  // If no items are provided, generate them from the current path
  const breadcrumbItems = items || generateBreadcrumbItems(location.pathname);

  return (
    <nav className={`flex items-center text-sm ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center flex-wrap">
        <li className="flex items-center">
          <Link 
            to="/" 
            className="text-white/70 hover:text-gem-pink transition-colors flex items-center"
          >
            <Home size={16} />
            <span className="sr-only">Início</span>
          </Link>
        </li>
        
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight size={14} className="mx-2 text-white/50" />
            {item.isLast ? (
              <span className="text-gem-purple font-medium">{item.label}</span>
            ) : (
              <Link 
                to={item.path} 
                className="text-white/70 hover:text-gem-cyan transition-colors"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

// Helper function to generate breadcrumb items from a path
const generateBreadcrumbItems = (path: string): BreadcrumbItem[] => {
  // Remove leading slash and split by slash
  const pathSegments = path.replace(/^\/+/, '').split('/');
  
  // Skip the first segment if it's "marketplace" since we already have the home icon
  const startIndex = pathSegments[0] === 'marketplace' ? 1 : 0;
  
  // Map path segments to breadcrumb items
  return pathSegments.slice(startIndex).map((segment, index, array) => {
    // Build the path for this breadcrumb item
    const path = '/' + pathSegments.slice(0, startIndex + index + 1).join('/');
    
    // Format the label (capitalize and replace hyphens with spaces)
    const label = formatBreadcrumbLabel(segment);
    
    return {
      label,
      path,
      isLast: index === array.length - 1
    };
  });
};

// Helper function to format breadcrumb labels
const formatBreadcrumbLabel = (segment: string): string => {
  // Special case for category slugs (e.g., "category/gold" -> "Gold")
  if (segment === 'category') return 'Categoria';
  
  // Replace hyphens with spaces and capitalize each word
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default Breadcrumb;