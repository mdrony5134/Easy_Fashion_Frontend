import { ArrowRight, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function PromotionalBanner() {
  return (
    <section className="container mx-auto px-4 sm:px-6 pb-10 md:pb-20 pt-5">
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="relative overflow-hidden rounded-3xl p-8 bg-[#04612e] text-white lg:col-span-2 lg:p-12">
          <div className="relative z-10">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/70">
              Mid-season sale
            </span>
            <h2 className="mt-3 max-w-sm text-3xl font-extrabold sm:text-4xl">
              Up to 40% off selected styles
            </h2>
            <p className="mt-3 max-w-sm text-sm text-white/80">
              Refresh the wardrobe with pieces made to be worn on repeat.
            </p>
            <Link
              href="/shop"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#df1b23] px-6 py-3 text-sm font-bold text-white transition-transform hover:bg-[#c2151c] hover:scale-105"
            >
              Explore offers <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <Truck className="animate-float absolute -bottom-6 right-6 h-32 w-32 md:h-40 md:w-40 text-[#0f7a39] pointer-events-none" />
        </div>
        <div className="relative overflow-hidden rounded-3xl">
          <Image
            src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=900&q=80"
            alt="Model wearing the new arrivals collection"
            className="h-full min-h-[240px] w-full object-cover transition-transform duration-700 hover:scale-105"
            fill
            sizes="(min-width: 1024px) 28rem, 22.5rem"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-2xl font-extrabold">New Arrivals</h3>
            <p className="text-sm text-white/80">Fresh drops every Thursday</p>
          </div>
        </div>
      </div>
    </section>
  );
}
