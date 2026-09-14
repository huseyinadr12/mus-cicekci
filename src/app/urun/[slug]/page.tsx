import ProductDetailInteractive from "@/components/commerce/ProductDetailInteractive";
import { db } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await db.getProductBySlug(slug);

  if (!product) {
    return {
      title: "Çiçek Bulunamadı | Taşdemir Çiçek Atölyesi",
    };
  }

  return {
    title: `${product.name} | Muş Çiçek Siparişi`,
    description: `${product.name} - ${formatPrice(product.price)}. Muş içi aynı gün teslimat garantisiyle Taşdemir Çiçekçilik'ten sipariş verin.`,
    openGraph: {
      title: `${product.name} | Taşdemir Çiçek Atölyesi`,
      description: product.description,
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await db.getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Structured Data (JSON-LD) for Product & Offer
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.images.map((image) => new URL(image, "https://muscicekci.net").href),
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": "Taşdemir Çiçek Atölyesi - Taşdemir Çiçekçilik",
    },
    "offers": {
      "@type": "Offer",
      "url": `https://muscicekci.net/urun/${product.slug}`,
      "priceCurrency": "TRY",
      "price": product.price,
      "availability": product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      "itemCondition": "https://schema.org/NewCondition",
    },
  };

  return (
    <div className="py-10 bg-[#F8F5EF] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#575A53] mb-8 uppercase tracking-widest font-medium">
          <Link href="/" className="hover:text-[#18392B]">
            Ana Sayfa
          </Link>
          <span>/</span>
          <Link href={`/cicekler/${product.category}`} className="hover:text-[#18392B]">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-[#18392B] font-bold truncate max-w-xs sm:max-w-none">
            {product.name}
          </span>
        </div>

        {/* Product Interactive Studio */}
        <ProductDetailInteractive product={product} />
      </div>
    </div>
  );
}

export async function generateStaticParams() { return (await db.getProducts()).map(({ slug }) => ({ slug })); }
