import type { Metadata } from "next";

import Home from "@/components/home/Home";

export const metadata: Metadata = {
  title: "EASY Fashion — Modern Wardrobe Essentials Online",
  description: "Shop EASY fashion: shirts, dresses, denim, hoodies and footwear in every size and style.",
};

export default function Page() {
  return <Home />;
}
