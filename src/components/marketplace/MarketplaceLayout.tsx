import { ReactNode } from 'react';
import MarketplaceHeader from './MarketplaceHeader';
import Footer from '../layout/Footer';
import ScrollToTop from '../common/ScrollToTop';

interface MarketplaceLayoutProps {
  children: ReactNode;
}

const MarketplaceLayout = ({ children }: MarketplaceLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-black-900">
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
