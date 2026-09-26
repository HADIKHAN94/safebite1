"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "hi" | "mr";

export interface UserProfile {
  name: string;
  role: string;
  avatar: string;
  conditions: string[];
  allergies: string[];
  doctorNotes: string;
}

export interface FoodAnalysis {
  id: string;
  name: string;
  subtitle: string;
  servingSize: string;
  riskLevel: "SAFE" | "CAUTION" | "HIGH_RISK";
  riskLabel: string;
  riskSubtext: string;
  keyTakeaway: string;
  ingredientsCount: number;
  breakdown: {
    name: string;
    level: "SAFE" | "CAUTION" | "HIGH";
    tag: string;
    description: string;
    metricLabel: string;
  }[];
  doctorExplanation: string;
  doctorTip: string;
  betterSwaps: {
    title: string;
    description: string;
    recipesCount: number;
  };
  comparison: {
    item1: { name: string; sugar: string; level: string; percent: number };
    item2: { name: string; sugar: string; level: string; percent: number };
  };
  image?: string;
  timestamp?: string;
}

interface SafeBiteContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  currentAnalysis: FoodAnalysis;
  setCurrentAnalysis: (analysis: FoodAnalysis) => void;
  savedLogs: FoodAnalysis[];
  saveToLog: (item: FoodAnalysis) => void;
  dailyMeals: { id: string; name: string; calories: number; sodiumMg: number; carbsG: number; time: string; safeStatus: string }[];
  addDailyMeal: (meal: { name: string; calories: number; sodiumMg: number; carbsG: number; time: string; safeStatus: string }) => void;
  t: (key: string) => string;
}

const defaultFoodAnalysis: FoodAnalysis = {
  id: "aloo-bhujia-1",
  name: "Haldiram's Aloo Bhujia",
  subtitle: "Savory potato & gram flour sev (Pack of 150g)",
  servingSize: "30g (Approx. 4 tablespoons)",
  riskLevel: "CAUTION",
  riskLabel: "AMBER : CAUTION",
  riskSubtext: "Moderate Dietary Risk",
  keyTakeaway: "This snack is high in refined starch and palm olein oil, which can quickly spike blood glucose and strain your heart.",
  ingredientsCount: 14,
  breakdown: [
    {
      name: "Refined Flour (Maida)",
      level: "HIGH",
      tag: "High GI",
      description: "Rapid blood sugar spike risk. Particularly critical for Type-2 Diabetes management.",
      metricLabel: "Sugar surge index: Very High",
    },
    {
      name: "Palm Olein Oil",
      level: "CAUTION",
      tag: "Sat Fat",
      description: "Contains 48% saturated fat. Heavy on arterial health and lipid profiles over time.",
      metricLabel: "Cardiac strain rating: Moderate",
    },
    {
      name: "Added Sodium (740mg)",
      level: "CAUTION",
      tag: "37% DV",
      description: "Exceeds 35% of daily recommended salt in one modest handful. Elevates blood pressure.",
      metricLabel: "Salt burden: Watchlist",
    },
    {
      name: "Cumin, Ajwain & Spices",
      level: "SAFE",
      tag: "Safe",
      description: "Natural digestive seasonings. Contains therapeutic thymol and gentle gut enzymes.",
      metricLabel: "Beneficial for digestion",
    },
  ],
  doctorExplanation: "When palm oil and finely milled maida are combined and deep-fried, the digestive tract turns the carbs into sugar in minutes. Because of the heavy saturated fats, your insulin response slows down, causing a prolonged high sugar plateau followed by fatigue and thirst.",
  doctorTip: "Doctor's Tip: If you enjoy this during chai-time, limit to 2 tablespoons alongside 5 soaked almonds to blunt sugar spikes.",
  betterSwaps: {
    title: "Roasted Makhana with Rock Salt or Khapli Crackers",
    description: "Low glycemic, zero palm oil, 82% less sodium.",
    recipesCount: 3,
  },
  comparison: {
    item1: { name: "Good Day Butter", sugar: "24.5g (High)", level: "High", percent: 80 },
    item2: { name: "Ragi Millet Crisp", sugar: "4.2g (Safe)", level: "Safe", percent: 20 },
  },
  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCSvyTvZvmncB5TBwWNkzPNWtpkeLhwgWOVZNQIFuBr8rpZwLYaiYBh4blD4YNPZn9IGgfJ9LKACIfi4szS6PG3Fn4tEuS_b6qCpmHogWci8fBiab9M0lqBxm2rT9-Siaf5szOKx-JCPkJOHxT2XD6MS-HwEano7GwZ4u7yM0wEy0BY6PbgLI5SQ4o4NQy1VtpAIqKsSQczyv8GWq2vOWkVg0Mba23ipXW-GfSJigy3NQfTdrXcHvPtCw",
};

const translations: Record<Language, Record<string, string>> = {
  en: {
    home: "Home",
    quickScan: "Quick Scan",
    myProfile: "My Dietary Profile",
    describeMeal: "Describe a Meal",
    dailyDashboard: "Daily Dashboard",
    searchPlaceholder: "Search foods, nutrients...",
    scanFood: "Scan Food",
    createProfile: "Create Profile",
    readIn: "Read in:",
    instantDietaryCheck: "Instant Dietary Check",
    clinicalAssurance: "SafeBite Clinical Assurance",
    saveToLog: "Save to Log",
    shareReport: "Share Report",
    scanNext: "Scan Next Product",
    savedSuccess: "Saved to your daily nutrition log!",
  },
  hi: {
    home: "होम",
    quickScan: "त्वरित स्कैन",
    myProfile: "मेरी आहार प्रोफ़ाइल",
    describeMeal: "थाली का विवरण दें",
    dailyDashboard: "दैनिक डैशबोर्ड",
    searchPlaceholder: "भोजन, पोषक तत्व खोजें...",
    scanFood: "भोजन स्कैन करें",
    createProfile: "प्रोफ़ाइल बनाएं",
    readIn: "भाषा चुनें:",
    instantDietaryCheck: "त्वरित आहार जांच",
    clinicalAssurance: "सेफ़बाइट चिकित्सीय आश्वासन",
    saveToLog: "लॉग में सहेजें",
    shareReport: "रिपोर्ट साझा करें",
    scanNext: "अगला उत्पाद स्कैन करें",
    savedSuccess: "दैनिक पोषण लॉग में सहेजा गया!",
  },
  mr: {
    home: "मुख्यपृष्ठ",
    quickScan: "झटपट स्कॅन",
    myProfile: "माझे आहाराचे प्रोफाइल",
    describeMeal: "जेवणाचे वर्णन करा",
    dailyDashboard: "दैनंदिन डॅशबोर्ड",
    searchPlaceholder: "अन्न, पोषक घटक शोधा...",
    scanFood: "अन्न स्कॅन करा",
    createProfile: "प्रोफाइल तयार करा",
    readIn: "भाषा निवडा:",
    instantDietaryCheck: "त्वरित आहार तपासणी",
    clinicalAssurance: "सेफबाईट वैद्यकीय हमी",
    saveToLog: "लॉगमध्ये सेव्ह करा",
    shareReport: "रिपोर्ट शेअर करा",
    scanNext: "पुढील उत्पादन स्कॅन करा",
    savedSuccess: "दैनंदिन पोषण नोंदवहीत सेव्ह केले!",
  },
};

const SafeBiteContext = createContext<SafeBiteContextType | undefined>(undefined);

export function SafeBiteProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [profile, setProfile] = useState<UserProfile>({
    name: "Dr. Ananya",
    role: "Clinical Dietitian",
    avatar: "https://lh3.googleusercontent.com/aida/AEtjO1WvDotph4QQTRTWQ1TiJ2ZbHUxp16YmjiAqH5ZkMXcTsvH6OVy8dYN8pSdHza-lgZPIUDHyD6LmlBhCttig80Uvo68HnZ4hntu9IOBto5_hWpsbf56KIxH5Ww4ZuW3lusNVEm0y5FR8VnvaqLajX4DGK4y3m0cWzs7syVojFThuhUpy8EhG5yzEb9Slyophb1Y-SaaS7bIddnk8YFvCNl6jM_K9mCJoAgTUAwJc-gb644Pygv1E3AVd0dm0",
    conditions: ["diabetes", "hypertension"],
    allergies: [],
    doctorNotes: "Limit table salt to 1 teaspoon; Avoid store-bought sour mango pickles & papads",
  });

  const [currentAnalysis, setCurrentAnalysis] = useState<FoodAnalysis>(defaultFoodAnalysis);
  const [savedLogs, setSavedLogs] = useState<FoodAnalysis[]>([defaultFoodAnalysis]);
  const [dailyMeals, setDailyMeals] = useState([
    { id: "1", name: "2 Multigrain Roti + Dal Tadka + Cucumber Salad", calories: 340, sodiumMg: 420, carbsG: 48, time: "Lunch 1:30 PM", safeStatus: "SAFE" },
    { id: "2", name: "Roasted Makhana & Green Tea", calories: 120, sodiumMg: 85, carbsG: 18, time: "Snack 5:00 PM", safeStatus: "SAFE" },
  ]);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const saveToLog = (item: FoodAnalysis) => {
    setSavedLogs((prev) => [item, ...prev.filter((i) => i.id !== item.id)]);
  };

  const addDailyMeal = (meal: { name: string; calories: number; sodiumMg: number; carbsG: number; time: string; safeStatus: string }) => {
    setDailyMeals((prev) => [{ id: Date.now().toString(), ...meal }, ...prev]);
  };

  const t = (key: string) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <SafeBiteContext.Provider
      value={{
        language,
        setLanguage,
        profile,
        updateProfile,
        currentAnalysis,
        setCurrentAnalysis,
        savedLogs,
        saveToLog,
        dailyMeals,
        addDailyMeal,
        t,
      }}
    >
      {children}
    </SafeBiteContext.Provider>
  );
}

export function useSafeBite() {
  const context = useContext(SafeBiteContext);
  if (!context) {
    throw new Error("useSafeBite must be used within a SafeBiteProvider");
  }
  return context;
}
