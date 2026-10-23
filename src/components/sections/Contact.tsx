'use client';

import { useActionState, useEffect, useRef } from 'react';
import { Loader2, MapPin, MessageCircle } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { sendContact, type ContactState } from '@/app/actions/contact';
import { site, whatsappUrl } from '@/lib/site';

const initial: ContactState = { status: 'idle', message: '' };

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-ink">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm font-medium text-brand">
          {error}
        </p>
      )}
    </div>
  );
}

export default function Contact() {
  const [state, action, pending] = useActionState(sendContact, initial);
  const startedAt = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const wa = whatsappUrl('Hola, me gustaría recibir información sobre sus servicios inmobiliarios.');

  // Marca de tiempo (anti-bot) escrita directo en el DOM, sin estado.
  useEffect(() => {
    if (startedAt.current) startedAt.current.value = String(Date.now());
  }, []);
  useEffect(() => {
    if (state.status === 'success') {
      formRef.current?.reset();
      if (startedAt.current) startedAt.current.value = String(Date.now());
    }
    if (state.status !== 'idle') statusRef.current?.focus();
  }, [state]);

  const err = state.errors ?? {};
  const v = state.values;

  return (
    <section id="contacto" className="section-y bg-white">
      <div className="container-page">
        <Reveal className="max-w-3xl">
          <h2 className="h-section">Contacto</h2>
          <p className="mt-5 text-lg text-slate">
            Escríbenos o llámanos en horario de oficina y te decimos cómo podemos ayudarte con tu compra, venta, renta o administración.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-20">
          <Reveal delay={0.05} className="order-2 lg:order-1 lg:col-span-5">
            <address className="text-lg not-italic leading-relaxed">
              {site.address.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-line mt-3 inline-flex items-center gap-2 font-semibold text-brand"
            >
              <MapPin className="size-4" aria-hidden="true" />
              Cómo llegar
            </a>

            <ul className="mt-10 space-y-1 text-lg">
              {site.phones.map((phone) => (
                <li key={phone.tel}>
                  <a href={`tel:${phone.tel}`} className="link-line">
                    {phone.display}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${site.email}`} className="link-line">
                  {site.email}
                </a>
              </li>
            </ul>

            <p className="mt-10 text-lg text-graphite">
              {site.hours.label}, {site.hours.ranges.map((r) => r.text).join(' y ')}
            </p>

            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-brand mt-8">
                <MessageCircle className="size-[1.1rem]" aria-hidden="true" />
                Escribir por WhatsApp
              </a>
            )}
          </Reveal>

          <Reveal delay={0.12} className="order-1 lg:sticky lg:top-28 lg:order-2 lg:col-span-7 lg:self-start">
            <form ref={formRef} action={action} noValidate aria-describedby="contact-status">
              <h3 className="font-sans text-base font-semibold tracking-normal">Déjanos tu consulta</h3>

              <div
                ref={statusRef}
                id="contact-status"
                tabIndex={-1}
                role={state.status === 'error' ? 'alert' : 'status'}
                className={
                  state.status === 'idle'
                    ? 'sr-only'
                    : state.status === 'success'
                      ? 'mt-6 border-l-4 border-ink bg-mist p-4 text-ink outline-none'
                      : 'mt-6 border-l-4 border-brand bg-mist p-4 text-ink outline-none'
                }
              >
                {state.message}
              </div>

              <div className="mt-8 grid gap-x-8 gap-y-7 sm:grid-cols-2">
                <Field id="name" label="Nombre completo" error={err.name}>
                  <input id="name" name="name" autoComplete="name" required defaultValue={v?.name} aria-invalid={!!err.name} aria-describedby={err.name ? 'name-error' : undefined} className="field" placeholder="Tu nombre" />
                </Field>
                <Field id="phone" label="Teléfono" error={err.phone}>
                  <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required defaultValue={v?.phone} aria-invalid={!!err.phone} aria-describedby={err.phone ? 'phone-error' : undefined} className="field" placeholder="55 1234 5678" />
                </Field>
                <div className="sm:col-span-2">
                  <Field id="email" label="Correo electrónico" error={err.email}>
                    <input id="email" name="email" type="email" autoComplete="email" required defaultValue={v?.email} aria-invalid={!!err.email} aria-describedby={err.email ? 'email-error' : undefined} className="field" placeholder="tu@correo.com" />
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field id="message" label="¿En qué podemos ayudarte?" error={err.message}>
                    <textarea id="message" name="message" rows={4} required defaultValue={v?.message} aria-invalid={!!err.message} aria-describedby={err.message ? 'message-error' : undefined} className="field resize-y" placeholder="Por ejemplo: busco rentar un departamento en la Del Valle, hasta $20,000 al mes." />
                  </Field>
                </div>
              </div>

              {/* Trampa anti-spam: las personas no lo ven ni lo llenan */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label>
                  No llenar este campo
                  <input name="website" tabIndex={-1} autoComplete="off" />
                </label>
              </div>
              <input ref={startedAt} type="hidden" name="startedAt" defaultValue="" />

              <div className="mt-8">
                <label className="flex items-start gap-3 text-[0.95rem]">
                  <input type="checkbox" name="privacy" required aria-invalid={!!err.privacy} className="mt-1 size-5 shrink-0 accent-brand" />
                  <span>
                    He leído y acepto el{' '}
                    <a href="/aviso-de-privacidad" target="_blank" className="link-line font-semibold text-brand">
                      aviso de privacidad
                    </a>
                    .
                  </span>
                </label>
                {err.privacy && <p className="mt-2 text-sm font-medium text-brand">{err.privacy}</p>}
              </div>

              <button type="submit" disabled={pending} className="btn btn-ink mt-8 w-full sm:w-auto sm:min-w-56">
                {pending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                    Enviando…
                  </>
                ) : (
                  'Enviar mi consulta'
                )}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
