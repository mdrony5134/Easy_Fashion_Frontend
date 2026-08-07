"use client";
import Link from "next/link";
import { ArrowRight, Layers, Ruler, Shirt, AlertCircle } from "lucide-react";
import { GiClothes } from "react-icons/gi";
import { ProductCard } from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/button";
import { type Product } from "@/lib/product";
import { useGetHomeSummaryQuery } from "@/redux/api/productApi";
import { ApiProduct, ApiSize } from "@/types/productTypes";

// Helper function to transform API product
const transformApiProduct = (apiProduct: ApiProduct): Product => {
  return {
    id: apiProduct._id,
    name: apiProduct.name,
    category: apiProduct.category?.name || "Uncategorized",
    style: apiProduct.style?.name || "Uncategorized",
    sizes: apiProduct.sizes?.map((size: ApiSize) => size.name) || [],
    price: apiProduct.price,
    images: apiProduct.images || [],
    description: apiProduct.description || "",
    badge: apiProduct.badge || undefined,
  };
};

export default function FeatureProduct() {
  const {
    data: getHomeSummaryData,
    isLoading,
    error,
  } = useGetHomeSummaryQuery({});
  const summaryData = getHomeSummaryData?.data;

  const SUMMARY = [
    {
      label: "Total Categories",
      value: summaryData?.totalCategories || 0,
      icon: Layers,
      note: "Curated lines",
    },
    {
      label: "Total Products",
      value: summaryData?.totalProducts || 0,
      icon: Shirt,
      note: "In stock now",
    },
    {
      label: "Available Sizes",
      value: summaryData?.availableSizes || 0,
      icon: Ruler,
      note: "XS to XXL & numeric",
    },
    {
      label: "Available Styles",
      value: summaryData?.availableStyles || 0,
      icon: GiClothes,
      note: "Casual to formal",
    },
  ];

  const featuredProducts: Product[] =
    summaryData?.featuredProducts?.map((item: ApiProduct) =>
      transformApiProduct(item),
    ) || [];

  const displayProducts = featuredProducts.length > 0 ? featuredProducts : [];

  // console.log("Home Summary Data:", getHomeSummaryData);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 aspect-[4/5] rounded-xl mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center border border-dashed border-primary/20 rounded-xl mt-10">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-50 mb-6">
          <AlertCircle className="w-10 h-10 text-red-500" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          Unable to Load Products
        </h3>
        <p className="text-gray-500 max-w-md mx-auto">
          We're experiencing technical difficulties. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div>
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
              <p className="mt-2 text-xs text-brand-green-foreground/70">
                {note}
              </p>
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
            <h2 className="mt-2 text-4xl font-display uppercase tracking-wider sm:text-5xl">
              FRESH OFF THE RAIL
            </h2>
          </div>
          {displayProducts.length > 0 && (
            <Button
              asChild
              variant="outline"
              className="shrink-0 rounded-md border-border bg-white text-black hover:bg-gray-50"
            >
              <Link href="/shop">
                Shop all <ArrowRight className="size-4" />
              </Link>
            </Button>
          )}
        </div>

        {displayProducts.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-12 text-center py-16 px-4 border-2 border-dashed border-primary/20 rounded-xl">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-50 mb-6">
              <AlertCircle className="w-10 h-10 text-amber-500" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              No Featured Products Available
            </h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              We're currently updating our collection. Please check back later
              for our latest arrivals.
            </p>
            <Button
              asChild
              className="bg-primary text-white hover:bg-primary/90"
            >
              <Link href="/shop">Browse Collection</Link>
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
