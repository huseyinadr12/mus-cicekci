# Uygulama ve kontrol notları

## Görseller ve geçişler

- Kaynak: https://www.muscicekci.net/ — 66 herkese açık sayfa tarandı; bulunan 120 görsel yerel olarak saklandı. 48 ürün ve 10 ek ürün/kart kataloğa aktarıldı. Kaynak adresleri ve dosya eşlemeleri `public/images/source/manifest.json` içinde kayıtlıdır. Arşivlenen eski afiş ve simgelerin tamamı yeni tasarımda gösterilmez.
- Üç özgün, fotoğraf gerçekliğinde editoryal görsel üretildi: buket, gül dokusu ve temsili buket hazırlama sahnesi. PNG asılları ve optimize WebP sürümleri `public/images/editorial/` içindedir. Ürün fotoğrafları kaynak sitenin gerçek ürün görselleridir.
- Sayfa adresi veya sorgu filtresi değiştiğinde 1800 ms gül dokulu geçiş katmanı çalışır. İlk açılışta ayrıca 3400 ms gül fotoğrafı ve Taşdemir marka sahnesi gösterilir; düğmeyle veya Escape ile atlanır. Sayfa geçişleri bağlantıları engellemez. Ana sayfa bölümleri görünür alana girerken 1100 ms yumuşak giriş kullanır.
- Fotoğraf düzlemlerinde perspektif ve kaydırma derinliği vardır; bunlar döndürülebilir üç boyutlu ürün modelleri değildir. Azaltılmış hareket tercihinde geçişler devre dışıdır.

## Düzeltilen akışlar

Türkçe arama ve bütçe araması, birlikte çalışan kategori/teslimat filtreleri, mobil menü, diyalog klavye odağı ve sepet düzenlendi. Farklı tarih veya kart mesajı içeren aynı ürünler ayrı sepet satırlarında tutulur. Hemen satın alma akışında sepet çekmecesi kapanır. Kaynaksız müşteri yorumları ve değerlendirme puanları kaldırıldı.

## Yayın öncesi gerekli entegrasyonlar

Gerçek ödeme sağlayıcısı bağlı değildir; ödeme uç noktası 503 döndürür ve kart bilgisi toplamaz. Yönetici kimlik doğrulaması tamamlanmadığından yönetim ve sipariş değiştirme uçları kapalıdır. Sipariş deposu hâlâ bellektedir; kalıcı veritabanı, gerçek stok, teslimat kapasitesi, ilçe ücretleri ve saatleri işletmeyle doğrulanarak bağlanmalıdır. Kaynak fiyatları içe aktarma anının verisidir; otomatik eşitleme yoktur. Bu sürüm canlı satışa hazır olarak değerlendirilmemelidir.

## Doğrulama

`npm run lint`, `npm run build` ve `npm run verify` çalıştırılır. Çalışan sunucuyla HTTP kontrolü için PowerShell'de `$env:PREVIEW_URL='http://localhost:3000'; npm run verify` kullanılır.

Kontrol betiği 48 ürünün ve 10 ek ürünün bütünlüğünü, 120 kaynak görselin okunabildiğini, Türkçe/bütçe aramasını, sepet satırı ayrımını ve toplamlarını denetler. Sunucu adresi verilirse 56 sayfa adresini, bulunamayan ürün görünümünü ve kapalı ödeme/yetkisiz sipariş işlemlerini de kontrol eder. Masaüstü ve 390 px mobil görünümde arama, menü, filtreleme, sepete ekleme ve ödeme sayfasına geçiş tarayıcıda kontrol edildi.

## Marka sunumu

Mevcut Taşdemir adı korunur. Çiçek Atölyesi açıklayıcı alt ifadedir; Muş konum olarak sunulur. İnce botanik amblem, harf aralığı geniş yazı logosu ve “Duygulara biçim veriyoruz.” ana mesajı kullanılır.
