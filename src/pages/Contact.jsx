import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import SEOHead from '../components/seo/SEOHead'
import Container from '../components/common/Container'
import { ROUTES } from '../config/routes'
import { useContactSubmit } from '../hooks/useContactSubmit'

const INITIAL_FORM = {
  name: '',
  email: '',
  phone: '',
  interest: '',
  message: '',
  consent: false,
}

export default function Contact() {
  const { t } = useTranslation()

  const INTEREST_OPTIONS = [
    { value: '', label: t('contact.form.selectInterest', 'Select your interest...') },
    { value: 'buying', label: t('contact.form.interestOptions.buying', 'Buying a Property') },
    { value: 'investing', label: t('contact.form.interestOptions.investing', 'Investment Opportunities') },
    { value: 'visa', label: t('contact.form.interestOptions.visa', 'Golden Visa Assistance') },
    { value: 'selling', label: t('contact.form.interestOptions.selling', 'Selling a Property') },
    { value: 'other', label: t('contact.form.interestOptions.other', 'Other Inquiry') },
  ]

  const CONTACT_INFO = [
    {
      label: t('contact.info.labels.email', 'Email'),
      value: t('contact.info.email', 'info@emlakbanq.com'),
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
    },
    {
      label: t('contact.info.labels.phone', 'Phone'),
      value: t('contact.info.phone', '+971 4 XXX XXXX'),
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
      ),
    },
    {
      label: t('contact.info.labels.whatsapp', 'WhatsApp'),
      value: t('contact.info.whatsapp', '+971 50 XXX XXXX'),
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
    },
    {
      label: t('contact.info.labels.workingHours', 'Working Hours'),
      value: t('contact.info.workingHoursValue', 'Sun - Thu: 9 AM - 7 PM (GST)'),
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ]
  const [form, setForm] = useState(INITIAL_FORM)
  const { submit, loading: submitting, error: submitError, success } = useContactSubmit()

  useEffect(() => {
    if (success) setForm(INITIAL_FORM)
  }, [success])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await submit(form)
  }

  const inputClass =
    'w-full rounded-xl border border-estate-200 bg-white px-4 py-3 text-sm text-estate-900 placeholder:text-estate-400 transition-colors focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20'

  return (
    <>
      <SEOHead
        title={t('contact.meta.title')}
        description={t('contact.meta.description')}
      />

      {/* ── Page Header ─────────────────────────────────────────────── */}
      <section className="bg-estate-900 py-20 text-white lg:py-28">
        <Container>
          <p className="font-heading text-sm uppercase tracking-[0.25em] text-gold-400">
            {t('contact.subtitle', 'Get in Touch')}
          </p>
          <h1 className="mt-4 font-heading text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            {t('contact.heading', 'Let\'s Start a Conversation')}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-estate-300">
            {t(
              'contact.intro',
              'Whether you\'re looking to invest, purchase a dream home, or explore Golden Visa options, our team is ready to guide you every step of the way.'
            )}
          </p>
        </Container>
      </section>

      {/* ── Two-Column Layout ───────────────────────────────────────── */}
      <section className="bg-cream-50 py-20 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
            {/* ─── Left: Form ────────────────────────────────────────── */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl bg-white p-8 shadow-sm md:p-10">
                <h2 className="font-heading text-2xl font-bold text-estate-900">
                  {t('contact.form.title', 'Send Us a Message')}
                </h2>
                <p className="mt-2 text-sm text-estate-500">
                  {t(
                    'contact.form.description',
                    'Fill in the form below and one of our consultants will get back to you within 24 hours.'
                  )}
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-sm font-medium text-estate-700"
                    >
                      {t('contact.form.name', 'Full Name')} *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder={t('contact.form.placeholders.name', 'e.g. John Doe')}
                      className={inputClass}
                    />
                  </div>

                  {/* Email + Phone row */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-1.5 block text-sm font-medium text-estate-700"
                      >
                        {t('contact.form.email', 'Email Address')} *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder={t('contact.form.placeholders.email', 'you@example.com')}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-1.5 block text-sm font-medium text-estate-700"
                      >
                        {t('contact.form.phone', 'Phone Number')}
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder={t('contact.form.placeholders.phone', '+971 50 XXX XXXX')}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Interest */}
                  <div>
                    <label
                      htmlFor="interest"
                      className="mb-1.5 block text-sm font-medium text-estate-700"
                    >
                      {t('contact.form.interest', 'I\'m Interested In')} *
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      required
                      value={form.interest}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      {INTEREST_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-sm font-medium text-estate-700"
                    >
                      {t('contact.form.message', 'Your Message')}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder={t('contact.form.placeholders.message', 'Tell us about your requirements, budget, or any questions you have...')}
                      className={inputClass + ' resize-none'}
                    />
                  </div>

                  {/* KVKK / GDPR Consent */}
                  <div className="flex items-start gap-3">
                    <input
                      id="consent"
                      name="consent"
                      type="checkbox"
                      required
                      checked={form.consent}
                      onChange={handleChange}
                      className="mt-1 h-4 w-4 rounded border-estate-300 text-gold-600 focus:ring-gold-500"
                    />
                    <label htmlFor="consent" className="text-xs leading-relaxed text-estate-500">
                      {t(
                        'contact.form.consent',
                        'I consent to the processing of my personal data in accordance with the KVKK/GDPR privacy policy. I understand that my data will be used solely for the purpose of responding to my inquiry and will not be shared with third parties without my explicit consent.'
                      )}{' '}
                      <Link
                        to={ROUTES.PRIVACY}
                        className="font-medium text-gold-700 underline hover:text-gold-800"
                      >
                        {t('contact.form.privacyLink', 'Privacy Policy')}
                      </Link>
                    </label>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-estate-900 px-8 py-3.5 font-medium text-white transition-all duration-300 hover:bg-estate-800 hover:shadow-lg hover:shadow-estate-900/20 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={!form.consent || submitting}
                  >
                    {submitting ? t('contact.form.sending', 'Sending...') : t('contact.form.submit', 'Send Message')}
                  </button>

                  {success && (
                    <div className="rounded-xl bg-emerald-50 p-4 text-center text-sm text-emerald-700">
                      {t('contact.form.success', 'Thank you! Your message has been sent. We will get back to you within 24 hours.')}
                    </div>
                  )}
                  {submitError && (
                    <div className="rounded-xl bg-red-50 p-4 text-center text-sm text-red-700">
                      {t('contact.form.error', 'Something went wrong. Please try again.')}
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* ─── Right: Contact Info ───────────────────────────────── */}
            <div className="lg:col-span-2">
              {/* Contact Cards */}
              <div className="space-y-4">
                {CONTACT_INFO.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-4 rounded-xl border border-estate-100 bg-white p-5 transition-all duration-300 hover:border-gold-200 hover:shadow-sm"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gold-50 text-gold-700">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-estate-400">
                        {item.label}
                      </p>
                      <p className="mt-0.5 text-sm font-medium text-estate-900">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Office Addresses */}
              <div className="mt-8 space-y-4">
                <h3 className="font-heading text-lg font-semibold text-estate-900">
                  {t('contact.offices.title', 'Our Offices')}
                </h3>

                {/* Dubai */}
                <div className="rounded-xl border border-estate-100 bg-white p-5">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-gold-500" />
                    <h4 className="font-heading text-sm font-semibold text-estate-900">
                      {t('contact.offices.dubai.city', 'Dubai, UAE')}
                    </h4>
                  </div>
                  <p className="mt-2 text-sm text-estate-500">
                    {t('contact.offices.dubai.address', 'Business Bay, Bay Square, Dubai, UAE')}
                  </p>
                </div>

                {/* Istanbul */}
                <div className="rounded-xl border border-estate-100 bg-white p-5">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-gold-500" />
                    <h4 className="font-heading text-sm font-semibold text-estate-900">
                      {t('contact.offices.istanbul.city', 'Istanbul, Turkey')}
                    </h4>
                  </div>
                  <p className="mt-2 text-sm text-estate-500">
                    {t('contact.offices.istanbul.address', 'Skyland Istanbul, Turkey')}
                  </p>
                </div>
              </div>

              {/* Reassurance */}
              <div className="mt-8 rounded-xl bg-estate-900 p-6 text-white">
                <h3 className="font-heading text-lg font-semibold">
                  {t('contact.cta.title', 'Prefer a Direct Call?')}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-estate-300">
                  {t(
                    'contact.cta.description',
                    'Our multilingual team speaks English, Arabic, Turkish, and Russian. Schedule a call at your convenience.'
                  )}
                </p>
                <a
                  href="tel:+97140000000"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-2.5 text-sm font-medium text-estate-900 transition-all duration-300 hover:bg-gold-400"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                  {t('contact.cta.callNow', 'Call Now')}
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
