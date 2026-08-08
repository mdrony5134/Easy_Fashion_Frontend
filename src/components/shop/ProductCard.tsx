"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { formatPrice, getImageSrc, type Product } from "@/lib/product";
import { addToCart } from "@/redux/allSlice/cartSlice";
import { useAppDispatch } from "@/redux/store";

export function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");
  const primaryImage = getImageSrc(product.images[0]!);

  return (
    <article className="group hover-lift flex flex-col overflow-hidden rounded-xl bg-white shadow transition-shadow hover:shadow-md">
      <Link
        href={`/shop/details/${product.id}`}
        className="relative block overflow-hidden bg-secondary"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          width={1024}
          height={1280}
          className="aspect-4/5 w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.style && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white">
            {product.style}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {product.category}
          </p>
          <h3 className="mt-1 truncate font-display text-2xl uppercase tracking-wider">
            <Link href={`/shop/details/${product.id}`}>{product.name}</Link>
          </h3>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`rounded border px-2 py-0.5 text-[11px] font-semibold transition-colors ${
                selectedSize === size
                  ? "border-primary bg-primary text-white"
                  : "border-border text-muted-foreground hover:border-primary/50"
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 pt-1">
          <div className="min-w-0">
            <span className="text-2xl font-bold tracking-tight">
              {formatPrice(product.price)}
            </span>
          </div>
          <Button
            size="sm"
            className="shrink-0 bg-primary text-white hover:bg-primary/90 rounded"
            onClick={() => {
              if (!selectedSize) {
                toast.error("Please select a size");
                return;
              }
              dispatch(
                addToCart({
                  productId: product.id,
                  name: product.name,
                  price: product.price,
                  image: primaryImage,
                  size: selectedSize,
                  quantity: 1,
                }),
              );
              toast.success(`${product.name} added to cart`, {
                description: `Size ${selectedSize}`,
              });
            }}
          >
            <Plus className="size-4" /> Add to cart
          </Button>
        </div>
      </div>
    </article>
  );
}
