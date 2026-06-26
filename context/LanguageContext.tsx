"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { dictionaries } from "./dictionaries";

export type SupportedLocale =
  // Liturgical Core
  | "cop"
  | "ar-EG"
  | "am-ET"
  | "el-GR"
  // Middle East & Asia
  | "ar"
  | "ar-SA"
  | "ar-AE"
  | "he-IL"
  | "fa-IR"
  | "hi-IN"
  | "ja-JP"
  | "ko-KR"
  | "zh-CN"
  | "zh-TW"
  | "th-TH"
  | "vi-VN"
  // Western Europe / Global
  | "en"
  | "en-US"
  | "en-GB"
  | "en-CA"
  | "en-AU"
  | "en-IN"
  | "fr-FR"
  | "fr-CA"
  | "de-DE"
  | "es-ES"
  | "it-IT"
  | "nl-NL"
  | "pt-PT"
  | "pt-BR"
  // Eastern Europe
  | "ru-RU"
  | "uk-UA"
  | "pl-PL"
  | "cs-CZ"
  | "hu-HU"
  | "ro-RO"
  | "bg-BG"
  // Northern & Africa
  | "sv-SE"
  | "nb-NO"
  | "da-DK"
  | "fi-FI"
  | "sw-KE"
  | "af-ZA"
  | "tr-TR"
  | "id-ID"
  | "ms-MY"
  | "cy-GB";

export type Direction = "ltr" | "rtl";

interface LanguageContextType {
  locale: SupportedLocale;
  dir: Direction;
  setLocale: (locale: SupportedLocale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const RTL_LOCALES: string[] = ["ar", "ar-EG", "ar-SA", "ar-AE", "he-IL", "fa-IR"];

export const LOCALE_SCRIPT_FAMILIES: Record<SupportedLocale, string> = {
  // Liturgical Core
  cop: "coptic",
  "ar-EG": "arabic",
  "am-ET": "ethiopic",
  "el-GR": "greek",
  // Middle East & Asia
  ar: "arabic",
  "ar-SA": "arabic",
  "ar-AE": "arabic",
  "he-IL": "hebrew",
  "fa-IR": "arabic",
  "hi-IN": "devanagari",
  "ja-JP": "cjk",
  "ko-KR": "cjk",
  "zh-CN": "cjk",
  "zh-TW": "cjk",
  "th-TH": "thai",
  "vi-VN": "latin",
  // Global & European Extensions
  en: "latin",
  "en-US": "latin",
  "en-GB": "latin",
  "en-CA": "latin",
  "en-AU": "latin",
  "en-IN": "latin",
  "fr-FR": "latin",
  "fr-CA": "latin",
  "de-DE": "latin",
  "es-ES": "latin",
  "it-IT": "latin",
  "nl-NL": "latin",
  "pt-PT": "latin",
  "pt-BR": "latin",
  "ru-RU": "cyrillic",
  "uk-UA": "cyrillic",
  "pl-PL": "latin",
  "cs-CZ": "latin",
  "hu-HU": "latin",
  "ro-RO": "latin",
  "bg-BG": "cyrillic",
  "sv-SE": "latin",
  "nb-NO": "latin",
  "da-DK": "latin",
  "fi-FI": "latin",
  "sw-KE": "latin",
  "af-ZA": "latin",
  "tr-TR": "latin",
  "id-ID": "latin",
  "ms-MY": "latin",
  "cy-GB": "latin"
};

export function LanguageProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale: SupportedLocale;
}) {
  const [locale, setLocaleState] = useState<SupportedLocale>(initialLocale);
  const [dir, setDir] = useState<Direction>(RTL_LOCALES.includes(initialLocale) ? "rtl" : "ltr");

  const setLocale = (newLocale: SupportedLocale) => {
    setLocaleState(newLocale);
    const newDir: Direction = RTL_LOCALES.includes(newLocale) ? "rtl" : "ltr";
    setDir(newDir);

    if (typeof window !== "undefined") {
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
      localStorage.setItem("preferredLanguage", newLocale);
      document.documentElement.lang = newLocale;
      document.documentElement.dir = newDir;
      document.documentElement.setAttribute("data-script-family", LOCALE_SCRIPT_FAMILIES[newLocale]);
    }
  };

  useEffect(() => {
    const VALID_LOCALES: SupportedLocale[] = [
      "cop", "ar-EG", "am-ET", "el-GR",
      "ar", "ar-SA", "ar-AE", "he-IL", "fa-IR", "hi-IN", "ja-JP", "ko-KR", "zh-CN", "zh-TW", "th-TH", "vi-VN",
      "en", "en-US", "en-GB", "en-CA", "en-AU", "en-IN", "fr-FR", "fr-CA", "de-DE", "es-ES", "it-IT", "nl-NL", "pt-PT", "pt-BR",
      "ru-RU", "uk-UA", "pl-PL", "cs-CZ", "hu-HU", "ro-RO", "bg-BG",
      "sv-SE", "nb-NO", "da-DK", "fi-FI", "sw-KE", "af-ZA", "tr-TR", "id-ID", "ms-MY", "cy-GB"
    ];

    const storedLang = localStorage.getItem("preferredLanguage");
    if (storedLang && VALID_LOCALES.includes(storedLang as SupportedLocale)) {
      const activeLocale = storedLang as SupportedLocale;
      if (activeLocale !== locale) {
        setLocale(activeLocale);
      } else {
        document.documentElement.lang = locale;
        document.documentElement.dir = dir;
        document.documentElement.setAttribute("data-script-family", LOCALE_SCRIPT_FAMILIES[locale]);
      }
      return;
    }

    // Attempt browser language detection if no manual setting
    if (typeof navigator !== "undefined") {
      const browserLanguages = navigator.languages || [navigator.language];
      let detectedLocale: SupportedLocale = "en";
      let matched = false;

      // Exact match check (matching country suffixes)
      for (const lang of browserLanguages) {
        const normalizedLang = lang.toLowerCase();
        const found = VALID_LOCALES.find(val => val.toLowerCase() === normalizedLang);
        if (found) {
          detectedLocale = found;
          matched = true;
          break;
        }
      }

      // Base code fallback check
      if (!matched) {
        for (const lang of browserLanguages) {
          const base = lang.split("-")[0].toLowerCase();
          const foundBase = VALID_LOCALES.find(val => val.toLowerCase() === base);
          if (foundBase) {
            detectedLocale = foundBase;
            matched = true;
            break;
          }
          const sibling = VALID_LOCALES.find(l => l.toLowerCase().startsWith(base));
          if (sibling) {
            detectedLocale = sibling;
            matched = true;
            break;
          }
        }
      }

      setLocale(detectedLocale);
    } else {
      document.documentElement.lang = locale;
      document.documentElement.dir = dir;
      document.documentElement.setAttribute("data-script-family", LOCALE_SCRIPT_FAMILIES[locale]);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    document.documentElement.setAttribute("data-script-family", LOCALE_SCRIPT_FAMILIES[locale]);
  }, [locale, dir]);

  const getDictionaryForLocale = (loc: SupportedLocale) => {
    const base = loc.split("-")[0] as keyof typeof dictionaries;
    if (base in dictionaries) {
      return dictionaries[base];
    }
    return dictionaries.en;
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    let current: any = getDictionaryForLocale(locale);

    for (const k of keys) {
      if (current && typeof current === "object" && k in current) {
        current = current[k];
      } else {
        let fallback: any = dictionaries.en;
        for (const fk of keys) {
          if (fallback && typeof fallback === "object" && fk in fallback) {
            fallback = fallback[fk];
          } else {
            return key;
          }
        }
        return typeof fallback === "string" ? fallback : key;
      }
    }

    return typeof current === "string" ? current : key;
  };

  return (
    <LanguageContext.Provider value={{ locale, dir, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
