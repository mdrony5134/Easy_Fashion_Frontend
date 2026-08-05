import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProductDetail from "@/components/shop/ProductDetails";
import { getProduct } from "@/lib/product";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);

  if (!product) {
    return {
      title: "Product not found | EASY",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${product.name} — ${product.category} | EASY`,
    description: product.description.slice(0, 155),
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const product = getProduct(id);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
