# Muş Çiçekçi

Taşdemir Çiçekçilik için geliştirilen, Next.js tabanlı çiçek kataloğu ve e-ticaret arayüzü.

## Web önizlemesi

[GitHub Pages demosunu aç](https://huseyinadr12.github.io/mus-cicekci/)

Pages sürümü yalnızca tasarım önizlemesidir; gerçek sipariş, ödeme, kişisel bilgi toplama ve yönetici girişi içermez. `master` dalına gönderilen değişiklikler GitHub Actions üzerinden otomatik yayınlanır. Normal Next.js geliştirme sürümü korunur.

Statik derleme: `npm run build:pages`. Çıktı: `tmp/pages-build/out`. Kontrol: `node scripts/verify-pages.mjs`.

## Özellikler

- 48 ürün, 10 ek ürün/kart ve yerel olarak saklanan 120 kaynak görsel.
- Özgün fotoğraf gerçekliğinde editoryal görseller, perspektif derinliği ve gül dokulu sayfa geçişleri.
- Mobil uyumlu tasarım, Türkçe arama, bütçe araması, kategori ve teslimat filtreleri.
- Sepet, kart mesajı ve teslimat seçimi akışları.
- Klavye ile kullanılabilen diyaloglar ve azaltılmış hareket desteği.

## Kurulum

Node.js 20.9 veya üzeri gerekir.

```bash
npm ci
npm run dev
```

Önizleme: http://localhost:3000

```bash
npm run lint
npm run verify
npm run build
npm start
```

Çalışan sunucu üzerinde sayfa ve API kontrolleri için PowerShell:

```powershell
$env:PREVIEW_URL='http://localhost:3000'
npm run verify
```

## Mevcut durum

Bu sürüm geliştirme/önizleme aşamasındadır. PostgreSQL, yönetici kimlik doğrulaması ve iyzico entegrasyonu sonraki aşamalara bırakılmıştır. Siparişler için kalıcı veritabanı bağlı değildir. Gerçek ödeme ve yetkisiz sipariş değiştirme işlemleri kapalıdır; kart bilgisi toplanmaz. Canlı satış öncesinde bu entegrasyonlar ve işletmenin teslimat/stok bilgileri tamamlanmalıdır.

## Görseller

Kaynak ürün görselleri https://www.muscicekci.net/ adresinden aktarılmıştır. Kaynak eşlemeleri `public/images/source/manifest.json` içindedir. Özgün editoryal görseller `public/images/editorial/` altında bulunur. Ürün fotoğraflarının ve marka varlıklarının hakları ilgili sahiplerine aittir.

Teknik ayrıntılar ve doğrulama notları: [IMPLEMENTATION_NOTES.md](IMPLEMENTATION_NOTES.md).
