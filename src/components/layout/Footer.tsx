import { Link } from 'react-router-dom';
import logoSvg from '../../assets/images/logo-2.svg';
import { COMPANY_FULL_NAME } from '../../utils/env';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black-900 text-white py-12 border-t border-gem-violet/20 relative overflow-hidden">
      {/* Background neon elements */}
      <div className="absolute top-0 left-20 w-64 h-64 rounded-full bg-gem-pink/5 blur-3xl"></div>
      <div className="absolute bottom-0 right-20 w-80 h-80 rounded-full bg-gem-cyan/5 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-gem-purple/5 blur-3xl"></div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="relative flex items-center h-16 m-0 overflow-visible">
              <img 
                src={logoSvg} 
                alt={`${COMPANY_FULL_NAME} Logo`} 
                className="h-12 transform scale-[1.1] origin-left"
              />
            </Link>
            <p className="mt-4 text-white/80">
              Excelência em trading de metais preciosos com integridade e responsabilidade.
            </p>
          </div>

          {/* Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-gem-pink to-gem-purple bg-clip-text text-transparent">Navegação</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white hover:text-gem-cyan transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <a href="#about" className="text-white hover:text-gem-purple transition-colors">
                  Quem Somos
                </a>
              </li>
              <li>
                <a href="#services" className="text-white hover:text-gem-violet transition-colors">
                  Serviços
                </a>
              </li>
              <li>
                <a href="#compliance" className="text-white hover:text-gem-blue transition-colors">
                  Compliance & Ética
                </a>
              </li>
              <li>
                <a href="#contact" className="text-white hover:text-gem-pink transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-gem-violet to-gem-blue bg-clip-text text-transparent">Documentos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white hover:text-gem-violet transition-colors">
                  Código de Conduta
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-gem-blue transition-colors">
                  Política de Supply Chain
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-gem-cyan transition-colors">
                  Procedimentos Operacionais
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-gem-pink transition-colors">
                  Política de Privacidade
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-gem-blue to-gem-cyan bg-clip-text text-transparent">Contato</h3>
            <ul className="space-y-3">
              <li className="text-white/90 flex items-center">
                <span className="text-gem-cyan mr-2">✉</span>
                contact@gemstonemiami.com
              </li>
              <li className="text-white/90 flex items-center">
                <span className="text-gem-violet mr-2">✆</span>
                +1 (786) 303-6211
              </li>
              <li className="text-white/90 flex items-start">
                <span className="text-gem-pink mr-2 mt-1">⌖</span>
                <span>
                  417 NW 6th St, Downtown<br />
                  Miami, FL 33136<br />
                  Estados Unidos
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gem-violet/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/70">
            &copy; {currentYear} {COMPANY_FULL_NAME}. Todos os direitos reservados.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gem-purple hover:text-gem-pink transition-colors hover:shadow-neon-purple" aria-label="LinkedIn">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
