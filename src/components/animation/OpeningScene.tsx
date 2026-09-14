"use client";

import { useEffect, useState } from "react";
import BrandSignature from "@/components/BrandSignature";
import { BRAND } from "@/lib/brand";
import { assetUrl } from "@/lib/deployment";

export default function OpeningScene() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timer = window.setTimeout(() => setVisible(false), reduced.matches ? 0 : 3400);
    const dismiss = (event: KeyboardEvent) => { if (event.key === "Escape") setVisible(false); };
    window.addEventListener("keydown", dismiss);
    return () => { window.clearTimeout(timer); window.removeEventListener("keydown", dismiss); };
  }, []);
  if (!visible) return null;
  return <div className="opening-scene">
    <div className="opening-photograph" style={{ backgroundImage: `url("${assetUrl("/images/editorial/rose.webp")}")` }} aria-hidden="true" />
    <div className="opening-shade" aria-hidden="true" />
    <div className="opening-identity" aria-hidden="true"><span className="opening-origin">{BRAND.origin}</span><BrandSignature /><span className="opening-rule" /><p>{BRAND.signature}</p></div>
    <button type="button" className="opening-skip" onClick={() => setVisible(false)}>Keşfetmeye başla <span aria-hidden="true">↗</span></button>
    <span className="opening-footnote" aria-hidden="true">ÇİÇEKLERLE ANLATILAN HİKÂYELER</span>
  </div>;
}
