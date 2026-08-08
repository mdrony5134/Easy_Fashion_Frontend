"use client";

import {
  ArrowLeft,
  Check,
  Minus,
  Plus,
  ShieldCheck,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { addToCart } from "@/redux/allSlice/cartSlice";
import {
  useGetProductListQuery,
  useGetSingleProductQuery,
} from "@/redux/api/productApi";
import { useAppDispatch } from "@/redux/store";
import { useParams } from "next/navigation";
import { ProductCard } from "./ProductCard";
import { ProductDetailsSkeleton } from "./ProductDetailsSkeleton";
import { formatPrice, getImageSrc } from "@/lib/product";

export default function ProductDetail() {
  const dispatch = useAppDispatch();
  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const params = useParams();
  const id = params.id as string;

  const { data: getSingleProduct, isLoading } = useGetSingleProductQuery(id, { skip: !id });
  const { data: getAllProductsData } = useGetProductListQuery({
    page: 1,
    limit: 10,
  });

  const rawProduct = getSingleProduct?.data;

  useEffect(() => {
    if (rawProduct?.sizes?.length > 0 && !size) {
      setSize(rawProduct.sizes[0].name);
    }
  }, [rawProduct, size]);

  if (isLoading || !rawProduct) {
    return (
      <div className="container mx-auto px-4 py-8 sm:px-6 sm:py-12">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="size-4" /> Back to shop
        </Link>
        <ProductDetailsSkeleton />
      </div>
    );
  }

  const product = {
    id: rawProduct._id,
    name: rawProduct.name,
    price: rawProduct.price,
    images: rawProduct.images || [],
    category: rawProduct.category?.name || "",
    style: rawProduct.style?.name || "",
    sizes: rawProduct.sizes?.map((s: any) => s.name) || [],
    description: rawProduct.description || "",
  };

  const rawProductList = getAllProductsData?.data?.result || getAllProductsData?.data || [];
  const relatedList = Array.isArray(rawProductList) ? rawProductList : [];

  const related = relatedList
    .filter((item: any) => item._id !== product.id)
    .slice(0, 4)
    .map((item: any) => ({
      id: item._id,
      name: item.name,
      price: item.price,
      images: item.images || [],
      category: item.category?.name || "",
      style: item.style?.name || "",
      sizes: item.sizes?.map((s: any) => s.name) || [],
    }));

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 sm:py-12">
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="size-4" /> Back to shop
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div>
          <div className="overflow-hidden rounded-xl border border-transparent/10 bg-secondary">
            {product.images.length > 0 && (
              <Image
                key={activeImage}
                src={product.images[activeImage]}
                alt={product.name}
                width={1024}
                height={1280}
                className="aspect-4/5 w-full animate-fade-in object-cover"
              />
            )}
          </div>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {product.images.map((image: string, index: number) => (
              <button
                key={`${getImageSrc(image)}-${index}`}
                onClick={() => setActiveImage(index)}
                className={`overflow-hidden rounded-xl border-2 transition-colors ${
                  index === activeImage
                    ? "border-primary"
                    : "border-transparent hover:border-primary/50"
                }`}
                aria-label={`View image ${index + 1}`}
              >
                <Image
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                  width={256}
                  height={256}
                  className="aspect-square w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-secondary px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-secondary-foreground">
              {product.category}
            </span>
            {product.style && (
              <span className="rounded-full bg-brandGreen px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                {product.style}
              </span>
            )}
          </div>

          <h1 className="mt-4 text-4xl sm:text-6xl">{product.name}</h1>

          <div className="mt-4 flex items-end gap-3">
            <span className="text-4xl font-bold tracking-tight text-primary">
              {formatPrice(product.price)}
            </span>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {product.description}
          </p>

          <div className="mt-7">
            <h2 className="text-sm tracking-[0.18em] text-muted-foreground">
              Available sizes — select one
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((option: string) => (
                <button
                  key={option}
                  onClick={() => setSize(option)}
                  className={`min-w-12 rounded-lg border px-4 py-2 text-sm font-bold transition-colors ${
                    option === size
                      ? "border-primary bg-primary text-white shadow-sm"
                      : "border-transparent shadow-sm hover:border-primary"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded-lg border border-transparent/10 bg-secondary">
              <button
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                className="grid size-11 place-items-center rounded-l-lg hover:bg-secondary"
                aria-label="Decrease quantity"
              >
                <Minus className="size-4" />
              </button>
              <span className="w-12 text-center text-lg font-bold">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((value) => Math.min(99, value + 1))}
                className="grid size-11 place-items-center rounded-r-lg hover:bg-secondary"
                aria-label="Increase quantity"
              >
                <Plus className="size-4" />
              </button>
            </div>
            <Button
              size="lg"
              className="flex-1 shadow-brand text-white rounded"
              onClick={() => {
                dispatch(
                  addToCart({
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.images.length > 0 ? getImageSrc(product.images[0]!) : "",
                    size,
                    quantity,
                  }),
                );
                toast.success(`${product.name} added to cart`, {
                  description: `Size ${size} · Qty ${quantity}`,
                });
              }}
            >
              Add to cart · {formatPrice(product.price * quantity)}
            </Button>
          </div>

          <div className="mt-8 grid gap-3 rounded-xl border border-transparent/10 bg-secondary p-5 sm:grid-cols-3">
            {[
              { icon: Truck, text: `Free shipping over ৳ 3000` },
              { icon: ShieldCheck, text: "14-day easy exchange" },
              { icon: Check, text: "Authentic EASY product" },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-start gap-2 text-xs text-muted-foreground"
              >
                <Icon className="mt-0.5 size-4 shrink-0 text-brand-green" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="text-3xl sm:text-4xl">You may also like</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item: any) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
