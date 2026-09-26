import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SafeBiteProvider } from "@/context/SafeBiteContext";

export const metadata: Metadata = {
  title: "SafeBite - Food Literacy & Dietary Health | Safe Indian Diet Guardian",
  description:
    "Simple, doctor-backed dietary safety for Indian families living with diabetes, hypertension, and digestive sensitivities. Know exactly what's in your grocery cart and kitchen plate.",
  keywords: [
    "SafeBite",
    "Indian Diet Health",
    "Diabetes Food Scanner",
    "Hypertension Sodium Checker",
    "ICMR Diet Guidelines",
    "Indian Nutrition App",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Atkinson+Hyperlegible:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#fdf9f1] text-[#1c1c17] antialiased">
        <SafeBiteProvider>
          <Header />
          <main className="w-full pt-20 flex-1 flex flex-col">{children}</main>
          <Footer />
        </SafeBiteProvider>
      </body>
    </html>
  );
}
