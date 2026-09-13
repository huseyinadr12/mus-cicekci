import { Star, ShieldCheck } from "lucide-react";
import { CUSTOMER_REVIEWS } from "@/lib/constants";

export default function CustomerReviewsSection() {
  return (
    <section className="py-24 bg-[#FFFDFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#6F2232]">
            Muşlu Müşterilerimiz
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#18392B] mt-2">
            BİNLERCE ANIN BİR PARÇASI.
          </h2>
          <p className="mt-3 text-sm text-[#575A53]">
            2017&apos;den bugüne Muş&apos;ta binlerce tebessüme, kutlamaya ve kavuşmaya eşlik ettik.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CUSTOMER_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="p-6 rounded-2xl bg-[#F8F5EF] border border-[#A9B8A5]/25 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-xs text-[#20221F] leading-relaxed italic">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-[#A9B8A5]/20">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-sm text-[#18392B]">
                    {review.authorName}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] text-[#365B45] font-semibold">
                    <ShieldCheck className="w-3 h-3" /> Doğrulanmış
                  </span>
                </div>
                <p className="text-[11px] text-[#575A53] mt-0.5">
                  {review.productName} • {review.city}
                </p>
                <span className="text-[10px] text-[#A9B8A5] block mt-1">
                  {review.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
