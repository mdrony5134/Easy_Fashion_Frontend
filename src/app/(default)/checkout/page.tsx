import type { Metadata } from "next";

import Checkout from "@/components/checkout/CheckOut";

export const metadata: Metadata = {
  title: "Secure Checkout | EASY Fashion",
  description: "Enter your shipping details and place your EASY order.",
};

export default function Page() {
  return <Checkout />;
}
