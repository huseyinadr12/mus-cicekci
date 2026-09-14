"use client";
import { useEffect, useRef } from "react";

/** A short photographic/editorial entrance; content stays visible without JS. */
export default function SectionReveal({ children }: { children: React.ReactNode }) {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = container.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let animation: Animation | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      animation = element.animate([
        { opacity: 0.45, transform: "translateY(32px)" },
        { opacity: 1, transform: "translateY(0)" },
      ], { duration: 1100, easing: "cubic-bezier(.22,1,.36,1)" });
      observer.disconnect();
    }, { threshold: 0.08 });
    observer.observe(element);
    return () => { observer.disconnect(); animation?.cancel(); };
  }, []);
  return <div ref={container} className="section-reveal">{children}</div>;
}
