import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ADD_ON_ITEMS, DISTRICT_ZONES } from "@/lib/constants";
import { generateOrderNumber } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      customer,
      recipient,
      delivery,
      items,
      addOns,
      cardMessage,
      paymentMethod,
    } = body;

    if (!customer?.fullName || !customer?.phone) {
      return NextResponse.json(
        { error: "Gönderici bilgileri eksik." },
        { status: 400 }
      );
    }

    if (!recipient?.fullName || !recipient?.phone || !recipient?.address) {
      return NextResponse.json(
        { error: "Alıcı teslimat bilgileri eksik." },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Sepetinizde ürün bulunmuyor." },
        { status: 400 }
      );
    }

    // SERVER-SIDE RECALCULATION (Security Requirement #50)
    let calculatedSubtotal = 0;
    const verifiedItems = [];

    for (const item of items) {
      const product = await db.getProductById(item.productId);
      if (!product) {
        return NextResponse.json(
          { error: `Ürün bulunamadı: ${item.productId}` },
          { status: 400 }
        );
      }
      const itemQty = Math.max(1, Number(item.quantity) || 1);
      calculatedSubtotal += product.price * itemQty;
      verifiedItems.push({
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity: itemQty,
        image: product.images[0],
      });
    }

    const verifiedAddOns = [];
    if (addOns && Array.isArray(addOns)) {
      for (const addOn of addOns) {
        const found = ADD_ON_ITEMS.find((a) => a.id === addOn.addOnId);
        if (found) {
          const addQty = Math.max(1, Number(addOn.quantity) || 1);
          calculatedSubtotal += found.price * addQty;
          verifiedAddOns.push({
            addOnId: found.id,
            name: found.name,
            price: found.price,
            quantity: addQty,
          });
        }
      }
    }

    // Determine delivery fee from district
    const districtZone = DISTRICT_ZONES.find(
      (d) => d.name.toLowerCase() === (delivery?.district || "").toLowerCase()
    );
    const deliveryFee = districtZone ? districtZone.deliveryFee : 0;
    const finalTotal = calculatedSubtotal + deliveryFee;

    const orderNumber = generateOrderNumber();

    const order = await db.createOrder({
      orderNumber,
      status: "PENDING",
      customer,
      recipient,
      delivery: {
        date: delivery.date,
        timeSlot: delivery.timeSlot,
        district: delivery.district,
        fee: deliveryFee,
      },
      cardMessage,
      items: verifiedItems,
      addOns: verifiedAddOns,
      subtotal: calculatedSubtotal,
      deliveryFee,
      total: finalTotal,
      paymentMethod: paymentMethod || "CREDIT_CARD",
      paymentStatus: "PAID",
      notes: body.notes || "",
    });

    return NextResponse.json({
      success: true,
      orderNumber: order.orderNumber,
      orderId: order.id,
      total: order.total,
    });
  } catch (error) {
    console.error("Checkout processing error:", error);
    return NextResponse.json(
      { error: "Sipariş oluşturulurken bir hata meydana geldi." },
      { status: 500 }
    );
  }
}
