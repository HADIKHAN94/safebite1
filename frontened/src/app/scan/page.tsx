"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSafeBite, FoodAnalysis } from "@/context/SafeBiteContext";
import confetti from "canvas-confetti";

// Mock preset catalog for instant interactive switches
const presetCatalog: Record<string, FoodAnalysis> = {
  aloo: {
    id: "aloo-bhujia-1",
    name: "Haldiram's Aloo Bhujia",
    subtitle: "Savory potato & gram flour sev (Pack of 150g)",
    servingSize: "30g (Approx. 4 tablespoons)",
    riskLevel: "CAUTION",
    riskLabel: "AMBER : CAUTION",
    riskSubtext: "Moderate Dietary Risk",
    keyTakeaway:
      "This snack is high in refined starch and palm olein oil, which can quickly spike blood glucose and strain your heart.",
    ingredientsCount: 14,
    breakdown: [
      {
        name: "Refined Flour (Maida)",
        level: "HIGH",
        tag: "High GI",
        description:
          "Rapid blood sugar spike risk. Particularly critical for Type-2 Diabetes management.",
        metricLabel: "Sugar surge index: Very High",
      },
      {
        name: "Palm Olein Oil",
        level: "CAUTION",
        tag: "Sat Fat",
        description:
          "Contains 48% saturated fat. Heavy on arterial health and lipid profiles over time.",
        metricLabel: "Cardiac strain rating: Moderate",
      },
      {
        name: "Added Sodium (740mg)",
        level: "CAUTION",
        tag: "37% DV",
        description:
          "Exceeds 35% of daily recommended salt in one modest handful. Elevates blood pressure.",
        metricLabel: "Salt burden: Watchlist",
      },
      {
        name: "Cumin, Ajwain & Spices",
        level: "SAFE",
        tag: "Safe",
        description:
          "Natural digestive seasonings. Contains therapeutic thymol and gentle gut enzymes.",
        metricLabel: "Beneficial for digestion",
      },
    ],
    doctorExplanation:
      "When palm oil and finely milled maida are combined and deep-fried, the digestive tract turns the carbs into sugar in minutes. Because of the heavy saturated fats, your insulin response slows down, causing a prolonged high sugar plateau followed by fatigue and thirst.",
    doctorTip:
      "Doctor's Tip: If you enjoy this during chai-time, limit to 2 tablespoons alongside 5 soaked almonds to blunt sugar spikes.",
    betterSwaps: {
      title: "Roasted Makhana with Rock Salt or Khapli Crackers",
      description: "Low glycemic, zero palm oil, 82% less sodium.",
      recipesCount: 3,
    },
    comparison: {
      item1: { name: "Good Day Butter", sugar: "24.5g (High)", level: "High", percent: 80 },
      item2: { name: "Ragi Millet Crisp", sugar: "4.2g (Safe)", level: "Safe", percent: 20 },
    },
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCSvyTvZvmncB5TBwWNkzPNWtpkeLhwgWOVZNQIFuBr8rpZwLYaiYBh4blD4YNPZn9IGgfJ9LKACIfi4szS6PG3Fn4tEuS_b6qCpmHogWci8fBiab9M0lqBxm2rT9-Siaf5szOKx-JCPkJOHxT2XD6MS-HwEano7GwZ4u7yM0wEy0BY6PbgLI5SQ4o4NQy1VtpAIqKsSQczyv8GWq2vOWkVg0Mba23ipXW-GfSJigy3NQfTdrXcHvPtCw",
  },
  bourbon: {
    id: "bourbon-1",
    name: "Britannia Bourbon Chocolate",
    subtitle: "Sugar-sandwiched cocoa chocolate biscuits (120g)",
    servingSize: "2 Biscuits (25g)",
    riskLevel: "HIGH_RISK",
    riskLabel: "RED : HIGH RISK",
    riskSubtext: "Severe Blood Glucose Surge",
    keyTakeaway:
      "Extremely dense in added refined cane sugars and hydrogenated vegetable fats. Immediate contraindication for pre-diabetes.",
    ingredientsCount: 16,
    breakdown: [
      {
        name: "Liquid Glucose & Invert Syrup",
        level: "HIGH",
        tag: "Added Sugar 12g",
        description: "Causes sudden postprandial glucose spike within 15 minutes.",
        metricLabel: "Glycemic Load: 28 (Extreme)",
      },
      {
        name: "Hydrogenated Vegetable Fat",
        level: "HIGH",
        tag: "Trans Fat Risk",
        description: "Industrial baking fat known to elevate LDL cholesterol and triglycerides.",
        metricLabel: "Arterial index: High Caution",
      },
      {
        name: "Refined Wheat Flour",
        level: "HIGH",
        tag: "Maida 62%",
        description: "Zero fiber, stripped grain core.",
        metricLabel: "Fiber deficit: 0.2g",
      },
      {
        name: "Cocoa Solids (Natural)",
        level: "SAFE",
        tag: "Antioxidant",
        description: "Contains minor flavonoids and polyphenols.",
        metricLabel: "Flavonoid presence: Positive",
      },
    ],
    doctorExplanation:
      "Each two biscuits represent roughly 3 teaspoons of free granulated sugar with zero bran fiber to buffer intestinal absorption. For patients targeting HbA1c below 6.5, this will disrupt evening glycemic stability.",
    doctorTip:
      "Doctor's Tip: Swap for 1 piece of 85% dark chocolate or roasted figs with crushed walnuts.",
    betterSwaps: {
      title: "Ragi Cocoa Cookies or Fig-Walnut Energy Bites",
      description: "Naturally sweetened with date paste, rich in calcium and omega-3.",
      recipesCount: 2,
    },
    comparison: {
      item1: { name: "Bourbon Sandwich", sugar: "38.2g (Extreme)", level: "Extreme", percent: 95 },
      item2: { name: "Ragi Date Biscuit", sugar: "6.1g (Safe)", level: "Safe", percent: 24 },
    },
  },
  cornflakes: {
    id: "cornflakes-1",
    name: "Kellogg's Cornflakes Real Almond & Honey",
    subtitle: "Breakfast extruded cereal pack (300g)",
    servingSize: "30g with 100ml skim milk",
    riskLevel: "CAUTION",
    riskLabel: "AMBER : CAUTION",
    riskSubtext: "Moderate Hidden Sugar Load",
    keyTakeaway:
      "Marketed as healthy breakfast, but contains high malt extract and invert sugar with GI rating above 80.",
    ingredientsCount: 11,
    breakdown: [
      {
        name: "Milled Corn Flakes",
        level: "HIGH",
        tag: "GI = 82",
        description: "Extruded corn starch digests as rapidly as pure table glucose.",
        metricLabel: "Starch conversion: Ultra-fast",
      },
      {
        name: "Sugar & Honey Syrup",
        level: "CAUTION",
        tag: "Added Sweetener",
        description: "8g of simple sugars per single small breakfast bowl.",
        metricLabel: "Fructose burden: Moderate",
      },
      {
        name: "Sliced Almonds (5%)",
        level: "SAFE",
        tag: "Healthy Fat",
        description: "Provides monounsaturated fatty acids and trace vitamin E.",
        metricLabel: "Nutrient boost: Good",
      },
    ],
    doctorExplanation:
      "Starting breakfast with ultra-processed puffed cereal prompts morning insulin spikes followed by a mid-day energy crash. Indian diabetic guidelines recommend switching to protein-rich sprouted moong or rolled oats with curd.",
    doctorTip:
      "Doctor's Tip: If you must have cereal, add 1 tablespoon of chia seeds and roasted flaxseeds to slow gastric emptying.",
    betterSwaps: {
      title: "Sprouted Moong Poha or Steel Cut Jowar Dalia",
      description: "Complex carbohydrates with 12g slow-digesting dietary fiber.",
      recipesCount: 4,
    },
    comparison: {
      item1: { name: "Honey Cornflakes", sugar: "26.0g (High)", level: "High", percent: 76 },
      item2: { name: "Sprouted Moong Dalia", sugar: "1.8g (Safe)", level: "Safe", percent: 12 },
    },
  },
  makhana: {
    id: "makhana-1",
    name: "Farm Fresh Roasted Foxnuts (Makhana)",
    subtitle: "Lightly roasted with Himalayan pink salt & cold-pressed ghee",
    servingSize: "30g (Approx. 2 large cups)",
    riskLevel: "SAFE",
    riskLabel: "GREEN : SAFE",
    riskSubtext: "Diabetic & Renal Friendly",
    keyTakeaway:
      "Exceptional traditional Indian superfood. Low glycemic index, minimal sodium, rich in magnesium and plant protein.",
    ingredientsCount: 4,
    breakdown: [
      {
        name: "Euryale Ferox (Fox Nuts)",
        level: "SAFE",
        tag: "Low GI",
        description: "Very low glycemic index. Stabilizes blood glucose and keeps satiety high.",
        metricLabel: "Glycemic Index: 45 (Optimal)",
      },
      {
        name: "Cow's A2 Ghee (1/2 tsp)",
        level: "SAFE",
        tag: "Healthy Lipid",
        description: "Contains butyric acid which nurtures intestinal gut flora.",
        metricLabel: "Butyrate level: High",
      },
      {
        name: "Himalayan Pink Salt",
        level: "SAFE",
        tag: "Low Sodium (120mg)",
        description: "85% less sodium than commercial packaged bhujia.",
        metricLabel: "Cardiovascular impact: Gentle",
      },
    ],
    doctorExplanation:
      "Makhana is one of the highest-rated snacks under ICMR protocols for hypertensive and diabetic patients. It does not cause insulin surges and provides magnesium which relaxes arterial walls.",
    doctorTip:
      "Doctor's Tip: Keep an airtight jar on your desk for 4 PM cravings instead of fried samosas or biscuits.",
    betterSwaps: {
      title: "Already the Gold Standard Indian Snack!",
      description: "Try flavoring with roasted curry leaves, black pepper, or pinch of turmeric.",
      recipesCount: 3,
    },
    comparison: {
      item1: { name: "Commercial Bhujia", sugar: "8.5g + 740mg Salt", level: "Caution", percent: 78 },
      item2: { name: "Roasted Makhana", sugar: "0.2g + 120mg Salt", level: "Safe", percent: 14 },
    },
  },
};

export default function QuickScanPage() {
  const { currentAnalysis, setCurrentAnalysis, saveToLog, profile } = useSafeBite();
  const [activeTab, setActiveTab] = useState<"scan" | "paste" | "barcode">("scan");
  const [doctorOpen, setDoctorOpen] = useState(true);
  const [pasteText, setPasteText] = useState("");
  const [barcodeInput, setBarcodeInput] = useState("8901063012228");
  const [recipesModalOpen, setRecipesModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 4000);
  };

  const handleSave = () => {
    saveToLog(currentAnalysis);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#154212", "#7b5800", "#bcf0ae"],
    });
    showToast("✅ Successfully saved to your Daily Dietary Log!");
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `SafeBite Food Analysis: ${currentAnalysis.name} - ${currentAnalysis.riskLabel}\nKey Takeaway: ${currentAnalysis.keyTakeaway}\nProfile: Pre-Diabetes & Mild BP calibrated.`
      );
      showToast("📋 Report summary copied to clipboard!");
    }
  };

  const handleSimulatedScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setCurrentAnalysis(presetCatalog.aloo);
      showToast("📷 Scanned successfully! Nutrition facts decoded.");
    }, 1200);
  };

  const handleAnalyzeText = () => {
    if (!pasteText.trim()) return;
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      // If user mentions sugar or maida or chocolate
      if (pasteText.toLowerCase().includes("sugar") || pasteText.toLowerCase().includes("chocolate")) {
        setCurrentAnalysis(presetCatalog.bourbon);
      } else {
        setCurrentAnalysis(presetCatalog.aloo);
      }
      showToast("🔍 Text ingredients parsed against ICMR database!");
    }, 800);
  };

  const handleBarcodeLookup = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      if (barcodeInput.endsWith("8")) {
        setCurrentAnalysis(presetCatalog.aloo);
      } else {
        setCurrentAnalysis(presetCatalog.cornflakes);
      }
      showToast(`🏷️ EAN Barcode ${barcodeInput} found in FSSAI registry!`);
    }, 800);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="w-full relative overflow-hidden pb-16">
        {/* Background ambient accents */}
        <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full bg-[#ffdea5]/15 blur-3xl pointer-events-none" />
        <div className="absolute top-96 -left-20 w-72 h-72 rounded-full bg-[#bcf0ae]/25 blur-3xl pointer-events-none" />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 pt-6 sm:pt-8 flex flex-col gap-8 relative z-10">
          {/* Breadcrumb & Header */}
          <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="flex flex-col gap-1 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#bcf0ae] text-primary text-xs font-bold">
                  <span className="material-symbols-outlined text-sm">health_and_safety</span>
                  Nutrition Scanner • Real-time Safety
                </span>
                <span className="text-gray-400 text-xs">/</span>
                <span className="text-xs font-medium text-[#42493e]">Instant Dietary Check</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-primary tracking-tight mt-1">
                Know what you eat in seconds.
              </h1>
              <p className="text-sm sm:text-base text-[#42493e] leading-relaxed">
                Scan any grocery label or snack pack. We translate complex nutritional jargon and hidden preservatives into simple, caring advice tailored to your Indian kitchen.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-4 py-2.5 rounded-full bg-[#f7f3eb] text-[#42493e] flex items-center gap-2 shadow-xs border border-[#c2c9bb]/30">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
                <span className="text-xs sm:text-sm">
                  Profile: <strong className="text-[#1c1c17] font-semibold">Pre-Diabetes &amp; Mild BP</strong>
                </span>
              </div>
              <Link
                href="/profile"
                className="w-10 h-10 rounded-full bg-[#f7f3eb] hover:bg-[#ece8e0] text-[#42493e] flex items-center justify-center transition-colors border border-[#c2c9bb]/30"
                title="Change active profile"
              >
                <span className="material-symbols-outlined text-lg">tune</span>
              </Link>
            </div>
          </section>

          {/* Toast Notification */}
          {toastMessage && (
            <div className="fixed bottom-6 right-6 z-50 bg-primary text-white px-5 py-3 rounded-full shadow-2xl text-sm font-semibold flex items-center gap-2 animate-bounce">
              <span>{toastMessage}</span>
            </div>
          )}

          {/* Main Dual Bento Panel (Scanner Input & Live Result) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Input Modes Card (5 cols) */}
            <section className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4 border border-[#c2c9bb]/30">
                {/* Mode Switcher Pill Tabs */}
                <div className="flex items-center justify-between p-1 bg-[#f7f3eb] rounded-full border border-[#c2c9bb]/30">
                  <button
                    className={`flex-1 py-2 px-3 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${activeTab === "scan"
                        ? "bg-primary text-white shadow-sm"
                        : "text-[#42493e] hover:text-[#1c1c17]"
                      }`}
                    onClick={() => setActiveTab("scan")}
                  >
                    <span className="material-symbols-outlined text-base">photo_camera</span>
                    <span>Scan Label</span>
                  </button>
                  <button
                    className={`flex-1 py-2 px-3 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${activeTab === "paste"
                        ? "bg-primary text-white shadow-sm"
                        : "text-[#42493e] hover:text-[#1c1c17]"
                      }`}
                    onClick={() => setActiveTab("paste")}
                  >
                    <span className="material-symbols-outlined text-base">content_paste</span>
                    <span>Paste Text</span>
                  </button>
                  <button
                    className={`flex-1 py-2 px-3 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${activeTab === "barcode"
                        ? "bg-primary text-white shadow-sm"
                        : "text-[#42493e] hover:text-[#1c1c17]"
                      }`}
                    onClick={() => setActiveTab("barcode")}
                  >
                    <span className="material-symbols-outlined text-base">barcode_scanner</span>
                    <span>Barcode</span>
                  </button>
                </div>

                {/* Upload Area: Scan Label */}
                {activeTab === "scan" && (
                  <div className="flex flex-col">
                    <div
                      onClick={handleSimulatedScan}
                      className="w-full relative group cursor-pointer rounded-2xl bg-[#f7f3eb] hover:bg-[#ece8e0] transition-all p-8 flex flex-col items-center justify-center text-center gap-3 border-2 border-dashed border-[#c2c9bb]/60 hover:border-primary"
                    >
                      <div className="w-16 h-16 rounded-full bg-[#bcf0ae]/50 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-3xl">
                          {isScanning ? "sync" : "add_a_photo"}
                        </span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-base font-bold text-[#1c1c17]">
                          {isScanning ? "Analyzing photo..." : "Snap or drop food package"}
                        </span>
                        <span className="text-xs text-[#42493e]">
                          Clear picture of ingredients or nutrition panel
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-3 py-1 rounded-full bg-[#e6e2da] text-[#42493e] text-[11px] font-semibold">
                          JPG, PNG, HEIC
                        </span>
                        <span className="px-3 py-1 rounded-full bg-[#e6e2da] text-[#42493e] text-[11px] font-semibold">
                          Up to 15MB
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Paste Input Area */}
                {activeTab === "paste" && (
                  <div className="flex flex-col gap-3">
                    <label className="text-xs font-bold text-[#42493e] uppercase tracking-wider">
                      Ingredients or Nutrition Facts string:
                    </label>
                    <textarea
                      value={pasteText}
                      onChange={(e) => setPasteText(e.target.value)}
                      className="w-full p-3 rounded-xl bg-[#f7f3eb] border border-[#c2c9bb]/40 text-[#1c1c17] text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                      placeholder="e.g. Refined Wheat Flour (Maida 58%), Edible Vegetable Oil (Palm), Sugar, Liquid Glucose, Raising Agents (503(ii)), Invert Syrup, Iodised Salt, Milk Solids..."
                      rows={4}
                    />
                    <button
                      onClick={handleAnalyzeText}
                      disabled={isScanning}
                      className="w-full py-3 rounded-full bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                      <span className="material-symbols-outlined text-lg">
                        {isScanning ? "sync" : "manage_search"}
                      </span>
                      <span>{isScanning ? "Analyzing..." : "Analyze Text"}</span>
                    </button>
                  </div>
                )}

                {/* Barcode Area */}
                {activeTab === "barcode" && (
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-2">
                      <input
                        value={barcodeInput}
                        onChange={(e) => setBarcodeInput(e.target.value)}
                        className="flex-1 px-4 py-2.5 rounded-full bg-[#f7f3eb] border border-[#c2c9bb]/40 text-[#1c1c17] text-xs focus:outline-none focus:ring-2 focus:ring-primary/30"
                        placeholder="Enter 13-digit EAN (e.g. 8901063012228)"
                        type="text"
                      />
                      <button
                        onClick={handleBarcodeLookup}
                        disabled={isScanning}
                        className="px-5 py-2.5 rounded-full bg-primary text-white text-xs font-bold hover:bg-primary/90"
                      >
                        {isScanning ? "..." : "Look Up"}
                      </button>
                    </div>
                    <span className="text-[11px] text-[#42493e]">
                      Supports FSSAI India and Global GS1 Barcode registries.
                    </span>
                  </div>
                )}

                {/* Current Scanned Item Mini Card */}
                <div className="bg-[#f7f3eb] rounded-xl p-3.5 flex items-center gap-3 mt-1 border border-[#c2c9bb]/30">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="w-14 h-14 rounded-lg object-cover flex-shrink-0 shadow-xs"
                    alt={currentAnalysis.name}
                    src={
                      currentAnalysis.image ||
                      "https://lh3.googleusercontent.com/aida-public/AB6AXuCSvyTvZvmncB5TBwWNkzPNWtpkeLhwgWOVZNQIFuBr8rpZwLYaiYBh4blD4YNPZn9IGgfJ9LKACIfi4szS6PG3Fn4tEuS_b6qCpmHogWci8fBiab9M0lqBxm2rT9-Siaf5szOKx-JCPkJOHxT2XD6MS-HwEano7GwZ4u7yM0wEy0BY6PbgLI5SQ4o4NQy1VtpAIqKsSQczyv8GWq2vOWkVg0Mba23ipXW-GfSJigy3NQfTdrXcHvPtCw"
                    }
                  />
                  <div className="flex flex-col min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-full bg-[#ffdea5] text-[#271900] text-[10px] font-bold uppercase tracking-wider">
                        Scanned Item
                      </span>
                      <span className="text-[#42493e] text-[11px]">• Just now</span>
                    </div>
                    <h2 className="text-sm font-bold text-[#1c1c17] truncate">
                      {currentAnalysis.name}
                    </h2>
                    <p className="text-xs text-[#42493e] truncate">
                      {currentAnalysis.subtitle}
                    </p>
                  </div>
                  <button
                    onClick={handleSimulatedScan}
                    className="w-8 h-8 rounded-full bg-[#e6e2da] hover:bg-white text-[#42493e] hover:text-[#1c1c17] flex items-center justify-center flex-shrink-0 transition-colors"
                    title="Rescan item"
                  >
                    <span className="material-symbols-outlined text-base">refresh</span>
                  </button>
                </div>

                {/* Recent Quick Picks */}
                <div className="flex flex-col gap-2 pt-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#42493e]">
                    Try other popular snacks
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        setCurrentAnalysis(presetCatalog.bourbon);
                        showToast("Loaded Britannia Bourbon Biscuit analysis");
                      }}
                      className="px-3 py-1.5 rounded-full bg-[#f1ede6] hover:bg-white text-[#1c1c17] text-xs font-semibold flex items-center gap-1 border border-[#c2c9bb]/20 transition-all hover:scale-105"
                    >
                      <span>🍪 Bourbon Chocolate</span>
                    </button>
                    <button
                      onClick={() => {
                        setCurrentAnalysis(presetCatalog.cornflakes);
                        showToast("Loaded Kellogg's Cornflakes analysis");
                      }}
                      className="px-3 py-1.5 rounded-full bg-[#f1ede6] hover:bg-white text-[#1c1c17] text-xs font-semibold flex items-center gap-1 border border-[#c2c9bb]/20 transition-all hover:scale-105"
                    >
                      <span>🥣 Kellogg's Cornflakes</span>
                    </button>
                    <button
                      onClick={() => {
                        setCurrentAnalysis(presetCatalog.makhana);
                        showToast("Loaded Roasted Makhana Superfood analysis");
                      }}
                      className="px-3 py-1.5 rounded-full bg-[#bcf0ae]/40 hover:bg-[#bcf0ae] text-primary text-xs font-semibold flex items-center gap-1 border border-[#bcf0ae] transition-all hover:scale-105"
                    >
                      <span>🌾 Roasted Makhana</span>
                    </button>
                    <button
                      onClick={() => {
                        setCurrentAnalysis(presetCatalog.aloo);
                        showToast("Loaded Haldiram's Aloo Bhujia analysis");
                      }}
                      className="px-3 py-1.5 rounded-full bg-[#f1ede6] hover:bg-white text-[#1c1c17] text-xs font-semibold flex items-center gap-1 border border-[#c2c9bb]/20 transition-all hover:scale-105"
                    >
                      <span>🥔 Aloo Bhujia</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Doctor's Disclaimer Note */}
              <div className="rounded-2xl p-4 sm:p-5 bg-[#f7f3eb] flex items-start gap-3 text-[#42493e] border border-[#c2c9bb]/30">
                <span className="material-symbols-outlined text-primary text-2xl mt-0.5">
                  verified_user
                </span>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-bold text-[#1c1c17]">
                    SafeBite Clinical Assurance
                  </span>
                  <p className="text-xs leading-relaxed">
                    SafeBite provides guidance grounded in Indian Council of Medical Research (ICMR) &amp; WHO guidelines. It is meant to empower personal daily decisions, not replace prescription dietary therapy from your physician.
                  </p>
                </div>
              </div>
            </section>

            {/* Right Column: Live Friendly Risk Alert Card (7 cols) */}
            <main className="lg:col-span-7 flex flex-col gap-6">
              {/* Reusable Risk Alert Banner Card */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col gap-6 relative overflow-hidden border border-[#c2c9bb]/30">
                {/* Amber Accent Glow */}
                <div
                  className={`absolute top-0 right-0 w-44 h-44 rounded-full blur-2xl pointer-events-none ${currentAnalysis.riskLevel === "SAFE"
                      ? "bg-[#bcf0ae]/30"
                      : currentAnalysis.riskLevel === "CAUTION"
                        ? "bg-[#ffdea5]/30"
                        : "bg-[#ffdad6]/40"
                    }`}
                />

                {/* Top Header: Product Identity & Risk Pill */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#c2c9bb]/20 relative z-10">
                  <div className="flex flex-col">
                    <span className="text-[11px] uppercase tracking-wider text-secondary font-bold">
                      Safety Assessment
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-primary tracking-tight">
                      {currentAnalysis.name}
                    </h3>
                    <span className="text-xs text-[#42493e]">
                      Serving size: {currentAnalysis.servingSize}
                    </span>
                  </div>

                  {/* High Readability Alert Status Pill */}
                  <div
                    className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full shadow-xs border ${currentAnalysis.riskLevel === "SAFE"
                        ? "bg-[#bcf0ae] text-[#002201] border-[#a1d494]"
                        : currentAnalysis.riskLevel === "CAUTION"
                          ? "bg-[#ffdea5] text-[#271900] border-[#f5be4c]"
                          : "bg-[#ffdad6] text-[#93000a] border-[#ffdad6]"
                      }`}
                  >
                    <span className="material-symbols-outlined text-xl">
                      {currentAnalysis.riskLevel === "SAFE"
                        ? "check_circle"
                        : currentAnalysis.riskLevel === "CAUTION"
                          ? "warning"
                          : "dangerous"}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs font-black uppercase tracking-wide leading-tight">
                        {currentAnalysis.riskLabel}
                      </span>
                      <span className="text-[10px] leading-tight opacity-90 font-medium">
                        {currentAnalysis.riskSubtext}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 1-Sentence Plain Language Takeaway Card */}
                <div className="rounded-xl bg-[#f7f3eb] p-4 flex items-center gap-3.5 border border-[#c2c9bb]/20">
                  <div className="w-11 h-11 rounded-full bg-[#ffc653]/30 text-[#735200] flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-2xl">lightbulb</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] uppercase tracking-wider text-secondary font-bold">
                      Key Takeaway
                    </span>
                    <p className="text-sm font-semibold text-[#1c1c17] leading-relaxed">
                      {currentAnalysis.keyTakeaway}
                    </p>
                  </div>
                </div>

                {/* Traffic Light Ingredient Breakdown Grid */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-primary">
                      Traffic Light Ingredient Breakdown
                    </h4>
                    <span className="text-xs text-[#42493e]">
                      Analyzed {currentAnalysis.ingredientsCount} items
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentAnalysis.breakdown.map((item, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-xl flex flex-col justify-between gap-1.5 transition-transform hover:-translate-y-0.5 border ${item.level === "HIGH"
                            ? "bg-[#ffdad6]/40 border-[#ffdad6]"
                            : item.level === "CAUTION"
                              ? "bg-[#ffdea5]/30 border-[#ffdea5]"
                              : "bg-[#bcf0ae]/35 border-[#bcf0ae]"
                          }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-3.5 h-3.5 rounded-full flex-shrink-0 shadow-xs ring-2 ring-white ${item.level === "HIGH"
                                  ? "bg-[#ba1a1a]"
                                  : item.level === "CAUTION"
                                    ? "bg-[#7b5800]"
                                    : "bg-[#154212]"
                                }`}
                            />
                            <span className="text-sm font-bold text-[#1c1c17]">
                              {item.name}
                            </span>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold ${item.level === "HIGH"
                                ? "bg-[#ba1a1a] text-white"
                                : item.level === "CAUTION"
                                  ? "bg-[#ffc653] text-[#735200]"
                                  : "bg-[#2d5a27] text-white"
                              }`}
                          >
                            {item.tag}
                          </span>
                        </div>
                        <p className="text-xs text-[#42493e] leading-relaxed">
                          {item.description}
                        </p>
                        <div
                          className={`flex items-center gap-1 text-xs font-semibold pt-1 ${item.level === "HIGH"
                              ? "text-[#ba1a1a]"
                              : item.level === "CAUTION"
                                ? "text-[#7b5800]"
                                : "text-[#154212]"
                            }`}
                        >
                          <span className="material-symbols-outlined text-sm">
                            {item.level === "HIGH"
                              ? "trending_up"
                              : item.level === "CAUTION"
                                ? "speed"
                                : "spa"}
                          </span>
                          <span>{item.metricLabel}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Friendly Collapsible: Simple Doctor's Explanation */}
                <div className="rounded-xl bg-[#f1ede6] overflow-hidden transition-all border border-[#c2c9bb]/30">
                  <button
                    className="w-full p-4 flex items-center justify-between text-left hover:bg-[#ece8e0] transition-colors"
                    onClick={() => setDoctorOpen(!doctorOpen)}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-primary text-xl">
                        clinical_notes
                      </span>
                      <span className="text-sm font-bold text-primary">
                        Why does this matter?
                      </span>
                    </div>
                    <span
                      className={`material-symbols-outlined text-primary transition-transform duration-300 ${doctorOpen ? "rotate-0" : "-rotate-90"
                        }`}
                    >
                      expand_more
                    </span>
                  </button>

                  {doctorOpen && (
                    <div className="px-4 pb-4 flex flex-col gap-2 text-[#1c1c17]">
                      <p className="text-xs text-[#42493e] leading-relaxed">
                        {currentAnalysis.doctorExplanation}
                      </p>
                      <div className="p-3 rounded-lg bg-[#f7f3eb] flex items-center gap-2 mt-1 border border-[#c2c9bb]/20">
                        <span className="material-symbols-outlined text-primary text-base">
                          tips_and_updates
                        </span>
                        <span className="text-xs text-primary font-semibold">
                          {currentAnalysis.doctorTip}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Healthy Indian Swaps Recommendation */}
                <div className="rounded-2xl p-4 sm:p-5 bg-[#bcf0ae]/20 border border-[#bcf0ae] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-container text-white flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-xl">swap_horiz</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] uppercase tracking-wider text-primary font-bold">
                        Better Indian Swaps
                      </span>
                      <span className="text-sm sm:text-base font-bold text-primary">
                        {currentAnalysis.betterSwaps.title}
                      </span>
                      <span className="text-xs text-[#42493e]">
                        {currentAnalysis.betterSwaps.description}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setRecipesModalOpen(true)}
                    className="px-4 py-2 rounded-full bg-primary-container text-white hover:bg-primary transition-all text-xs font-bold whitespace-nowrap shadow-xs"
                  >
                    View {currentAnalysis.betterSwaps.recipesCount} Recipes
                  </button>
                </div>

                {/* Action Controls */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 rounded-full bg-[#f1ede6] hover:bg-[#ece8e0] text-[#1c1c17] text-xs font-bold flex items-center gap-1.5 transition-colors border border-[#c2c9bb]/30"
                    >
                      <span className="material-symbols-outlined text-base">bookmark_border</span>
                      <span>Save to Log</span>
                    </button>
                    <button
                      onClick={handleShare}
                      className="px-4 py-2 rounded-full bg-[#f1ede6] hover:bg-[#ece8e0] text-[#1c1c17] text-xs font-bold flex items-center gap-1.5 transition-colors border border-[#c2c9bb]/30"
                    >
                      <span className="material-symbols-outlined text-base">share</span>
                      <span>Share Report</span>
                    </button>
                  </div>
                  <button
                    onClick={handleSimulatedScan}
                    className="px-6 py-2.5 rounded-full bg-primary text-white hover:bg-primary/90 transition-all text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-lg">camera</span>
                    <span>Scan Next Product</span>
                  </button>
                </div>
              </div>

              {/* Quick Micro-Comparison: Good Day vs Oats Marie */}
              <section className="bg-white rounded-2xl p-5 shadow-sm flex flex-col gap-3 border border-[#c2c9bb]/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-lg">
                      compare_arrows
                    </span>
                    <h4 className="text-sm font-bold text-[#1c1c17]">
                      Smart Contrast: {currentAnalysis.comparison.item1.name} vs. {currentAnalysis.comparison.item2.name}
                    </h4>
                  </div>
                  <span className="text-xs text-primary font-bold cursor-pointer hover:underline">
                    ICMR standard
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-[#f7f3eb] flex flex-col gap-1 border border-[#c2c9bb]/20">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#1c1c17]">
                        {currentAnalysis.comparison.item1.name}
                      </span>
                      <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-[#42493e]">
                      <span>Sugar / 100g</span>
                      <span className="font-bold text-[#ba1a1a]">
                        {currentAnalysis.comparison.item1.sugar}
                      </span>
                    </div>
                    <div className="w-full bg-[#e6e2da] rounded-full h-1.5 mt-1 overflow-hidden">
                      <div
                        className="bg-[#ba1a1a] h-full rounded-full transition-all duration-700"
                        style={{ width: `${currentAnalysis.comparison.item1.percent}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#f7f3eb] flex flex-col gap-1 border border-[#c2c9bb]/20">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-primary">
                        {currentAnalysis.comparison.item2.name}
                      </span>
                      <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-[#42493e]">
                      <span>Sugar / 100g</span>
                      <span className="font-bold text-primary">
                        {currentAnalysis.comparison.item2.sugar}
                      </span>
                    </div>
                    <div className="w-full bg-[#e6e2da] rounded-full h-1.5 mt-1 overflow-hidden">
                      <div
                        className="bg-primary h-full rounded-full transition-all duration-700"
                        style={{ width: `${currentAnalysis.comparison.item2.percent}%` }}
                      />
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>

      {/* Recipes Modal */}
      {recipesModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#c2c9bb]/30 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[#c2c9bb]/20 pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-2xl">restaurant_menu</span>
                <h3 className="text-lg font-bold text-primary">3 Doctor-Approved Indian Swaps</h3>
              </div>
              <button
                onClick={() => setRecipesModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#f1ede6] hover:bg-[#ece8e0] text-[#1c1c17] flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-3 max-h-96 overflow-y-auto pr-1">
              <div className="p-3.5 rounded-2xl bg-[#f7f3eb] flex flex-col gap-1 border border-[#c2c9bb]/20">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#1c1c17]">1. Roasted Pudina Makhana</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#bcf0ae] text-[#002201] font-bold">10 Mins</span>
                </div>
                <p className="text-xs text-[#42493e]">
                  Dry roast 2 cups of makhana on low flame with 1/2 tsp cow ghee. Dust with mint powder, black pepper, and rock salt. Zero palm oil.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#f7f3eb] flex flex-col gap-1 border border-[#c2c9bb]/20">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#1c1c17]">2. Baked Khapli Methi Crisps</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#bcf0ae] text-[#002201] font-bold">20 Mins</span>
                </div>
                <p className="text-xs text-[#42493e]">
                  Ancient emmer wheat (Khapli) combined with fresh fenugreek leaves and ajwain seeds. Slow baked for crunch without deep frying.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#f7f3eb] flex flex-col gap-1 border border-[#c2c9bb]/20">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#1c1c17]">3. Steamed Sprouted Moong Chaat</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#bcf0ae] text-[#002201] font-bold">5 Mins</span>
                </div>
                <p className="text-xs text-[#42493e]">
                  Toss steamed green moong with chopped cucumber, tomato, lime juice, and roasted cumin. Rich in natural bioactive enzymes and fiber.
                </p>
              </div>
            </div>

            <button
              onClick={() => setRecipesModalOpen(false)}
              className="w-full py-3 rounded-full bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-colors"
            >
              Done Reading Recipes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
