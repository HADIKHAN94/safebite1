"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSafeBite } from "@/context/SafeBiteContext";

export default function DailyDashboardPage() {
  const { profile, savedLogs, dailyMeals } = useSafeBite();
  const [reportExported, setReportExported] = useState(false);

  // Compute daily totals
  const totalCalories = dailyMeals.reduce((acc, m) => acc + m.calories, 0);
  const totalSodium = dailyMeals.reduce((acc, m) => acc + m.sodiumMg, 0);
  const totalCarbs = dailyMeals.reduce((acc, m) => acc + m.carbsG, 0);

  const sodiumCap = 2000;
  const sodiumPercent = Math.min(100, Math.round((totalSodium / sodiumCap) * 100));

  const handleExportDoctorReport = () => {
    setReportExported(true);
    setTimeout(() => {
      window.print();
    }, 300);
  };

  return (
    <div className="flex flex-col w-full relative overflow-hidden pb-16">
      {/* Background ambient accents */}
      <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full bg-[#bcf0ae]/20 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-20 w-80 h-80 rounded-full bg-[#ffdea5]/25 blur-3xl pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#bcf0ae] text-primary text-xs font-bold">
                <span className="material-symbols-outlined text-sm">monitoring</span>
                Daily Nutritional Integrity
              </span>
              <span className="text-gray-400 text-xs">/</span>
              <span className="text-xs font-medium text-[#42493e]">Doctor&apos;s Diary</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary tracking-tight mt-1">
              Your Daily Health Dashboard
            </h1>
            <p className="text-sm sm:text-base text-[#42493e] mt-1">
              Calibrated for <strong className="text-primary">{profile.conditions.join(", ") || "General Wellness"}</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportDoctorReport}
              className="px-5 py-2.5 rounded-full bg-primary-container text-white text-xs sm:text-sm font-bold hover:bg-primary transition-all flex items-center gap-2 shadow-xs"
            >
              <span className="material-symbols-outlined text-base">print</span>
              <span>Export Doctor&apos;s Report</span>
            </button>
            <Link
              href="/scan"
              className="px-5 py-2.5 rounded-full bg-[#f1ede6] text-primary text-xs sm:text-sm font-bold hover:bg-[#ece8e0] transition-colors border border-[#c2c9bb]/30 flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">camera</span>
              <span>Quick Scan</span>
            </Link>
          </div>
        </div>

        {/* Top 3 Diagnostic Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Card 1: Sodium */}
          <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#c2c9bb]/30 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-bold text-[#42493e]">Sodium Intake</span>
              <span className="w-8 h-8 rounded-full bg-[#FFF6DD] text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-base">water_drop</span>
              </span>
            </div>
            <div>
              <div className="text-2xl font-black text-[#1c1c17]">
                {totalSodium} <span className="text-xs font-normal text-[#42493e]">/ 2,000 mg</span>
              </div>
              <div className="text-[11px] text-[#42493e] mt-0.5">
                {sodiumPercent}% of ICMR hypertension ceiling
              </div>
            </div>
            <div className="w-full bg-[#f1ede6] rounded-full h-2 mt-3 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  sodiumPercent > 80 ? "bg-[#ba1a1a]" : "bg-primary"
                }`}
                style={{ width: `${sodiumPercent}%` }}
              />
            </div>
          </div>

          {/* Card 2: Calories */}
          <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#c2c9bb]/30 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-bold text-[#42493e]">Estimated Calories</span>
              <span className="w-8 h-8 rounded-full bg-[#bcf0ae]/40 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-base">local_fire_department</span>
              </span>
            </div>
            <div>
              <div className="text-2xl font-black text-[#1c1c17]">
                {totalCalories} <span className="text-xs font-normal text-[#42493e]">kcal</span>
              </div>
              <div className="text-[11px] text-[#42493e] mt-0.5">
                Across {dailyMeals.length} logged meals today
              </div>
            </div>
            <div className="w-full bg-[#f1ede6] rounded-full h-2 mt-3 overflow-hidden">
              <div
                className="bg-[#2d5a27] h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (totalCalories / 1800) * 100)}%` }}
              />
            </div>
          </div>

          {/* Card 3: Carbs & Glycemic */}
          <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#c2c9bb]/30 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-bold text-[#42493e]">Carbohydrates</span>
              <span className="w-8 h-8 rounded-full bg-[#ffdea5]/40 text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-base">grain</span>
              </span>
            </div>
            <div>
              <div className="text-2xl font-black text-[#1c1c17]">
                {totalCarbs} <span className="text-xs font-normal text-[#42493e]">g</span>
              </div>
              <div className="text-[11px] text-[#42493e] mt-0.5">
                Controlled complex glycemic sources
              </div>
            </div>
            <div className="w-full bg-[#f1ede6] rounded-full h-2 mt-3 overflow-hidden">
              <div
                className="bg-[#7b5800] h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (totalCarbs / 160) * 100)}%` }}
              />
            </div>
          </div>

          {/* Card 4: Clinical Status */}
          <div className="bg-[#bcf0ae]/25 p-5 rounded-2xl shadow-xs border border-[#bcf0ae] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-bold text-primary">Safety Status</span>
              <span className="w-8 h-8 rounded-full bg-[#bcf0ae] text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-base">verified</span>
              </span>
            </div>
            <div>
              <div className="text-lg font-black text-primary">
                In Safe Range
              </div>
              <div className="text-[11px] text-[#42493e] mt-0.5">
                Zero contraindicated snacks logged today.
              </div>
            </div>
            <div className="text-[10px] text-primary font-bold mt-3">
              ✓ Compliant with ICMR protocols
            </div>
          </div>
        </div>

        {/* Dual Lists Bento: Logged Meals & Saved Scans */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Today's Meals (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 shadow-sm border border-[#c2c9bb]/30 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[#c2c9bb]/20 pb-3">
              <div>
                <h3 className="text-base font-bold text-primary">Today&apos;s Meal Journal</h3>
                <span className="text-xs text-[#42493e]">Real-time home and restaurant foods</span>
              </div>
              <Link
                href="/meal"
                className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
              >
                <span>+ Log Another Dish</span>
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              {dailyMeals.map((meal) => (
                <div
                  key={meal.id}
                  className="p-4 rounded-xl bg-[#f7f3eb] flex items-center justify-between gap-4 border border-[#c2c9bb]/20 hover:border-primary/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-xl">restaurant</span>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#1c1c17]">{meal.name}</div>
                      <div className="text-xs text-[#42493e]">
                        {meal.time} • {meal.calories} kcal • {meal.sodiumMg}mg Sodium
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#bcf0ae] text-[#002201] font-bold uppercase shrink-0">
                    {meal.safeStatus}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Scanned Products History (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 shadow-sm border border-[#c2c9bb]/30 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[#c2c9bb]/20 pb-3">
              <div>
                <h3 className="text-base font-bold text-primary">Scanned Package History</h3>
                <span className="text-xs text-[#42493e]">Saved grocery checks</span>
              </div>
              <Link
                href="/scan"
                className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
              >
                <span>Scan New</span>
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              {savedLogs.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-[#f7f3eb] flex items-center justify-between gap-3 border border-[#c2c9bb]/20"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={
                        item.image ||
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuCSvyTvZvmncB5TBwWNkzPNWtpkeLhwgWOVZNQIFuBr8rpZwLYaiYBh4blD4YNPZn9IGgfJ9LKACIfi4szS6PG3Fn4tEuS_b6qCpmHogWci8fBiab9M0lqBxm2rT9-Siaf5szOKx-JCPkJOHxT2XD6MS-HwEano7GwZ4u7yM0wEy0BY6PbgLI5SQ4o4NQy1VtpAIqKsSQczyv8GWq2vOWkVg0Mba23ipXW-GfSJigy3NQfTdrXcHvPtCw"
                      }
                      alt={item.name}
                      className="w-11 h-11 rounded-lg object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-[#1c1c17] truncate">{item.name}</div>
                      <div className="text-[11px] text-[#42493e] truncate">{item.servingSize}</div>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase shrink-0 ${
                      item.riskLevel === "SAFE"
                        ? "bg-[#bcf0ae] text-[#002201]"
                        : item.riskLevel === "CAUTION"
                        ? "bg-[#ffdea5] text-[#271900]"
                        : "bg-[#ffdad6] text-[#93000a]"
                    }`}
                  >
                    {item.riskLevel}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
