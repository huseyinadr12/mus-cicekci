import { Suspense } from "react";
import CatalogContent from "@/components/commerce/CatalogContent";
export default function CatalogPage() { return <Suspense fallback={<div className="py-24 text-center">Çiçekler hazırlanıyor…</div>}><CatalogContent /></Suspense>; }
