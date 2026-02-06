import type { Metadata } from "next";
import "../globals.css";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Toaster } from "@/components/ui/toaster";
import { env } from "@/lib/env";

export const metadata: Metadata = {
  title: `${env.NEXT_PUBLIC_SITE_NAME} — ${env.NEXT_PUBLIC_SITE_TAGLINE}`,
  description: env.NEXT_PUBLIC_SITE_TAGLINE
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Toaster>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Toaster>
      </body>
    </html>
  );
}
