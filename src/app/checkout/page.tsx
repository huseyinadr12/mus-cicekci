"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import {
  Truck,
  User,
  Heart,
  CreditCard,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Clock,
  Sparkles,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";
import { useCartStore } from "@/lib/store";
import { DISTRICT_ZONES, DELIVERY_SLOTS, BUSINESS_INFO } from "@/lib/constants";
import {
  formatPrice,
  getTodayDateString,
  getTomorrowDateString,
  formatDateTurkish,
} from "@/lib/utils";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart, getSubtotal } = useCartStore();

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrderNumber, setCompletedOrderNumber] = useState<string | null>(null);

  // Delivery Step Data
  const today = getTodayDateString();
  const [deliveryDate, setDeliveryDate] = useState(today);
  const [district, setDistrict] = useState(DISTRICT_ZONES[0].name);
  const [timeSlot, setTimeSlot] = useState(DELIVERY_SLOTS[1].label);

  // Recipient Step Data
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [callBeforeDelivery, setCallBeforeDelivery] = useState(true);

  // Card Message Step Data
  const [cardMessage, setCardMessage] = useState(
    items[0]?.cardMessage?.message || ""
  );
  const [cardSignature, setCardSignature] = useState(
    items[0]?.cardMessage?.senderSignature || ""
  );
  const [isAnonymous, setIsAnonymous] = useState(
    items[0]?.cardMessage?.isAnonymous || false
  );

  // Sender Step Data
  const [senderName, setSenderName] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [senderEmail, setSenderEmail] = useState("");

  // Payment Step Data
  const [paymentMethod, setPaymentMethod] = useState<"CREDIT_CARD" | "HAVALE_EFT">(
    "CREDIT_CARD"
  );
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardHolder, setCardHolder] = useState("");

  const subtotal = getSubtotal();
  const districtZone = DISTRICT_ZONES.find((d) => d.name === district);
  const deliveryFee = districtZone ? districtZone.deliveryFee : 0;
  const grandTotal = subtotal + deliveryFee;

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 5) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      handleFinalSubmit();
    }
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        customer: {
          fullName: senderName || "Misafir Müşteri",
          phone: senderPhone || "05440000000",
          email: senderEmail || "musteri@muscicekci.net",
        },
        recipient: {
          fullName: recipientName,
          phone: recipientPhone,
          district: district,
          address: recipientAddress,
          callBeforeDelivery,
        },
        delivery: {
          date: deliveryDate,
          timeSlot: timeSlot,
          district: district,
        },
        cardMessage: {
          message: cardMessage,
          senderSignature: isAnonymous ? "Bir Dost (İsimsiz)" : cardSignature || senderName,
          isAnonymous,
        },
        items: items.map((i) => ({
          productId: i.product.id,
          quantity: i.quantity,
        })),
        addOns: items.flatMap((i) =>
          (i.addOns || []).map((a) => ({
            addOnId: a.item.id,
            quantity: a.quantity,
          }))
        ),
        paymentMethod,
      };

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setCompletedOrderNumber(data.orderNumber);
        setStep(6);
        clearCart();
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#18392B", "#6F2232", "#E7B9A5", "#A9B8A5"],
        });
      } else {
        alert(data.error || "Sipariş verilirken bir hata oluştu.");
      }
    } catch (err) {
      console.error(err);
      alert("Bağlantı hatası oluştu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0 && step !== 6) {
    return (
      <div className="py-24 max-w-xl mx-auto text-center px-4">
        <h2 className="font-serif text-2xl text-[#18392B] font-bold">
          Sepetinizde ürün bulunmamaktadır.
        </h2>
        <p className="text-xs text-[#575A53] mt-2 mb-6">
          Sipariş verebilmek için lütfen önce çiçek seçimi yapınız.
        </p>
        <Link
          href="/cicekler"
          className="inline-block px-6 py-3 bg-[#18392B] text-white text-xs uppercase tracking-widest font-bold rounded-full"
        >
          Çiçekleri Keşfet
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 bg-[#F8F5EF] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar Steps (Rule #20) */}
        {step < 6 && (
          <div className="mb-10">
            <div className="flex items-center justify-between max-w-2xl mx-auto relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-full bg-[#A9B8A5]/30 -z-0" />
              {[
                { s: 1, label: "Teslimat" },
                { s: 2, label: "Alıcı" },
                { s: 3, label: "Kart Notu" },
                { s: 4, label: "Gönderici" },
                { s: 5, label: "Ödeme" },
              ].map((item) => {
                const isPassed = step >= item.s;
                const isCurrent = step === item.s;
                return (
                  <div
                    key={item.s}
                    className="relative z-10 flex flex-col items-center"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isCurrent
                          ? "bg-[#18392B] text-white scale-110 shadow-md ring-4 ring-[#18392B]/20"
                          : isPassed
                          ? "bg-[#365B45] text-white"
                          : "bg-[#FFFDFC] text-[#575A53] border border-[#A9B8A5]/40"
                      }`}
                    >
                      {item.s}
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#575A53] mt-1.5 hidden sm:block">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 6: CONFIRMATION SUCCESS */}
        {step === 6 ? (
          <div className="max-w-2xl mx-auto bg-[#FFFDFC] p-8 sm:p-12 rounded-3xl border border-[#A9B8A5]/30 shadow-md text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#365B45]/15 flex items-center justify-center text-[#365B45]">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#365B45] block mb-1">
                Siparişiniz Başarıyla Alındı!
              </span>
              <h2 className="font-serif text-3xl text-[#18392B] font-medium">
                Duygularınız Güvenli Ellerde.
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-[#F8F5EF] border border-[#A9B8A5]/30 max-w-sm mx-auto">
              <span className="text-xs text-[#575A53] block">Takip Kodunuz:</span>
              <span className="font-serif text-2xl font-bold text-[#6F2232] tracking-wider block mt-0.5">
                {completedOrderNumber}
              </span>
            </div>

            <p className="text-xs text-[#575A53] max-w-md mx-auto leading-relaxed">
              Çiçekleriniz Taşdemir Çiçekçilik atölyemizde özenle hazırlanacak ve
              seçtiğiniz zaman diliminde alıcısına teslim edilecektir.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Link
                href={`/siparis-takip?code=${completedOrderNumber}`}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#18392B] hover:bg-[#365B45] text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all shadow-md"
              >
                Siparişimi Takip Et
              </Link>
              <a
                href={`https://api.whatsapp.com/send?phone=${BUSINESS_INFO.whatsapp}&text=${encodeURIComponent(
                  `Merhaba, ${completedOrderNumber} numaralı siparişim hakkında bilgi almak istiyorum.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Onayı Al</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Form Section */}
            <div className="lg:col-span-7 bg-[#FFFDFC] p-6 sm:p-8 rounded-3xl border border-[#A9B8A5]/25 shadow-xs">
              <form onSubmit={handleNextStep} className="space-y-6">
                {/* STEP 1: DELIVERY */}
                {step === 1 && (
                  <div className="space-y-5 animate-in fade-in duration-300">
                    <div>
                      <h3 className="font-serif text-2xl text-[#18392B] font-light">
                        Teslimat Zamanı & Bölgesi
                      </h3>
                      <p className="text-xs text-[#575A53]">
                        Çiçeğinizin ne zaman ve nereye ulaştırılacağını belirleyin.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setDeliveryDate(today)}
                        className={`p-3 rounded-xl text-left border text-xs cursor-pointer ${
                          deliveryDate === today
                            ? "border-[#18392B] bg-[#18392B] text-white"
                            : "border-[#A9B8A5]/30 bg-[#F8F5EF] text-[#20221F]"
                        }`}
                      >
                        <span className="font-bold block">Bugün</span>
                        <span className="text-[10px] opacity-80">
                          {formatDateTurkish(today)}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeliveryDate(getTomorrowDateString())}
                        className={`p-3 rounded-xl text-left border text-xs cursor-pointer ${
                          deliveryDate === getTomorrowDateString()
                            ? "border-[#18392B] bg-[#18392B] text-white"
                            : "border-[#A9B8A5]/30 bg-[#F8F5EF] text-[#20221F]"
                        }`}
                      >
                        <span className="font-bold block">Yarın</span>
                        <span className="text-[10px] opacity-80">
                          {formatDateTurkish(getTomorrowDateString())}
                        </span>
                      </button>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#20221F] block mb-1">
                        Muş İlçesi
                      </label>
                      <select
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="w-full text-xs p-3 rounded-lg border border-[#A9B8A5]/40 bg-[#F8F5EF]"
                      >
                        {DISTRICT_ZONES.map((d) => (
                          <option key={d.id} value={d.name}>
                            {d.name} {d.deliveryFee === 0 ? "(Ücretsiz)" : `(+${d.deliveryFee} TL)`}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#20221F] block mb-1">
                        Teslimat Zaman Aralığı
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {DELIVERY_SLOTS.map((s) => (
                          <button
                            type="button"
                            key={s.id}
                            onClick={() => setTimeSlot(s.label)}
                            className={`p-2.5 rounded-lg border text-xs text-left cursor-pointer ${
                              timeSlot === s.label
                                ? "border-[#18392B] bg-[#18392B]/10 font-bold text-[#18392B]"
                                : "border-[#A9B8A5]/30 bg-[#F8F5EF]"
                            }`}
                          >
                            <span>{s.startTime} – {s.endTime}</span>
                            <span className="block text-[10px] text-[#575A53] font-normal">
                              {s.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: RECIPIENT */}
                {step === 2 && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div>
                      <h3 className="font-serif text-2xl text-[#18392B] font-light">
                        Alıcı Bilgileri
                      </h3>
                      <p className="text-xs text-[#575A53]">
                        Çiçeğin teslim edileceği kişi ve tam açık adres.
                      </p>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#20221F] block mb-1">
                        Alıcının Adı Soyadı *
                      </label>
                      <input
                        required
                        type="text"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        placeholder="Örn: Ayşe Kaya"
                        className="w-full text-xs p-3 rounded-lg border border-[#A9B8A5]/40 bg-[#F8F5EF] focus:outline-none focus:border-[#18392B]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#20221F] block mb-1">
                        Alıcının Telefon Numarası *
                      </label>
                      <input
                        required
                        type="tel"
                        value={recipientPhone}
                        onChange={(e) => setRecipientPhone(e.target.value)}
                        placeholder="05XX XXX XX XX"
                        className="w-full text-xs p-3 rounded-lg border border-[#A9B8A5]/40 bg-[#F8F5EF] focus:outline-none focus:border-[#18392B]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#20221F] block mb-1">
                        Açık Teslimat Adresi (Ev, İşyeri, Hastane, vb.) *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={recipientAddress}
                        onChange={(e) => setRecipientAddress(e.target.value)}
                        placeholder="Mahalle, cadde, sokak, bina no, daire no veya kurum/kat bilgisi..."
                        className="w-full text-xs p-3 rounded-lg border border-[#A9B8A5]/40 bg-[#F8F5EF] focus:outline-none focus:border-[#18392B]"
                      />
                    </div>

                    <label className="flex items-center gap-2 text-xs text-[#575A53] pt-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={callBeforeDelivery}
                        onChange={(e) => setCallBeforeDelivery(e.target.checked)}
                        className="w-4 h-4 rounded text-[#18392B]"
                      />
                      <span>Alıcıyı teslimattan önce telefonla arayabilirsiniz.</span>
                    </label>
                  </div>
                )}

                {/* STEP 3: CARD MESSAGE */}
                {step === 3 && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div>
                      <h3 className="font-serif text-2xl text-[#18392B] font-light">
                        Kart Notu & İmza
                      </h3>
                      <p className="text-xs text-[#575A53]">
                        Buketin yanında gidecek özel tasarım kart mesajınız.
                      </p>
                    </div>

                    <textarea
                      rows={4}
                      value={cardMessage}
                      onChange={(e) => setCardMessage(e.target.value)}
                      placeholder="Duygularınızı kaleme alın..."
                      className="w-full text-xs p-3 rounded-lg border border-[#A9B8A5]/40 bg-[#F8F5EF] focus:outline-none"
                    />

                    {/* Live Card Preview */}
                    {cardMessage && (
                      <div className="p-4 rounded-xl bg-[#FFFBF0] border border-[#E7B9A5] text-center italic font-serif text-xs text-[#20221F]">
                        &ldquo;{cardMessage}&rdquo;
                        <span className="block mt-2 text-right font-sans not-italic text-[11px] font-bold text-[#6F2232]">
                          {isAnonymous ? "— Bir Dost" : cardSignature || "— Adınız"}
                        </span>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="text"
                        value={cardSignature}
                        disabled={isAnonymous}
                        onChange={(e) => setCardSignature(e.target.value)}
                        placeholder="Kart İmzası (Örn: Caner)"
                        className="text-xs p-3 rounded-lg border border-[#A9B8A5]/40 bg-[#F8F5EF] flex-1 disabled:opacity-40"
                      />

                      <label className="flex items-center gap-2 text-xs text-[#575A53] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isAnonymous}
                          onChange={(e) => setIsAnonymous(e.target.checked)}
                          className="w-4 h-4 rounded text-[#18392B]"
                        />
                        <span>İsimsiz Gönder</span>
                      </label>
                    </div>
                  </div>
                )}

                {/* STEP 4: SENDER DETAILS */}
                {step === 4 && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div>
                      <h3 className="font-serif text-2xl text-[#18392B] font-light">
                        Gönderici Bilgileri
                      </h3>
                      <p className="text-xs text-[#575A53]">
                        Sipariş durumu ve teslimat SMS bildirimleri için bilgileriniz.
                      </p>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#20221F] block mb-1">
                        Adınız Soyadınız *
                      </label>
                      <input
                        required
                        type="text"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder="Örn: Mehmet Demir"
                        className="w-full text-xs p-3 rounded-lg border border-[#A9B8A5]/40 bg-[#F8F5EF]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#20221F] block mb-1">
                        Telefon Numaranız *
                      </label>
                      <input
                        required
                        type="tel"
                        value={senderPhone}
                        onChange={(e) => setSenderPhone(e.target.value)}
                        placeholder="05XX XXX XX XX"
                        className="w-full text-xs p-3 rounded-lg border border-[#A9B8A5]/40 bg-[#F8F5EF]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#20221F] block mb-1">
                        E-posta Adresiniz (Makbuz için)
                      </label>
                      <input
                        type="email"
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                        placeholder="ornek@mail.com"
                        className="w-full text-xs p-3 rounded-lg border border-[#A9B8A5]/40 bg-[#F8F5EF]"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 5: PAYMENT */}
                {step === 5 && (
                  <div className="space-y-5 animate-in fade-in duration-300">
                    <div>
                      <h3 className="font-serif text-2xl text-[#18392B] font-light">
                        Güvenli Ödeme
                      </h3>
                      <p className="text-xs text-[#575A53]">
                        256-Bit SSL ile şifrelenmiş güvenli ödeme ekranı.
                      </p>
                    </div>

                    {/* Method Toggle */}
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("CREDIT_CARD")}
                        className={`p-3.5 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                          paymentMethod === "CREDIT_CARD"
                            ? "border-[#18392B] bg-[#18392B] text-white"
                            : "border-[#A9B8A5]/30 bg-[#F8F5EF] text-[#20221F]"
                        }`}
                      >
                        Kredi / Banka Kartı (3D Secure)
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("HAVALE_EFT")}
                        className={`p-3.5 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                          paymentMethod === "HAVALE_EFT"
                            ? "border-[#18392B] bg-[#18392B] text-white"
                            : "border-[#A9B8A5]/30 bg-[#F8F5EF] text-[#20221F]"
                        }`}
                      >
                        Havale / EFT
                      </button>
                    </div>

                    {paymentMethod === "CREDIT_CARD" ? (
                      <div className="space-y-3 p-4 rounded-xl bg-[#F8F5EF] border border-[#A9B8A5]/25">
                        <div>
                          <label className="text-[11px] font-semibold text-[#575A53] uppercase block mb-1">
                            Kart Numarası
                          </label>
                          <input
                            type="text"
                            required
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="4543 •••• •••• ••••"
                            className="w-full text-xs p-2.5 rounded-lg border border-[#A9B8A5]/40 bg-white"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[11px] font-semibold text-[#575A53] uppercase block mb-1">
                              Son Kullanma Tarihi
                            </label>
                            <input
                              type="text"
                              required
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              placeholder="AA/YY"
                              className="w-full text-xs p-2.5 rounded-lg border border-[#A9B8A5]/40 bg-white"
                            />
                          </div>

                          <div>
                            <label className="text-[11px] font-semibold text-[#575A53] uppercase block mb-1">
                              CVV Güvenlik Kodu
                            </label>
                            <input
                              type="password"
                              required
                              maxLength={3}
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                              placeholder="•••"
                              className="w-full text-xs p-2.5 rounded-lg border border-[#A9B8A5]/40 bg-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[11px] font-semibold text-[#575A53] uppercase block mb-1">
                            Kart Üzerindeki İsim
                          </label>
                          <input
                            type="text"
                            required
                            value={cardHolder}
                            onChange={(e) => setCardHolder(e.target.value)}
                            placeholder="Kart Sahibi"
                            className="w-full text-xs p-2.5 rounded-lg border border-[#A9B8A5]/40 bg-white"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl bg-[#F8F5EF] border border-[#A9B8A5]/30 text-xs space-y-2">
                        <span className="font-bold text-[#18392B] block">
                          {BUSINESS_INFO.bankName}
                        </span>
                        <p className="text-[11px] text-[#575A53]">
                          Hesap Sahibi: {BUSINESS_INFO.accountHolder}
                        </p>
                        <p className="font-mono text-xs font-bold text-[#6F2232]">
                          IBAN: {BUSINESS_INFO.iban}
                        </p>
                        <p className="text-[10px] text-[#575A53]">
                          * Siparişiniz verildikten sonra dekontu WhatsApp hattımıza iletebilirsiniz.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Step Navigation Buttons */}
                <div className="pt-6 border-t border-[#A9B8A5]/25 flex items-center justify-between">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="inline-flex items-center gap-1.5 text-xs text-[#575A53] hover:text-[#18392B] font-semibold uppercase tracking-wider cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Geri
                    </button>
                  ) : (
                    <div />
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#18392B] hover:bg-[#365B45] text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-md transition-all cursor-pointer disabled:opacity-50"
                  >
                    <span>
                      {isSubmitting
                        ? "İşleniyor..."
                        : step === 5
                        ? "Siparişi Onayla & Öde"
                        : "Devam Et"}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-[#FFFDFC] p-6 rounded-3xl border border-[#A9B8A5]/25 shadow-xs space-y-4">
                <h4 className="font-serif text-lg font-bold text-[#18392B] border-b border-[#A9B8A5]/20 pb-3">
                  Sipariş Özeti
                </h4>

                <div className="space-y-3 max-h-72 overflow-y-auto divide-y divide-[#A9B8A5]/15 pr-1">
                  {items.map((item) => (
                    <div key={item.id} className="pt-3 first:pt-0 flex gap-3">
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-[#EFE9DE]">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-bold text-[#20221F] truncate">
                          {item.product.name}
                        </h5>
                        <p className="text-[11px] text-[#575A53]">
                          {item.quantity} Adet • {formatPrice(item.product.price)}
                        </p>
                        {item.addOns && item.addOns.length > 0 && (
                          <p className="text-[10px] text-[#365B45]">
                            +{item.addOns.length} Hediye Eklendi
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#A9B8A5]/20 space-y-2 text-xs text-[#575A53]">
                  <div className="flex justify-between">
                    <span>Ara Toplam:</span>
                    <span className="font-semibold text-[#20221F]">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Teslimat ({district}):</span>
                    <span className="font-semibold text-[#365B45]">
                      {deliveryFee === 0 ? "Ücretsiz" : formatPrice(deliveryFee)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[#A9B8A5]/20 text-sm font-bold text-[#18392B]">
                    <span>Ödenecek Tutar:</span>
                    <span className="text-lg text-[#18392B]">
                      {formatPrice(grandTotal)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="p-4 rounded-2xl bg-[#18392B]/5 border border-[#18392B]/10 flex items-center gap-3 text-xs text-[#18392B]">
                <ShieldCheck className="w-6 h-6 shrink-0 text-[#365B45]" />
                <div>
                  <span className="font-bold block">Güvenli Sipariş</span>
                  <span className="text-[10px] text-[#575A53]">
                    Verileriniz 256-Bit SSL şifreleme ile korunmaktadır.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
