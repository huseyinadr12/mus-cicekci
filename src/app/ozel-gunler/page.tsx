import Link from "next/link";
import EmotionSelector from "@/components/home/EmotionSelector";
import { EMOTION_OPTIONS } from "@/lib/constants";

export default function OccasionsPage() {
  return (
    <div className="py-12 bg-[#F8F5EF] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center gap-2 text-xs text-[#575A53] mb-2 uppercase tracking-widest font-medium">
          <Link href="/" className="hover:text-[#18392B]">
            Ana Sayfa
          </Link>
          <span>/</span>
          <span className="text-[#18392B] font-bold">Özel Günler</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#18392B]">
          ÖZEL GÜNLER & DUYGULAR
        </h1>
        <p className="mt-2 text-sm text-[#575A53] max-w-2xl">
          Hayatın en özel anlarını sevdiklerinizle kutlamak veya zor günlerinde yanlarında olmak için doğru çiçek seçimi.
        </p>
      </div>

      <EmotionSelector />
    </div>
  );
}
