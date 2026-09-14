"use client";
import { motion,useMotionValue,useReducedMotion,useSpring } from "framer-motion";
import Image from "next/image";
import type { PointerEvent } from "react";

export default function DepthImage({ src, alt, className = "", priority = false, contain = false }: {
  src: string; alt: string; className?: string; priority?: boolean; contain?: boolean;
}) {
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 90, damping: 25 });
  const rotateY = useSpring(y, { stiffness: 90, damping: 25 });
  function move(event: PointerEvent<HTMLDivElement>) {
    if (reducedMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set(-((event.clientY - bounds.top) / bounds.height - 0.5) * 3);
    y.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 3);
  }
  return <div className={`depth-image ${className}`} onPointerMove={move} onPointerLeave={() => { x.set(0); y.set(0); }}>
    <motion.div className="depth-image-plane" style={{ rotateX: reducedMotion ? 0 : rotateX, rotateY: reducedMotion ? 0 : rotateY }}>
      <Image src={src} alt={alt} fill priority={priority} sizes="(max-width: 768px) 100vw, 60vw" className={contain ? "object-contain" : "object-cover"} />
    </motion.div>
  </div>;
}
