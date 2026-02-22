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
      <section className="flex min-h-[70vh] items-center pt-36 pb-16">
        <Container className="text-center">
          <p className="font-heading text-[120px] font-bold leading-none text-blue-500/20 md:text-[180px]">404</p>
          <h1 className="mt-4 font-heading text-3xl font-bold text-estate-900 md:text-4xl">{t('notFound.title')}</h1>
          <p className="mt-4 text-lg text-estate-400">{t('notFound.message')}</p>
          <Link
            to={ROUTES.HOME}
            className="btn-glow mt-8 inline-flex items-center gap-2 rounded-md bg-blue-500 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white hover:bg-blue-400"
          >
            {t('common.backToHome')}
            <span>&rarr;</span>
          </Link>
        </Container>
      </section>
    </>
  )
}
