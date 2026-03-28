"use client";


import Footer from "@/components/layout/homefooter";
import Navbar from "@/components/layout/homenavbar";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}