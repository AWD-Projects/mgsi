import Link from 'next/link';
import { Phone, MessageCircle, Mail } from 'lucide-react';
import { mainPhone, whatsappUrl } from '@/lib/site';

/** Barra fija solo en móvil: llamar y escribir en un toque, con el WhatsApp correcto. */
export default function StickyContact() {
  const wa = whatsappUrl('Hola, me gustaría recibir información sobre sus servicios inmobiliarios.');
  return (
    <div className="glass-light fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-px pb-[env(safe-area-inset-bottom)] md:hidden">
      <a href={`tel:${mainPhone.tel}`} className="flex min-h-14 items-center justify-center gap-2 text-[0.95rem] font-semibold text-ink">
        <Phone className="size-[1.1rem]" aria-hidden="true" />
        Llamar
      </a>
      {wa ? (
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-14 items-center justify-center gap-2 bg-brand text-[0.95rem] font-semibold text-white"
        >
          <MessageCircle className="size-[1.1rem]" aria-hidden="true" />
          WhatsApp
        </a>
      ) : (
        <Link href="/#contacto" className="flex min-h-14 items-center justify-center gap-2 bg-brand text-[0.95rem] font-semibold text-white">
          <Mail className="size-[1.1rem]" aria-hidden="true" />
          Escribirnos
        </Link>
      )}
    </div>
  );
}
