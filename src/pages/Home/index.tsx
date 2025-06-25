import { Helmet } from 'react-helmet-async';
import MainLayout from '@/components/layout/MainLayout';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/Features'; // Renamed component but same file
import Services from '@/components/sections/Services';
import Compliance from '@/components/sections/Compliance';
import ContactForm from '@/components/sections/ContactForm';

const Home = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>Gemstone - Excelência em trading de metais preciosos</title>
        <meta name="description" content="Gemstone - Comércio internacional de metais preciosos com integridade e responsabilidade. Especialistas em importação e exportação de ouro." />
        <meta property="og:title" content="Gemstone - Excelência em trading de metais preciosos" />
        <meta property="og:description" content="Gemstone - Comércio internacional de metais preciosos com integridade e responsabilidade. Especialistas em importação e exportação de ouro." />
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
