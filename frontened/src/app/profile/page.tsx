"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSafeBite } from "@/context/SafeBiteContext";
import confetti from "canvas-confetti";

interface HealthCondition {
  id: string;
  name: string;
  category: string;
  description: string;
  tags: string[];
  icon: string;
  bgIcon: string;
  colorClass: string;
}

const conditionsList: HealthCondition[] = [
  {
    id: "diabetes",
    name: "Blood Sugar / Diabetes",
    category: "Type 1 • Type 2 • Pre-diabetes",
    description: "Flags hidden sugars, jaggery, high glycemic index (GI), refined maida, and maltodextrin.",
    tags: ["Low GI alerts", "Carb counting"],
    icon: "bloodtype",
    bgIcon: "#E8F3E5",
    colorClass: "text-primary",
  },
  {
    id: "hypertension",
    name: "Hypertension / BP",
    category: "Sodium Management",
    description: "Highlights excess sodium, salty pickles, monosodium glutamate (MSG), and papads.",
    tags: ["Sodium cap: 2000mg", "Preservative filter"],
    icon: "ecg_heart",
    bgIcon: "#FFF6DD",
    colorClass: "text-secondary",
  },
  {
    id: "kidney",
    name: "Kidney Care / CKD",
    category: "Renal Nutrition Protocol",
    description: "Monitors potassium, phosphorus, calcium oxalates, and heavy biological protein loads.",
    tags: ["Potassium watch", "Phosphorus check"],
    icon: "water_drop",
    bgIcon: "#E2F1F8",
    colorClass: "text-[#135A75]",
  },
  {
    id: "cholesterol",
    name: "Heart & Cholesterol",
    category: "Lipid & Triglyceride Care",
    description: "Screens for vanaspati, saturated ghee excess, deep-fry palm oils, and industrial trans fats.",
    tags: ["Zero Trans-Fat alert", "Healthy PUFA/MUFA"],
    icon: "verified_user",
    bgIcon: "#FCECEE",
    colorClass: "text-[#93000A]",
  },
  {
    id: "thyroid",
    name: "Thyroid & Metabolism",
    category: "Hypo / Hyperthyroid",
    description: "Detects raw goitrogens (uncooked cruciferous), soy isolates, gluten triggers, and iodine balance.",
    tags: ["Goitrogen guidance", "Selenium rich"],
    icon: "flutter",
    bgIcon: "#F3EAFD",
    colorClass: "text-[#59348A]",
  },
  {
    id: "pcos",
    name: "PCOS / Hormonal Care",
    category: "Insulin Resistance Focus",
    description: "Balances insulin spikes, promotes anti-inflammatory whole grains, and tracks dairy sensitivity.",
    tags: ["Anti-inflammatory", "Hormone-safe fats"],
    icon: "local_florist",
    bgIcon: "#E5F7E7",
    colorClass: "text-primary",
  },
];

const allergyOptions = [
  { label: "Gluten / Celiac", icon: "grain" },
  { label: "Lactose / Dairy", icon: "nutrition" },
  { label: "Peanuts & Tree Nuts", icon: "spa" },
  { label: "Eggs", icon: "egg" },
  { label: "Fish & Shellfish", icon: "set_meal" },
  { label: "Pure Vegetarian (Satvik)", icon: "eco" },
  { label: "Jain (No Root Veggies)", icon: "nature_people" },
];

export default function ProfileSetupPage() {
  const router = useRouter();
  const { profile, updateProfile } = useSafeBite();
  const [selectedConditions, setSelectedConditions] = useState<string[]>(profile.conditions || ["diabetes", "hypertension"]);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>(profile.allergies || []);
  const [doctorNotes, setDoctorNotes] = useState(profile.doctorNotes || "");
  const [isSaved, setIsSaved] = useState(false);

  const toggleCondition = (id: string) => {
    setSelectedConditions((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const toggleAllergy = (label: string) => {
    setSelectedAllergies((prev) =>
      prev.includes(label) ? prev.filter((a) => a !== label) : [...prev, label]
    );
  };

  const insertAdvice = (text: string) => {
    setDoctorNotes((prev) => {
      const clean = prev.trim();
      return clean.length > 0 ? `${clean}; ${text}` : text;
    });
  };

  const handleSaveAndContinue = () => {
    updateProfile({
      conditions: selectedConditions,
      allergies: selectedAllergies,
      doctorNotes: doctorNotes,
    });
    setIsSaved(true);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.8 },
      colors: ["#154212", "#7b5800", "#ffc653"],
    });
    setTimeout(() => {
      router.push("/scan");
    }, 900);
  };

  const totalSelected = selectedConditions.length + selectedAllergies.length;

  return (
    <div className="flex flex-col w-full relative overflow-hidden pb-16">
      {/* Decorative Ambient Underlays */}
      <div className="absolute -top-12 -right-12 w-64 h-64 pointer-events-none opacity-20 text-primary">
        <svg className="w-full h-full transform rotate-12" fill="currentColor" viewBox="0 0 200 200">
          <path
            d="M43.3,-67.2C54.9,-59.5,62.3,-45.8,68.7,-31.6C75.2,-17.4,80.7,-2.7,78.5,11.2C76.3,25,66.4,38,55.1,49.2C43.8,60.4,31.2,69.8,17.2,73.1C3.2,76.4,-12.3,73.7,-27.5,67.8C-42.7,61.9,-57.6,52.8,-67.1,39.3C-76.6,25.8,-80.7,7.9,-77.8,-8.7C-74.9,-25.3,-65,-40.5,-51.7,-48.7C-38.4,-56.9,-21.8,-58.1,-5.6,-50C10.7,-42,31.7,-74.9,43.3,-67.2Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>
      <div className="absolute top-80 -left-16 w-44 h-44 pointer-events-none opacity-25 text-secondary-container">
        <svg className="w-full h-full animate-spin" fill="currentColor" style={{ animationDuration: "40s" }} viewBox="0 0 100 100">
          <path d="M50 0 L55 35 L90 20 L65 50 L95 65 L60 70 L65 98 L45 75 L20 95 L35 60 L0 50 L35 40 L15 10 L45 28 Z" />
        </svg>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
        {/* Flow Header */}
        <div className="max-w-2xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-[#ece8e0] px-4 py-1.5 rounded-full mb-3 text-primary text-xs sm:text-sm font-semibold border border-[#c2c9bb]/30">
            <span className="material-symbols-outlined text-sm">favorite</span>
            <span>Zero pressure • Takes under 2 minutes • Skip anytime</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-primary tracking-tight">
            Let’s personalize SafeBite for you.
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#42493e] max-w-xl leading-relaxed">
            Share your daily health goals or doctor&apos;s advice so we can gently highlight the right ingredients across home and packaged foods.
          </p>

          {/* Progress Tracker */}
          <div className="w-full max-w-md mt-6 mb-8 bg-white p-2.5 rounded-full shadow-xs border border-[#c2c9bb]/30">
            <div className="grid grid-cols-3 gap-2">
              <div className="flex items-center justify-center gap-1.5 bg-primary text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-xs">
                <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">1</span>
                <span className="truncate">Health Needs</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 bg-[#f1ede6] text-[#42493e] px-3 py-1.5 rounded-full text-xs font-semibold">
                <span className="w-4 h-4 rounded-full bg-black/10 flex items-center justify-center text-[10px]">2</span>
                <span className="truncate">Allergies</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 bg-[#f1ede6] text-[#42493e] px-3 py-1.5 rounded-full text-xs font-semibold">
                <span className="w-4 h-4 rounded-full bg-black/10 flex items-center justify-center text-[10px]">3</span>
                <span className="truncate">Doctor Notes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Step 1: Health Conditions Grid */}
        <section className="w-full mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-4">
            <div>
              <span className="text-xs text-secondary font-bold uppercase tracking-wider">Step 1 of 3</span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#1c1c17]">Select your health conditions</h2>
            </div>
            <p className="text-xs sm:text-sm text-[#42493e] mt-1 md:mt-0">
              Tap all that apply. We tailor salt, glycemic index, and nutrient alerts accordingly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {conditionsList.map((c) => {
              const isSelected = selectedConditions.includes(c.id);
              return (
                <div
                  key={c.id}
                  onClick={() => toggleCondition(c.id)}
                  className={`group cursor-pointer select-none rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 shadow-xs hover:shadow-md flex flex-col justify-between relative overflow-hidden border ${
                    isSelected
                      ? "bg-[#bcf0ae]/20 border-primary ring-2 ring-primary"
                      : "bg-white border-[#c2c9bb]/30 hover:border-primary/40"
                  }`}
                >
                  <div
                    className={`absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                      isSelected ? "bg-primary text-white" : "bg-[#f1ede6] text-transparent"
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm font-bold">check</span>
                  </div>

                  <div className="flex items-center gap-4 mb-3">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 shadow-xs"
                      style={{ backgroundColor: c.bgIcon }}
                    >
                      <span className={`material-symbols-outlined text-3xl ${c.colorClass}`}>
                        {c.icon}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#1c1c17] group-hover:text-primary transition-colors">
                        {c.name}
                      </h3>
                      <span className={`text-xs font-bold ${c.colorClass}`}>{c.category}</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#42493e] mb-4 leading-relaxed">
                    {c.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {c.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-full bg-[#f1ede6] text-[11px] font-semibold text-[#42493e]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Step 2: Allergies & Dietary Restrictions */}
        <section className="w-full mb-10 bg-[#f7f3eb] rounded-2xl p-6 sm:p-8 border border-[#c2c9bb]/30">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
            <div>
              <span className="text-xs text-secondary font-bold uppercase tracking-wider">Step 2 of 3</span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#1c1c17]">Common Food Sensitivities &amp; Diets</h2>
            </div>
            <span className="text-xs text-[#42493e]">Optional: Tap any items to avoid completely</span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {allergyOptions.map((item, idx) => {
              const isSelected = selectedAllergies.includes(item.label);
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => toggleAllergy(item.label)}
                  className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 border ${
                    isSelected
                      ? "bg-primary text-white border-primary shadow-xs"
                      : "bg-white text-[#1c1c17] border-[#c2c9bb]/30 hover:bg-[#ece8e0]"
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Step 3: Doctor's Prescription / Custom Nutrition Notes */}
        <section className="w-full mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Visual: Photo with Dietitian Tag */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-md bg-white border border-[#c2c9bb]/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover"
                  alt="Culinary ingredients with dietitian notebook"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsNXzPUVNoZMP_o5gz0jNtWn8J8E-pv9JBX85I1Gak1c9hRfbqbFfUtEKWkfOLDofIBr_RXxd2vyvICUNTN-lj90n5udT8uSdyKI4iJAo3IZTmt5oI4ZagiibKqkc8a_VZDRc8vAU8NrLZrygD0_BgwzuU75uVpkoA2QhNm-zQoauA3zVPnsCC9NQTeVOK0levDCat7CvuI5HgzwiSJg5PHciGW8Y1pLmlW-yH8RaWpgHS4FufmXNQMw"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl flex items-center gap-3 border border-[#c2c9bb]/30 shadow-md">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-2xl">medical_services</span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-primary truncate">Clinical Dietitian Verified</div>
                    <div className="text-[11px] text-[#42493e] truncate">Translates physician guidance into daily meal safety</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content: The Doctor's Advice Box */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-between border border-[#c2c9bb]/30">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-secondary font-bold uppercase tracking-wider">Step 3 of 3 (Optional)</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#1c1c17] mb-1">
                  Doctor’s Prescription &amp; Special Notes
                </h2>
                <p className="text-xs sm:text-sm text-[#42493e] mb-4 leading-relaxed">
                  Have a prescription, Ayurvedic advice, or note from your clinic? Paste it below or tap quick recommendation chips, and SafeBite will translate medical terms into clear meal warnings.
                </p>

                {/* Quick Action Bar */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <button
                    type="button"
                    onClick={() => insertAdvice("Uploaded Rx: Limit sodium < 1500mg, monitor evening carbs")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f1ede6] hover:bg-[#ece8e0] text-[#1c1c17] text-xs font-semibold border border-[#c2c9bb]/30 transition-colors"
                  >
                    <span className="material-symbols-outlined text-base text-primary">photo_camera</span>
                    <span>Upload Rx Photo</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => insertAdvice("Dictated Note: Avoid raw cabbage, thoroughly cook cauliflower")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f1ede6] hover:bg-[#ece8e0] text-[#1c1c17] text-xs font-semibold border border-[#c2c9bb]/30 transition-colors"
                  >
                    <span className="material-symbols-outlined text-base text-primary">mic</span>
                    <span>Voice Dictate Note</span>
                  </button>
                  <span className="text-[11px] text-[#42493e] italic">SafeBite encrypts all health data</span>
                </div>

                {/* Textarea input */}
                <textarea
                  value={doctorNotes}
                  onChange={(e) => setDoctorNotes(e.target.value)}
                  className="w-full bg-[#f7f3eb] rounded-xl p-3.5 text-[#1c1c17] text-xs sm:text-sm placeholder:text-[#42493e]/60 focus:outline-none focus:ring-2 focus:ring-primary/20 border border-[#c2c9bb]/40 transition-all resize-none mb-3"
                  placeholder="Paste or write notes here (e.g., Avoid pickles, limit table salt to 1 tsp daily, check for raw spinach...)"
                  rows={3}
                />

                {/* Quick Helper Chips */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-semibold text-[#42493e]">
                    Tap to insert common doctor recommendations:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => insertAdvice("Limit daily table salt to 1 teaspoon")}
                      className="text-xs bg-[#FFF6DD] text-secondary hover:bg-[#ffdea5] px-3 py-1 rounded-full transition-colors font-medium border border-[#f5be4c]/40"
                    >
                      + &quot;Limit salt to 1 tsp&quot;
                    </button>
                    <button
                      type="button"
                      onClick={() => insertAdvice("Avoid store-bought sour mango pickles & papads")}
                      className="text-xs bg-[#FFF6DD] text-secondary hover:bg-[#ffdea5] px-3 py-1 rounded-full transition-colors font-medium border border-[#f5be4c]/40"
                    >
                      + &quot;No commercial pickles&quot;
                    </button>
                    <button
                      type="button"
                      onClick={() => insertAdvice("Avoid high potassium foods like ripe bananas and coconut water")}
                      className="text-xs bg-[#FFF6DD] text-secondary hover:bg-[#ffdea5] px-3 py-1 rounded-full transition-colors font-medium border border-[#f5be4c]/40"
                    >
                      + &quot;Limit potassium &amp; coconut water&quot;
                    </button>
                    <button
                      type="button"
                      onClick={() => insertAdvice("Eat low glycemic carbs only: no white rice, switch to millets")}
                      className="text-xs bg-[#FFF6DD] text-secondary hover:bg-[#ffdea5] px-3 py-1 rounded-full transition-colors font-medium border border-[#f5be4c]/40"
                    >
                      + &quot;Swap rice for millets&quot;
                    </button>
                  </div>
                </div>
              </div>

              {/* Confidentiality Footer */}
              <div className="mt-6 pt-4 border-t border-[#c2c9bb]/20 flex items-center gap-2 text-xs text-[#42493e]">
                <span className="material-symbols-outlined text-primary text-lg">verified</span>
                <span>We treat your dietary data with strict clinical confidentiality. Never shared with third parties.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Floating / Fixed Action Dock */}
        <div className="w-full bg-white rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#c2c9bb]/30 sticky bottom-4 z-40">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-2xl">health_and_safety</span>
            </div>
            <div>
              <div className="text-base font-bold text-[#1c1c17]">
                Ready to scan your first meal?
              </div>
              <div className="text-xs text-[#42493e]">
                {totalSelected === 0
                  ? "No conditions selected yet • Defaulting to standard wholesome guidelines"
                  : `${selectedConditions.length} health condition(s) and ${selectedAllergies.length} dietary filter(s) active`}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              href="/scan"
              className="w-full sm:w-auto text-center px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-primary hover:bg-[#f1ede6] transition-colors border border-transparent hover:border-[#c2c9bb]/30"
            >
              Skip for now
            </Link>
            <button
              onClick={handleSaveAndContinue}
              className="w-full sm:w-auto text-center px-8 py-3.5 rounded-full bg-primary text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group"
            >
              <span>{isSaved ? "Saved! Redirecting..." : "Save & Continue to Food Scan"}</span>
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
