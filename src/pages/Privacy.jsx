import { useTranslation } from 'react-i18next'
import SEOHead from '../components/seo/SEOHead'
import Container from '../components/common/Container'

export default function Privacy() {
  const { t } = useTranslation()

  return (
    <>
      <SEOHead title={t('privacy.meta.title')} description={t('privacy.meta.description')} />

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-estate-900 pb-24 pt-36 text-white lg:pb-32 lg:pt-44">
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-60 w-60 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
        <Container className="relative z-10">
          <p className="font-heading text-sm uppercase tracking-[0.25em] text-blue-400">
            KVKK & Gizlilik
          </p>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            Gizlilik Politikası
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-estate-300">
            Kişisel verilerinizin korunması bizim için büyük önem taşımaktadır. Bu politika, verilerinizin nasıl toplandığını, işlendiğini ve korunduğunu açıklamaktadır.
          </p>
        </Container>
      </section>

      {/* ── İçerik ──────────────────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="mb-12 text-sm text-estate-400">
              Son güncelleme: 26 Şubat 2026
            </p>

            {/* 1. Giriş */}
            <div className="space-y-16">
              <div>
                <h2 className="font-heading text-2xl font-bold text-estate-900 md:text-3xl">
                  1. Giriş
                </h2>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-estate-600">
                  <p>
                    EmlakBanq olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında kişisel verilerinizin güvenliğine büyük önem veriyoruz. Bu Gizlilik Politikası, web sitemizi (emlakbanq.com) ziyaret ettiğinizde ve hizmetlerimizden yararlandığınızda kişisel verilerinizin nasıl toplandığını, işlendiğini, saklandığını ve korunduğunu açıklamaktadır.
                  </p>
                  <p>
                    Web sitemizi kullanarak bu Gizlilik Politikası'nda belirtilen koşulları kabul etmiş sayılırsınız.
                  </p>
                </div>
              </div>

              {/* 2. Veri Sorumlusu */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-estate-900 md:text-3xl">
                  2. Veri Sorumlusu
                </h2>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-estate-600">
                  <p>
                    Kişisel verilerinizin işlenmesinden sorumlu veri sorumlusu:
                  </p>
                  <div className="rounded-xl border border-estate-100 bg-estate-50/50 p-6">
                    <p className="font-semibold text-estate-900">EmlakBanq Gayrimenkul</p>
                    <p className="mt-2">Adres: Alanya, Antalya, Türkiye</p>
                    <p>E-posta: info@emlakbanq.com</p>
                    <p>Telefon: +90 242 XXX XXXX</p>
                  </div>
                </div>
              </div>

              {/* 3. Toplanan Kişisel Veriler */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-estate-900 md:text-3xl">
                  3. Toplanan Kişisel Veriler
                </h2>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-estate-600">
                  <p>
                    Web sitemiz aracılığıyla aşağıdaki kişisel verileriniz toplanabilir:
                  </p>

                  <h3 className="!mt-6 text-lg font-semibold text-estate-800">
                    a) Kimlik Bilgileri
                  </h3>
                  <ul className="ml-6 list-disc space-y-1">
                    <li>Ad ve soyad</li>
                    <li>E-posta adresi</li>
                    <li>Telefon numarası</li>
                  </ul>

                  <h3 className="!mt-6 text-lg font-semibold text-estate-800">
                    b) İletişim Bilgileri
                  </h3>
                  <ul className="ml-6 list-disc space-y-1">
                    <li>İletişim formu aracılığıyla gönderilen mesajlar</li>
                    <li>Tercih edilen iletişim yöntemi</li>
                    <li>İlgilenilen mülk bilgileri</li>
                  </ul>

                  <h3 className="!mt-6 text-lg font-semibold text-estate-800">
                    c) Teknik Veriler
                  </h3>
                  <ul className="ml-6 list-disc space-y-1">
                    <li>IP adresi</li>
                    <li>Tarayıcı türü ve sürümü</li>
                    <li>İşletim sistemi</li>
                    <li>Ziyaret edilen sayfalar ve ziyaret süreleri</li>
                    <li>Çerez verileri</li>
                  </ul>
                </div>
              </div>

              {/* 4. Verilerin İşlenme Amaçları */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-estate-900 md:text-3xl">
                  4. Verilerin İşlenme Amaçları
                </h2>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-estate-600">
                  <p>
                    Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:
                  </p>
                  <ul className="ml-6 list-disc space-y-2">
                    <li>Gayrimenkul danışmanlık hizmetlerinin sunulması</li>
                    <li>İletişim taleplerinizin yanıtlanması</li>
                    <li>Size uygun mülk önerilerinin hazırlanması</li>
                    <li>Yasal yükümlülüklerimizin yerine getirilmesi</li>
                    <li>Web sitesi performansının analizi ve iyileştirilmesi</li>
                    <li>Pazarlama faaliyetlerinin yürütülmesi (açık rızanız ile)</li>
                    <li>İstatistiksel analizlerin yapılması</li>
                  </ul>
                </div>
              </div>

              {/* 5. Verilerin Hukuki Dayanağı */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-estate-900 md:text-3xl">
                  5. Verilerin İşlenmesinin Hukuki Dayanağı
                </h2>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-estate-600">
                  <p>
                    Kişisel verileriniz, KVKK'nın 5. maddesi kapsamında aşağıdaki hukuki sebeplere dayanılarak işlenmektedir:
                  </p>
                  <ul className="ml-6 list-disc space-y-2">
                    <li><strong>Açık rıza:</strong> Pazarlama amaçlı iletişim ve çerez kullanımı</li>
                    <li><strong>Sözleşmenin ifası:</strong> Gayrimenkul danışmanlık hizmetlerinin sunulması</li>
                    <li><strong>Meşru menfaat:</strong> Web sitesinin güvenliği ve performans analizi</li>
                    <li><strong>Hukuki yükümlülük:</strong> Yasal düzenlemelere uyum</li>
                  </ul>
                </div>
              </div>

              {/* 6. Verilerin Aktarımı */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-estate-900 md:text-3xl">
                  6. Verilerin Aktarımı
                </h2>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-estate-600">
                  <p>
                    Kişisel verileriniz, KVKK'nın 8. ve 9. maddeleri kapsamında aşağıdaki taraflara aktarılabilir:
                  </p>
                  <ul className="ml-6 list-disc space-y-2">
                    <li>Yasal zorunluluk halinde yetkili kamu kurum ve kuruluşları</li>
                    <li>Hizmet aldığımız iş ortakları ve tedarikçiler (hosting, analitik hizmetleri)</li>
                    <li>Açık rızanız ile üçüncü taraf hizmet sağlayıcıları</li>
                  </ul>
                  <p>
                    Verileriniz yurt dışına aktarılması durumunda, KVKK'nın 9. maddesinde belirtilen şartlara uygun olarak gerekli güvenlik önlemleri alınmaktadır.
                  </p>
                </div>
              </div>

              {/* 7. Çerezler */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-estate-900 md:text-3xl">
                  7. Çerezler (Cookies)
                </h2>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-estate-600">
                  <p>
                    Web sitemiz, deneyiminizi iyileştirmek amacıyla çerezler kullanmaktadır:
                  </p>

                  <h3 className="!mt-6 text-lg font-semibold text-estate-800">
                    Zorunlu Çerezler
                  </h3>
                  <p>
                    Web sitesinin temel işlevlerini yerine getirmesi için gerekli olan çerezlerdir. Oturum yönetimi ve güvenlik amaçlı kullanılır.
                  </p>

                  <h3 className="!mt-6 text-lg font-semibold text-estate-800">
                    Analitik Çerezler
                  </h3>
                  <p>
                    Ziyaretçi davranışlarını anonim olarak analiz etmek ve web sitesini geliştirmek için kullanılır. Bu çerezler yalnızca açık rızanız ile etkinleştirilir.
                  </p>

                  <h3 className="!mt-6 text-lg font-semibold text-estate-800">
                    Tercih Çerezleri
                  </h3>
                  <p>
                    Dil tercihi ve bölge seçimi gibi kullanıcı tercihlerini hatırlamak için kullanılır.
                  </p>

                  <p>
                    Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz; ancak bu durumda web sitesinin bazı özellikleri düzgün çalışmayabilir.
                  </p>
                </div>
              </div>

              {/* 8. Veri Güvenliği */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-estate-900 md:text-3xl">
                  8. Veri Güvenliği
                </h2>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-estate-600">
                  <p>
                    Kişisel verilerinizin güvenliğini sağlamak için aşağıdaki teknik ve idari tedbirleri almaktayız:
                  </p>
                  <ul className="ml-6 list-disc space-y-2">
                    <li>SSL/TLS şifreleme ile güvenli veri iletimi</li>
                    <li>Erişim kontrolü ve yetkilendirme mekanizmaları</li>
                    <li>Düzenli güvenlik güncellemeleri ve denetimleri</li>
                    <li>Veri minimizasyonu ilkesine uygun veri toplama</li>
                    <li>Çalışan eğitimleri ve gizlilik farkındalığı programları</li>
                  </ul>
                </div>
              </div>

              {/* 9. Veri Saklama Süresi */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-estate-900 md:text-3xl">
                  9. Veri Saklama Süresi
                </h2>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-estate-600">
                  <p>
                    Kişisel verileriniz, işlenme amaçlarının gerektirdiği süre boyunca saklanmaktadır. Bu sürenin sona ermesinin ardından verileriniz silinir, yok edilir veya anonim hale getirilir. Yasal zorunluluklar saklı kalmak kaydıyla, iletişim formu verileri en fazla 2 yıl, teknik veriler ise en fazla 1 yıl süreyle saklanır.
                  </p>
                </div>
              </div>

              {/* 10. Haklarınız (KVKK Madde 11) */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-estate-900 md:text-3xl">
                  10. Haklarınız (KVKK Madde 11)
                </h2>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-estate-600">
                  <p>
                    KVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:
                  </p>
                  <ul className="ml-6 list-disc space-y-2">
                    <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                    <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</li>
                    <li>Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                    <li>Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme</li>
                    <li>Kişisel verilerinizin eksik veya yanlış işlenmiş olması halinde bunların düzeltilmesini isteme</li>
                    <li>KVKK'nın 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerinizin silinmesini veya yok edilmesini isteme</li>
                    <li>Düzeltme ve silme işlemlerinin, kişisel verilerinizin aktarıldığı üçüncü kişilere bildirilmesini isteme</li>
                    <li>İşlenen verilerinizin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme</li>
                    <li>Kişisel verilerinizin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız halinde zararın giderilmesini talep etme</li>
                  </ul>
                </div>
              </div>

              {/* 11. Başvuru Yöntemi */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-estate-900 md:text-3xl">
                  11. Başvuru Yöntemi
                </h2>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-estate-600">
                  <p>
                    Yukarıda belirtilen haklarınızı kullanmak için aşağıdaki yöntemlerle bize başvurabilirsiniz:
                  </p>
                  <div className="rounded-xl border border-estate-100 bg-estate-50/50 p-6 space-y-3">
                    <p>
                      <strong>E-posta:</strong> info@emlakbanq.com
                    </p>
                    <p>
                      <strong>Posta adresi:</strong> EmlakBanq Gayrimenkul, Alanya, Antalya, Türkiye
                    </p>
                  </div>
                  <p>
                    Başvurunuzda kimliğinizi tespit edici bilgiler ile KVKK'nın 11. maddesi kapsamında kullanmak istediğiniz hakkınıza yönelik açıklamalarınız yer almalıdır. Başvurularınız en geç 30 gün içinde ücretsiz olarak sonuçlandırılacaktır.
                  </p>
                </div>
              </div>

              {/* 12. Politika Değişiklikleri */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-estate-900 md:text-3xl">
                  12. Politika Değişiklikleri
                </h2>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-estate-600">
                  <p>
                    Bu Gizlilik Politikası, yasal düzenlemeler veya hizmetlerimizdeki değişiklikler doğrultusunda güncellenebilir. Güncellemeler web sitemizde yayınlandığı tarihte yürürlüğe girer. Önemli değişiklikler hakkında sizi bilgilendirmek için makul çabayı göstereceğiz.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
