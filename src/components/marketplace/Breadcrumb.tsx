import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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
  const { t, i18n } = useTranslation(['marketplace', 'common']);

  const breadcrumbItems =
    items || generateBreadcrumbItems(location.pathname, (seg) => formatLabel(seg, t));

  return (
    <nav className={`flex items-center text-sm ${className}`} aria-label="Breadcrumb" dir={i18n.dir()}>
      <ol className="flex items-center flex-wrap">
        <li className="flex items-center">
          <Link
            to="/"
            className="text-white/70 hover:text-gem-pink transition-colors flex items-center"
          >
            <Home size={16} />
            <span className="sr-only">{t('header.home', { ns: 'common' })}</span>
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

// Gera itens a partir da URL
const generateBreadcrumbItems = (
  path: string,
  format: (segment: string) => string
): BreadcrumbItem[] => {
  const segments = path.replace(/^\/+/, '').split('/').filter(Boolean);

  // pula "marketplace" no início
  const startIndex = segments[0] === 'marketplace' ? 1 : 0;

  return segments.slice(startIndex).map((segment, index, array) => {
    const fullPath = '/' + segments.slice(0, startIndex + index + 1).join('/');
    return {
      label: format(segment),
      path: fullPath,
      isLast: index === array.length - 1
    };
  });
};

// Formata rótulos com i18n para segmentos conhecidos
const formatLabel = (segment: string, t: any): string => {
  // segmentos conhecidos
  if (segment === 'category') return t('nav.title', { ns: 'marketplace' });

  // slug → palavras capitalizadas
  return segment
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
};

export default Breadcrumb;
