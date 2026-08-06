"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CheckCircle2, Lock } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/Textarea";
import { formatPrice } from "@/lib/product";
import {
  clearCart,
  selectCartGrandTotal,
  selectCartItems,
  selectCartShipping,
  selectCartSubtotal,
  type CartItem,
} from "@/redux/allSlice/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(80),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number")
    .max(20)
    .regex(
      /^[0-9+\-\s()]+$/,
      "Phone number can only contain digits and + - ( )",
    ),
  address: z
    .string()
    .trim()
    .min(10, "Please enter a complete shipping address")
    .max(300),
});

type Order = {
  id: string;
  name: string;
  phone: string;
  address: string;
  items: CartItem[];
  total: number;
};

export default function Checkout() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartSubtotal);
  const shipping = useAppSelector(selectCartShipping);
  const grandTotal = useAppSelector(selectCartGrandTotal);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [order, setOrder] = useState<Order | null>(null);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues)
        next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }

    setErrors({});
    const created: Order = {
      id: `EF-${Date.now().toString().slice(-6)}`,
      ...parsed.data,
      items: cart,
      total: grandTotal,
    };

    dispatch(clearCart());
    setOrder(created);
    toast.success("Order placed successfully", {
      description: `Order ID ${created.id}`,
    });
  };

  if (order) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-5 mt-20 text-center border border-transparent/10 shadow-md rounded-xl sm:px-6">
        <CheckCircle2 className="mx-auto size-14 text-brandGreen" />
        <h1 className="mt-6 text-4xl sm:text-5xl">Order confirmed</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Thank you {order.name}. Your order{" "}
          <span className="font-bold">{order.id}</span> has been placed
          successfully. We will call {order.phone} to confirm delivery.
        </p>

        <div className="mt-8 rounded-xl border border-transparent/10 shadow-md  p-6 text-left">
          <h2 className="text-xl">Order details</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {order.items.map((item) => (
              <li
                key={`${item.productId}-${item.size}`}
                className="flex justify-between gap-3"
              >
                <span className="min-w-0 truncate text-muted-foreground">
                  {item.name} · {item.size} × {item.quantity}
                </span>
                <span className="shrink-0 font-semibold">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-end justify-between border-t border-dashed border-primary pt-4">
            <span className="text-sm tracking-[0.18em] text-muted-foreground">
              GRAND TOTAL
            </span>
            <span className="text-3xl font-bold text-primary">
              {formatPrice(order.total)}
            </span>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Shipping to: {order.address}
          </p>
        </div>

        <Button
          className="mt-8 rounded text-white"
          onClick={() => router.push("/shop")}
        >
          Continue shopping
        </Button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <h1 className="text-4xl">Nothing to check out</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Your cart is empty — add something you love first.
        </p>
        <Button asChild className="mt-6">
          <Link href="/shop">Browse products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
        Checkout
      </p>
      <h1 className="mt-2 text-4xl sm:text-6xl">Shipping details</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <form
          onSubmit={submit}
          className="rounded-xl border border-transparent/10 shadow-md  p-6"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="name">Customer name</Label>
              <Input
                id="name"
                value={form.name}
                maxLength={80}
                placeholder="e.g. Ayesha Rahman"
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
                className="mt-2 border border-primary/20 shadow-sm text-sm rounded placeholder:text-gray-400"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-primary">{errors.name}</p>
              )}
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="phone">Phone number</Label>
              <Input
                id="phone"
                value={form.phone}
                maxLength={20}
                placeholder="+880 1700 000 000"
                onChange={(event) =>
                  setForm({ ...form, phone: event.target.value })
                }
                className="mt-2 border border-primary/20 shadow-sm text-sm rounded placeholder:text-gray-400"
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-primary">{errors.phone}</p>
              )}
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="address">Shipping address</Label>
              <Textarea
                id="address"
                value={form.address}
                maxLength={300}
                rows={4}
                placeholder="House, road, area, city and postcode"
                onChange={(event) =>
                  setForm({ ...form, address: event.target.value })
                }
                className="mt-2 border border-primary/20 shadow-sm text-sm rounded placeholder:text-gray-400"
              />
              {errors.address && (
                <p className="mt-1 text-xs text-primary">{errors.address}</p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            className="mt-7 w-full shadow-brand rounded text-white"
          >
            <Lock className="size-4" /> Place order · {formatPrice(grandTotal)}
          </Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Cash on delivery. No payment details required.
          </p>
        </form>

        <aside className="h-fit rounded-xl border border-transparent/10 shadow-md  p-6 lg:sticky lg:top-24">
          <h2 className="text-2xl">Your order</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {cart.map((line) => (
              <li
                key={`${line.productId}-${line.size}`}
                className="flex justify-between gap-3"
              >
                <span className="min-w-0 text-muted-foreground">
                  {line.name} · {line.size} × {line.quantity}
                </span>
                <span className="shrink-0 font-semibold">
                  {formatPrice(line.price * line.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <dl className="mt-5 space-y-2 border-t border-dashed border-primary pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="font-semibold">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd className="font-semibold">
                {shipping === 0 ? "Free" : formatPrice(shipping)}
              </dd>
            </div>
            <div className="flex items-end justify-between border-t border-dashed border-primary pt-3">
              <dt className="text-sm tracking-[0.18em] text-muted-foreground">
                GRAND TOTAL
              </dt>
              <dd className="text-3xl font-bold text-primary">
                {formatPrice(grandTotal)}
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}
