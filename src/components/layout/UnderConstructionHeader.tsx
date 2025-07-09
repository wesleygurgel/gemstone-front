import { Link } from 'react-router-dom';
import logoSvg from '../../assets/images/logo-2.svg';
import { COMPANY_FULL_NAME } from '../../utils/env';

const UnderConstructionHeader = () => {
  return (
    <header className="py-4 bg-black-900 shadow-lg border-b border-gem-violet/20">
      <div className="container flex items-center justify-center">
        {/* Centered Logo */}
        <Link to="/" className="relative flex items-center h-16 lg:h-20 overflow-visible">
          <img 
            src={logoSvg} 
            alt={`${COMPANY_FULL_NAME} Logo`} 
            className="h-16 lg:h-12 transform scale-[1.1] lg:scale-[1.0] xl:scale-[1.3]"
          />
        </Link>
      </div>
    </header>
  );
};

export default UnderConstructionHeader;