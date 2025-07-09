import { ReactNode } from 'react';
import UnderConstructionHeader from './UnderConstructionHeader';
import Footer from './Footer';
import ScrollToTop from '../common/ScrollToTop';

interface UnderConstructionLayoutProps {
  children: ReactNode;
}

const UnderConstructionLayout = ({ children }: UnderConstructionLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-black-900 text-white">
      <UnderConstructionHeader />
      <main className="flex-grow">{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default UnderConstructionLayout;