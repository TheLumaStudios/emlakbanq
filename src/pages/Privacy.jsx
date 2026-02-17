import { useTranslation } from 'react-i18next'
import SEOHead from '../components/seo/SEOHead'
import Container from '../components/common/Container'

export default function Privacy() {
  const { t } = useTranslation()

  return (
    <>
      <SEOHead title={t('privacy.meta.title')} description={t('privacy.meta.description')} />
      <section className="py-16">
        <Container>
          <h1 className="text-3xl md:text-4xl">{t('privacy.heading')}</h1>
        </Container>
      </section>
    </>
  )
}
