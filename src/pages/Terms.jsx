import { useTranslation } from 'react-i18next'
import SEOHead from '../components/seo/SEOHead'
import Container from '../components/common/Container'

export default function Terms() {
  const { t } = useTranslation()

  return (
    <>
      <SEOHead title={t('terms.meta.title')} description={t('terms.meta.description')} />
      <section className="py-16">
        <Container>
          <h1 className="text-3xl md:text-4xl">{t('terms.heading')}</h1>
        </Container>
      </section>
    </>
  )
}
