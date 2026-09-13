"use client";

import { MessageCircle } from "lucide-react";
import { BUSINESS_INFO } from "@/lib/constants";

export default function WhatsAppFloatingBtn() {
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${BUSINESS_INFO.whatsapp}&text=${encodeURIComponent(
    "Merhaba Muş Çiçekçi, siparişim / çiçek çeşitleri hakkında bilgi almak istiyorum."
  )}`;

  return (
    <aside aria-label="WhatsApp Canlı Destek" className="fixed bottom-6 right-6 z-40">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2.5 bg-[#18392B] hover:bg-[#365B45] text-white px-4 py-3 rounded-full shadow-lg border border-[#A9B8A5]/30 transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="WhatsApp Canlı Destek"
      >
        <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-inner">
          <MessageCircle className="w-4 h-4 fill-white" />
        </div>
        <span className="text-xs font-semibold tracking-wide hidden sm:inline-block pr-1">
          Muş Çiçekçi Canlı Destek
        </span>
      </a>
    </aside>
  );
}
