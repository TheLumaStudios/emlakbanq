# Çok Dilli Destek Migration Rehberi

## 📋 Genel Bakış

Bu migration, EmlakBanq uygulamasına İngilizce ve Türkçe dil desteği ekler. Üç ana tablo güncellenir:
- `properties` (Mülkler)
- `areas` (Bölgeler)
- `blog_posts` (Blog Yazıları)

## 🗄️ Veritabanı Değişiklikleri

### Önceki Yapı
```sql
properties (
  name TEXT,
  description TEXT,
  location TEXT
)
```

### Yeni Yapı
```sql
properties (
  name_en TEXT,  -- İngilizce içerik
  name_tr TEXT,  -- Türkçe içerik
  description_en TEXT,
  description_tr TEXT,
  location_en TEXT,
  location_tr TEXT
)
```

## 🚀 Migration'ı Çalıştırma

### Seçenek 1: Supabase Dashboard Üzerinden

1. Supabase Dashboard'a gidin: https://app.supabase.com
2. Projenizi seçin
3. Sol menüden **SQL Editor**'ı açın
4. **New Query** butonuna tıklayın
5. `supabase/migrations/20260216000001_add_multilingual_support.sql` dosyasının içeriğini kopyalayıp yapıştırın
6. **Run** butonuna tıklayın

### Seçenek 2: Supabase CLI ile

```bash
# Supabase CLI'yi yükleyin (eğer yoksa)
npm install -g supabase

# Projeye bağlanın
supabase link --project-ref YOUR_PROJECT_REF

# Migration'ı çalıştırın
supabase db push
```

## ✅ Migration Sonrası Kontrol

Migration başarılı olduktan sonra aşağıdaki kontrolleri yapın:

```sql
-- 1. Sütunların eklendiğini kontrol edin
SELECT column_name
FROM information_schema.columns
WHERE table_name = 'properties'
  AND column_name LIKE '%_en' OR column_name LIKE '%_tr';

-- 2. Veri kopyalandığını kontrol edin
SELECT name_en, name_tr, description_en, description_tr
FROM properties
LIMIT 5;
```

## 📝 Admin Panel Güncellemeleri

Migration'dan sonra admin panelinde içerik girerken her alan için İngilizce ve Türkçe versiyonları girebilirsiniz:

### Mülk Ekleme/Düzenleme
- **İsim (EN)**: Property name in English
- **İsim (TR)**: Türkçe mülk adı
- **Açıklama (EN)**: English description
- **Açıklama (TR)**: Türkçe açıklama

### Bölge Ekleme/Düzenleme
- **İsim (EN)**: Area name in English
- **İsim (TR)**: Türkçe bölge adı
- **Hakkında (EN)**: About section in English
- **Hakkında (TR)**: Türkçe hakkında bölümü

### Blog Yazısı Ekleme/Düzenleme
- **Başlık (EN)**: Title in English
- **Başlık (TR)**: Türkçe başlık
- **İçerik (EN)**: Content in English
- **İçerik (TR)**: Türkçe içerik

## 🔄 Mevcut İçeriklerin Çevirilmesi

Migration çalıştırıldığında, mevcut İngilizce içerik otomatik olarak hem `_en` hem de `_tr` sütunlarına kopyalanır.

**ÖNEMLI:** Türkçe çevirileri admin panelden manuel olarak güncellemeniz gerekir:

1. Admin panele giriş yapın
2. Properties / Areas / Blog bölümüne gidin
3. Her kaydı düzenleyin
4. Türkçe alanları doldurun
5. Kaydedin

## 🌐 Frontend'de Dil Değişimi

Uygulama artık otomatik olarak kullanıcının seçtiği dile göre içeriği gösterir:

- Header'daki dil seçiciden Türkçe/English seçimi yapılır
- Hook'lar (`useProperties`, `useAreas`, `useBlogPosts`) mevcut dili tespit eder
- Veritabanından uygun dildeki sütunlar çekilir
- Component'ler dil-agnostik olarak çalışır (her zaman `name`, `description` kullanır)

## 🔧 Teknik Detaylar

### Hook'lar
Her hook, `i18n.language` değerine göre doğru sütunları map eder:

```javascript
// Örnek: useProperties.js
const lang = i18n.language
const suffix = lang === 'tr' ? '_tr' : '_en'

return {
  ...property,
  name: property[`name${suffix}`],  // name_tr veya name_en
  description: property[`description${suffix}`]
}
```

### Fallback Mekanizması
Eğer Türkçe çeviri yoksa, otomatik olarak İngilizce içerik gösterilir:

```javascript
name: property[`name${suffix}`] || property.name_en
```

## ⚠️ Dikkat Edilmesi Gerekenler

1. **Slug'lar dil-agnostiktir**: `slug` alanı her iki dil için aynı kalır
2. **Resimler paylaşımlıdır**: `image`, `thumbnail` gibi alanlar dil-bağımsızdır
3. **Numerik değerler paylaşımlıdır**: `price`, `sqft`, `beds`, `roi` gibi sayısal değerler dil-bağımsızdır
4. **Admin formları**: Her dil için ayrı input alanları kullanın

## 🔙 Rollback (Geri Alma)

Eğer migration'ı geri almak isterseniz:

```sql
-- Sütunları eski haline getir
ALTER TABLE properties RENAME COLUMN name_en TO name;
ALTER TABLE properties RENAME COLUMN description_en TO description;
ALTER TABLE properties DROP COLUMN name_tr;
ALTER TABLE properties DROP COLUMN description_tr;

-- Aynı işlemi areas ve blog_posts için tekrarlayın
```

## 📞 Destek

Migration sırasında sorun yaşarsanız:
1. SQL hatasını kontrol edin
2. Veritabanı yedeği aldığınızdan emin olun
3. Supabase dashboard'dan tablo yapısını kontrol edin
