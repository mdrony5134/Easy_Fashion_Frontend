import type { Metadata } from "next";

import HeroCarousel from "@/components/home/HeroCarousel";
import FeatureProduct from "@/components/home/FeatureProducts";
import OfferCard from "@/components/home/OfferCard";

export const metadata: Metadata = {
  title: "EASY Fashion — Modern Wardrobe Essentials Online",
  description: "Shop EASY fashion: shirts, dresses, denim, hoodies and footwear in every size and style.",
};

export default function Page() {
  return (
    <div>
      <HeroCarousel />
      <FeatureProduct />
      <OfferCard/>
    </div>
  );
}
