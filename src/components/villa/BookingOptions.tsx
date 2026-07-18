'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { buildWhatsAppLink } from '@/data/config';

type Props = {
  villaName: string;
  maxGuests: number;
};

/**
 * Tres opciones de reserva visibles:
 *  1) WhatsApp con mensaje pre-llenado con el nombre de la villa.
 *  2) Formulario de solicitud (front-end; no envia a ningun backend todavia).
 *  3) "Reservar online": abre un resumen. El pago queda como "proximamente".
 *
 * ------------------------------------------------------------------
 * COMO CONECTAR STRIPE DESPUES (resumen):
 *  - Crea un endpoint /api/checkout que genere una Checkout Session.
 *  - En handleConfirmOnline() llama a ese endpoint y redirige a la URL
 *    que devuelve Stripe. La estructura de datos (villa, fechas,
 *    huespedes) ya esta lista en el estado `form`.
 * ------------------------------------------------------------------
 */
export default function BookingOptions({ villaName, maxGuests }: Props) {
  const t = useTranslations('booking');

  const [form, setForm] = useState({
    name: '',
    email: '',
    checkin: '',
    checkout: '',
    guests: 2,
    message: '',
  });
  const [formSent, setFormSent] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [onlineConfirmed, setOnlineConfirmed] = useState(false);

  const whatsappHref = buildWhatsAppLink(t('whatsapp.message', { villa: villaName }));

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Front-end unicamente: no hay backend. Aqui podrias enviar a un
    // servicio de email/formularios (Formspree, Resend, etc.).
    setFormSent(true);
  }

  function handleConfirmOnline() {
    // Punto de integracion con Stripe (ver comentario arriba).
    setOnlineConfirmed(true);
  }

  const datesLabel =
    form.checkin && form.checkout
      ? `${form.checkin} → ${form.checkout}`
      : t('online.datesPending');

  return (
    <div className="space-y-5">
      {/* Opcion 1: WhatsApp */}
      <div className="rounded-sm border border-charcoal/10 bg-white p-6">
        <h3 className="font-serif text-xl text-palm">{t('whatsapp.title')}</h3>
        <p className="mt-1 text-sm font-light text-charcoal/70">{t('whatsapp.description')}</p>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp mt-4 w-full"
        >
          {t('whatsapp.cta')}
        </a>
      </div>

      {/* Opcion 2: Formulario de solicitud */}
      <div className="rounded-sm border border-charcoal/10 bg-white p-6">
        <h3 className="font-serif text-xl text-palm">{t('form.title')}</h3>
        <p className="mt-1 text-sm font-light text-charcoal/70">{t('form.description')}</p>

        {formSent ? (
          <p className="mt-4 rounded-sm bg-teal/10 p-4 text-sm text-palm">{t('form.success')}</p>
        ) : (
          <form onSubmit={handleFormSubmit} className="mt-4 space-y-4">
            <div>
              <label className="text-xs uppercase tracking-widest text-charcoal/60">
                {t('form.name')}
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                className="mt-1 w-full rounded-sm border border-charcoal/15 bg-sand/40 px-3 py-2.5 text-sm outline-none transition-colors focus:border-gold"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-charcoal/60">
                {t('form.email')}
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                className="mt-1 w-full rounded-sm border border-charcoal/15 bg-sand/40 px-3 py-2.5 text-sm outline-none transition-colors focus:border-gold"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-widest text-charcoal/60">
                  {t('form.checkin')}
                </label>
                <input
                  type="date"
                  value={form.checkin}
                  onChange={(e) => update('checkin', e.target.value)}
                  className="mt-1 w-full rounded-sm border border-charcoal/15 bg-sand/40 px-3 py-2.5 text-sm outline-none transition-colors focus:border-gold"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-charcoal/60">
                  {t('form.checkout')}
                </label>
                <input
                  type="date"
                  value={form.checkout}
                  onChange={(e) => update('checkout', e.target.value)}
                  className="mt-1 w-full rounded-sm border border-charcoal/15 bg-sand/40 px-3 py-2.5 text-sm outline-none transition-colors focus:border-gold"
                />
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-charcoal/60">
                {t('form.guests')}
              </label>
              <input
                type="number"
                min={1}
                max={maxGuests}
                value={form.guests}
                onChange={(e) => update('guests', Number(e.target.value))}
                className="mt-1 w-full rounded-sm border border-charcoal/15 bg-sand/40 px-3 py-2.5 text-sm outline-none transition-colors focus:border-gold"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-charcoal/60">
                {t('form.message')}
              </label>
              <textarea
                rows={3}
                value={form.message}
                placeholder={t('form.messagePlaceholder')}
                onChange={(e) => update('message', e.target.value)}
                className="mt-1 w-full resize-none rounded-sm border border-charcoal/15 bg-sand/40 px-3 py-2.5 text-sm outline-none transition-colors focus:border-gold"
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              {t('form.submit')}
            </button>
          </form>
        )}
      </div>

      {/* Opcion 3: Reservar online */}
      <div className="rounded-sm border border-gold/40 bg-white p-6">
        <h3 className="font-serif text-xl text-palm">{t('online.title')}</h3>
        <p className="mt-1 text-sm font-light text-charcoal/70">{t('online.description')}</p>
        <button
          type="button"
          onClick={() => {
            setOnlineConfirmed(false);
            setModalOpen(true);
          }}
          className="btn-outline mt-4 w-full border-gold/50 text-gold hover:bg-gold hover:text-charcoal"
        >
          {t('online.cta')}
        </button>
      </div>

      {/* Modal de reserva online */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          />
          <div className="relative z-10 w-full max-w-md rounded-sm bg-white p-8 shadow-2xl">
            <h4 className="font-serif text-2xl text-palm">{t('online.summaryTitle')}</h4>

            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between border-b border-charcoal/10 pb-3">
                <dt className="text-charcoal/60">{t('online.villa')}</dt>
                <dd className="font-medium text-charcoal">{villaName}</dd>
              </div>
              <div className="flex justify-between border-b border-charcoal/10 pb-3">
                <dt className="text-charcoal/60">{t('online.guests')}</dt>
                <dd className="font-medium text-charcoal">{form.guests}</dd>
              </div>
              <div className="flex justify-between border-b border-charcoal/10 pb-3">
                <dt className="text-charcoal/60">{t('online.dates')}</dt>
                <dd className="font-medium text-charcoal">{datesLabel}</dd>
              </div>
            </dl>

            <div className="mt-6 rounded-sm bg-sand/60 p-4">
              <div className="text-xs uppercase tracking-widest text-gold">
                {t('online.paymentTitle')}
              </div>
              <p className="mt-2 text-sm font-light text-charcoal/75">{t('online.paymentSoon')}</p>
            </div>

            {onlineConfirmed ? (
              <p className="mt-6 rounded-sm bg-teal/10 p-4 text-center text-sm text-palm">
                {t('online.confirmed')}
              </p>
            ) : (
              <button type="button" onClick={handleConfirmOnline} className="btn-primary mt-6 w-full">
                {t('online.confirm')}
              </button>
            )}

            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="mt-3 w-full text-center text-xs uppercase tracking-widest text-charcoal/50 transition-colors hover:text-charcoal"
            >
              {t('online.close')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
