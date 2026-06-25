"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const SUPPORTED_LANGUAGES = ["en", "ar"];

export default function SplashScreen() {
  const router = useRouter();
  const [langDir, setLangDir] = useState<"ltr" | "rtl">("ltr");
  const [lang, setLang] = useState<string>("en");
  
  // Animation states
  const [showBranding, setShowBranding] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);

  // 1. Apple Font Stack Style constant
  const appleFontStack = {
    fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };

  useEffect(() => {
    // 2. Localization & Device Language Detection Logic
    let detectedLang = "en";

    if (typeof window !== "undefined") {
      const storedPref = localStorage.getItem("preferredLanguage");
      if (storedPref) {
        detectedLang = storedPref;
      } else if (navigator.languages && navigator.languages.length) {
        detectedLang = navigator.languages[0];
      } else if (navigator.language) {
        detectedLang = navigator.language;
      }
    }

    // Match language code (including region matching like ar-eg to ar)
    const primaryCode = detectedLang.split("-")[0].toLowerCase();
    const finalLang = SUPPORTED_LANGUAGES.includes(primaryCode) ? primaryCode : "en";
    
    setLang(finalLang);
    setLangDir(finalLang === "ar" ? "rtl" : "ltr");

    // 3. Animation entrance flags
    // Logo & Title fade in softly (duration 800ms)
    const brandingTimer = setTimeout(() => {
      setShowBranding(true);
    }, 100);

    // Tagline subtitle holds back until a strict 400ms delay window passes
    const subtitleTimer = setTimeout(() => {
      setShowSubtitle(true);
    }, 500); // 100ms branding start + 400ms delay

    // 4. Routing Strategy
    // Hold splash for 2.5 seconds (2500ms), then push to main app root path '/'
    const routingTimer = setTimeout(() => {
      console.log("SplashScreen complete: Routing to main application root.");
      router.push("/");
    }, 2500);

    return () => {
      clearTimeout(brandingTimer);
      clearTimeout(subtitleTimer);
      clearTimeout(routingTimer);
    };
  }, [router]);

  return (
    <div
      dir={langDir}
      lang={lang}
      style={appleFontStack}
      className="flex h-screen w-screen items-center justify-center bg-[#001F3F] relative overflow-hidden"
    >
      <div className="flex flex-col items-center justify-center text-center px-4 max-w-md select-none">
        {/* Branding Frame: SVG Logo & Title */}
        <div
          className={`flex flex-col items-center gap-6 transition-all duration-800 ease-out transform ${
            showBranding ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {/* Custom Minimalist Orthodox Brand Logo */}
          <div className="w-24 h-24 text-white flex items-center justify-center">
            <svg
              className="w-full h-full text-white"
              viewBox="0 0 100 100"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* Orthodox Cross - Vertical Stem / 'P' Stem */}
              <rect x="42" y="10" width="5" height="80" rx="2.5" />
              
              {/* Orthodox Cross - Main Horizontal Bar */}
              <rect x="25" y="30" width="39" height="5" rx="2.5" />
              
              {/* Orthodox Cross - Slanted Footrest Bar */}
              <path
                d="M 33 67 L 56 56 L 56 61 L 33 72 Z"
                fill="currentColor"
              />

              {/* Geometric 'P' Loop (Clean right-side sweep) */}
              <path
                d="M 47 12 C 68 12, 68 40, 47 40"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
              
              {/* Dove Symbolism - Left Wings/Body Curve */}
              <path
                d="M 28 35 C 15 26, 14 52, 32 48 C 22 49, 21 41, 28 35"
                fill="currentColor"
              />
              
              {/* Dove Symbolism - Right Wings/Body Curve */}
              <path
                d="M 54 26 C 72 17, 76 39, 60 41 C 69 37, 66 28, 54 26"
                fill="currentColor"
              />
            </svg>
          </div>

          {/* Main Title: POLITIA */}
          <h1
            className="text-white font-[600] tracking-[-0.28px] select-none"
            style={{
              fontSize: "40px",
              lineHeight: "46px",
            }}
          >
            POLITIA
          </h1>
        </div>

        {/* Tagline Subtitle: Delayed Fade In */}
        <p
          className={`mt-4 text-[14px] font-[400] leading-[20px] tracking-wider text-white/70 transition-all duration-800 ease-out transform ${
            showSubtitle ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          Your Orthodox Digital Ecosystem
        </p>
      </div>
    </div>
  );
}
