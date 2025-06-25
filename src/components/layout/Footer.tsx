import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black-900 text-white py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-bold text-gold-400">
              Gemstone
            </Link>
            <p className="mt-4 text-gold-100">
              Excelência em trading de metais preciosos com integridade e responsabilidade.
            </p>
          </div>

          {/* Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-gold-400">Navegação</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white hover:text-gold-300 transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <a href="#about" className="text-white hover:text-gold-300 transition-colors">
                  Quem Somos
                </a>
              </li>
              <li>
                <a href="#services" className="text-white hover:text-gold-300 transition-colors">
                  Serviços
                </a>
              </li>
              <li>
                <a href="#compliance" className="text-white hover:text-gold-300 transition-colors">
                  Compliance & Ética
                </a>
              </li>
              <li>
                <a href="#contact" className="text-white hover:text-gold-300 transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-gold-400">Documentos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white hover:text-gold-300 transition-colors">
                  Código de Conduta
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-gold-300 transition-colors">
                  Política de Supply Chain
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-gold-300 transition-colors">
                  Procedimentos Operacionais
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-gold-300 transition-colors">
                  Política de Privacidade
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-gold-400">Contato</h3>
            <ul className="space-y-2">
              <li className="text-white">
                contact@gemstonemiami.com
              </li>
              <li className="text-white">
                +1 (786) 303-6211
              </li>
              <li className="text-white">
                417 NW 6th St, Downtown<br />
                Miami, FL 33136<br />
                Estados Unidos
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gold-900 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gold-300">
            &copy; {currentYear} Gemstone. Todos os direitos reservados.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gold-400 hover:text-gold-300 transition-colors" aria-label="LinkedIn">
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
