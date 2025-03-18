import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/layout/LayoutWrapper"; // Import new wrapper

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TaskMaster - Your Personal Todo App",
  description: "Manage your tasks efficiently with TaskMaster",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
       
          <LayoutWrapper>{children}</LayoutWrapper>
       
      </body>
    </html>
  );
}
