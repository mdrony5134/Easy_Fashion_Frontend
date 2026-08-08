"use client";

import logo from "@/assets/logo.webp";
import profileImage from "@/assets/profile.png";
import { Button } from "@/components/ui/button";
import { selectCartCount } from "@/redux/allSlice/cartSlice";
import { useAppSelector } from "@/redux/store";
import Cookies from "js-cookie";
import { Menu, ShoppingBag, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/cart", label: "Cart" },
];

export function Header() {
  const pathname = usePathname();
  const cartCount = useAppSelector(selectCartCount);
  const [open, setOpen] = useState(false);
  const token = Cookies.get("accessToken");

  return (
    <header className="sticky top-0 z-50 border-b border-transparent/10 bg-secondary/30 backdrop-blur-xl">
      <div className="container mx-auto grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6 lg:grid-cols-[auto_1fr_auto]">
        <Link href="/" className="flex min-w-0 items-center gap-2">
          <Image
            src={logo}
            alt="EASY fashion"
            className="h-8 w-auto shrink-0"
            priority
          />
        </Link>

        <nav className="hidden items-center justify-center gap-8 lg:flex">
          {NAV.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-semibold uppercase tracking-[0.14em] transition-colors hover:text-primary ${
                  isActive ? "text-red-500" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center justify-end gap-1 sm:gap-2">
          <Link
            href="/cart"
            className="relative inline-flex size-10 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-secondary"
            aria-label="Open cart"
          >
            <ShoppingBag className="size-5" />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid size-5 place-items-center rounded-full bg-primary text-[11px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {token ? (
            <div className="hidden items-center gap-2 sm:flex">
              <Link href="/profile">
                <div className="relative size-9 cursor-pointer overflow-hidden rounded-full border-2 border-primary/20 transition-all hover:border-primary hover:shadow-md">
                  <Image
                    src={profileImage}
                    alt="Profile"
                    className="h-full w-full object-cover"
                    width={36}
                    height={36}
                  />
                </div>
              </Link>
            </div>
          ) : (
            <Button
              asChild
              size="sm"
              className="hidden sm:inline-flex text-white bg-primary hover:bg-primary/90 rounded"
            >
              <Link href="/login">
                <User className="size-4" /> Sign in
              </Link>
            </Button>
          )}

          <button
            className="inline-flex size-10 items-center justify-center rounded-full hover:bg-secondary lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="animate-fade-in bg-background px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-3">
            {NAV.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`text-sm font-semibold uppercase tracking-[0.14em] ${
                    isActive ? "text-red-500" : "text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            {token ? (
              <>
                <Link
                  href="/profile"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-foreground"
                >
                  <div className="relative size-8 overflow-hidden rounded-full border-2 border-primary/20">
                    <Image
                      src={profileImage}
                      alt="Profile"
                      className="h-full w-full object-cover"
                      width={32}
                      height={32}
                    />
                  </div>
                  Profile
                </Link>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="text-sm font-semibold uppercase tracking-[0.14em] text-primary"
              >
                Sign in
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
