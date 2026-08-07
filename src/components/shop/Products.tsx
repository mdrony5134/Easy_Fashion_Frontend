"use client";

import { useMemo, useState, useEffect } from "react";
import { SlidersHorizontal, X, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductCard } from "./ProductCard";
import Pagination from "@/components/ui/pagination";
import { useGetCategoryQuery, useGetProductListQuery, useGetSizesQuery, useGetStylesQuery } from "@/redux/api/productApi";
import { ApiProduct, ApiSize } from "@/types/productTypes";
import { type Product } from "@/lib/product";
import FilterGroup from "./FilterGroup";

// Helper function 
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

export default function Products() {
  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  const { data: productsData, isLoading: productsLoading, error: productsError } = useGetProductListQuery({
    page: currentPage,
    limit: itemsPerPage,
    category: selectedCategories.join(","),
    style: selectedStyles.join(","),
    size: selectedSizes.join(","),
    search: searchQuery,
  });

  const { data: categoriesData } = useGetCategoryQuery({});
  const { data: stylesData } = useGetStylesQuery({});
  const { data: sizesData } = useGetSizesQuery({});

  
  const categoryOptions = categoriesData?.data?.map((cat: any) => cat.name) || [];
  const styleOptions = stylesData?.data?.map((style: any) => style.name) || [];
  const sizeOptions = sizesData?.data?.map((size: any) => size.name) || [];

  
  const products: Product[] = productsData?.data?.map((item: ApiProduct) => 
    transformApiProduct(item)
  ) || [];

  const totalProducts = productsData?.meta?.total || 0;
  const totalPages = productsData?.meta?.totalPages || 0;

 
  const toggle = (setter: React.Dispatch<React.SetStateAction<string[]>>) => (value: string) =>
    setter((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));

  const activeCount = selectedCategories.length + selectedSizes.length + selectedStyles.length;

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedStyles([]);
    setSearchQuery("");
    setCurrentPage(1);
  };

  // Reset filter
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, selectedSizes, selectedStyles, searchQuery]);

  // Loading state
  if (productsLoading) {
    return (
      <div className="container mx-auto px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

  // Error state
  if (productsError) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-50 mb-6">
          <X className="w-10 h-10 text-red-500" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          Unable to Load Products
        </h3>
        <p className="text-gray-500 max-w-md mx-auto">
          We're experiencing technical difficulties. Please try again later.
        </p>
        <Button 
          className="mt-6 bg-primary text-white hover:bg-primary/90"
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 sm:px-6 sm:py-14">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Collection</p>
          <h1 className="mt-2 text-4xl sm:text-6xl">The full rail</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {totalProducts} products available
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

      <div className="mt-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 rounded-full border-border bg-white focus:border-primary focus:ring-primary"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>

      {/* filter section */}

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
        
        <aside
          className={`${showFilters ? "block animate-fade-in" : "hidden"} h-fit rounded-xl border-transparent/80 shadow-md p-5 lg:sticky lg:top-24 lg:block`}
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
              options={categoryOptions}
              selected={selectedCategories}
              onToggle={toggle(setSelectedCategories)}
            />
            <FilterGroup
              title="SIZE"
              options={sizeOptions}
              selected={selectedSizes}
              onToggle={toggle(setSelectedSizes)}
            />
            <FilterGroup
              title="STYLE"
              options={styleOptions}
              selected={selectedStyles}
              onToggle={toggle(setSelectedStyles)}
            />
          </div>
        </aside>

       {/* products section */}
        <div>
          {products.length === 0 ? (
            <div className="rounded-xl border-2 border-dashed border-primary/40 p-16 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-50 mb-6">
                <X className="w-10 h-10 text-amber-500" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">No Products Found</h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
                {searchQuery 
                  ? `No results found for "${searchQuery}". Try adjusting your search or filters.`
                  : "No products match your current filters. Try removing some filters to see more products."}
              </p>
              {(activeCount > 0 || searchQuery) && (
                <Button className="mt-6 bg-primary text-white hover:bg-primary/90" onClick={clearAll}>
                  Clear all filters
                </Button>
              )}
            </div>
          ) : (
            <>
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              
          
              {totalPages > 1 && (
                <div className="mt-10">
                  <Pagination
                    totalPage={totalPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}