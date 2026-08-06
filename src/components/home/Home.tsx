import Link from "next/link";
import { ArrowRight, Layers, Ruler, Shirt } from "lucide-react";
import { GiClothes } from "react-icons/gi";

import { HeroCarousel } from "@/components/home/HeroCarousel";
import { ProductCard } from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/button";
import { CATEGORIES, PRODUCTS, SIZES, STYLES } from "@/lib/product";

const SUMMARY = [
  { label: "Total Categories", value: CATEGORIES.length, icon: Layers, note: "Curated lines" },
  { label: "Total Products", value: PRODUCTS.length, icon: Shirt, note: "In stock now" },
  { label: "Available Sizes", value: SIZES.length, icon: Ruler, note: "XS to XXL & numeric" },
  { label: "Available Styles", value: STYLES.length, icon: GiClothes, note: "Casual to formal" },
];

export default function Home() {
  const featured = PRODUCTS.slice(0, 8);

  return (
    <div>
      <HeroCarousel />

      <section className="container mx-auto px-4 py-16 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SUMMARY.map(({ label, value, icon: Icon, note }) => (
            <div
              key={label}
              className="hover-lift group relative overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md p-6"
            >
              <div className="absolute -right-6 -top-6 size-24 rounded-full bg-primary/10 transition-transform duration-500 group-hover:scale-150" />
              <Icon className="size-6 text-primary" />
              <p className="mt-5 text-5xl font-bold tracking-tight">{value}</p>
              <p className="mt-1 text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {label}
              </p>
              <p className="mt-2 text-xs text-brand-green-foreground/70">{note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
              Featured edit
            </p>
            <h2 className="mt-2 text-4xl font-display uppercase tracking-wider sm:text-5xl">FRESH OFF THE RAIL</h2>
          </div>
          <Button asChild variant="outline" className="shrink-0 rounded-md border-border bg-white text-black hover:bg-gray-50">
            <Link href="/shop">
              Shop all <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="container mx-auto mt-20 px-4 sm:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: "Season Sale", copy: "Up to 30% off selected denim & shirting.", tone: "brand" },
            { title: "New In", copy: "Party-ready dresses in signature red.", tone: "ink" },
            { title: "Streetwear", copy: "Heavyweight hoodies built for layering.", tone: "green" },
          ].map((card) => (
            <div
              key={card.title}
              className={`hover-lift flex min-h-44 flex-col justify-between rounded-xl p-7 ${
                card.tone === "brand"
                  ? "bg-primary text-primary-foreground"
                  : card.tone === "ink"
                    ? "bg-ink text-ink-foreground"
                    : "bg-brand-green text-brand-green-foreground"
              }`}
            >
              <h3 className="text-3xl">{card.title}</h3>
              <div>
                <p className="text-sm opacity-90">{card.copy}</p>
                <Link
                  href="/shop"
                  className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] underline-offset-4 hover:underline"
                >
                  Shop now <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
