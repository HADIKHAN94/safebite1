import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#f7f3eb] border-t border-[#c2c9bb]/30 pt-16 pb-10 mt-auto">
      <div className="w-full px-4 sm:px-8 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-2xl">spa</span>
            <span className="font-title-lg text-xl font-bold text-primary">SafeBite</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#bcf0ae] text-[#002201] font-semibold">
              ICMR & WHO Calibrated
            </span>
          </div>
          <p className="text-sm text-[#42493e] max-w-md leading-relaxed">
            Demystifying daily food ingredients, cultural Indian cuisines, and clinical dietary guidelines through warm, grounded nutrition intelligence.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-sm font-semibold text-[#42493e]">
          <Link href="/" className="hover:text-primary transition-colors">
            About SafeBite
          </Link>
          <Link href="/scan" className="hover:text-primary transition-colors">
            Live Scanner
          </Link>
          <Link href="/profile" className="hover:text-primary transition-colors">
            Dietary Profile
          </Link>
          <Link href="/meal" className="hover:text-primary transition-colors">
            Describe a Meal
          </Link>
          <Link href="/dashboard" className="hover:text-primary transition-colors">
            Daily Log
          </Link>
        </div>
      </div>

      <div className="w-full px-4 sm:px-8 max-w-7xl mx-auto mt-8 pt-6 border-t border-[#c2c9bb]/30 flex flex-col sm:flex-row items-center justify-between text-[#42493e] text-xs gap-3">
        <span>© 2025 SafeBite Healthcare Intelligence. Formulated for safe nourishment.</span>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#26733e] inline-block animate-pulse"></span>
          <span>Support available in English, हिन्दी and मराठी</span>
        </div>
      </div>
    </footer>
  );
}
