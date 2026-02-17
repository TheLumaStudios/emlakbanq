-- Mevcut tablo yapısını kontrol etmek için bu sorguları çalıştırın

-- PROPERTIES tablosunun sütunlarını listele
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'properties'
ORDER BY ordinal_position;

-- AREAS tablosunun sütunlarını listele
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'areas'
ORDER BY ordinal_position;

-- BLOG_POSTS tablosunun sütunlarını listele
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'blog_posts'
ORDER BY ordinal_position;
