import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

function OfferCard() {
  return (
    <section className="container mx-auto mt-20 px-4 sm:px-6">
      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Season Sale",
            copy: "Up to 30% off selected denim & shirting.",
            tone: "brand",
          },
          {
            title: "New In",
            copy: "Party-ready dresses in signature red.",
            tone: "ink",
          },
          {
            title: "Streetwear",
            copy: "Heavyweight hoodies built for layering.",
            tone: "green",
          },
        ].map((card) => (
          <div
            key={card.title}
            className={`hover-lift flex min-h-44 flex-col justify-between rounded-xl p-7 ${
              card.tone === "brand"
                ? "bg-primary text-white"
                : card.tone === "ink"
                  ? "bg-black/80 text-white"
                  : "bg-brandGreen text-secondary"
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
  );
}

export default OfferCard;
