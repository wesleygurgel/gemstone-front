// src/pages/Home.tsx
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import MainLayout from '@/components/layout/MainLayout';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/Features'; // Renamed component but same file
import Services from '@/components/sections/Services';
import Compliance from '@/components/sections/Compliance';
import ContactForm from '@/components/sections/ContactForm';

const Home = () => {
  // Inicializa o hook de tradução, usando o namespace 'common'
  const { t } = useTranslation('common');

  return (
    <MainLayout>
      <Helmet>
        {/* Agora o título e a descrição são traduzidos dinamicamente */}
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />

        {/* As tags Open Graph (para compartilhamento em redes sociais) também são traduzidas */}
        <meta property="og:title" content={t('meta.title')} />
        <meta property="og:description" content={t('meta.description')} />

        {/* Estas tags geralmente não precisam de tradução */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gemstonemiami.com" />
        <meta property="og:image" content="https://gemstonemiami.com/og-image.jpg" />
      </Helmet>

      <Hero />
      <About />
      <Services />
      <Compliance />
      <ContactForm />
    </MainLayout>
  );
};

export default Home;