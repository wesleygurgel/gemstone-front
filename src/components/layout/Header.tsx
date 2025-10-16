import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { Menu, X, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import logoSvg from '../../assets/images/logo-2.svg';
import { COMPANY_FULL_NAME } from '../../utils/env';
import { useTranslation } from 'react-i18next';
import LangSwitcher from '../common/LangSwitcher';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation('common');

  const scrollProps = {
    spy: true,
    smooth: true,
    offset: -80, // Ajuste para a altura do seu header
    duration: 500,
  };

  // Nossos links de navegação em um array para facilitar a manutenção
  const navLinks = [
    { to: "about", labelKey: "header.about", color: "purple" },
    { to: "services", labelKey: "header.services", color: "violet" },
    { to: "compliance", labelKey: "header.compliance", color: "blue" },
    { to: "contact", labelKey: "header.contact", color: "pink" },
  ];

  return (
    // Adicionado 'sticky top-0 z-50' para manter o header visível ao rolar
    <header className="py-4 bg-black-900 shadow-lg border-b border-gem-violet/20 sticky top-0 z-50">
      <div className="container flex items-center justify-between">
        <RouterLink to="/" className="relative flex items-center h-16 lg:h-20 overflow-visible flex-shrink-0">
          <img src={logoSvg} alt={`${COMPANY_FULL_NAME} Logo`} className="h-16 lg:h-12 transform scale-[1.1] lg:scale-[1.0] xl:scale-[1.3] origin-left" />
        </RouterLink>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center justify-end flex-grow">
          {/* 1. Links de Navegação Principal */}
          <nav className="flex items-center gap-4">
            <RouterLink to="/" className="font-medium text-white hover:text-gem-cyan transition-colors text-sm">
              {t('header.home')}
            </RouterLink>
            {navLinks.map(link => (
              <ScrollLink key={link.to} to={link.to} {...scrollProps} className={`cursor-pointer font-medium text-white hover:text-gem-${link.color} transition-colors text-sm`}>
                {t(link.labelKey)}
              </ScrollLink>
            ))}
          </nav>

          {/* Divisor Visual (Opcional) */}
          <div className="w-px h-6 bg-white/20 mx-6"></div>

          {/* 2. Ações e Itens Secundários */}
          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <RouterLink
                to="/marketplace"
                className="font-medium bg-gradient-to-r from-gem-violet to-gem-blue text-white px-4 py-2 rounded-md hover:shadow-neon-violet transition-all duration-300 flex items-center text-sm"
              >
                {t('header.marketplace')}
                <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="ml-1">→</motion.span>
              </RouterLink>
            </motion.div>
            
            <LangSwitcher />

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <ScrollLink to="contact" {...scrollProps} className="cursor-pointer flex items-center justify-center w-10 h-10 rounded-full bg-gem-purple/10 text-gem-purple hover:bg-gem-purple/20 hover:shadow-neon-purple transition-all duration-300" aria-label={t('header.contact')}>
                <Mail size={20} />
              </ScrollLink>
            </motion.div>
          </div>
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden text-white" onClick={() => setIsMenuOpen(s => !s)} aria-label={isMenuOpen ? t('header.closeMenu') : t('header.openMenu')}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-black-900 shadow-lg z-40 border-b border-gem-violet/20">
          {/* Conteúdo do menu mobile aqui... */}
        </div>
      )}
    </header>
  );
};

export default Header;