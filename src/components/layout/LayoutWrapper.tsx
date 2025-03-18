"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showHeaderFooter = ["/", "/auth/login", "/auth/signup"].includes(pathname);

  return (
    <>
      {showHeaderFooter && <Header />}
      <main className="min-h-screen">{children}</main>
      {showHeaderFooter && <Footer />}
    </>
  );
}
