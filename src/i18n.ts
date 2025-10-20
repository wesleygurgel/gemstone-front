import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import ICU from 'i18next-icu';
import { COMPANY_FULL_NAME } from './utils/env';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(ICU)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en','es','fr','ar','pt-BR'],
    // Habilita interpolação com variáveis padrão globais
    interpolation: {
      escapeValue: false,
      defaultVariables: {
        company: COMPANY_FULL_NAME,
        year: new Date().getFullYear(),
      },
    },
    backend: { loadPath: '/locales/{{lng}}/{{ns}}.json' },
    defaultNS: 'common',
    ns: ['common', 'marketplace'],
  });

export default i18n;
