import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="py-4 bg-white shadow-sm">
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gold-500">
          Gemstone
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="font-medium text-black-800 hover:text-gold-500 transition-colors">
            Início
          </Link>
          <a href="#about" className="font-medium text-black-800 hover:text-gold-500 transition-colors">
            Quem Somos
          </a>
          <a href="#services" className="font-medium text-black-800 hover:text-gold-500 transition-colors">
            Serviços
          </a>
          <a href="#compliance" className="font-medium text-black-800 hover:text-gold-500 transition-colors">
            Compliance & Ética
          </a>
          <a href="#contact" className="font-medium text-black-800 hover:text-gold-500 transition-colors">
            Contato
          </a>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <a href="#contact" className="btn bg-gold-500 text-white hover:bg-gold-600">
            Fale Conosco
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-black-800"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md z-50">
          <div className="container py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="font-medium text-black-800 hover:text-gold-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <a 
              href="#about" 
              className="font-medium text-black-800 hover:text-gold-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Quem Somos
            </a>
            <a 
              href="#services" 
              className="font-medium text-black-800 hover:text-gold-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Serviços
            </a>
            <a 
              href="#compliance" 
              className="font-medium text-black-800 hover:text-gold-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Compliance & Ética
            </a>
            <a 
              href="#contact" 
              className="font-medium text-black-800 hover:text-gold-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </a>
            <a 
              href="#contact" 
              className="btn bg-gold-500 text-white hover:bg-gold-600 w-full text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Fale Conosco
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
