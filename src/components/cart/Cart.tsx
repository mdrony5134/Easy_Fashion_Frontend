"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/product";
import {
  clearCart,
  removeFromCart,
  selectCartGrandTotal,
  selectCartItems,
  selectCartShipping,
  selectCartSubtotal,
  updateQuantity,
} from "@/redux/allSlice/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";

export default function Cart() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartSubtotal);
  const shipping = useAppSelector(selectCartShipping);
  const grandTotal = useAppSelector(selectCartGrandTotal);

  return (
    <div className="container mx-auto px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
        Shopping bag
      </p>
      <h1 className="mt-2 text-4xl sm:text-6xl">Your cart</h1>

      {cart.length === 0 ? (
        <div className="mt-10 rounded-xl border border-dashed border-primary/40 p-16 text-center">
          <ShoppingBag className="mx-auto size-10 text-muted-foreground" />
          <h2 className="mt-4 text-2xl">Your cart is empty</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Add a few essentials and they will show up here.
          </p>
          <Button asChild className="mt-6 text-white rounded">
            <Link href="/shop">Start shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-4">
            {cart.map((line) => (
              <div
                key={`${line.productId}-${line.size}`}
                className="flex gap-4 rounded-xl border border-transparent/10 shadow-md p-4"
              >
                <Link
                  href={`/shop/details/${line.productId}`}
                  className="shrink-0"
                >
                  <Image
                    src={line.image}
                    alt={line.name}
                    width={256}
                    height={256}
                    className="size-24 rounded-lg object-cover sm:size-28"
                  />
                </Link>

                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3">
                    <div className="min-w-0">
                      <h2 className="truncate text-xl">{line.name}</h2>
                      <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                        Size {line.size}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        dispatch(
                          removeFromCart({
                            productId: line.productId,
                            size: line.size,
                          }),
                        )
                      }
                      aria-label={`Remove ${line.name}`}
                      className="grid size-9 shrink-0 place-items-center rounded-full text-primary transition-colors hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center rounded-lg border border-border">
                      <button
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              productId: line.productId,
                              size: line.size,
                              quantity: line.quantity - 1,
                            }),
                          )
                        }
                        className="grid size-9 place-items-center rounded-l-lg hover:bg-secondary"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="size-3.5" />
                      </button>
                      <span className="w-10 text-center font-bold">
                        {line.quantity}
                      </span>
                      <button
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              productId: line.productId,
                              size: line.size,
                              quantity: line.quantity + 1,
                            }),
                          )
                        }
                        className="grid size-9 place-items-center rounded-r-lg hover:bg-secondary"
                        aria-label="Increase quantity"
                      >
                        <Plus className="size-3.5" />
                      </button>
                    </div>
                    <div className="text-right">
                      {/* <p className="text-xs text-muted-foreground">
                        {formatPrice(line.price)} each
                      </p> */}
                      <p className="text-xl font-bold">
                        {formatPrice(line.price * line.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={() => dispatch(clearCart())}
              className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-destructive"
            >
              Clear cart
            </button>
          </div>

          <aside className="h-fit rounded-xl border border-transparent/10 shadow-md  p-6 lg:sticky lg:top-24">
            <h2 className="text-2xl">Order summary</h2>
            <dl className="mt-5 space-y-3 text-sm">
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
              <div className="border-t border-dashed border-primary pt-3">
                <div className="flex items-end justify-between">
                  <dt className="text-sm tracking-[0.18em] text-muted-foreground">
                    GRAND TOTAL
                  </dt>
                  <dd className="text-3xl font-bold text-primary">
                    {formatPrice(grandTotal)}
                  </dd>
                </div>
              </div>
            </dl>
            <Button 
              size="lg" 
              className="mt-6 w-full shadow-brand text-white rounded"
              onClick={() => {
                const token = Cookies.get("accessToken");
                if (token) {
                  router.push("/checkout");
                } else {
                  router.push("/login");
                }
              }}
            >
              Proceed to checkout
            </Button>
            <Button asChild variant="outline" className="mt-3 w-full *:shadow-brand text-primary rounded">
              <Link href="/shop">Continue shopping</Link>
            </Button>
          </aside>
        </div>
      )}
    </div>
  );
}
