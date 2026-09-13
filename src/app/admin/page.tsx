"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  TrendingUp,
  ShoppingBag,
  Clock,
  Truck,
  CheckCircle2,
  RefreshCw,
  Eye,
  Sliders,
  DollarSign,
  Package,
} from "lucide-react";
import { Order, OrderStatus } from "@/types";
import { formatPrice } from "@/lib/utils";

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [metrics, setMetrics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/orders?all=true");
      const data = await res.json();
      setOrders(data.orders || []);
      setMetrics(data.metrics || null);
    } catch (err) {
      console.error("Admin fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: newStatus }),
      });
      if (res.ok) {
        await fetchOrders();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="py-10 bg-[#F8F5EF] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#A9B8A5]/30 gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-widest font-bold text-[#6F2232]">
              Taşdemir Çiçekçilik Yönetim
            </span>
            <h1 className="font-serif text-3xl font-bold text-[#18392B]">
              Yönetici Paneli (Admin)
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchOrders}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#FFFDFC] hover:bg-[#EFE9DE] text-[#18392B] border border-[#A9B8A5]/40 rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
              Yenile
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#18392B] hover:bg-[#365B45] text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
            >
              Mağazayı Gör
            </Link>
          </div>
        </div>

        {/* Metric Cards (Rule #39) */}
        {metrics && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-[#FFFDFC] p-5 rounded-2xl border border-[#A9B8A5]/25 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#575A53] font-medium">Toplam Ciro</span>
                <DollarSign className="w-4 h-4 text-emerald-700" />
              </div>
              <h3 className="text-2xl font-bold text-[#18392B] mt-2">
                {formatPrice(metrics.totalRevenue)}
              </h3>
              <span className="text-[10px] text-[#365B45] font-semibold mt-1 block">
                {metrics.totalOrders} Toplam Sipariş
              </span>
            </div>

            <div className="bg-[#FFFDFC] p-5 rounded-2xl border border-[#A9B8A5]/25 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#575A53] font-medium">Bekleyen / Yeni</span>
                <Clock className="w-4 h-4 text-amber-600" />
              </div>
              <h3 className="text-2xl font-bold text-amber-700 mt-2">
                {metrics.pendingOrders}
              </h3>
              <span className="text-[10px] text-[#575A53] mt-1 block">
                Onay ve atama bekliyor
              </span>
            </div>

            <div className="bg-[#FFFDFC] p-5 rounded-2xl border border-[#A9B8A5]/25 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#575A53] font-medium">Atölyede Hazırlanıyor</span>
                <Package className="w-4 h-4 text-[#6F2232]" />
              </div>
              <h3 className="text-2xl font-bold text-[#6F2232] mt-2">
                {metrics.preparingOrders}
              </h3>
              <span className="text-[10px] text-[#575A53] mt-1 block">
                Usta florist masasında
              </span>
            </div>

            <div className="bg-[#FFFDFC] p-5 rounded-2xl border border-[#A9B8A5]/25 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#575A53] font-medium">Teslim Edilen</span>
                <CheckCircle2 className="w-4 h-4 text-[#365B45]" />
              </div>
              <h3 className="text-2xl font-bold text-[#365B45] mt-2">
                {metrics.deliveredOrders}
              </h3>
              <span className="text-[10px] text-[#365B45] mt-1 block">
                Başarıyla ulaştırıldı
              </span>
            </div>
          </div>
        )}

        {/* Live Orders Pipeline Table (Rule #40: Order Status Management) */}
        <div className="bg-[#FFFDFC] rounded-3xl border border-[#A9B8A5]/30 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-[#A9B8A5]/20 flex items-center justify-between">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#18392B]">
                Sipariş Akışı & Durum Yönetimi
              </h3>
              <p className="text-xs text-[#575A53]">
                Gelen siparişlerin durumunu güncelleyin; müşteri anında takip ekranından görsün.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8F5EF] text-[#575A53] uppercase text-[10px] tracking-wider border-b border-[#A9B8A5]/20">
                <tr>
                  <th className="p-4 font-bold">Sipariş No</th>
                  <th className="p-4 font-bold">Alıcı & Adres</th>
                  <th className="p-4 font-bold">Teslimat Saati</th>
                  <th className="p-4 font-bold">Çiçek & Ekstra</th>
                  <th className="p-4 font-bold">Tutar</th>
                  <th className="p-4 font-bold">Durum</th>
                  <th className="p-4 font-bold text-right">Aksiyon</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#A9B8A5]/15 text-[#20221F]">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#F8F5EF]/60 transition-colors">
                    {/* Order Code */}
                    <td className="p-4 font-mono font-bold text-[#6F2232]">
                      <Link
                        href={`/siparis-takip?code=${order.orderNumber}`}
                        className="hover:underline"
                        title="Müşteri Takip Ekranında Aç"
                      >
                        {order.orderNumber}
                      </Link>
                    </td>

                    {/* Recipient */}
                    <td className="p-4 max-w-xs">
                      <span className="font-bold block text-sm">
                        {order.recipient.fullName}
                      </span>
                      <span className="text-[#575A53] text-[11px] block truncate">
                        {order.recipient.district} • {order.recipient.address}
                      </span>
                      <span className="text-[10px] text-[#A9B8A5]">
                        Tel: {order.recipient.phone}
                      </span>
                    </td>

                    {/* Delivery Slot */}
                    <td className="p-4 whitespace-nowrap">
                      <span className="font-semibold block">{order.delivery.date}</span>
                      <span className="text-[#575A53] text-[11px]">
                        {order.delivery.timeSlot}
                      </span>
                    </td>

                    {/* Items */}
                    <td className="p-4 max-w-xs">
                      {order.items.map((i, idx) => (
                        <span key={idx} className="block text-[11px] truncate font-medium">
                          {i.quantity}x {i.productName}
                        </span>
                      ))}
                      {order.addOns && order.addOns.length > 0 && (
                        <span className="text-[10px] text-[#365B45] font-semibold">
                          +{order.addOns.length} Ek Hediye
                        </span>
                      )}
                    </td>

                    {/* Total */}
                    <td className="p-4 whitespace-nowrap font-bold text-sm text-[#18392B]">
                      {formatPrice(order.total)}
                    </td>

                    {/* Status Badge */}
                    <td className="p-4 whitespace-nowrap">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          order.status === "DELIVERED"
                            ? "bg-emerald-100 text-emerald-800"
                            : order.status === "OUT_FOR_DELIVERY"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "PREPARING"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {order.status === "DELIVERED"
                          ? "Teslim Edildi"
                          : order.status === "OUT_FOR_DELIVERY"
                          ? "Kuryede"
                          : order.status === "PREPARING"
                          ? "Hazırlanıyor"
                          : "Sipariş Alındı"}
                      </span>
                    </td>

                    {/* Action Dropdown */}
                    <td className="p-4 text-right whitespace-nowrap">
                      <select
                        disabled={updatingId === order.id}
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value as OrderStatus)
                        }
                        className="text-xs p-1.5 rounded border border-[#A9B8A5]/40 bg-white font-medium focus:outline-none"
                      >
                        <option value="PENDING">Sipariş Alındı</option>
                        <option value="CONFIRMED">Onaylandı</option>
                        <option value="PREPARING">Hazırlanıyor</option>
                        <option value="OUT_FOR_DELIVERY">Dağıtıma Çıktı</option>
                        <option value="DELIVERED">Teslim Edildi</option>
                        <option value="CANCELLED">İptal Edildi</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
