"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSafeBite, Language } from "@/context/SafeBiteContext";

const searchCatalog = [
  { name: "Haldiram's Aloo Bhujia", type: "Packaged Snack", risk: "CAUTION", path: "/scan" },
  { name: "Britannia Good Day Biscuits", type: "Biscuits & Cookies", risk: "HIGH_RISK", path: "/scan" },
  { name: "Kellogg's Cornflakes", type: "Breakfast Cereal", risk: "CAUTION", path: "/scan" },
  { name: "Real Mixed Fruit Juice", type: "Beverages", risk: "HIGH_RISK", path: "/scan" },
  { name: "Roasted Makhana (Fox Nuts)", type: "Traditional Snack", risk: "SAFE", path: "/scan" },
  { name: "Khapli Wheat Roti", type: "Grains & Breads", risk: "SAFE", path: "/scan" },
];

export default function Header() {
  const pathname = usePathname();
  const { language, setLanguage, profile, t } = useSafeBite();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredSearch = searchQuery.trim()
    ? searchCatalog.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const navLinks = [
    { name: t("home"), path: "/" },
    { name: t("quickScan"), path: "/scan" },
    { name: t("myProfile"), path: "/profile" },
    { name: t("describeMeal"), path: "/meal" },
    { name: t("dailyDashboard"), path: "/dashboard" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#fdf9f1]/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(45,90,39,0.05)] border-b border-[#c2c9bb]/25">
      <div className="h-20 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex items-center justify-between gap-2 lg:gap-4">
        {/* Zone 1: Brand (Left) */}
        <div className="flex items-center flex-shrink-0">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform shadow-xs">
              <span className="material-symbols-outlined text-primary text-xl sm:text-2xl group-hover:rotate-12 transition-transform duration-300">
                eco
              </span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-title-lg text-lg sm:text-xl font-bold tracking-tight text-primary">
                SafeBite
              </span>
              <span className="hidden xl:inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#ffdea5] text-[#271900] whitespace-nowrap">
                Clinical Care
              </span>
            </div>
          </Link>
        </div>

        {/* Zone 2: Desktop Navigation (Center, Perfectly Aligned) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 bg-[#f7f3eb] p-1.5 rounded-full border border-[#c2c9bb]/35 shadow-xs">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`whitespace-nowrap px-3 xl:px-4 py-1.5 xl:py-2 transition-all duration-200 text-xs xl:text-sm font-semibold rounded-full ${
                  isActive
                    ? "bg-primary-container text-white font-bold shadow-sm"
                    : "text-[#42493e] hover:bg-[#ece8e0] hover:text-[#1c1c17]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Right Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Search Bar */}
          <div className="relative hidden lg:block">
            <div className="flex items-center bg-[#f7f3eb] border border-[#c2c9bb]/40 rounded-full px-3 py-1.5 gap-1.5 focus-within:ring-2 focus-within:ring-primary-container focus-within:border-transparent">
              <span className="material-symbols-outlined text-[#42493e] text-base">search</span>
              <input
                className="bg-transparent text-[#1c1c17] text-xs focus:outline-none placeholder:text-[#42493e]/60 w-24 xl:w-36"
                placeholder={t("searchPlaceholder")}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchOpen(true);
                }}
                onFocus={() => setSearchOpen(true)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-xs text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Quick Search Results Dropdown */}
            {searchOpen && searchQuery.trim().length > 0 && (
              <div className="absolute top-12 left-0 right-0 bg-white rounded-xl shadow-xl border border-[#c2c9bb]/30 p-2 z-50 max-h-72 overflow-y-auto">
                {filteredSearch.length === 0 ? (
                  <div className="p-3 text-xs text-[#42493e] text-center">
                    No matching food found in local cache. Try barcode lookup or scan.
                  </div>
                ) : (
                  filteredSearch.map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.path}
                      onClick={() => setSearchOpen(false)}
                      className="p-2.5 rounded-lg hover:bg-[#f7f3eb] flex items-center justify-between transition-colors block"
                    >
                      <div>
                        <div className="text-sm font-semibold text-[#1c1c17]">{item.name}</div>
                        <div className="text-xs text-[#42493e]">{item.type}</div>
                      </div>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          item.risk === "SAFE"
                            ? "bg-[#bcf0ae] text-[#002201]"
                            : item.risk === "CAUTION"
                            ? "bg-[#ffdea5] text-[#271900]"
                            : "bg-[#ffdad6] text-[#93000a]"
                        }`}
                      >
                        {item.risk}
                      </span>
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Language Switcher */}
          <div className="relative flex items-center bg-[#f7f3eb] border border-[#c2c9bb]/30 rounded-full px-3 py-1.5 text-[#42493e]">
            <span className="material-symbols-outlined text-base mr-1 text-primary">translate</span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-transparent font-label-md text-xs sm:text-sm text-[#1c1c17] font-semibold focus:outline-none cursor-pointer pr-1"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="mr">मराठी</option>
            </select>
          </div>

          {/* Notifications Popover */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#f7f3eb] hover:bg-[#ece8e0] text-[#42493e] hover:text-[#1c1c17] transition-colors"
              aria-label="Notifications"
            >
              <span className="material-symbols-outlined text-xl">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-secondary ring-2 ring-[#fdf9f1]" />
            </button>

            {notifOpen && (
              <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-xl border border-[#c2c9bb]/30 p-4 z-50">
                <div className="flex items-center justify-between border-b border-[#c2c9bb]/30 pb-2 mb-2">
                  <span className="font-bold text-sm text-primary">Clinical Alerts & Updates</span>
                  <span className="text-[10px] text-gray-500">2 New</span>
                </div>
                <div className="flex flex-col gap-2.5 text-xs text-[#42493e]">
                  <div className="p-2 rounded-lg bg-[#f7f3eb] flex items-start gap-2">
                    <span className="material-symbols-outlined text-secondary text-base mt-0.5">
                      warning
                    </span>
                    <div>
                      <strong className="text-gray-900 block">Sodium Advisory:</strong>
                      Today&apos;s logged sodium is 1,280mg. Within your 2,000mg hypertension limit.
                    </div>
                  </div>
                  <div className="p-2 rounded-lg bg-[#bcf0ae]/30 flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-base mt-0.5">
                      check_circle
                    </span>
                    <div>
                      <strong className="text-gray-900 block">Doctor Tip of the Day:</strong>
                      Pairing tea with roasted makhana instead of biscuits avoids the 4 PM glycemic spike.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill */}
          <Link
            href="/profile"
            className="flex items-center gap-2 pl-1 rounded-full p-1 hover:bg-[#f7f3eb] transition-colors border border-transparent hover:border-[#c2c9bb]/30"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20"
              src={profile.avatar}
            />
            <div className="hidden sm:flex flex-col text-left pr-2">
              <span className="text-xs font-bold text-[#1c1c17] leading-tight">
                {profile.name}
              </span>
              <span className="text-[10px] text-[#42493e] leading-tight font-medium">
                {profile.role}
              </span>
            </div>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 rounded-full bg-[#f7f3eb] flex items-center justify-center text-primary"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#fdf9f1] border-b border-[#c2c9bb]/30 px-6 py-4 flex flex-col gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-full text-sm font-semibold transition-colors flex items-center justify-between ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-[#42493e] hover:bg-[#ece8e0]"
                }`}
              >
                <span>{link.name}</span>
                <span className="material-symbols-outlined text-base">chevron_right</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
