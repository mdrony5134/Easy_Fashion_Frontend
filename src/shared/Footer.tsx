import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import { TbCurrencyTaka } from "react-icons/tb";

import logo from "@/assets/logo.webp";

export function Footer() {
  return (
    <footer className="mt-24 bg-default text-white">
      <div className="container mx-auto grid gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image src={logo} alt="EASY fashion" className="h-9 w-auto" priority />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
            EASY is a modern fashion house building wearable essentials — cut clean, priced fair and
            made to last across every size and style.
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-brand-green">
            Est. 2012 · 40+ stores
          </p>
        </div>

        <div>
          <h3 className="text-xl text-brand-green">Company</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>
              <Link href="/shop" className="transition-colors hover:text-primary">
                Shop all
              </Link>
            </li>
            <li>About EASY</li>
            <li>Careers</li>
            <li>Store locator</li>
            <li>Size guide</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl text-brand-green">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
              128 Gulshan Avenue, Dhaka 1212
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0 text-primary" />
              +880 1700 000 000
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 shrink-0 text-primary" />
              support@easyfashion.com
            </li>
            <li>Sat – Thu · 10:00 – 20:00</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl text-brand-green">Follow</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              { icon: Facebook, label: "Facebook" },
              { icon: Instagram, label: "Instagram" },
              { icon: Twitter, label: "X" },
              { icon: Youtube, label: "YouTube" },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid size-10 place-items-center rounded-full border border-ink-foreground/20 transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
          <p className="mt-5 text-sm text-white/70">
            Free shipping on orders over <TbCurrencyTaka className="inline text-base -mt-0.5 -mr-0.5" />5,000. Easy 14-day exchange.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-5 sm:px-6">
        <p className="container mx-auto text-center text-xs text-white/60">
          © {new Date().getFullYear()} EASY Fashion Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
