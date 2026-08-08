"use client";

import { useGetMyOrdersQuery } from "@/redux/api/orderApi";
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Loader2,
  MapPin,
  Package,
  Truck,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export function OrderTracking() {
  const [currentOrderIndex, setCurrentOrderIndex] = useState(0);

  const { data: myOrderData, isLoading } = useGetMyOrdersQuery({});

  const orders = useMemo(() => myOrderData?.data || [], [myOrderData?.data]);
  const currentOrder = orders[currentOrderIndex];

  const statusOrder = [
    "PENDING",
    "CONFIRMED",
    "PROCESSING",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
  ];

  const getTrackingSteps = (orderStatus: string) => {
    const currentStatusIndex = statusOrder.indexOf(orderStatus?.toUpperCase());

    return [
      {
        id: "confirmed",
        title: "Order Confirmed",
        icon: Package,
        completed: currentStatusIndex >= 1,
        active: orderStatus?.toUpperCase() === "CONFIRMED",
      },
      {
        id: "processing",
        title: "Order Processing",
        icon: Package,
        completed: currentStatusIndex >= 2,
        active: orderStatus?.toUpperCase() === "PROCESSING",
      },
      {
        id: "shipped",
        title: "Order Shipped",
        icon: Truck,
        completed: currentStatusIndex >= 3,
        active: orderStatus?.toUpperCase() === "SHIPPED",
      },
      {
        id: "delivered",
        title: "Order Delivered",
        icon: MapPin,
        completed: currentStatusIndex >= 4,
        active: orderStatus?.toUpperCase() === "DELIVERED",
      },
    ];
  };

  const isCancelled = currentOrder?.status?.toUpperCase() === "CANCELLED";
  const trackingSteps = getTrackingSteps(currentOrder?.status || "PENDING");

  useEffect(() => {
    setCurrentOrderIndex(0);
  }, [orders]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-8 border border-[#ADADAD40]">
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Loading Orders Tracking
          </h3>
        </div>
      </div>
    );
  }

  if (!currentOrder) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-8 border border-[#ADADAD40] text-center">
        <p className="text-gray-600">No orders found</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 bg-white border border-[#ADADAD40] shadow-sm rounded-[16px] p-8">
        <h1 className="text-2xl font-semibold text-primary">Order Tracking</h1>

        {orders.length > 1 && (
          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                setCurrentOrderIndex((prev) => Math.max(0, prev - 1))
              }
              disabled={currentOrderIndex === 0}
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous Order
            </button>
            <span className="text-sm text-gray-600">
              Order {currentOrderIndex + 1} of {orders.length}
            </span>
            <button
              onClick={() =>
                setCurrentOrderIndex((prev) =>
                  Math.min(orders.length - 1, prev + 1),
                )
              }
              disabled={currentOrderIndex === orders.length - 1}
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next Order
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-8 border border-[#ADADAD40]">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Order #{currentOrder._id.slice(-6).toUpperCase()}
          </h2>
          <p className="text-gray-600">
            Placed on {formatDate(currentOrder.createdAt)}
          </p>

          <div className="mt-2">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                isCancelled
                  ? "bg-red-100 text-red-800"
                  : currentOrder.status?.toUpperCase() === "DELIVERED"
                    ? "bg-green-100 text-green-800"
                    : "bg-blue-100 text-blue-800"
              }`}
            >
              {currentOrder.status}
              {currentOrder.status?.toUpperCase() === "PENDING" && (
                <Clock className="w-4 h-4 ml-1" />
              )}
              {currentOrder.status?.toUpperCase() === "DELIVERED" && (
                <CheckCircle className="w-4 h-4 ml-1" />
              )}
            </span>
          </div>
        </div>

        {isCancelled ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Order Cancelled
            </h3>
            <p className="text-gray-600">
              This order was cancelled and is no longer active.
            </p>
          </div>
        ) : (
          <div className="relative mb-12">
            <div className="flex items-center justify-between">
              {trackingSteps.map((step, index) => {
                return (
                  <div
                    key={step.id}
                    className="flex flex-col items-center relative"
                  >
                    {index < trackingSteps.length - 1 && (
                      <div
                        className={`absolute top-5 left-6 w-full h-3 ${
                          step.completed ? "bg-primary" : "bg-primary/20"
                        }`}
                        style={{ width: "calc(100vw / 6)" }}
                      />
                    )}

                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center relative z-10 ${
                        step.completed
                          ? "bg-primary text-white"
                          : step.active
                            ? "bg-primary text-white"
                            : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      {step.completed ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-current" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between mt-8">
              {trackingSteps.map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.id}
                    className="flex flex-col items-center text-center max-w-24"
                  >
                    <div className="mb-2">
                      <Icon
                        className={`w-8 h-8 ${
                          step.completed || step.active
                            ? "text-orange-500"
                            : "text-gray-400"
                        }`}
                      />
                    </div>
                    <p
                      className={`text-sm font-medium ${
                        step.completed || step.active
                          ? "text-gray-900"
                          : "text-gray-400"
                      }`}
                    >
                      {step.title}
                    </p>
                    {step.active && (
                      <span className="text-xs text-primary mt-1">Current</span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="border-t mt-12 pt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Items in this order
              </h3>
              <div className="space-y-4">
                {currentOrder.items?.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-gray-50/50"
                  >
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Size: {item.size} • Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold text-gray-900 text-lg">
                      ${item.unitPrice}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
                <span className="font-semibold text-gray-600 text-lg">
                  Total Amount
                </span>
                <span className="text-2xl font-bold text-primary">
                  ${currentOrder.grandTotal}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
