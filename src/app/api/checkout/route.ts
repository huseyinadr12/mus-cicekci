import { NextResponse } from "next/server";

// Fail closed until a persistent order store and verified provider webhook exist.
// A client request must never be sufficient to mark an order as paid.
export async function POST() {
  return NextResponse.json({ error: "Online ödeme henüz aktif değil. Siparişinizi telefon veya WhatsApp üzerinden tamamlayabilirsiniz." }, { status: 503 });
}
