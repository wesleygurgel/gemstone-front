import { Helmet } from 'react-helmet-async';
import MarketplaceLayout from '@/components/marketplace/MarketplaceLayout';

const Marketplace = () => {

  return (
    <MarketplaceLayout>
      <Helmet>
        <title>Marketplace - Gemstone</title>
        <meta name="description" content="Explore nossa seleção exclusiva de metais preciosos e pedras com certificação e procedência garantida." />
      </Helmet>

      {/* Main content  - TODO */}
    </MarketplaceLayout>
  );
};

export default Marketplace;
