import logo from "@/assets/home/logo.png";
// import { AuthSync } from "@/components/auth/AuthSync";
import type { Metadata } from "next";
// import { Poppins } from "next/font/google";
import { AuthSync } from "@/components/auth/AuthSync";
import { Toaster } from "sonner";
import "./globals.css";
import { Providers } from "./providers/providers";

export const metadata: Metadata = {
  title: "FreemanZ LLC",
  description:
    "Welcome to FreemanZ LLC.Shop Now & Get All Your Favorite Products at Amazing Discounts!",
  icons: {
    icon: logo.src,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // _app.js or root layout
  if (typeof window !== "undefined") {
    window.addEventListener("error", (e) => {
      const chunkFailed = /Loading chunk \d+ failed/.test(e.message);
      if (chunkFailed) {
        console.warn("Chunk load failed, reloading...");
        window.location.reload();
      }
    });
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "FreemanZ LLC",
    url: "https://freemanzllc.com",
    description:
      "Shop Now & Get All Your Favorite Products at Amazing Discounts!",
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={` `}>
        {/* <NavBar /> */}
        <Providers>
          <AuthSync />
          {children}
        </Providers>
        <Toaster />

        {/* <Footer /> */}
      </body>
    </html>
  );
}
