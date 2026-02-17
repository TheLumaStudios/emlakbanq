import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SEOHead from '../components/seo/SEOHead'
import Container from '../components/common/Container'
import { ROUTES } from '../config/routes'

export default function NotFound() {
  const { t } = useTranslation()

  return (
    <>
      <SEOHead title={t('notFound.meta.title')} />
      <section className="flex min-h-[60vh] items-center py-16">
        <Container className="text-center">
          <h1 className="text-4xl md:text-5xl">{t('notFound.title')}</h1>
          <p className="mt-4 text-lg text-estate-400">{t('notFound.message')}</p>
          <Link
            to={ROUTES.HOME}
            className="mt-8 inline-block rounded-sm bg-gold-500 px-6 py-3 font-semibold text-white hover:bg-gold-600"
          >
            {t('common.backToHome')}
          </Link>
        </Container>
      </section>
    </>
  )
}
