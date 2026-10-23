import Hero from '@/components/sections/Hero';
import Properties from '@/components/sections/Properties';
import Services from '@/components/sections/Services';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';
import { getProperties } from '@/lib/properties';
import { jsonLd, homePageGraph } from '@/lib/seo';

// Las propiedades vienen de la misma base de datos que administra mg-portal.
// La página se regenera sola cada 5 minutos, así un cambio en el portal aparece sin volver a desplegar.
export const revalidate = 300;

export default async function Home() {
  const properties = await getProperties();
  const featured = properties.find((p) => p.images.length > 0);
  const latest = properties.slice(0, 3);

  return (
    <>
      <Hero featured={featured} />
      <Properties properties={latest} total={properties.length} />
      <Services />
      <About />
      <Contact />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(homePageGraph(latest)) }} />
    </>
  );
}
