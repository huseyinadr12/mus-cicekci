"use client";
import { EDITORIAL } from "@/lib/catalog";
import { motion,useReducedMotion,useScroll,useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function RosePassage() {
  const section = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: section, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const y = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);
  return <section ref={section} className="rose-passage" aria-label="Çiçeklerin detaylarında saklı duygular">
    <motion.div className="rose-passage-photo" style={{ scale: reducedMotion ? 1 : scale, y: reducedMotion ? 0 : y }}><Image src={EDITORIAL.rose} alt="Kadifemsi bir gülün yapraklarına yakın bakış" fill sizes="100vw" className="object-cover" /></motion.div>
    <div className="rose-passage-copy"><span className="editorial-eyebrow">KÜÇÜK BİR JEST. BÜYÜK BİR DUYGU.</span><p>Güzellik, <em>detaylarda saklı.</em></p></div>
  </section>;
}
