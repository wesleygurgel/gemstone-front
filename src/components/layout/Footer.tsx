import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { useTranslation, Trans } from 'react-i18next';
import logoSvg from '../../assets/images/logo-2.svg';
import { COMPANY_FULL_NAME } from '../../utils/env';

const Footer = () => {
  const { t } = useTranslation('common');
  const currentYear = new Date().getFullYear();

  const scrollProps = {
    spy: true,
    smooth: true,
    offset: -80,
    duration: 500,
  };

  const navLinks = [
    { to: "home", labelKey: "footer.links.0", isRouter: true, color: "cyan" },
    { to: "about", labelKey: "footer.links.1", color: "purple" },
    { to: "services", labelKey: "footer.links.2", color: "violet" },
    { to: "compliance", labelKey: "footer.links.3", color: "blue" },
    { to: "contact", labelKey: "footer.links.4", color: "pink" },
  ];

  const legalLinks = [
    { href: "#", labelKey: "footer.legal.0", color: "violet" },
    { href: "#", labelKey: "footer.legal.1", color: "blue" },
    { href: "#", labelKey: "footer.legal.2", color: "cyan" },
    { href: "#", labelKey: "footer.legal.3", color: "pink" },
  ];

  return (
    <footer className="bg-black-900 text-white py-12 border-t border-gem-violet/20 relative overflow-hidden">
      {/* Fundo decorativo */}
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <RouterLink to="/" className="relative flex items-center h-16 m-0 overflow-visible">
              <img src={logoSvg} alt={`${COMPANY_FULL_NAME} Logo`} className="h-12 transform scale-[1.1] origin-left" />
            </RouterLink>
            <p className="mt-4 text-white/80">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Navegação */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-gem-pink to-gem-purple bg-clip-text text-transparent">{t('footer.navigation_title')}</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.labelKey}>
                  {link.isRouter ? (
                    <RouterLink to="/" className={`text-white hover:text-gem-${link.color} transition-colors`}>
                      {t(link.labelKey)}
                    </RouterLink>
                  ) : (
                    <ScrollLink to={link.to} {...scrollProps} className={`cursor-pointer text-white hover:text-gem-${link.color} transition-colors`}>
                      {t(link.labelKey)}
                    </ScrollLink>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Documentos */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-gem-violet to-gem-blue bg-clip-text text-transparent">{t('footer.documents_title')}</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.labelKey}>
                  <a href={link.href} className={`text-white hover:text-gem-${link.color} transition-colors`}>
                    {t(link.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-gem-blue to-gem-cyan bg-clip-text text-transparent">{t('footer.contact_title')}</h3>
            <ul className="space-y-3">
              <li className="text-white/90 flex items-center">
                <span className="text-gem-cyan mr-2">✉</span>
                 ceo@gudgusa.com.br
              </li>
              <li className="text-white/90 flex items-start">
                <span className="text-gem-pink mr-2 mt-1">⌖</span>
                <span>
                  {t('footer.address_line1')}<br />
                  {t('footer.address_line2')}<br />
                  {t('footer.address_line3')}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gem-violet/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/70">
            <Trans i18nKey="footer.copyright" values={{ year: currentYear, company: COMPANY_FULL_NAME }} />
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gem-purple hover:text-gem-pink transition-colors" aria-label="LinkedIn">
              {/* Ícone do LinkedIn */}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;