"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CATEGORIES, PRODUCTS, SIZES, STYLES } from "@/lib/product";
import { ProductCard } from "./ProductCard";

function FilterGroup({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div>
      <h3 className="text-sm tracking-[0.18em] text-muted-foreground">{title}</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => {
          const active = selected.includes(option);
          return (
            <button
              key={option}
              onClick={() => onToggle(option)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Products() {
  const [categories, setCategories] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [styles, setStyles] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const toggle = (setter: React.Dispatch<React.SetStateAction<string[]>>) => (value: string) =>
    setter((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));

  const filtered = useMemo(
    () =>
      PRODUCTS.filter(
        (product) =>
          (categories.length === 0 || categories.includes(product.category)) &&
          (styles.length === 0 || styles.includes(product.style)) &&
          (sizes.length === 0 || product.sizes.some((size) => sizes.includes(size))),
      ),
    [categories, sizes, styles],
  );

  const activeCount = categories.length + sizes.length + styles.length;

  const clearAll = () => {
    setCategories([]);
    setSizes([]);
    setStyles([]);
  };

  return (
    <div className="container mx-auto px-4 py-10 sm:px-6 sm:py-14">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Collection</p>
          <h1 className="mt-2 text-4xl sm:text-6xl">The full rail</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {filtered.length} of {PRODUCTS.length} products
            {activeCount > 0 ? ` · ${activeCount} filters active` : ""}
          </p>
        </div>
        <Button
          variant="outline"
          className="shrink-0 lg:hidden"
          onClick={() => setShowFilters((value) => !value)}
        >
          <SlidersHorizontal className="size-4" /> Filters
        </Button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside
          className={`${showFilters ? "block animate-fade-in" : "hidden"} h-fit rounded-xl border border-border bg-card p-5 lg:sticky lg:top-24 lg:block`}
        >
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-xl">Filters</h2>
            {activeCount > 0 && (
              <button onClick={clearAll} className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                <X className="size-3.5" /> Clear
              </button>
            )}
          </div>
          <div className="mt-6 space-y-7">
            <FilterGroup
              title="CATEGORY"
              options={CATEGORIES}
              selected={categories}
              onToggle={toggle(setCategories)}
            />
            <FilterGroup title="SIZE" options={SIZES} selected={sizes} onToggle={toggle(setSizes)} />
            <FilterGroup
              title="STYLE"
              options={STYLES}
              selected={styles}
              onToggle={toggle(setStyles)}
            />
          </div>
        </aside>

        <div>
          {filtered.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border p-16 text-center">
              <h2 className="text-2xl">Nothing matches</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Try removing a filter to see more products.
              </p>
              <Button className="mt-5" onClick={clearAll}>
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
