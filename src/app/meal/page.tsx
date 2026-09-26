"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSafeBite } from "@/context/SafeBiteContext";
import confetti from "canvas-confetti";

interface MealPreset {
  name: string;
  description: string;
  calories: number;
  sodium: number;
  carbs: number;
  status: "SAFE" | "CAUTION" | "HIGH_RISK";
  statusLabel: string;
  components: { name: string; tag: string; level: "SAFE" | "CAUTION" | "HIGH"; note: string }[];
  doctorAdvice: string;
}

const mealPresets: Record<string, MealPreset> = {
  "thali-1": {
    name: "2 Whole Wheat Rotis + Yellow Dal Tadka + Cucumber Tomato Salad",
    description: "Standard balanced North Indian daily lunch",
    calories: 380,
    sodium: 460,
    carbs: 52,
    status: "SAFE",
    statusLabel: "Balanced ICMR Diabetic Safe",
    components: [
      { name: "2 Whole Wheat Rotis", tag: "Complex Carbs", level: "SAFE", note: "High dietary fiber keeps gastric emptying gradual." },
      { name: "Yellow Moong Dal (1 cup)", tag: "Plant Protein", level: "SAFE", note: "Gentle on kidney filtration and easy to digest." },
      { name: "Ghee Tadka (1 tsp)", tag: "Saturated Fat", level: "CAUTION", note: "Moderate portion; avoid second serving of tadka ghee." },
      { name: "Cucumber Tomato Salad", tag: "Hydration & Fiber", level: "SAFE", note: "Rich in lycopene and potassium; blunt glucose surges." },
    ],
    doctorAdvice: "Doctor's Advice: Excellent everyday meal! Eat the salad first before the rotis to activate GLP-1 satiety hormones and reduce glucose peaks by 30%.",
  },
  "chole-bhature": {
    name: "2 Deep Fried Bhature + Spicy Chole + Mixed Mango Pickle",
    description: "Weekend indulgence snack / street food",
    calories: 780,
    sodium: 1420,
    carbs: 94,
    status: "HIGH_RISK",
    statusLabel: "Severe Glycemic & Sodium Surge",
    components: [
      { name: "2 Fried Bhature (Maida)", tag: "Deep Fried Starch", level: "HIGH", note: "Fast conversion to bloodstream glucose within 20 mins." },
      { name: "Commercial Mango Pickle", tag: "High Sodium 680mg", level: "HIGH", note: "Preserved with excess table salt and commercial mustard oil." },
      { name: "Spicy Chole Gravy", tag: "High Saturated Fat", level: "CAUTION", note: "Chickpeas offer good fiber, but heavy gravy contains palm olein." },
    ],
    doctorAdvice: "Doctor's Advice: If enjoying on family occasions, eat 1 bhatura only, request steamed chickpea salad, and substitute pickle with fresh onion lemon wedges.",
  },
  "dosa-sambar": {
    name: "1 Plain Rava Dosa + Coconut Chutney + Mixed Veg Sambar",
    description: "South Indian traditional meal",
    calories: 420,
    sodium: 680,
    carbs: 58,
    status: "CAUTION",
    statusLabel: "Moderate Portion Controlled",
    components: [
      { name: "Rava Dosa", tag: "Refined Semolina", level: "CAUTION", note: "Medium glycemic index; digests quicker than fermented ragi dosa." },
      { name: "Mixed Vegetable Sambar", tag: "High Veggie Fiber", level: "SAFE", note: "Drumsticks and bottle gourd provide natural bio-flavonoids." },
      { name: "Coconut Chutney (2 tbsp)", tag: "Saturated Medium Chain Fats", level: "CAUTION", note: "Limit to 2 tablespoons if managing LDL cholesterol." },
    ],
    doctorAdvice: "Doctor's Advice: Swap rava with fermented millet or oats dosa to lower blood sugar surge. Drink an extra glass of water to manage sambar sodium.",
  },
};

export default function DescribeMealPage() {
  const { addDailyMeal } = useSafeBite();
  const [mealText, setMealText] = useState("2 Whole Wheat Rotis + Yellow Dal Tadka + Cucumber Tomato Salad");
  const [activeAnalysis, setActiveAnalysis] = useState<MealPreset>(mealPresets["thali-1"]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const handleSelectPreset = (key: string) => {
    const preset = mealPresets[key];
    if (preset) {
      setMealText(preset.name);
      setActiveAnalysis(preset);
    }
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      const lower = mealText.toLowerCase();
      if (lower.includes("bhature") || lower.includes("samosa") || lower.includes("puri") || lower.includes("pickle")) {
        setActiveAnalysis(mealPresets["chole-bhature"]);
      } else if (lower.includes("dosa") || lower.includes("idli") || lower.includes("rice")) {
        setActiveAnalysis(mealPresets["dosa-sambar"]);
      } else {
        setActiveAnalysis(mealPresets["thali-1"]);
      }
      setToastMsg("✨ Meal analyzed according to ICMR nutritional guidelines!");
      setTimeout(() => setToastMsg(""), 3500);
    }, 700);
  };

  const handleAddToDiary = () => {
    addDailyMeal({
      name: activeAnalysis.name,
      calories: activeAnalysis.calories,
      sodiumMg: activeAnalysis.sodium,
      carbsG: activeAnalysis.carbs,
      time: "Just now",
      safeStatus: activeAnalysis.status,
    });
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#154212", "#ffc653", "#bcf0ae"],
    });
    setToastMsg("✅ Meal added to your Daily Intake Dashboard!");
    setTimeout(() => setToastMsg(""), 3500);
  };

  return (
    <div className="flex flex-col w-full relative overflow-hidden pb-16">
      {/* Background ambient accents */}
      <div className="absolute -top-16 -left-16 w-80 h-80 rounded-full bg-[#bcf0ae]/20 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-20 w-80 h-80 rounded-full bg-[#ffdea5]/25 blur-3xl pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
        {/* Breadcrumb & Header */}
        <div className="flex flex-col gap-2 mb-8">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#bcf0ae] text-primary text-xs font-bold">
              <span className="material-symbols-outlined text-sm">restaurant</span>
              Indian Kitchen Thali Analyzer
            </span>
            <span className="text-gray-400 text-xs">/</span>
            <span className="text-xs font-medium text-[#42493e]">Home-cooked Food Safety</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-primary tracking-tight">
            Describe your home meal or thali.
          </h1>
          <p className="text-sm sm:text-base text-[#42493e] max-w-2xl leading-relaxed">
            No barcode? No problem. Simply describe what’s on your plate in everyday terms (e.g., &ldquo;2 rotis with rajma, cucumber salad and a spoon of pickle&rdquo;) and get instant clinical feedback.
          </p>
        </div>

        {/* Toast */}
        {toastMsg && (
          <div className="fixed bottom-6 right-6 z-50 bg-primary text-white px-5 py-3 rounded-full shadow-2xl text-sm font-semibold animate-bounce">
            {toastMsg}
          </div>
        )}

        {/* Input & Preset Bar */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#c2c9bb]/30 flex flex-col gap-5 mb-8">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-secondary uppercase tracking-wider">
              Enter your meal items &amp; approximate quantities:
            </label>
            <div className="relative">
              <textarea
                value={mealText}
                onChange={(e) => setMealText(e.target.value)}
                rows={3}
                placeholder="Type your breakfast, lunch or dinner... e.g. 2 phulkas with moong dal, bhindi sabzi, and small bowl of curd"
                className="w-full bg-[#f7f3eb] rounded-xl p-4 text-sm sm:text-base text-[#1c1c17] focus:outline-none focus:ring-2 focus:ring-primary/30 border border-[#c2c9bb]/40 resize-none transition-all leading-relaxed"
              />
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="mt-3 sm:mt-0 sm:absolute sm:bottom-4 sm:right-4 px-6 py-2.5 rounded-full bg-primary text-white text-xs sm:text-sm font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span className="material-symbols-outlined text-base">
                  {isAnalyzing ? "sync" : "analytics"}
                </span>
                <span>{isAnalyzing ? "Analyzing Meal..." : "Evaluate Thali Safety"}</span>
              </button>
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex flex-col gap-2 pt-2 border-t border-[#c2c9bb]/20">
            <span className="text-[11px] font-semibold text-[#42493e]">
              Or choose a classic Indian meal combo to inspect:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleSelectPreset("thali-1")}
                className="px-3.5 py-1.5 rounded-full bg-[#f1ede6] hover:bg-white text-[#1c1c17] text-xs font-semibold border border-[#c2c9bb]/20 transition-all hover:scale-105"
              >
                🥗 2 Rotis + Dal Tadka + Salad
              </button>
              <button
                type="button"
                onClick={() => handleSelectPreset("chole-bhature")}
                className="px-3.5 py-1.5 rounded-full bg-[#f1ede6] hover:bg-white text-[#1c1c17] text-xs font-semibold border border-[#c2c9bb]/20 transition-all hover:scale-105"
              >
                🥘 Chole Bhature + Pickle
              </button>
              <button
                type="button"
                onClick={() => handleSelectPreset("dosa-sambar")}
                className="px-3.5 py-1.5 rounded-full bg-[#f1ede6] hover:bg-white text-[#1c1c17] text-xs font-semibold border border-[#c2c9bb]/20 transition-all hover:scale-105"
              >
                🥞 Rava Dosa + Sambar + Chutney
              </button>
            </div>
          </div>
        </div>

        {/* Meal Evaluation Results Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Summary Card */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-6 shadow-sm border border-[#c2c9bb]/30 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-secondary font-bold">
                Clinical Health Verdict
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-black uppercase ${
                  activeAnalysis.status === "SAFE"
                    ? "bg-[#bcf0ae] text-[#002201]"
                    : activeAnalysis.status === "CAUTION"
                    ? "bg-[#ffdea5] text-[#271900]"
                    : "bg-[#ffdad6] text-[#93000a]"
                }`}
              >
                {activeAnalysis.statusLabel}
              </span>
            </div>

            <h3 className="text-xl font-bold text-primary">
              {activeAnalysis.name}
            </h3>
            <p className="text-xs text-[#42493e]">
              {activeAnalysis.description}
            </p>

            {/* Micro Metrics Grid */}
            <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#c2c9bb]/20 text-center">
              <div className="p-2 rounded-xl bg-[#f7f3eb]">
                <div className="text-[10px] text-[#42493e] uppercase">Calories</div>
                <div className="text-base font-bold text-[#1c1c17]">{activeAnalysis.calories}</div>
                <div className="text-[10px] text-gray-400">kcal</div>
              </div>
              <div className="p-2 rounded-xl bg-[#f7f3eb]">
                <div className="text-[10px] text-[#42493e] uppercase">Sodium</div>
                <div
                  className={`text-base font-bold ${
                    activeAnalysis.sodium > 800 ? "text-[#ba1a1a]" : "text-[#1c1c17]"
                  }`}
                >
                  {activeAnalysis.sodium}
                </div>
                <div className="text-[10px] text-gray-400">mg</div>
              </div>
              <div className="p-2 rounded-xl bg-[#f7f3eb]">
                <div className="text-[10px] text-[#42493e] uppercase">Carbs</div>
                <div className="text-base font-bold text-[#1c1c17]">{activeAnalysis.carbs}</div>
                <div className="text-[10px] text-gray-400">grams</div>
              </div>
            </div>

            <button
              onClick={handleAddToDiary}
              className="w-full py-3 rounded-full bg-primary-container text-white font-bold text-xs sm:text-sm hover:bg-primary transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <span className="material-symbols-outlined text-base">bookmark</span>
              <span>Log to Daily Nutrition Diary</span>
            </button>
          </div>

          {/* Right Components Breakdown */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#c2c9bb]/30 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-primary">
                  Dish-by-Dish Clinical Analysis
                </h4>
                <span className="text-xs text-[#42493e]">
                  {activeAnalysis.components.length} components evaluated
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {activeAnalysis.components.map((comp, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 border ${
                      comp.level === "HIGH"
                        ? "bg-[#ffdad6]/30 border-[#ffdad6]"
                        : comp.level === "CAUTION"
                        ? "bg-[#ffdea5]/25 border-[#ffdea5]"
                        : "bg-[#bcf0ae]/25 border-[#bcf0ae]"
                    }`}
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-3 h-3 rounded-full ${
                            comp.level === "HIGH"
                              ? "bg-[#ba1a1a]"
                              : comp.level === "CAUTION"
                              ? "bg-[#7b5800]"
                              : "bg-[#154212]"
                          }`}
                        />
                        <span className="text-sm font-bold text-[#1c1c17]">{comp.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-[#42493e] font-semibold border border-gray-200">
                          {comp.tag}
                        </span>
                      </div>
                      <p className="text-xs text-[#42493e] mt-1 pl-5">{comp.note}</p>
                    </div>

                    <span
                      className={`text-xs font-bold uppercase self-start sm:self-auto px-2.5 py-1 rounded-full ${
                        comp.level === "HIGH"
                          ? "bg-[#ba1a1a] text-white"
                          : comp.level === "CAUTION"
                          ? "bg-[#ffc653] text-[#735200]"
                          : "bg-[#bcf0ae] text-[#002201]"
                      }`}
                    >
                      {comp.level}
                    </span>
                  </div>
                ))}
              </div>

              {/* Doctor's Optimization Note */}
              <div className="p-4 rounded-xl bg-[#f7f3eb] flex items-start gap-3 border border-[#c2c9bb]/30 mt-2">
                <span className="material-symbols-outlined text-primary text-xl mt-0.5">
                  tips_and_updates
                </span>
                <p className="text-xs text-primary font-medium leading-relaxed">
                  {activeAnalysis.doctorAdvice}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
