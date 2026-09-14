import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get("all") === "true") return NextResponse.json({ error: "Yönetici girişi gereklidir." }, { status: 403 });
  const code = searchParams.get("code")?.trim() || "";
  const phone = searchParams.get("phone")?.replace(/\D/g, "") || "";
  if (!/^MUS-\d{5,}$/i.test(code) || !/^0?5\d{9}$/.test(phone)) return NextResponse.json({ error: "Sipariş numarası ve siparişte kullanılan telefon numarası gereklidir." }, { status: 400 });
  const order = await db.getOrderByIdOrNumber(code);
  if (!order || order.customer.phone.replace(/\D/g, "").replace(/^0/, "") !== phone.replace(/^0/, "")) return NextResponse.json({ error: "Girilen bilgilere uygun sipariş bulunamadı." }, { status: 404 });
  return NextResponse.json({ order }, { headers: { "Cache-Control": "private, no-store" } });
}
export async function PATCH() {
  return NextResponse.json({ error: "Sipariş güncellemek için yetkili yönetici girişi gereklidir." }, { status: 403 });
}
