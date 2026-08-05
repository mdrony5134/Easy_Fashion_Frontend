"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, ShoppingBag, User, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

import logo from "@/assets/logo.webp";
import { Button } from "@/components/ui/button";
import { selectCartCount } from "@/redux/allSlice/cartSlice";
import { useAppSelector } from "@/redux/store";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/cart", label: "Cart" },
];

export function Header() {
  const { data: session } = useSession();
  const cartCount = useAppSelector(selectCartCount);
  const [open, setOpen] = useState(false);
  const userName = session?.user?.name ?? session?.user?.email ?? "Account";

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="container mx-auto grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6 lg:grid-cols-[auto_1fr_auto]">
        <Link href="/" className="flex min-w-0 items-center gap-2">
          <Image src={logo} alt="EASY fashion" className="h-8 w-auto shrink-0" priority />
        </Link>

        <nav className="hidden items-center justify-center gap-8 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-1 sm:gap-2">
          <Link
            href="/cart"
            className="relative inline-flex size-10 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-secondary"
            aria-label="Open cart"
          >
            <ShoppingBag className="size-5" />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid size-5 place-items-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                {cartCount}
              </span>
            )}
          </Link>

          {session ? (
            <div className="hidden items-center gap-2 sm:flex">
              <span className="max-w-[9rem] truncate text-sm font-semibold">{userName.split(" ")[0]}</span>
              <Button variant="outline" size="sm" onClick={() => signOut({ callbackUrl: "/" })}>
                Log out
              </Button>
            </div>
          ) : (
            <Button asChild size="sm" className="hidden sm:inline-flex">
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
        <div className="animate-fade-in border-t border-border bg-background px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-3">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-sm font-semibold uppercase tracking-[0.14em] text-foreground"
              >
                {item.label}
              </Link>
            ))}
            {session ? (
              <button
                className="text-left text-sm font-semibold uppercase tracking-[0.14em] text-primary"
                onClick={() => {
                  signOut({ callbackUrl: "/" });
                  setOpen(false);
                }}
              >
                Log out
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="text-sm font-semibold uppercase tracking-[0.14em] text-primary"
              >
                Sign in / Register
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
