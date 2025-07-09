import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import logoSvg from '../../assets/images/logo-2.svg';
import { COMPANY_FULL_NAME } from '../../utils/env';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="py-4 bg-black-900 shadow-lg border-b border-gem-violet/20">
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="relative flex items-center h-16 lg:h-20 overflow-visible">
          <img 
            src={logoSvg} 
            alt={`${COMPANY_FULL_NAME} Logo`} 
            className="h-16 lg:h-12 transform scale-[1.1] lg:scale-[1.0] xl:scale-[1.3] origin-left"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link to="/" className="font-medium text-white hover:text-gem-cyan transition-colors">
            Início
          </Link>
          <a href="#about" className="font-medium text-white hover:text-gem-purple transition-colors">
            Quem Somos
          </a>
          <a href="#services" className="font-medium text-white hover:text-gem-violet transition-colors">
            Serviços
          </a>
          <a href="#compliance" className="font-medium text-white hover:text-gem-blue transition-colors">
            Compliance & Ética
          </a>
          <a href="#contact" className="font-medium text-white hover:text-gem-pink transition-colors">
            Contato
          </a>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/marketplace" 
              className="font-medium bg-gradient-to-r from-gem-violet to-gem-blue text-white px-4 py-2 rounded-md hover:shadow-neon-violet transition-all duration-300 flex items-center"
            >
              Marketplace
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="ml-1"
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </nav>

        {/* Contact Icon Button */}
        <div className="hidden lg:block">
          <motion.a 
            href="#contact" 
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gem-purple/10 text-gem-purple hover:bg-gem-purple/20 hover:shadow-neon-purple transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Contato"
          >
            <Mail size={20} />
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-white"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-black-900 shadow-lg z-50 border-b border-gem-violet/20">
          <div className="container py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="font-medium text-white hover:text-gem-cyan transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <a 
              href="#about" 
              className="font-medium text-white hover:text-gem-purple transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Quem Somos
            </a>
            <a 
              href="#services" 
              className="font-medium text-white hover:text-gem-violet transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Serviços
            </a>
            <a 
              href="#compliance" 
              className="font-medium text-white hover:text-gem-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Compliance & Ética
            </a>
            <a 
              href="#contact" 
              className="font-medium text-white hover:text-gem-pink transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </a>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link 
                to="/marketplace" 
                className="font-medium bg-gradient-to-r from-gem-violet to-gem-blue text-white px-4 py-2 rounded-md hover:shadow-neon-violet transition-all duration-300 flex items-center justify-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Marketplace
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="ml-1"
                >
                  →
                </motion.span>
              </Link>
            </motion.div>

            <motion.a 
              href="#contact" 
              className="flex items-center justify-center space-x-2 bg-gem-purple/10 text-gem-purple hover:bg-gem-purple/20 hover:shadow-neon-purple transition-all duration-300 w-full py-3 rounded-md"
              onClick={() => setIsMenuOpen(false)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Contato"
            >
              <Mail size={20} />
              <span>Contato</span>
            </motion.a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
