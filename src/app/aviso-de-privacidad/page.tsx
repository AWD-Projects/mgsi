import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Aviso de privacidad',
  description: 'Cómo MG Servicio Inmobiliario trata los datos personales que recibe a través de su sitio web.',
  alternates: { canonical: '/aviso-de-privacidad' },
};

/*
  BORRADOR: estructura basada en la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.
  Debe revisarlo el área legal de MGSI antes de publicarse en producción.
*/
export default function PrivacyPage() {
  return (
    <div className="bg-white pb-24 pt-28 md:pt-36">
      <div className="container-page max-w-3xl">
        <Link href="/" className="link-line text-[0.95rem] font-medium">
          ← Volver al inicio
        </Link>
        <h1 className="mt-8 text-[clamp(2.25rem,5vw,3.75rem)]">Aviso de privacidad</h1>
        <p className="mt-4 text-slate">Última actualización: octubre de 2026</p>

        <div className="mt-12 space-y-10 text-lg leading-relaxed">
          <section>
            <h2 className="text-3xl">Quién es el responsable</h2>
            <p className="mt-4">
              MG Servicio Inmobiliario, con domicilio en {site.address.street}, {site.address.locality}, C.P.{' '}
              {site.address.postalCode}, es responsable del tratamiento de los datos personales que nos compartes a través de
              este sitio web.
            </p>
          </section>

          <section>
            <h2 className="text-3xl">Qué datos recabamos</h2>
            <p className="mt-4">
              Cuando usas el formulario de contacto recibimos tu nombre, correo electrónico, teléfono y el mensaje que
              escribas. No pedimos datos financieros ni datos personales sensibles.
            </p>
          </section>

          <section>
            <h2 className="text-3xl">Para qué los usamos</h2>
            <p className="mt-4">
              Usamos tus datos para responder tu solicitud de información, darte seguimiento sobre las propiedades y servicios
              que consultaste y, en su caso, formalizar la relación que acordemos contigo.
            </p>
          </section>

          <section>
            <h2 className="text-3xl">Con quién los compartimos</h2>
            <p className="mt-4">
              No vendemos ni transferimos tus datos a terceros para fines propios de ellos. El mensaje del formulario se envía
              mediante un proveedor de correo electrónico que lo procesa por cuenta nuestra únicamente para entregarlo, y
              podemos entregar información cuando una autoridad competente lo requiera.
            </p>
          </section>

          <section>
            <h2 className="text-3xl">Tus derechos</h2>
            <p className="mt-4">
              Puedes acceder a tus datos, rectificarlos, cancelarlos u oponerte a su uso, y revocar tu consentimiento, escribiendo
              a{' '}
              <a href={`mailto:${site.email}`} className="link-line font-semibold text-brand">
                {site.email}
              </a>{' '}
              con tu nombre y la solicitud que quieras hacer. Te respondemos en los plazos que marca la ley.
            </p>
          </section>

          <section>
            <h2 className="text-3xl">Cambios a este aviso</h2>
            <p className="mt-4">
              Si este aviso cambia, publicaremos la versión actualizada en esta misma página con su fecha.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
