import { useGetMyOrdersQuery } from "@/redux/api/orderApi";
import { Order, OrderItem } from "@/types/orderTypes";
import { Loader2 } from "lucide-react";

export function MyOrdersSection() {
  const { data: myOrdersData } = useGetMyOrdersQuery({});

  const orders: Order[] = myOrdersData?.data || [];

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string): string => {
    switch (status.toUpperCase()) {
      case "DELIVERED":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-orange-100 text-orange-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      case "SHIPPED":
        return "bg-blue-100 text-blue-800";
      case "PROCESSING":
        return "bg-blue-50 text-blue-600";
      case "CONFIRMED":
        return "bg-teal-100 text-teal-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!myOrdersData) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-lg text-gray-600 flex items-center justify-center">
          <Loader2 className="animate-spin" size={25} /> Loading orders...
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6 bg-white border border-[#ADADAD40] shadow-sm rounded-[16px] p-8">
          <h1 className="text-2xl font-semibold text-primary">My Orders</h1>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-[#ADADAD40] text-center py-12">
          <p className="text-gray-600 text-lg">No orders found</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6 bg-white border border-[#ADADAD40] shadow-sm rounded-[16px] p-8">
        <h1 className="text-2xl font-semibold text-primary">My Orders</h1>
      </div>

      <div className="space-y-6 bg-white rounded-2xl shadow-sm p-6 border border-[#ADADAD40]">
        {orders?.map((order: Order) => (
          <div key={order._id} className="">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Order #{order._id.slice(-6).toUpperCase()}
                  </h2>
                  <p className="text-gray-600">
                    Placed on {formatDate(order.createdAt)}
                  </p>
                  <p className="text-gray-600">Total: ${order.grandTotal}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {order?.items?.map((productItem: OrderItem, index: number) => (
                <div
                  key={productItem.product || index}
                  className="flex items-center gap-4 p-4 border border-gray-200 rounded-2xl"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {productItem.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Category: {productItem.category} | Style:{" "}
                      {productItem.style}
                    </p>
                    <p className="text-sm text-gray-600">
                      Size: {productItem.size}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-1">
                      Quantity: {productItem.quantity}
                    </p>
                    <p className="font-semibold text-gray-900">
                      ${productItem.unitPrice}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        order.status,
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
