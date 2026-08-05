import type { Metadata } from "next";

import Cart from "@/components/cart/Cart";

export const metadata: Metadata = {
  title: "Your Shopping Cart | EASY Fashion",
  description: "Review your EASY bag, update quantities and continue to checkout.",
};

export default function Page() {
  return <Cart />;
}
