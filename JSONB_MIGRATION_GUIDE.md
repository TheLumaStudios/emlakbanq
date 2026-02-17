# JSONB-Based Multilingual Support

## 🌍 8 Dil Desteği

Sistem artık 8 dili destekliyor:
- 🇬🇧 English (en)
- 🇹🇷 Türkçe (tr)
- 🇸🇦 العربية (ar) - RTL
- 🇷🇺 Русский (ru)
- 🇩🇪 Deutsch (de)
- 🇫🇷 Français (fr)
- 🇮🇷 فارسی (fa) - RTL
- 🇮🇳 हिन्दी (hi)

## 📋 Migration Adımları

### 1. Eski Migration'ı Geri Al (Eğer çalıştırdıysanız)

Eğer `20260216000001_add_multilingual_support.sql` dosyasını çalıştırdıysanız, önce geri alın:

```sql
-- PROPERTIES
ALTER TABLE properties DROP COLUMN IF EXISTS name_en;
ALTER TABLE properties DROP COLUMN IF EXISTS name_tr;
ALTER TABLE properties DROP COLUMN IF EXISTS location_en;
ALTER TABLE properties DROP COLUMN IF EXISTS location_tr;
ALTER TABLE properties DROP COLUMN IF EXISTS type_label_en;
ALTER TABLE properties DROP COLUMN IF EXISTS type_label_tr;

-- AREAS
ALTER TABLE areas DROP COLUMN IF EXISTS name_en;
ALTER TABLE areas DROP COLUMN IF EXISTS name_tr;
ALTER TABLE areas DROP COLUMN IF EXISTS description_en;
ALTER TABLE areas DROP COLUMN IF EXISTS description_tr;
ALTER TABLE areas DROP COLUMN IF EXISTS description_long_en;
ALTER TABLE areas DROP COLUMN IF EXISTS description_long_tr;

-- BLOG_POSTS
ALTER TABLE blog_posts DROP COLUMN IF EXISTS title_en;
ALTER TABLE blog_posts DROP COLUMN IF EXISTS title_tr;
ALTER TABLE blog_posts DROP COLUMN IF EXISTS excerpt_en;
ALTER TABLE blog_posts DROP COLUMN IF EXISTS excerpt_tr;
ALTER TABLE blog_posts DROP COLUMN IF EXISTS content_en;
ALTER TABLE blog_posts DROP COLUMN IF EXISTS content_tr;
ALTER TABLE blog_posts DROP COLUMN IF EXISTS category_en;
ALTER TABLE blog_posts DROP COLUMN IF EXISTS category_tr;
```

### 2. Yeni JSONB Migration'ı Çalıştırın

Supabase Dashboard > SQL Editor'de şu dosyayı çalıştırın:
```
supabase/migrations/20260216000002_multilingual_jsonb.sql
```

Bu migration:
- ✅ Her translatable alan için JSONB sütunu oluşturur
- ✅ Mevcut TEXT verilerini JSONB'ye migrate eder
- ✅ Helper fonksiyonlar ekler (`get_translation`, `set_translation`)

### 3. Admin Formlarını Güncelleyin

#### PropertyForm.jsx

**Import ekleyin:**
```javascript
import MultilingualInput from '../../components/admin/MultilingualInput'
```

**INITIAL_STATE güncelleyin:**
```javascript
const INITIAL_STATE = {
  name: {},  // JSONB object
  slug: '',
  type: '',
  type_label: {},  // JSONB object
  location: {},    // JSONB object
  price: '',
  beds: '',
  sqft: '',
  developer: '',
  year: '',
  image: '',
  description: '',
  gallery: '',
  amenities: '',
  featured: false,
  sort_order: 0,
}
```

**handleChange fonksiyonunu güncelleyin:**
```javascript
const handleChange = (name, value) => {
  setFormData((prev) => {
    const updated = { ...prev, [name]: value }
    // Auto-generate slug from English name
    if (name === 'name' && value.en) {
      if (!prev.slug || prev.slug === generateSlug(prev.name?.en || '')) {
        updated.slug = generateSlug(value.en)
      }
    }
    return updated
  })
}
```

**Form alanlarını değiştirin:**
```jsx
{/* Name - All Languages */}
<MultilingualInput
  label="Property Name"
  name="name"
  value={formData.name}
  onChange={handleChange}
  required
  placeholder="e.g. Palm Residences Tower A"
  help="Property name in all supported languages"
/>

{/* Location - All Languages */}
<MultilingualInput
  label="Location"
  name="location"
  value={formData.location}
  onChange={handleChange}
  required
  placeholder="e.g. Dubai Marina"
/>

{/* Type Label - All Languages */}
<MultilingualInput
  label="Type Label"
  name="type_label"
  value={formData.type_label}
  onChange={handleChange}
  placeholder="e.g. Luxury Apartment"
  help="Display label shown on the property card"
/>
```

#### AreaForm.jsx

Aynı şekilde güncelleyin:
```jsx
<MultilingualInput
  label="Area Name"
  name="name"
  value={formData.name}
  onChange={handleChange}
  required
/>

<MultilingualInput
  label="Short Description"
  name="description"
  type="textarea"
  value={formData.description}
  onChange={handleChange}
  rows={3}
/>

<MultilingualInput
  label="Long Description"
  name="description_long"
  type="textarea"
  value={formData.description_long}
  onChange={handleChange}
  rows={6}
/>
```

#### BlogForm.jsx

```jsx
<MultilingualInput
  label="Title"
  name="title"
  value={formData.title}
  onChange={handleChange}
  required
/>

<MultilingualInput
  label="Excerpt"
  name="excerpt"
  type="textarea"
  value={formData.excerpt}
  onChange={handleChange}
  rows={3}
/>

<MultilingualInput
  label="Content"
  name="content"
  type="textarea"
  value={formData.content}
  onChange={handleChange}
  rows={12}
/>

<MultilingualInput
  label="Category"
  name="category"
  value={formData.category}
  onChange={handleChange}
/>
```

## 🎯 JSONB Veri Yapısı

### Database Format:
```json
{
  "en": "Luxury Villa in Dubai Marina",
  "tr": "Dubai Marina'da Lüks Villa",
  "ar": "فيلا فاخرة في دبي مارينا",
  "ru": "Роскошная вилла в Дубай Марина",
  "de": "Luxusvilla in Dubai Marina",
  "fr": "Villa de luxe à Dubai Marina",
  "fa": "ویلای لوکس در دبی مارینا",
  "hi": "दुबई मरीना में लक्जरी विला"
}
```

### Veri Ekleme Örneği:
```sql
INSERT INTO properties (name, location, price)
VALUES (
  '{"en": "Luxury Villa", "tr": "Lüks Villa", "ar": "فيلا فاخرة"}'::jsonb,
  '{"en": "Dubai Marina", "tr": "Dubai Marina"}'::jsonb,
  'AED 5M'
);
```

### Veri Çekme Örneği:
```sql
-- Türkçe içerik çek
SELECT
  get_translation(name, 'tr') as name_tr,
  get_translation(location, 'tr') as location_tr
FROM properties;

-- Arapça içerik çek
SELECT
  get_translation(name, 'ar') as name_ar,
  get_translation(location, 'ar') as location_ar
FROM properties;
```

## ✅ Avantajlar

1. **Esnek Yapı**: Yeni dil eklemek kolay
2. **Verimli Depolama**: 8 sütun yerine 1 JSONB sütunu
3. **Kolay Yönetim**: Admin panelde tab-based arayüz
4. **Otomatik Fallback**: Eğer bir dil yoksa İngilizce gösterir
5. **RTL Desteği**: Arapça ve Farsça için otomatik RTL

## 📱 Frontend Kullanımı

Hook'lar otomatik olarak mevcut dile göre çeviriyi çeker:

```javascript
const { data: properties } = useProperties()
// properties[0].name otomatik olarak mevcut dilde olacak

// Türkçe: "Lüks Villa"
// English: "Luxury Villa"
// العربية: "فيلا فاخرة"
```

## 🚀 Test

1. Migration'ı çalıştırın
2. Admin panele giriş yapın
3. Yeni bir property ekleyin
4. Tüm 8 dil için çevirileri doldurun
5. Frontend'de dil değiştirin
6. Her dilde doğru içerik görünmeli

## 💡 İpuçları

- **İngilizce her zaman doldurun**: Fallback olarak kullanılır
- **RTL dillerde dikkat edin**: Arapça ve Farsça otomatik RTL
- **Eksik çeviriler**: Admin panelde hangi dillerin eksik olduğu gösterilir
- **Toplu çeviri**: İleride Google Translate API eklenebilir
