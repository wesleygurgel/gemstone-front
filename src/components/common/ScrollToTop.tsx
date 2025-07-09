import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set up scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-gradient-to-r from-gem-violet to-gem-blue text-white rounded-full shadow-lg hover:shadow-neon-violet transition-all duration-300 z-50 cursor-pointer group"
          aria-label="Voltar ao topo"
        >
          <ChevronUp size={24} className="group-hover:-translate-y-1 transition-transform duration-300" />
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
