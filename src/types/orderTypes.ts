export interface OrderItem {
  product: string;
  name: string;
  category: string;
  style: string;
  sizes: string[];
  size: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  _id: string;
  customerName: string;
  phone: string;
  shippingAddress: string;
  items: OrderItem[];
  subtotal: number;
  grandTotal: number;
  status: string;
  createdAt: string;
}
