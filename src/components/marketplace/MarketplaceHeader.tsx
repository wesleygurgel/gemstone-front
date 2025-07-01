import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, LogOut, ChevronDown, ShoppingCart, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import CartDrawer from './CartDrawer';

const MarketplaceHeader = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { toggleCart, totalItems } = useCart();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node) && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen]);

  return (
    <header className="bg-black-900 text-white">
      {/* Cart Drawer */}
      <CartDrawer />

      {/* Hero section with header */}
      <div className="bg-black-900 text-white relative overflow-hidden">
        {/* Modern subtle particle background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Top left particles */}
          <div className="absolute top-10 left-10 w-1 h-1 rounded-full bg-gem-pink/30"></div>
          <div className="absolute top-20 left-30 w-1.5 h-1.5 rounded-full bg-gem-purple/25"></div>
          <div className="absolute top-40 left-20 w-2 h-2 rounded-full bg-gem-violet/20"></div>
          <div className="absolute top-60 left-40 w-1 h-1 rounded-full bg-gem-blue/30"></div>
          <div className="absolute top-80 left-60 w-1.5 h-1.5 rounded-full bg-gem-cyan/25"></div>

          {/* Bottom right particles */}
          <div className="absolute bottom-10 right-10 w-1.5 h-1.5 rounded-full bg-gem-cyan/30"></div>
          <div className="absolute bottom-30 right-30 w-1 h-1 rounded-full bg-gem-blue/25"></div>
          <div className="absolute bottom-50 right-20 w-2 h-2 rounded-full bg-gem-violet/20"></div>
          <div className="absolute bottom-70 right-40 w-1 h-1 rounded-full bg-gem-purple/30"></div>
          <div className="absolute bottom-90 right-60 w-1.5 h-1.5 rounded-full bg-gem-pink/25"></div>

          {/* Center particles */}
          <div className="absolute top-1/4 right-1/4 w-1 h-1 rounded-full bg-gem-purple/30"></div>
          <div className="absolute top-1/3 right-1/5 w-1.5 h-1.5 rounded-full bg-gem-pink/25"></div>
          <div className="absolute top-2/5 right-1/3 w-2 h-2 rounded-full bg-gem-blue/20"></div>

          {/* Subtle gradient overlay */}
          <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 bg-gradient-to-br from-gem-pink/5 to-gem-cyan/5 blur-2xl opacity-30"></div>
        </div>

        <div className="container mx-auto py-12 px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gem-pink via-gem-purple to-gem-blue bg-clip-text text-transparent">Marketplace Gemstone</h1>
            <p className="text-xl max-w-2xl text-white/90">
              Descubra nossa seleção exclusiva de metais preciosos e pedras com certificação e procedência garantida.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Navigation bar */}
      <div className="container mx-auto px-4 border-t border-gem-purple/20">
        <div className="flex items-center justify-between py-4">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-gem-pink to-gem-purple bg-clip-text text-transparent">Gemstone</span>
            </motion.div>
          </Link>

          {/* Center Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/marketplace/categories" className="font-medium text-white/80 hover:text-gem-pink transition-colors">
              Categorias
            </Link>
            <Link to="/marketplace/new" className="font-medium text-white/80 hover:text-gem-purple transition-colors">
              Lançamentos
            </Link>
            <Link to="/marketplace/deals" className="font-medium text-white/80 hover:text-gem-blue transition-colors">
              Ofertas
            </Link>
          </nav>

          {/* Right Side - Search, Cart, User */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative" ref={searchRef}>
              <button 
                onClick={toggleSearch}
                className="p-2 text-white/80 hover:text-gem-cyan transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              {isSearchOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-72 bg-black-800 rounded-md shadow-lg p-2 z-50 border border-gem-blue/30"
                >
                  <div className="flex items-center">
                    <input 
                      type="text" 
                      placeholder="Buscar produtos..." 
                      className="w-full p-2 bg-black-900 border border-gem-purple/30 rounded-md focus:outline-none focus:ring-2 focus:ring-gem-purple text-white placeholder-white/50"
                    />
                    <button className="ml-2 p-2 bg-gradient-to-r from-gem-purple to-gem-blue text-white rounded-md hover:shadow-neon-purple transition-all duration-300">
                      <Search size={16} />
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Cart */}
            <button 
              onClick={toggleCart} 
              className="p-2 text-white/80 hover:text-gem-pink transition-colors relative"
              aria-label="Open cart"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gem-pink text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* User Account */}
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <motion.button 
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 font-medium text-white/80 hover:text-gem-violet transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  <User size={20} />
                  <span className="hidden sm:inline">{user?.first_name}</span>
                  <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </motion.button>

                {isDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-48 bg-black-800 rounded-md shadow-lg py-1 z-50 border border-gem-violet/30"
                  >
                    <Link to="/marketplace/profile" className="block px-4 py-2 text-sm text-white/80 hover:bg-black-700 hover:text-gem-pink transition-colors">
                      Meu Perfil
                    </Link>
                    <Link to="/marketplace/orders" className="block px-4 py-2 text-sm text-white/80 hover:bg-black-700 hover:text-gem-purple transition-colors">
                      Meus Pedidos
                    </Link>
                    <button
                      onClick={logout}
                      className="flex items-center w-full px-4 py-2 text-sm text-white/80 hover:bg-black-700 hover:text-gem-blue transition-colors"
                    >
                      <LogOut size={16} className="mr-2" />
                      <span>Sair</span>
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link to="/login" className="font-medium text-white/80 hover:text-gem-cyan transition-colors">
                    Login
                  </Link>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default MarketplaceHeader;
