"use client";

import React from "react";
import Link from "next/link";
import { useSafeBite, Language } from "@/context/SafeBiteContext";

export default function HomePage() {
  const { language, setLanguage, t } = useSafeBite();

  // Multi-lingual content mappings
  const heroContent = {
    en: {
      tag: "Empathetic Food Literacy",
      h1Line1: "Understand",
      h1Line2: "Your Food.",
      h1Line3: "Make It Personal",
      desc: "Simple, doctor-backed dietary safety for Indian families living with diabetes, hypertension, and digestive sensitivities. Know exactly what’s in your grocery cart and kitchen plate.",
      scanBtn: "Scan Food",
      profileBtn: "Create Profile",
      readIn: "Read in:",
      modeHeading: "Choose Your Starting Pace",
      modeTitle: "How would you like to check today?",
      modeSubtitle: "No complicated medical jargon or stressful setup. Choose instant checking without an account or calibrate your personalized daily health limits.",
      quickScanTitle: "Quick Scan",
      quickScanBadge: "Instant • 10 Seconds",
      quickScanDesc: "No sign-in required. Simply snap a package barcode, photograph nutritional labels, or type a restaurant dish to instantly identify hidden palm oil, maida, sodium, and diabetic spike risks.",
      quickScanB1: "Checks sodium & sugar against standard ICMR guidelines",
      quickScanB2: "Traffic light safety indicator: Safe, Moderate, or Watch Out",
      quickScanB3: "Available offline for supermarket aisle scans",
      quickScanCta: "Launch Camera Scanner",
      detailedTitle: "Detailed Care Mode",
      detailedBadge: "Personalized Care",
      detailedDesc: "Tailored directly to your lab report or doctor’s notes. Save conditions like Type-2 Diabetes, Hypertension, Renal stages, or Thyroid conditions to get gentle custom portion advice.",
      detailedB1: "Sync with HbA1c, fasting glucose & BP targets",
      detailedB2: "Smart swaps for parathas, snacks, sweets & curries",
      detailedB3: "Weekly doctor-shareable nutrition diary",
      detailedCta: "Setup My Health Profile",
      whyHeading: "Why Indian Families Trust Us",
      whyTitle: "Built with Clinical Care for Real Indian Kitchens",
      whyDesc: "Generic western nutrition apps do not understand poha, ghee tempering, packaged namkeens, or regional diets. SafeBite decodes everyday Indian meal realities.",
      p1Title: "1. Indian Staples Decoded",
      p1Desc: "Unmasks hidden refined palm oil, emulsifiers, artificial sweetening in packaged atta biscuits, and sodium hidden in daily papads, pickles, and ready gravies.",
      p1Badge: "Includes 14,000+ local pantry staples",
      p2Title: "2. Clear Traffic-Light Visuals",
      p2Desc: "Zero confusing gram numbers or chemical formulas. Just clear Green (Safe), Yellow (Caution Portion), and Red (Avoid for your condition) badges elders can read in a glance.",
      p2Badge: "High-contrast elderly friendly layout",
      p3Title: "3. Doctor & Dietitian Backed",
      p3Desc: "Built following the clinical protocols of the Indian Council of Medical Research (ICMR) and National Institute of Nutrition (NIN) to ensure scientific dependability.",
      p3Badge: "Reviewed by certified clinical dietitians",
      thaliTitle: "Want to check home-cooked lunch or dinner?",
      thaliDesc: 'Describe your thali: e.g., "2 rotis with rajma and cucumber salad" for a personalized safety breakdown.',
      thaliCta: "Describe A Meal →",
    },
    hi: {
      tag: "सहानुभूतिपूर्ण भोजन ज्ञान",
      h1Line1: "अपने भोजन को",
      h1Line2: "समझें।",
      h1Line3: "व्यक्तिगत बनाएं",
      desc: "मधुमेह, उच्च रक्तचाप और पाचन संवेदनशीलता से जूझ रहे भारतीय परिवारों के लिए डॉक्टरों द्वारा प्रमाणित सरल आहार सुरक्षा। जानें आपके किराना सामान और थाली में क्या है।",
      scanBtn: "भोजन स्कैन करें",
      profileBtn: "प्रोफ़ाइल बनाएं",
      readIn: "भाषा:",
      modeHeading: "शुरुआती गति चुनें",
      modeTitle: "आज आप कैसे जांचना चाहेंगे?",
      modeSubtitle: "कोई कठिन चिकित्सीय भाषा या तनावपूर्ण सेटअप नहीं। तुरंत बिना खाते के जांचें या अपनी स्वास्थ्य सीमाएं तय करें।",
      quickScanTitle: "त्वरित स्कैन",
      quickScanBadge: "तुरंत • 10 सेकंड",
      quickScanDesc: "साइन-इन की आवश्यकता नहीं। पैकेट का बारकोड स्कैन करें, सामग्री की तस्वीर लें या नाम टाइप कर पाम ऑयल, मैदा, नमक और शुगर स्पाइक के खतरों को पहचानें।",
      quickScanB1: "आईसीएमआर (ICMR) मानकों के अनुसार नमक व चीनी की जांच",
      quickScanB2: "ट्रैफ़िक लाइट सुरक्षा संकेतक: सुरक्षित, सीमित, या सावधान",
      quickScanB3: "सुपरमार्केट में ऑफलाइन जांच की सुविधा",
      quickScanCta: "कैमरा स्कैनर खोलें",
      detailedTitle: "विस्तृत देखभाल मोड",
      detailedBadge: "व्यक्तिगत देखभाल",
      detailedDesc: "आपकी लैब रिपोर्ट या डॉक्टर के परामर्श के अनुसार। टाइप-2 मधुमेह, उच्च रक्तचाप या थायरॉयड के लिए अनुकूलित आहार सलाह प्राप्त करें।",
      detailedB1: "HbA1c, खाली पेट शुगर और बीपी लक्ष्यों से जुड़ा",
      detailedB2: "पराठे, नमकीन और मिठाइयों के स्वास्थ्यप्रद विकल्प",
      detailedB3: "डॉक्टर के साथ साझा करने योग्य साप्ताहिक पोषण डायरी",
      detailedCta: "स्वास्थ्य प्रोफ़ाइल बनाएं",
      whyHeading: "भारतीय परिवार हम पर क्यों भरोसा करते हैं",
      whyTitle: "भारतीय रसोई के लिए विशेष चिकित्सीय मार्गदर्शन",
      whyDesc: "विदेशी ऐप्स पोहा, घी के तड़के, नमकीन या दालों के प्रभाव को नहीं समझते। सेफ़बाइट भारतीय खान-पान की वास्तविकताओं को समझता है।",
      p1Title: "१. भारतीय दैनिक भोजन का विश्लेषण",
      p1Desc: "बिस्कुट में छिपा पाम तेल, पापड़-अचार का अतिरिक्त नमक और रेडीमेड ग्रेवी के प्रिजर्वेटिव्स को उजागर करता है।",
      p1Badge: "१४,०००+ भारतीय खाद्य पदार्थ शामिल",
      p2Title: "२. स्पष्ट ट्रैफ़िक-लाइट संकेत",
      p2Desc: "कठिन ग्राम या रासायनिक नाम नहीं। केवल हरा (सुरक्षित), पीला (सीमित मात्रा) और लाल (बचें) रंग के स्पष्ट संकेत।",
      p2Badge: "बुजुर्गों के अनुकूल उच्च-कंट्रास्ट डिज़ाइन",
      p3Title: "३. डॉक्टरों और आहार विशेषज्ञों द्वारा प्रमाणित",
      p3Desc: "आईसीएमआर (ICMR) और राष्ट्रीय पोषण संस्थान (NIN) के वैज्ञानिक प्रोटोकॉल पर आधारित।",
      p3Badge: "प्रमाणित आहार विशेषज्ञों द्वारा समीक्षित",
      thaliTitle: "घर के दोपहर या रात के खाने की जांच करनी है?",
      thaliDesc: 'अपनी थाली लिखें: जैसे "२ रोटी, राजमा और खीरे का सलाद" - पाएं तुरंत सुरक्षा रिपोर्ट।',
      thaliCta: "थाली का विवरण दें →",
    },
    mr: {
      tag: "आपुलकीचे अन्न साक्षरता",
      h1Line1: "तुमच्या आहाराला",
      h1Line2: "समजून घ्या.",
      h1Line3: "वैयक्तिक बनवा",
      desc: "मधुमेह, उच्च रक्तदाब आणि पचनाच्या तक्रारी असलेल्या भारतीय कुटुंबांसाठी डॉक्टरांनी प्रमाणित केलेली सोपी आहार सुरक्षा.",
      scanBtn: "अन्न स्कॅन करा",
      profileBtn: "प्रोफाइल तयार करा",
      readIn: "भाषा:",
      modeHeading: "तुमची सुरुवात निवडा",
      modeTitle: "आज तुम्हाला कशी तपासणी करायची आहे?",
      modeSubtitle: "कोणतीही क्लिष्ट वैद्यकीय भाषा नाही. थेट झटपट तपासा किंवा तुमच्या वैयक्तिक आरोग्यानुसार सुरक्षित मर्यादा सेट करा.",
      quickScanTitle: "झटपट स्कॅन",
      quickScanBadge: "त्वरित • १० सेकंद",
      quickScanDesc: "लॉगिनची गरज नाही. पॅकेटवरील बारकोड, घटक किंवा डिशचे नाव टाकून मैदा, पाम तेल, मीठ आणि रक्तातील साखरेचे धोके त्वरित ओळखा.",
      quickScanB1: "ICMR मानकांनुसार मीठ व साखरेची तपासणी",
      quickScanB2: "ट्रॅफिक लाईट सुरक्षा निर्देशक: सुरक्षित, मध्यम किंवा काळजी घ्या",
      quickScanB3: "सुपरमार्केटमध्ये ऑफलाइन स्कॅन उपलब्ध",
      quickScanCta: "कॅमेरा स्कॅनर सुरू करा",
      detailedTitle: "सविस्तर काळजी मोड",
      detailedBadge: "वैयक्तिक काळजी",
      detailedDesc: "तुमच्या लॅब रिपोर्ट किंवा डॉक्टरांच्या सल्ल्यानुसार टाइप-२ मधुमेह, रक्तदाब किंवा थायरॉईडसाठी योग्य आहाराची माहिती मिळवा.",
      detailedB1: "HbA1c आणि रक्तदाब लक्ष्यांशी जुळवून घेणारे",
      detailedB2: "पोहे, पराठे आणि गोड पदार्थांसाठी आरोग्यदायी पर्याय",
      detailedB3: "डॉक्टरांना दाखवण्यासाठी साप्ताहिक पोषण रोजनिशी",
      detailedCta: "माझी आरोग्य प्रोफाइल सेट करा",
      whyHeading: "भारतीय कुटुंबे आमच्यावर का विश्वास ठेवतात",
      whyTitle: "भारतीय स्वयंपाकघरांसाठी शास्त्रोक्त काळजी",
      whyDesc: "परदेशी अ‍ॅप्सना पोहे, फोडणी, घरगुती मसाले किंवा लोणच्यांमधील सोडियम समजत नाही. सेफबाईट भारतीय आहाराचे विश्लेषण करते.",
      p1Title: "१. भारतीय आहाराचे विश्लेषण",
      p1Desc: "बिस्किटांमधील पाम तेल, पापड-लोणच्यातील जास्तीचे मीठ आणि प्रिजर्व्हेटिव्ह्ज सहज ओळखतो.",
      p1Badge: "१४,०००+ भारतीय अन्नपदार्थांचा समावेश",
      p2Title: "२. स्पष्ट ट्रॅफिक लाईट दृश्ये",
      p2Desc: "कठीण आकडे किंवा रासायनिक सूत्रे नाहीत. फक्त हिरवा (सुरक्षित), पिवळा (मर्यादित) आणि लाल (टाळा) रंग संकेत.",
      p2Badge: "ज्येष्ठांसाठी वाचायला सोपा लेआउट",
      p3Title: "३. डॉक्टर व आहारतज्ज्ञांची मान्यता",
      p3Desc: "ICMR आणि NIN च्या वैज्ञानिक मानकांवर आधारलेले सुरक्षित मार्गदर्शन.",
      p3Badge: "प्रमाणित आहारतज्ज्ञांकडून तपासलेले",
      thaliTitle: "घरच्या जेवणाची तपासणी करायची आहे?",
      thaliDesc: 'तुमच्या जेवणाचे वर्णन करा: उदा. "२ चपात्या, डाळ आणि काकडीची कोशिंबीर" - मिळवा त्वरित सल्ला.',
      thaliCta: "जेवणाचे वर्णन करा →",
    },
  };

  const c = heroContent[language] || heroContent.en;

  return (
    <div className="flex flex-col w-full relative overflow-hidden">
      {/* Subtle Ambient Background Accents */}
      <div className="absolute -top-12 -left-16 w-72 h-72 rounded-full bg-[#bcf0ae]/25 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-96 h-96 rounded-full bg-[#ffdea5]/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-80 h-80 rounded-full bg-[#a1d494]/20 blur-2xl pointer-events-none" />

      {/* Main Hero Split Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-10 lg:py-16 relative">
        {/* Top Floating Botanical Flourish */}
        <div className="hidden lg:block absolute top-6 right-16 pointer-events-none opacity-85">
          <svg
            className="text-primary-container"
            fill="none"
            height="96"
            viewBox="0 0 68 96"
            width="68"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M34 94C34 94 4 72 4 38C4 18 20 4 34 2C48 4 64 18 64 38C64 72 34 94 34 94Z"
              fill="currentColor"
              fillOpacity="0.12"
            />
            <path
              d="M34 2V94M34 32L54 22M34 50L58 40M34 68L50 60M34 32L14 22M34 50L10 40M34 68L18 60"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="3"
            />
          </svg>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* LEFT COLUMN: Organic Framed Wholesome Food Visual */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* Playful curved organic graphic shape hugging the photo border */}
            <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-28 h-56 rounded-l-full bg-[#a1d494]/40 pointer-events-none -z-0" />
            <div className="absolute -right-4 -bottom-6 w-24 h-24 rounded-full bg-[#ffdea5]/50 pointer-events-none -z-0" />

            {/* Honey Mustard Starburst Icon Accent */}
            <div className="absolute -bottom-8 -left-4 z-10 pointer-events-none">
              <svg
                className="text-secondary"
                fill="none"
                height="74"
                viewBox="0 0 74 74"
                width="74"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line stroke="currentColor" strokeLinecap="round" strokeWidth="6" x1="37" x2="37" y1="2" y2="72" />
                <line stroke="currentColor" strokeLinecap="round" strokeWidth="6" x1="2" x2="72" y1="37" y2="37" />
                <line stroke="currentColor" strokeLinecap="round" strokeWidth="6" x1="12" x2="62" y1="12" y2="62" />
                <line stroke="currentColor" strokeLinecap="round" strokeWidth="6" x1="62" x2="12" y1="12" y2="62" />
              </svg>
            </div>

            {/* Curated Plate Container */}
            <div className="relative z-10 w-full max-w-md aspect-square rounded-2xl p-2.5 bg-white shadow-xl overflow-hidden group border border-[#c2c9bb]/30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-700 ease-out"
                alt="Top down overhead photograph of a fresh vibrant wholesome Indian nourish bowl"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZs_cCirLxAZxFuRoX6dLBCGRGVKbaOkNc_WFndNAMgksTWTx-TZ0jF1bcaop5kKxKzHQkhWvIixI9sSs_tiOUEbV40fuFnWy7j_SsDScNCIN7HMJpdZ_NzCPZaNsHIthHZ4YjNRKdVbElO0eVCMFkc9Oppnz12DVCNNuMRh_FI7aw7G_K2dy56_N4-Q_y6HTVQLlxX5fr6wKNadJWFemiYpXCaVhfNl0PpYMyMOlKOPOjczVy_mItMA"
              />

              {/* Floating badge: Clinical Safety Certified */}
              <div className="absolute bottom-5 right-5 bg-white/95 backdrop-blur-md rounded-full px-4 py-2 shadow-md flex items-center gap-2 border border-[#c2c9bb]/30">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[11px] text-primary tracking-wide uppercase font-bold">
                  100% Indian Staples Calibrated
                </span>
              </div>
            </div>

            {/* Subtle Botanical Leaf Sticker */}
            <div className="hidden sm:block absolute -right-8 -bottom-4 z-10 pointer-events-none">
              <svg
                className="text-primary-container"
                fill="none"
                height="68"
                viewBox="0 0 68 68"
                width="68"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 56C12 56 22 20 56 12C56 12 52 46 16 56" fill="currentColor" fillOpacity="0.18" />
                <path d="M12 56C28 40 44 26 56 12" stroke="currentColor" strokeLinecap="round" strokeWidth="3" />
                <path d="M30 38C38 36 44 32 48 26" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5" />
                <path d="M22 46C28 44 34 40 38 34" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5" />
              </svg>
            </div>
          </div>

          {/* RIGHT COLUMN: Big Warm Typography, Subtext & Action Pills */}
          <div className="lg:col-span-7 flex flex-col items-start gap-4 lg:pl-6">
            {/* Friendly Pill Meta Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ece8e0] text-primary border border-[#c2c9bb]/30">
              <span className="material-symbols-outlined text-base">verified_user</span>
              <span className="text-[11px] uppercase tracking-wider font-bold">{c.tag}</span>
            </div>

            {/* Big Bold Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-primary leading-[1.1]">
              {c.h1Line1} <br className="hidden sm:inline" />
              {c.h1Line2}
              <br />
              <span className="text-primary">{c.h1Line3}</span>
              <span className="text-secondary font-black">.</span>
            </h1>

            {/* Warm Subtitle */}
            <p className="text-base sm:text-lg text-[#42493e] max-w-xl leading-relaxed">
              {c.desc}
            </p>

            {/* Main Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              <Link
                href="/scan"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-primary-container hover:bg-primary text-white font-bold text-sm uppercase tracking-wider shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
              >
                <span>{c.scanBtn}</span>
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </Link>

              <Link
                href="/profile"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-transparent hover:bg-[#f7f3eb] text-primary font-bold text-sm uppercase tracking-wider border-2 border-primary/20 hover:border-primary/50 transition-all duration-300"
              >
                <span>{c.profileBtn}</span>
                <span className="material-symbols-outlined text-lg">edit_note</span>
              </Link>
            </div>

            {/* Inline Language Quick Switch Bar */}
            <div className="flex items-center gap-2 pt-2 text-[#42493e]">
              <span className="text-xs uppercase font-medium">{c.readIn}</span>
              <div className="inline-flex items-center bg-[#f1ede6] p-1 rounded-full gap-1 border border-[#c2c9bb]/30">
                <button
                  onClick={() => setLanguage("en")}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    language === "en"
                      ? "bg-white text-primary shadow-xs"
                      : "text-[#42493e] hover:bg-[#ece8e0]"
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage("hi")}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    language === "hi"
                      ? "bg-white text-primary shadow-xs"
                      : "text-[#42493e] hover:bg-[#ece8e0]"
                  }`}
                >
                  हिन्दी
                </button>
                <button
                  onClick={() => setLanguage("mr")}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    language === "mr"
                      ? "bg-white text-primary shadow-xs"
                      : "text-[#42493e] hover:bg-[#ece8e0]"
                  }`}
                >
                  मराठी
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODE SELECTION SECTION */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-10 lg:py-16">
        <div className="flex flex-col gap-2 mb-8 text-left">
          <div className="flex items-center gap-2 text-secondary text-xs sm:text-sm font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-base">route</span>
            <span>{c.modeHeading}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-primary">
            {c.modeTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#42493e] max-w-2xl leading-relaxed">
            {c.modeSubtitle}
          </p>
        </div>

        {/* Dual Choice Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CARD 1: Quick Scan Mode */}
          <div className="relative bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group overflow-hidden border border-[#c2c9bb]/30">
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#bcf0ae]/20 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500" />
            <div className="flex flex-col gap-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-full bg-[#bcf0ae] flex items-center justify-center text-primary shadow-xs">
                  <span className="material-symbols-outlined text-2xl">document_scanner</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#f1ede6] text-xs text-primary font-bold uppercase">
                  {c.quickScanBadge}
                </span>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-primary mb-2">
                  {c.quickScanTitle}
                </h3>
                <p className="text-sm text-[#42493e] leading-relaxed">
                  {c.quickScanDesc}
                </p>
              </div>

              {/* Feature bullet points */}
              <div className="flex flex-col gap-2.5 pt-2">
                <div className="flex items-center gap-2 text-sm text-[#1c1c17]">
                  <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                  <span>{c.quickScanB1}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#1c1c17]">
                  <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                  <span>{c.quickScanB2}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#1c1c17]">
                  <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                  <span>{c.quickScanB3}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 relative z-10">
              <Link
                href="/scan"
                className="w-full inline-flex items-center justify-between px-6 py-3.5 rounded-full bg-[#ece8e0] hover:bg-primary-container hover:text-white text-primary font-bold text-sm transition-colors duration-300 shadow-xs"
              >
                <span>{c.quickScanCta}</span>
                <span className="material-symbols-outlined text-lg">photo_camera</span>
              </Link>
            </div>
          </div>

          {/* CARD 2: Detailed Care Mode */}
          <div className="relative bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group overflow-hidden border border-[#c2c9bb]/30">
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#ffdea5]/30 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500" />
            <div className="flex flex-col gap-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-full bg-[#ffc653] flex items-center justify-center text-[#735200] shadow-xs">
                  <span className="material-symbols-outlined text-2xl">health_and_safety</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#ffdea5]/50 text-xs text-secondary font-bold uppercase">
                  {c.detailedBadge}
                </span>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-primary mb-2">
                  {c.detailedTitle}
                </h3>
                <p className="text-sm text-[#42493e] leading-relaxed">
                  {c.detailedDesc}
                </p>
              </div>

              {/* Feature bullet points */}
              <div className="flex flex-col gap-2.5 pt-2">
                <div className="flex items-center gap-2 text-sm text-[#1c1c17]">
                  <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                  <span>{c.detailedB1}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#1c1c17]">
                  <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                  <span>{c.detailedB2}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#1c1c17]">
                  <span className="material-symbols-outlined text-secondary text-base">check_circle</span>
                  <span>{c.detailedB3}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 relative z-10">
              <Link
                href="/profile"
                className="w-full inline-flex items-center justify-between px-6 py-3.5 rounded-full bg-primary-container text-white hover:bg-primary font-bold text-sm transition-colors duration-300 shadow-sm"
              >
                <span>{c.detailedCta}</span>
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHY SAFEBITE 3-PILLAR SECTION */}
      <section className="w-full bg-[#f7f3eb] py-12 lg:py-16 border-y border-[#c2c9bb]/20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs uppercase tracking-wider text-secondary font-bold">
                {c.whyHeading}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mt-1">
                {c.whyTitle}
              </h2>
            </div>
            <p className="text-sm text-[#42493e] max-w-md leading-relaxed">
              {c.whyDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-col gap-3 hover:-translate-y-1 transition-transform duration-300 border border-[#c2c9bb]/30">
              <div className="w-12 h-12 rounded-full bg-[#bcf0ae]/40 flex items-center justify-center text-primary mb-1">
                <span className="material-symbols-outlined text-2xl">nutrition</span>
              </div>
              <h3 className="text-lg font-bold text-primary">{c.p1Title}</h3>
              <p className="text-sm text-[#42493e] leading-relaxed">{c.p1Desc}</p>
              <div className="pt-2 flex items-center gap-1.5 text-primary text-xs font-semibold mt-auto">
                <span className="material-symbols-outlined text-sm">spa</span>
                <span>{c.p1Badge}</span>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-col gap-3 hover:-translate-y-1 transition-transform duration-300 border border-[#c2c9bb]/30">
              <div className="w-12 h-12 rounded-full bg-[#ffdea5]/50 flex items-center justify-center text-secondary mb-1">
                <span className="material-symbols-outlined text-2xl">traffic</span>
              </div>
              <h3 className="text-lg font-bold text-primary">{c.p2Title}</h3>
              <p className="text-sm text-[#42493e] leading-relaxed">{c.p2Desc}</p>
              <div className="pt-2 flex items-center gap-1.5 text-secondary text-xs font-semibold mt-auto">
                <span className="material-symbols-outlined text-sm">visibility</span>
                <span>{c.p2Badge}</span>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-col gap-3 hover:-translate-y-1 transition-transform duration-300 border border-[#c2c9bb]/30">
              <div className="w-12 h-12 rounded-full bg-[#b0f494]/40 flex items-center justify-center text-tertiary mb-1">
                <span className="material-symbols-outlined text-2xl">clinical_notes</span>
              </div>
              <h3 className="text-lg font-bold text-primary">{c.p3Title}</h3>
              <p className="text-sm text-[#42493e] leading-relaxed">{c.p3Desc}</p>
              <div className="pt-2 flex items-center gap-1.5 text-tertiary text-xs font-semibold mt-auto">
                <span className="material-symbols-outlined text-sm">verified</span>
                <span>{c.p3Badge}</span>
              </div>
            </div>
          </div>

          {/* Quick Interactive Meal Preview Card Strip */}
          <div className="mt-8 bg-[#ece8e0]/70 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#c2c9bb]/30">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary-container text-white flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-2xl">restaurant</span>
              </div>
              <div>
                <div className="text-base font-bold text-primary">{c.thaliTitle}</div>
                <div className="text-xs sm:text-sm text-[#42493e]">{c.thaliDesc}</div>
              </div>
            </div>
            <Link
              href="/meal"
              className="px-6 py-3 rounded-full bg-white hover:bg-primary-container hover:text-white text-primary text-sm font-bold shadow-xs whitespace-nowrap transition-colors"
            >
              {c.thaliCta}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
