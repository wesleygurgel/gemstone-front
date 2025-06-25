import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, LogOut, ChevronDown, ShoppingCart, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

const MarketplaceHeader = () => {
  const { user, isAuthenticated, logout } = useAuth();
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
    <header className="bg-white border-b border-gray-200">
      {/* Hero section with header */}
      <div className="bg-gradient-to-r from-gold-600 to-gold-400 text-white">
        <div className="container mx-auto py-12 px-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Marketplace Gemstone</h1>
            <p className="text-xl max-w-2xl">
              Descubra nossa seleção exclusiva de metais preciosos e pedras com certificação e procedência garantida.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Navigation bar */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="text-2xl font-bold text-gold-500">Gemstone</span>
            </motion.div>
          </Link>

          {/* Center Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/marketplace/categories" className="font-medium text-black-800 hover:text-gold-500 transition-colors">
              Categorias
            </Link>
            <Link to="/marketplace/new" className="font-medium text-black-800 hover:text-gold-500 transition-colors">
              Lançamentos
            </Link>
            <Link to="/marketplace/deals" className="font-medium text-black-800 hover:text-gold-500 transition-colors">
              Ofertas
            </Link>
          </nav>

          {/* Right Side - Search, Cart, User */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative" ref={searchRef}>
              <button 
                onClick={toggleSearch}
                className="p-2 text-black-800 hover:text-gold-500 transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              
              {isSearchOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg p-2 z-50 border border-gray-200"
                >
                  <div className="flex items-center">
                    <input 
                      type="text" 
                      placeholder="Buscar produtos..." 
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500"
                    />
                    <button className="ml-2 p-2 bg-gold-500 text-white rounded-md hover:bg-gold-600">
                      <Search size={16} />
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Cart */}
            <Link to="/marketplace/cart" className="p-2 text-black-800 hover:text-gold-500 transition-colors">
              <ShoppingCart size={20} />
            </Link>

            {/* User Account */}
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <motion.button 
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 font-medium text-black-800 hover:text-gold-500 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  <User size={20} />
                  <span className="hidden sm:inline">{user?.username}</span>
                  <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </motion.button>

                {isDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
                  >
                    <Link to="/marketplace/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Meu Perfil
                    </Link>
                    <Link to="/marketplace/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Meus Pedidos
                    </Link>
                    <button
                      onClick={logout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
                  <Link to="/login" className="font-medium text-black-800 hover:text-gold-500 transition-colors">
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