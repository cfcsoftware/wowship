import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Nexion-ERP",
  description: "AI Enabled SaaS Platform for Legal Professionals",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
