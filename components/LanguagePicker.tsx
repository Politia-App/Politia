"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLanguage, SupportedLocale } from "@/context/LanguageContext";

interface LocaleOption {
  code: SupportedLocale;
  label: string;
  isRtl: boolean;
}

const LOCALE_OPTIONS: LocaleOption[] = [
  { code: "ar", label: "العربية (العامة)", isRtl: true },
  { code: "ar-EG", label: "العربية (مصر)", isRtl: true },
  { code: "ar-SA", label: "العربية (المملكة العربية السعودية)", isRtl: true },
  { code: "ar-AE", label: "العربية (الإمارات العربية المتحدة)", isRtl: true },
  { code: "cop", label: "القبطية (ⲧⲁⲥⲡⲓ ⲛⲣⲉⲙⲛⲭⲏⲙⲓ)", isRtl: false },
  { code: "en", label: "English", isRtl: false },
  { code: "en-US", label: "English (United States)", isRtl: false },
  { code: "en-GB", label: "English (United Kingdom)", isRtl: false },
  { code: "en-CA", label: "English (Canada)", isRtl: false },
  { code: "en-AU", label: "English (Australia)", isRtl: false },
  { code: "en-IN", label: "English (India)", isRtl: false },
  { code: "fr", label: "Français", isRtl: false },
  { code: "fr-FR", label: "Français (France)", isRtl: false },
  { code: "es", label: "Español", isRtl: false },
  { code: "es-ES", label: "Español (España)", isRtl: false },
  { code: "it", label: "Italiano", isRtl: false },
  { code: "it-IT", label: "Italiano (Italia)", isRtl: false },
  { code: "de", label: "Deutsch", isRtl: false },
  { code: "de-DE", label: "Deutsch (Deutschland)", isRtl: false },
  { code: "am", label: "አማርኛ (الأمهرية)", isRtl: false },
  { code: "am-ET", label: "አማርኛ (ኢትዮጵያ)", isRtl: false },
  { code: "el", label: "Ελληνικά (اليونانية)", isRtl: false },
  { code: "el-GR", label: "Ελληνικά (Ελλάδα)", isRtl: false },
  { code: "pt", label: "Português", isRtl: false },
  { code: "pt-PT", label: "Português (Portugal)", isRtl: false },
  { code: "nl", label: "Nederlands", isRtl: false },
  { code: "nl-NL", label: "Nederlands (Nederland)", isRtl: false },
  { code: "sv", label: "Svenska", isRtl: false },
  { code: "sv-SE", label: "Svenska (Sverige)", isRtl: false },
  { code: "sw", label: "Kiswahili (السواحيلية)", isRtl: false },
  { code: "sw-KE", label: "Kiswahili (Kenya)", isRtl: false },
];

const getDisplayLabel = (code: SupportedLocale): string => {
  const found = LOCALE_OPTIONS.find((opt) => opt.code === code);
  return found ? found.label : code;
};

interface LanguagePickerProps {
  placement?: "top" | "bottom";
  align?: "start" | "end";
}

export default function LanguagePicker({ placement = "bottom", align = "start" }: LanguagePickerProps) {
  const { locale, setLocale, dir } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Click outside detection
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (code: SupportedLocale) => {
    setLocale(code);
    setIsOpen(false);
  };

  const activeLabel = getDisplayLabel(locale);

  // Apply Apple font rules
  const appleFontStack = {
    fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };

  const alignClass = align === "end" ? "end-0" : "start-0";

  return (
    <div
      ref={containerRef}
      className="relative inline-block text-left"
      style={appleFontStack}
    >
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 text-[12px] font-medium text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-all duration-150 ease-in-out cursor-pointer active:scale-[0.98] select-none"
      >
        <svg className="w-4 h-4 text-zinc-400 dark:text-zinc-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-.778.099-1.533.284-2.253m0 0A17.919 17.919 0 0 0 12 7.5a17.919 17.919 0 0 0 8.716 2.253" />
        </svg>
        <span>{activeLabel}</span>
        <svg className={`w-3.5 h-3.5 ml-0.5 text-zinc-400 dark:text-zinc-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {/* Dropdown Menu Container */}
      {isOpen && (
        <div
          className={`absolute z-[100] w-64 rounded-xl border border-zinc-200/80 bg-white/95 dark:border-zinc-800/80 dark:bg-zinc-900/95 backdrop-blur-md py-1.5 select-none focus:outline-none transition-all duration-150 ease-out ${
            placement === "top"
              ? "bottom-full mb-2"
              : "top-full mt-2"
          } ${alignClass}`}
        >
          <div className="max-h-72 overflow-y-auto px-1 py-1 space-y-0.5">
            {LOCALE_OPTIONS.map((opt) => {
              const isSelected = locale === opt.code;
              return (
                <button
                  key={opt.code}
                  onClick={() => handleSelect(opt.code)}
                  dir={opt.isRtl ? "rtl" : "ltr"}
                  className={`w-full text-start flex items-center justify-between px-3 py-2 rounded-lg text-[12px] font-medium transition-all duration-150 ${
                    isSelected
                      ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 hover:text-zinc-900 dark:hover:text-zinc-200"
                  }`}
                >
                  <span>{opt.label}</span>
                  {isSelected && (
                    <svg className="w-3.5 h-3.5 text-zinc-900 dark:text-zinc-50" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
