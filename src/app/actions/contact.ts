'use server';

import { headers } from 'next/headers';
import sgMail from '@sendgrid/mail';
import { z } from 'zod';
import { site } from '@/lib/site';

export interface ContactState {
  status: 'idle' | 'success' | 'error';
  message: string;
  errors?: Partial<Record<'name' | 'email' | 'phone' | 'message' | 'privacy', string>>;
  values?: { name: string; email: string; phone: string; message: string };
}

const schema = z.object({
  name: z.string().trim().min(2, 'Escribe tu nombre.').max(120, 'El nombre es demasiado largo.'),
  email: z.email('Revisa tu correo, parece incompleto.').max(160),
  phone: z
    .string()
    .trim()
    .max(30)
    .refine((v) => v.replace(/\D/g, '').length >= 8, 'Escribe un teléfono de al menos 8 dígitos.'),
  message: z.string().trim().min(10, 'Cuéntanos un poco más (mínimo 10 caracteres).').max(2000, 'El mensaje es demasiado largo.'),
  privacy: z.literal('on', 'Debes aceptar el aviso de privacidad.'),
});

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

// Límite básico por IP (por instancia). Complementa la trampa de tiempo y el campo oculto.
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 500) {
    for (const [key, list] of hits) if (list.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
  }
  return recent.length > MAX_HITS;
}

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const raw = {
    name: String(formData.get('name') ?? ''),
    email: String(formData.get('email') ?? ''),
    phone: String(formData.get('phone') ?? ''),
    message: String(formData.get('message') ?? ''),
    privacy: String(formData.get('privacy') ?? ''),
  };
  const values = { name: raw.name, email: raw.email, phone: raw.phone, message: raw.message };

  // Anti-spam: campo oculto lleno = bot; se responde "éxito" sin enviar nada.
  if (String(formData.get('website') ?? '')) {
    return { status: 'success', message: 'Gracias, recibimos tu mensaje.' };
  }

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const errors: NonNullable<ContactState['errors']> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof NonNullable<ContactState['errors']>;
      if (key && !errors[key]) errors[key] = issue.message;
    }
    return { status: 'error', message: 'Revisa los campos marcados.', errors, values };
  }

  // Envío casi instantáneo tras cargar: se pide reintentar (nunca se descarta en silencio un mensaje real).
  const startedAt = Number(formData.get('startedAt') ?? 0);
  if (startedAt && Date.now() - startedAt < 2500) {
    return { status: 'error', message: 'Un momento, revisa tu mensaje y vuelve a enviarlo.', values };
  }

  const h = await headers();
  const ip = h.get('x-nf-client-connection-ip') ?? h.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'desconocida';
  if (limited(ip)) {
    return { status: 'error', message: 'Enviaste varios mensajes seguidos. Intenta de nuevo en unos minutos o llámanos.', values };
  }

  const { SENDGRID_API_KEY, SENDGRID_FROM, SENDGRID_TO } = process.env;
  if (!SENDGRID_API_KEY || !SENDGRID_FROM || !SENDGRID_TO) {
    console.error('[contacto] Falta configurar SENDGRID_API_KEY, SENDGRID_FROM o SENDGRID_TO');
    return { status: 'error', message: `No pudimos enviar tu mensaje. Escríbenos a ${site.email} o llámanos.`, values };
  }

  const { name, email, phone, message } = parsed.data;
  const safe = { name: escapeHtml(name), email: escapeHtml(email), phone: escapeHtml(phone), message: escapeHtml(message).replace(/\n/g, '<br>') };

  try {
    sgMail.setApiKey(SENDGRID_API_KEY);
    await sgMail.send({
      to: SENDGRID_TO,
      from: SENDGRID_FROM,
      replyTo: { email, name },
      subject: `Contacto desde el sitio web: ${name.replace(/[\r\n]+/g, ' ')}`,
      text: `Nombre: ${name}\nCorreo: ${email}\nTeléfono: ${phone}\n\n${message}\n\nEnviado desde el formulario de ${site.url}`,
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;color:#262626">
          <div style="background:#000;padding:20px 24px;border-bottom:4px solid #B40039">
            <p style="margin:0;color:#fff;font-size:18px;font-weight:bold">Nuevo mensaje desde el sitio web</p>
          </div>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #ebebeb;border-top:0">
            <tr><td style="padding:14px 24px;border-bottom:1px solid #ebebeb;width:110px;color:#737373">Nombre</td><td style="padding:14px 24px;border-bottom:1px solid #ebebeb"><strong>${safe.name}</strong></td></tr>
            <tr><td style="padding:14px 24px;border-bottom:1px solid #ebebeb;color:#737373">Correo</td><td style="padding:14px 24px;border-bottom:1px solid #ebebeb"><a href="mailto:${safe.email}" style="color:#B40039">${safe.email}</a></td></tr>
            <tr><td style="padding:14px 24px;border-bottom:1px solid #ebebeb;color:#737373">Teléfono</td><td style="padding:14px 24px;border-bottom:1px solid #ebebeb"><a href="tel:${safe.phone.replace(/[^\d+]/g, '')}" style="color:#B40039">${safe.phone}</a></td></tr>
            <tr><td colspan="2" style="padding:20px 24px;line-height:1.6">${safe.message}</td></tr>
          </table>
          <p style="margin:16px 0 0;font-size:12px;color:#737373">Puedes responder directamente a este correo. Enviado desde ${escapeHtml(site.url)}.</p>
        </div>`,
    });
    return { status: 'success', message: 'Recibimos tu mensaje. Te respondemos en horario de oficina.' };
  } catch (error) {
    console.error('[contacto] Error al enviar con SendGrid:', error instanceof Error ? error.message : error);
    return { status: 'error', message: `No pudimos enviar tu mensaje. Escríbenos a ${site.email} o llámanos.`, values };
  }
}
