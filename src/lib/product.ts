import type { StaticImageData } from "next/image";
import shirt from "@/assets/p-shirt.jpg";
import dress from "@/assets/p-dress.jpg";
import jeans from "@/assets/p-jeans.jpg";
import hoodie from "@/assets/p-hoodie.jpg";
import sneakers from "@/assets/p-sneakers.jpg";
import blazer from "@/assets/p-blazer.jpg";
import tshirt from "@/assets/p-tshirt.jpg";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

export type Product = {
  id: string;
  name: string;
  category: string;
  style: string;
  sizes: string[];
  price: number;
  oldPrice?: number;
  images: Array<StaticImageData | string>;
  description: string;
  badge?: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "easy-oxford-shirt",
    name: "Easy Oxford Shirt",
    category: "Shirts",
    style: "Formal",
    sizes: ["S", "M", "L", "XL"],
    price: 1890,
    oldPrice: 2400,
    images: [shirt, hero3, tshirt],
    description:
      "A tailored button-down cut from breathable long-staple cotton oxford. Structured collar, mother-of-pearl buttons and a clean silhouette that works from desk to dinner.",
    badge: "Bestseller",
  },
  {
    id: "signature-red-dress",
    name: "Signature Red Midi Dress",
    category: "Dresses",
    style: "Party",
    sizes: ["XS", "S", "M", "L"],
    price: 3450,
    images: [dress, hero1, shirt],
    description:
      "Our house red, poured into a fluid midi silhouette. Softly gathered waist, floating skirt and a finish that photographs beautifully under any light.",
    badge: "New",
  },
  {
    id: "core-slim-denim",
    name: "Core Slim Denim",
    category: "Denim",
    style: "Casual",
    sizes: ["28", "30", "32", "34", "36"],
    price: 2290,
    oldPrice: 2790,
    images: [jeans, hero2, sneakers],
    description:
      "Mid-rise slim denim in comfort-stretch indigo. Broken-in from the first wear, with reinforced stitching built for everyday rotation.",
  },
  {
    id: "field-olive-hoodie",
    name: "Field Olive Hoodie",
    category: "Hoodies",
    style: "Streetwear",
    sizes: ["M", "L", "XL", "XXL"],
    price: 2650,
    images: [hoodie, hero2, tshirt],
    description:
      "Heavyweight brushed fleece with a boxy, oversized drop shoulder. Double-lined hood, ribbed cuffs and a kangaroo pocket deep enough to matter.",
    badge: "Trending",
  },
  {
    id: "court-white-sneakers",
    name: "Court White Sneakers",
    category: "Footwear",
    style: "Sporty",
    sizes: ["39", "40", "41", "42", "43", "44"],
    price: 3990,
    images: [sneakers, hero3, jeans],
    description:
      "Minimal full-grain leather court sneakers on a cushioned rubber cup sole. Neutral enough for tailoring, tough enough for the pavement.",
  },
  {
    id: "midnight-tailored-blazer",
    name: "Midnight Tailored Blazer",
    category: "Outerwear",
    style: "Formal",
    sizes: ["S", "M", "L", "XL"],
    price: 5490,
    oldPrice: 6900,
    images: [blazer, hero1, shirt],
    description:
      "Single-breasted blazer in a fine matte weave with a half-canvas front, natural shoulder and a lining that breathes through long evenings.",
    badge: "Premium",
  },
  {
    id: "everyday-black-tee",
    name: "Everyday Black Tee",
    category: "T-Shirts",
    style: "Casual",
    sizes: ["XS", "S", "M", "L", "XL"],
    price: 890,
    images: [tshirt, hero2, hoodie],
    description:
      "The tee that survives the wash cycle. Combed cotton jersey, a clean rib neckline and a straight fit that keeps its shape season after season.",
  },
  {
    id: "studio-green-hoodie",
    name: "Studio Ribbed Knit",
    category: "Hoodies",
    style: "Minimal",
    sizes: ["S", "M", "L"],
    price: 2150,
    images: [hoodie, tshirt, hero3],
    description:
      "A softly ribbed knit in earthy olive, engineered for layering. Fine gauge, matte finish, zero fuss.",
  },
  {
    id: "linen-summer-dress",
    name: "Linen Summer Dress",
    category: "Dresses",
    style: "Minimal",
    sizes: ["XS", "S", "M", "L", "XL"],
    price: 2790,
    images: [dress, shirt, hero1],
    description:
      "Washed linen blend with a relaxed drape and adjustable straps. Light, cool and built for long warm days.",
  },
  {
    id: "utility-denim-relaxed",
    name: "Utility Relaxed Denim",
    category: "Denim",
    style: "Streetwear",
    sizes: ["30", "32", "34", "36"],
    price: 2490,
    images: [jeans, hoodie, hero2],
    description:
      "Relaxed straight leg with utility pockets and a rigid rinse that fades into something personal.",
  },
  {
    id: "runner-low-sneakers",
    name: "Runner Low Sneakers",
    category: "Footwear",
    style: "Sporty",
    sizes: ["40", "41", "42", "43"],
    price: 3290,
    images: [sneakers, jeans, hero3],
    description:
      "Lightweight low-profile runners with a breathable upper and responsive foam midsole for all-day wear.",
  },
  {
    id: "classic-poplin-shirt",
    name: "Classic Poplin Shirt",
    category: "Shirts",
    style: "Minimal",
    sizes: ["S", "M", "L", "XL", "XXL"],
    price: 1690,
    images: [shirt, blazer, hero3],
    description:
      "Crisp poplin with a soft-hand finish and a slightly relaxed body. A quiet, dependable staple.",
  },
];

export const HERO_SLIDES = [
  {
    image: hero1,
    eyebrow: "New Season 2026",
    title: "Dressed in\nSignature Red",
    copy: "The EASY evening capsule — bold silhouettes, effortless finish.",
    cta: "Shop the drop",
  },
  {
    image: hero2,
    eyebrow: "Street Edit",
    title: "Everyday\nWearable Icons",
    copy: "Heavyweight fleece, utility denim and layers built to live in.",
    cta: "Explore streetwear",
  },
  {
    image: hero3,
    eyebrow: "Essentials",
    title: "Build the\nEasy Wardrobe",
    copy: "Curated basics in every size and style, priced to stack.",
    cta: "Browse essentials",
  },
];

export const CATEGORIES = Array.from(new Set(PRODUCTS.map((p) => p.category))).sort();
export const STYLES = Array.from(new Set(PRODUCTS.map((p) => p.style))).sort();
export const SIZES = Array.from(new Set(PRODUCTS.flatMap((p) => p.sizes))).sort((a, b) => {
  const order = ["XS", "S", "M", "L", "XL", "XXL"];
  const ai = order.indexOf(a);
  const bi = order.indexOf(b);
  if (ai !== -1 && bi !== -1) return ai - bi;
  if (ai !== -1) return -1;
  if (bi !== -1) return 1;
  return Number(a) - Number(b);
});

export const formatPrice = (value: number) =>
  `$${value.toLocaleString("en-US")}`;

export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id);

export const getImageSrc = (image: Product["images"][number]) =>
  typeof image === "string" ? image : image.src;
