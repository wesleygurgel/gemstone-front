import { ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MarketplaceHeader from './MarketplaceHeader';
import Footer from '../layout/Footer';
import ScrollToTop from '../common/ScrollToTop';

interface MarketplaceLayoutProps {
  children: ReactNode;
}

const MarketplaceLayout = ({ children }: MarketplaceLayoutProps) => {
  const { i18n } = useTranslation();

  // Garante direção correta (LTR/RTL) no <html>
  useEffect(() => {
    document.documentElement.dir = i18n.dir();
    document.documentElement.lang = i18n.language || 'en';
  }, [i18n]);

  return (
    <div className="flex flex-col min-h-screen bg-black-900" dir={i18n.dir()}>
      <MarketplaceHeader />
      <main className="flex-grow bg-gradient-to-b from-black-900 to-black-800">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default MarketplaceLayout;
