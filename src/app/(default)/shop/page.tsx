import type { Metadata } from "next";

import Products from "@/components/shop/Products";

export const metadata: Metadata = {
  title: "Shop All Fashion — EASY",
  description: "Browse the full EASY collection and filter by category, size and style.",
};

export default function Page() {
  return <Products />;
}
