import { useTranslation } from 'react-i18next'
import SEOHead from '../components/seo/SEOHead'
import Container from '../components/common/Container'

export default function Terms() {
  const { t } = useTranslation()

  return (
    <>
      <SEOHead title={t('terms.meta.title')} description={t('terms.meta.description')} />

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-estate-900 pb-24 pt-36 text-white lg:pb-32 lg:pt-44">
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-60 w-60 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
        <Container className="relative z-10">
          <p className="font-heading text-sm uppercase tracking-[0.25em] text-blue-400">
            Yasal Bilgilendirme
          </p>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            Kullanım Koşulları
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-estate-300">
            EmlakBanq web sitesini kullanmadan önce lütfen aşağıdaki kullanım koşullarını dikkatlice okuyunuz. Siteyi kullanmanız bu koşulları kabul ettiğiniz anlamına gelir.
          </p>
        </Container>
      </section>

      {/* ── İçerik ──────────────────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="mb-12 text-sm text-estate-400">
              Son güncelleme: 27 Şubat 2026
            </p>

            <div className="space-y-16">
              {/* 1. Genel Hükümler */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-estate-900 md:text-3xl">
                  1. Genel Hükümler
                </h2>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-estate-600">
                  <p>
                    Bu Kullanım Koşulları, EmlakBanq Gayrimenkul ("EmlakBanq", "biz", "bizim") tarafından işletilen emlakbanq.com web sitesinin ("Site") kullanımını düzenlemektedir. Siteye erişerek veya Siteyi kullanarak bu koşulları kabul etmiş sayılırsınız.
                  </p>
                  <p>
                    Bu koşulları kabul etmiyorsanız, lütfen Siteyi kullanmayınız. EmlakBanq, bu koşulları herhangi bir zamanda güncelleme hakkını saklı tutar.
                  </p>
                </div>
              </div>

              {/* 2. Tanımlar */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-estate-900 md:text-3xl">
                  2. Tanımlar
                </h2>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-estate-600">
                  <ul className="ml-6 list-disc space-y-2">
                    <li><strong>"Site":</strong> emlakbanq.com alan adı altında sunulan tüm web sayfaları, içerikler ve hizmetler</li>
                    <li><strong>"Kullanıcı":</strong> Siteye herhangi bir şekilde erişen veya Siteyi kullanan gerçek veya tüzel kişi</li>
                    <li><strong>"Hizmetler":</strong> Site üzerinden sunulan gayrimenkul danışmanlığı, bilgilendirme ve iletişim hizmetleri</li>
                    <li><strong>"İçerik":</strong> Sitede yer alan metin, görsel, video, grafik, veri ve diğer tüm materyaller</li>
                  </ul>
                </div>
              </div>

              {/* 3. Hizmetlerin Kapsamı */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-estate-900 md:text-3xl">
                  3. Hizmetlerin Kapsamı
                </h2>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-estate-600">
                  <p>
                    EmlakBanq, Alanya ve çevresinde gayrimenkul danışmanlık hizmetleri sunan bir platformdur. Sitemiz aracılığıyla:
                  </p>
                  <ul className="ml-6 list-disc space-y-2">
                    <li>Satılık gayrimenkul ilanlarını inceleyebilirsiniz</li>
                    <li>Bölgeler ve yatırım fırsatları hakkında bilgi edinebilirsiniz</li>
                    <li>Gayrimenkul danışmanlarımız ile iletişime geçebilirsiniz</li>
                    <li>Blog yazıları ve piyasa analizlerini okuyabilirsiniz</li>
                    <li>Vatandaşlık programı hakkında bilgi alabilirsiniz</li>
                  </ul>
                  <div className="rounded-xl border border-yellow-200 bg-yellow-50/50 p-5">
                    <p className="text-sm text-estate-600">
                      <strong>Önemli:</strong> Sitede yer alan gayrimenkul bilgileri (fiyatlar, özellikler, görseller) bilgilendirme amaçlıdır ve önceden haber verilmeksizin değişebilir. Güncel bilgi için danışmanlarımız ile iletişime geçmenizi öneririz.
                    </p>
                  </div>
                </div>
              </div>

              {/* 4. Kullanıcı Yükümlülükleri */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-estate-900 md:text-3xl">
                  4. Kullanıcı Yükümlülükleri
                </h2>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-estate-600">
                  <p>
                    Siteyi kullanırken aşağıdaki kurallara uymayı kabul edersiniz:
                  </p>
                  <ul className="ml-6 list-disc space-y-2">
                    <li>Siteyi yalnızca yasal amaçlarla kullanmak</li>
                    <li>İletişim formlarında doğru ve güncel bilgi vermek</li>
                    <li>Sitenin güvenliğini tehlikeye atacak eylemlerden kaçınmak</li>
                    <li>Otomatik veri toplama araçları (bot, crawler vb.) kullanmamak</li>
                    <li>Sitenin işleyişini engelleyecek veya bozacak faaliyetlerde bulunmamak</li>
                    <li>Başkalarının haklarını ihlal edecek şekilde Siteyi kullanmamak</li>
                    <li>Site içeriklerini izinsiz kopyalamamak veya dağıtmamak</li>
                  </ul>
                </div>
              </div>

              {/* 5. Fikri Mülkiyet Hakları */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-estate-900 md:text-3xl">
                  5. Fikri Mülkiyet Hakları
                </h2>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-estate-600">
                  <p>
                    Sitede yer alan tüm içerikler (metinler, görseller, logolar, grafikler, tasarım, yazılım kodu, veri tabanları) EmlakBanq'a veya lisans verenlere aittir ve Türkiye Cumhuriyeti fikri mülkiyet mevzuatı ile uluslararası anlaşmalar tarafından korunmaktadır.
                  </p>
                  <p>
                    EmlakBanq'ın önceden yazılı izni olmaksızın:
                  </p>
                  <ul className="ml-6 list-disc space-y-2">
                    <li>Site içeriklerinin kısmen veya tamamen kopyalanması, çoğaltılması veya dağıtılması</li>
                    <li>EmlakBanq markası, logosu veya ticari adının kullanılması</li>
                    <li>Site tasarımının veya kaynak kodunun kopyalanması</li>
                    <li>Sitedeki görsellerin başka platformlarda kullanılması</li>
                  </ul>
                  <p>
                    kesinlikle yasaktır.
                  </p>
                </div>
              </div>

              {/* 6. Gayrimenkul Bilgilendirmesi */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-estate-900 md:text-3xl">
                  6. Gayrimenkul Bilgilendirmesi
                </h2>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-estate-600">
                  <p>
                    Sitede yayınlanan gayrimenkul bilgileri aşağıdaki koşullara tabidir:
                  </p>

                  <h3 className="!mt-6 text-lg font-semibold text-estate-800">
                    a) Fiyat Bilgileri
                  </h3>
                  <p>
                    Sitede belirtilen fiyatlar tahmini olup, döviz kuru dalgalanmaları, piyasa koşulları ve satıcı tercihleri nedeniyle değişiklik gösterebilir. Kesin fiyat bilgisi için danışmanlarımız ile görüşmeniz gerekmektedir.
                  </p>

                  <h3 className="!mt-6 text-lg font-semibold text-estate-800">
                    b) Mülk Özellikleri
                  </h3>
                  <p>
                    Mülklere ilişkin özellikler (alan, oda sayısı, konum, olanaklar vb.) iyi niyetle ve mevcut bilgilere dayanılarak sunulmaktadır. Ancak doğrulukları garanti edilmez. Satın alma kararı vermeden önce mülkü yerinde incelemeniz tavsiye edilir.
                  </p>

                  <h3 className="!mt-6 text-lg font-semibold text-estate-800">
                    c) Görseller
                  </h3>
                  <p>
                    Sitedeki mülk görselleri temsilidir ve gerçek mülk ile farklılık gösterebilir. Tamamlanmadan satışa (off-plan) sunulan projeler için görseller mimari renderlar olup, nihai ürün farklılık gösterebilir.
                  </p>

                  <h3 className="!mt-6 text-lg font-semibold text-estate-800">
                    d) Yatırım Bilgileri
                  </h3>
                  <p>
                    Sitede yer alan ROI (yatırım getirisi), kira getirisi ve değer artışı tahminleri geçmiş verilere ve piyasa analizlerine dayanmaktadır. Bu bilgiler yatırım tavsiyesi niteliği taşımaz ve gelecekteki performansın garantisi değildir.
                  </p>
                </div>
              </div>

              {/* 7. Sorumluluk Sınırlaması */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-estate-900 md:text-3xl">
                  7. Sorumluluk Sınırlaması
                </h2>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-estate-600">
                  <p>
                    Yasal olarak izin verilen azami ölçüde:
                  </p>
                  <ul className="ml-6 list-disc space-y-2">
                    <li>EmlakBanq, Sitede yer alan bilgilerin doğruluğu, güncelliği veya eksiksizliği konusunda herhangi bir garanti vermez.</li>
                    <li>Siteye erişimin kesintisiz veya hatasız olacağını garanti etmez.</li>
                    <li>Site üzerinden bağlantı verilen üçüncü taraf sitelerin içeriklerinden sorumlu değildir.</li>
                    <li>Kullanıcıların Site bilgilerine dayanarak aldığı yatırım kararlarından doğabilecek zararlardan sorumlu tutulamaz.</li>
                    <li>Teknik arıza, bakım veya mücbir sebeplerden kaynaklanan erişim kesintilerinden sorumlu değildir.</li>
                  </ul>
                  <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-5">
                    <p className="text-sm text-estate-600">
                      <strong>Tavsiye:</strong> Gayrimenkul yatırımı önemli bir finansal karardır. Satın alma işlemi öncesinde bağımsız hukuki ve mali danışmanlık almanızı şiddetle öneriyoruz.
                    </p>
                  </div>
                </div>
              </div>

              {/* 8. Üçüncü Taraf Bağlantıları */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-estate-900 md:text-3xl">
                  8. Üçüncü Taraf Bağlantıları
                </h2>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-estate-600">
                  <p>
                    Sitemiz, üçüncü taraf web sitelerine bağlantılar içerebilir. Bu bağlantılar yalnızca bilgilendirme amaçlıdır ve söz konusu sitelerin içeriklerini onayladığımız anlamına gelmez. Üçüncü taraf sitelerin gizlilik politikaları ve kullanım koşulları farklı olabilir; bu siteleri kullanırken kendi koşullarını incelemenizi öneriyoruz.
                  </p>
                </div>
              </div>

              {/* 9. İletişim Formları */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-estate-900 md:text-3xl">
                  9. İletişim Formları ve Mesajlar
                </h2>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-estate-600">
                  <p>
                    Site üzerindeki iletişim formlarını kullanarak bize mesaj gönderdiğinizde:
                  </p>
                  <ul className="ml-6 list-disc space-y-2">
                    <li>Verdiğiniz bilgilerin doğru ve güncel olduğunu beyan edersiniz</li>
                    <li>Mesajınızın gayrimenkul danışmanlığı kapsamında değerlendirilmesini kabul edersiniz</li>
                    <li>Danışmanlarımızın sizinle iletişime geçmesine onay verirsiniz</li>
                    <li>Kişisel verilerinizin Gizlilik Politikamız kapsamında işleneceğini kabul edersiniz</li>
                  </ul>
                </div>
              </div>

              {/* 10. Hizmetin Askıya Alınması */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-estate-900 md:text-3xl">
                  10. Hizmetin Askıya Alınması
                </h2>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-estate-600">
                  <p>
                    EmlakBanq, aşağıdaki durumlarda Siteye erişiminizi geçici veya kalıcı olarak kısıtlama hakkını saklı tutar:
                  </p>
                  <ul className="ml-6 list-disc space-y-2">
                    <li>Bu Kullanım Koşullarının ihlali halinde</li>
                    <li>Sitenin güvenliğini tehdit eden faaliyetlerde bulunulması halinde</li>
                    <li>Yasal zorunluluklar gereği</li>
                    <li>Teknik bakım ve güncelleme çalışmaları sırasında</li>
                  </ul>
                </div>
              </div>

              {/* 11. Uygulanacak Hukuk ve Uyuşmazlık Çözümü */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-estate-900 md:text-3xl">
                  11. Uygulanacak Hukuk ve Uyuşmazlık Çözümü
                </h2>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-estate-600">
                  <p>
                    Bu Kullanım Koşulları, Türkiye Cumhuriyeti hukukuna tabi olup, bu koşullardan doğabilecek her türlü uyuşmazlığın çözümünde Alanya Mahkemeleri ve İcra Daireleri yetkilidir.
                  </p>
                </div>
              </div>

              {/* 12. Değişiklikler */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-estate-900 md:text-3xl">
                  12. Değişiklikler
                </h2>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-estate-600">
                  <p>
                    EmlakBanq, bu Kullanım Koşullarını herhangi bir zamanda güncelleme hakkını saklı tutar. Değişiklikler Sitede yayınlandığı tarihten itibaren geçerli olur. Siteyi kullanmaya devam etmeniz, güncellenmiş koşulları kabul ettiğiniz anlamına gelir.
                  </p>
                </div>
              </div>

              {/* 13. İletişim */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-estate-900 md:text-3xl">
                  13. İletişim
                </h2>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-estate-600">
                  <p>
                    Bu Kullanım Koşulları hakkında sorularınız veya geri bildirimleriniz için bizimle iletişime geçebilirsiniz:
                  </p>
                  <div className="rounded-xl border border-estate-100 bg-estate-50/50 p-6 space-y-3">
                    <p className="font-semibold text-estate-900">EmlakBanq Gayrimenkul</p>
                    <p>Adres: Alanya, Antalya, Türkiye</p>
                    <p>E-posta: info@emlakbanq.com</p>
                    <p>Telefon: +90 242 XXX XXXX</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
