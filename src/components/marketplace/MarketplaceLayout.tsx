import { ReactNode } from 'react';
import MarketplaceHeader from './MarketplaceHeader';
import Footer from '../layout/Footer';
import ScrollToTop from '../common/ScrollToTop';

interface MarketplaceLayoutProps {
  children: ReactNode;
}

const MarketplaceLayout = ({ children }: MarketplaceLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <MarketplaceHeader />
      <main className="flex-grow">{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default MarketplaceLayout;