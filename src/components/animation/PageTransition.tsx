"use client";
import { usePathname,useSearchParams } from "next/navigation";
import { assetUrl } from "@/lib/deployment";
import { useEffect,useRef } from "react";
import { BRAND } from "@/lib/brand";

function destinationTitle(pathname: string) {
  if (pathname.startsWith("/urun/")) return "Bir çiçeğin hikâyesi";
  if (pathname.startsWith("/cicekler")) return "Atölyenin seçkisi";
  if (pathname.startsWith("/ozel-gunler")) return "Hatırlanmaya değer anlar";
  if (pathname.startsWith("/hakkimizda")) return "Bizim hikâyemiz";
  if (pathname.startsWith("/iletisim")) return "Atölyeye bir merhaba";
  return BRAND.signature;
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const routeKey = `${pathname}?${searchParams.toString()}`;
  const previousRoute = useRef(routeKey);
  const veil = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (previousRoute.current === routeKey) return;
    previousRoute.current = routeKey;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const layer = veil.current;
    if (!layer) return;
    layer.dataset.motion = "running";
    // Never intercept or delay navigation; support back/forward and query filters.
    const animation = layer.animate([
      { opacity: 0, transform: "translateY(0)", clipPath: "inset(0 0 0 0)" },
      { opacity: 1, transform: "translateY(0)", clipPath: "inset(0 0 0 0)", offset: 0.12 },
      { opacity: 1, transform: "translateY(0)", clipPath: "inset(0 0 0 0)", offset: 0.58 },
      { opacity: 0, transform: "translateY(-5%)", clipPath: "inset(0 0 100% 0)" },
    ], { duration: 1800, easing: "cubic-bezier(.45,0,.2,1)" });
    animation.onfinish = () => { layer.dataset.motion = "finished"; };
    return () => { animation.cancel(); layer.dataset.motion = "idle"; };
  }, [routeKey]);
  return <><div key={routeKey} className="route-scene">{children}</div><div ref={veil} className="route-petal-veil" style={{ backgroundImage: `url("${assetUrl("/images/editorial/rose.webp")}")` }} aria-hidden="true"><div className="passage-identity"><span>{BRAND.name} · {BRAND.descriptor}</span><p>{destinationTitle(pathname)}</p><i /></div></div></>;
}
