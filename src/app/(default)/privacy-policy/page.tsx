import type { Metadata } from "next";

import PrivacyPolicy from "@/components/privacy/PrivacyPolicy";

export const metadata: Metadata = {
  title: "Privacy Policy | EASY Fashion",
  description: "Read our privacy policy to understand how we collect, use, and protect your data.",
};

export default function Page() {
  return <PrivacyPolicy />;
}
