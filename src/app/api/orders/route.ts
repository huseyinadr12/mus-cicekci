import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { OrderStatus } from "@/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const all = searchParams.get("all");

  if (all === "true") {
    const orders = await db.getAllOrders();
    const metrics = await db.getDashboardMetrics();
    return NextResponse.json({ orders, metrics });
  }

  if (!code) {
    return NextResponse.json(
      { error: "Sipariş kodu veya telefon numarası gereklidir." },
      { status: 400 }
    );
  }

  const order = await db.getOrderByIdOrNumber(code);
  if (!order) {
    return NextResponse.json(
      { error: "Belirtilen bilgilere uygun sipariş bulunamadı." },
      { status: 404 }
    );
  }

  return NextResponse.json({ order });
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { orderId, status } = body;

    if (!orderId || !status) {
      return NextResponse.json(
        { error: "Sipariş ID ve yeni durum zorunludur." },
        { status: 400 }
      );
    }

    const updated = await db.updateOrderStatus(orderId, status as OrderStatus);
    if (!updated) {
      return NextResponse.json(
        { error: "Sipariş bulunamadı." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, order: updated });
  } catch (error) {
    return NextResponse.json(
      { error: "Sipariş güncellenirken bir hata oluştu." },
      { status: 500 }
    );
  }
}
