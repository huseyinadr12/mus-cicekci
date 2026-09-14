"use client";
import { usePathname,useSearchParams } from "next/navigation";
import { useEffect,useRef } from "react";

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
    // Never intercept or delay navigation; support back/forward and query filters.
    const animation = veil.current?.animate([
      { opacity: 0.88, transform: "scale(1.04)", clipPath: "ellipse(130% 130% at 72% 45%)" },
      { opacity: 0.65, transform: "scale(1.12)", clipPath: "ellipse(75% 110% at 100% 35%)", offset: 0.32 },
      { opacity: 0, transform: "scale(1.18)", clipPath: "ellipse(0% 60% at 110% 20%)" },
    ], { duration: 620, easing: "cubic-bezier(.22,1,.36,1)" });
    return () => animation?.cancel();
  }, [routeKey]);
  return <><div key={routeKey} className="route-scene">{children}</div><div ref={veil} className="route-petal-veil" aria-hidden="true" /></>;
}
