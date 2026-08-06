"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { TbCurrencyTaka } from "react-icons/tb";
import { GiClothes } from "react-icons/gi";

const slides = [
  {
    tag: "New Season",
    title: "Summer Linen, Reimagined",
    copy: "Featherweight layers built for humid mornings and long evenings.",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80",
  },
  {
    tag: "Limited Drop",
    title: "Street Essentials 02",
    copy: "Heavyweight fleece, boxy fits and prints from our Dhaka studio.",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1600&q=80",
  },
  {
    tag: "Festive Edit",
    title: "Ethnic Craft Collection",
    copy: "Hand-embroidered detail on breathable cotton voile and silk.",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80",
  },
];

export function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setActive((value) => (value + 1) % slides.length),
      5000,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <section className="relative h-[78vh] min-h-[520px] w-full overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.title}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: index === active ? 1 : 0 }}
            aria-hidden={index !== active}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              sizes="100vw"
              className="scale-105 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/20" />
          </div>
        ))}

        <div className="container mx-auto relative flex h-full flex-col justify-center px-4 sm:px-6">
          <div key={active} className="animate-fade-up max-w-xl text-white">
            <span className="inline-flex items-center gap-2 rounded-full bg-brandGreen px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white">
              <GiClothes className="h-3.5 w-3.5" /> {slides[active]!.tag}
            </span>
            <h1 className="mt-5 text-4xl font-display font-normal leading-[0.9] tracking-wider sm:text-6xl lg:text-7xl text-white uppercase">
              {slides[active]!.title}
            </h1>
            <p className="mt-4 max-w-md text-base text-white/90 sm:text-lg">
              {slides[active]!.copy}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-primary border border-primary px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary/90"
              >
                Shop the collection <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
              >
                Women&apos;s picks
              </Link>
            </div>
          </div>

          <div className="absolute bottom-8 left-4 flex gap-2 sm:left-6">
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => setActive(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === active ? "w-10 bg-primary" : "w-4 bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="bg-primary border-y border-white/10 overflow-hidden py-3 text-white">
        <div className="animate-marquee flex w-max gap-10 whitespace-nowrap text-xs font-bold uppercase tracking-[0.3em]">
          {Array.from({ length: 2 }).map((_, index) => (
            <span key={index} className="flex gap-10">
              <span className="flex items-center">
                Free delivery over <TbCurrencyTaka className="text-lg" />
                3000
              </span>
              <span className="mt-1">
                <GoDotFill />
              </span>
              <span>7 day easy returns</span>
              <span className="mt-1">
                <GoDotFill />
              </span>
              <span>Made in Bangladesh</span>
              <span className="mt-1">
                <GoDotFill />
              </span>
              <span>Cash on delivery</span>
              <span className="mt-1">
                <GoDotFill />
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeroCarousel;
