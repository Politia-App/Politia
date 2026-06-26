"use client";

import React, { useState, useEffect } from "react";
import { useLanguage, SupportedLocale, LOCALE_SCRIPT_FAMILIES } from "@/context/LanguageContext";

interface LocaleOption {
  code: SupportedLocale;
  label: string;
  nativeLabel: string;
  isRtl: boolean;
  group: string;
  family: string;
}

const LOCALE_OPTIONS: LocaleOption[] = [
  // Liturgical Core Network
  { code: "cop", label: "Coptic (ⲧⲥⲫⲣⲁϧⲓ ⲛⲣⲉⲙⲛⲭⲏⲲⲓ)", nativeLabel: "Ϯⲁⲥⲡⲓ ⲛ̀ⲣⲉⲙⲛ̀ⲣⲏⲙⲓ", isRtl: false, group: "Liturgical Core Network", family: "coptic" },
  { code: "ar-EG", label: "Arabic (Egypt) (العربية (مصر))", nativeLabel: "العربية (مصر)", isRtl: true, group: "Liturgical Core Network", family: "arabic" },
  { code: "am-ET", label: "Amharic (አማርኛ)", nativeLabel: "አማርኛ", isRtl: false, group: "Liturgical Core Network", family: "ethiopic" },
  { code: "el-GR", label: "Greek (Ελληνικά)", nativeLabel: "Ελληνικά", isRtl: false, group: "Liturgical Core Network", family: "greek" },

  // Middle East & Asia Core
  { code: "ar", label: "Arabic (General) (العربية)", nativeLabel: "العربية", isRtl: true, group: "Middle East & Asia Core", family: "arabic" },
  { code: "ar-SA", label: "Arabic (Saudi Arabia) (العربية (السعودية))", nativeLabel: "العربية (السعودية)", isRtl: true, group: "Middle East & Asia Core", family: "arabic" },
  { code: "ar-AE", label: "Arabic (UAE) (العربية (الإمارات))", nativeLabel: "العربية (الإمارات)", isRtl: true, group: "Middle East & Asia Core", family: "arabic" },
  { code: "he-IL", label: "Hebrew (עברית)", nativeLabel: "עברית", isRtl: true, group: "Middle East & Asia Core", family: "hebrew" },
  { code: "fa-IR", label: "Persian (فارسی)", nativeLabel: "فارسی", isRtl: true, group: "Middle East & Asia Core", family: "arabic" },
  { code: "hi-IN", label: "Hindi (हिन्दी)", nativeLabel: "हिन्दी", isRtl: false, group: "Middle East & Asia Core", family: "devanagari" },
  { code: "ja-JP", label: "Japanese (日本語)", nativeLabel: "日本語", isRtl: false, group: "Middle East & Asia Core", family: "cjk" },
  { code: "ko-KR", label: "Korean (한국어)", nativeLabel: "한국어", isRtl: false, group: "Middle East & Asia Core", family: "cjk" },
  { code: "zh-CN", label: "Chinese (Simplified) (简体中文)", nativeLabel: "简体中文", isRtl: false, group: "Middle East & Asia Core", family: "cjk" },
  { code: "zh-TW", label: "Chinese (Traditional) (繁體中文)", nativeLabel: "繁體中文", isRtl: false, group: "Middle East & Asia Core", family: "cjk" },
  { code: "th-TH", label: "Thai (ไทย)", nativeLabel: "ไทย", isRtl: false, group: "Middle East & Asia Core", family: "thai" },
  { code: "vi-VN", label: "Vietnamese (Tiếng Việt)", nativeLabel: "Tiếng Việt", isRtl: false, group: "Middle East & Asia Core", family: "latin" },

  // Global & European Extensions
  { code: "en", label: "English (Global)", nativeLabel: "English", isRtl: false, group: "Global & European Extensions", family: "latin" },
  { code: "en-US", label: "English (US)", nativeLabel: "English (US)", isRtl: false, group: "Global & European Extensions", family: "latin" },
  { code: "en-GB", label: "English (UK)", nativeLabel: "English (UK)", isRtl: false, group: "Global & European Extensions", family: "latin" },
  { code: "en-CA", label: "English (Canada)", nativeLabel: "English (Canada)", isRtl: false, group: "Global & European Extensions", family: "latin" },
  { code: "en-AU", label: "English (Australia)", nativeLabel: "English (Australia)", isRtl: false, group: "Global & European Extensions", family: "latin" },
  { code: "en-IN", label: "English (India)", nativeLabel: "English (India)", isRtl: false, group: "Global & European Extensions", family: "latin" },
  { code: "fr-FR", label: "French (France) (Français)", nativeLabel: "Français", isRtl: false, group: "Global & European Extensions", family: "latin" },
  { code: "fr-CA", label: "French (Canada) (Français (Canada))", nativeLabel: "Français (Canada)", isRtl: false, group: "Global & European Extensions", family: "latin" },
  { code: "de-DE", label: "German (Deutsch)", nativeLabel: "Deutsch", isRtl: false, group: "Global & European Extensions", family: "latin" },
  { code: "es-ES", label: "Spanish (Español)", nativeLabel: "Español", isRtl: false, group: "Global & European Extensions", family: "latin" },
  { code: "it-IT", label: "Italian (Italiano)", nativeLabel: "Italiano", isRtl: false, group: "Global & European Extensions", family: "latin" },
  { code: "nl-NL", label: "Dutch (Nederlands)", nativeLabel: "Nederlands", isRtl: false, group: "Global & European Extensions", family: "latin" },
  { code: "pt-PT", label: "Portuguese (Portugal) (Português)", nativeLabel: "Português", isRtl: false, group: "Global & European Extensions", family: "latin" },
  { code: "pt-BR", label: "Portuguese (Brazil) (Português (Brasil))", nativeLabel: "Português (Brasil)", isRtl: false, group: "Global & European Extensions", family: "latin" },
  { code: "ru-RU", label: "Russian (Русский)", nativeLabel: "Русский", isRtl: false, group: "Global & European Extensions", family: "cyrillic" },
  { code: "uk-UA", label: "Ukrainian (Українська)", nativeLabel: "Українська", isRtl: false, group: "Global & European Extensions", family: "cyrillic" },
  { code: "pl-PL", label: "Polish (Polski)", nativeLabel: "Polski", isRtl: false, group: "Global & European Extensions", family: "latin" },
  { code: "cs-CZ", label: "Czech (Čeština)", nativeLabel: "Čeština", isRtl: false, group: "Global & European Extensions", family: "latin" },
  { code: "hu-HU", label: "Hungarian (Magyar)", nativeLabel: "Magyar", isRtl: false, group: "Global & European Extensions", family: "latin" },
  { code: "ro-RO", label: "Romanian (Română)", nativeLabel: "Română", isRtl: false, group: "Global & European Extensions", family: "latin" },
  { code: "bg-BG", label: "Bulgarian (Български)", nativeLabel: "Български", isRtl: false, group: "Global & European Extensions", family: "cyrillic" },
  { code: "sv-SE", label: "Swedish (Svenska)", nativeLabel: "Svenska", isRtl: false, group: "Global & European Extensions", family: "latin" },
  { code: "nb-NO", label: "Norwegian (Norsk Bokmål)", nativeLabel: "Norsk Bokmål", isRtl: false, group: "Global & European Extensions", family: "latin" },
  { code: "da-DK", label: "Danish (Dansk)", nativeLabel: "Dansk", isRtl: false, group: "Global & European Extensions", family: "latin" },
  { code: "fi-FI", label: "Finnish (Suomi)", nativeLabel: "Suomi", isRtl: false, group: "Global & European Extensions", family: "latin" },
  { code: "sw-KE", label: "Swahili (Kiswahili)", nativeLabel: "Kiswahili", isRtl: false, group: "Global & European Extensions", family: "latin" },
  { code: "af-ZA", label: "Afrikaans (Afrikaans)", nativeLabel: "Afrikaans", isRtl: false, group: "Global & European Extensions", family: "latin" },
  { code: "tr-TR", label: "Turkish (Türkçe)", nativeLabel: "Türkçe", isRtl: false, group: "Global & European Extensions", family: "latin" },
  { code: "id-ID", label: "Indonesian (Bahasa Indonesia)", nativeLabel: "Bahasa Indonesia", isRtl: false, group: "Global & European Extensions", family: "latin" },
  { code: "ms-MY", label: "Malay (Melayu)", nativeLabel: "Melayu", isRtl: false, group: "Global & European Extensions", family: "latin" },
  { code: "cy-GB", label: "Welsh (Cymraeg)", nativeLabel: "Cymraeg", isRtl: false, group: "Global & European Extensions", family: "latin" }
];

const getDisplayNativeLabel = (code: SupportedLocale): string => {
  const found = LOCALE_OPTIONS.find((opt) => opt.code === code);
  return found ? found.nativeLabel : code;
};

interface LanguagePickerProps {
  placement?: "top" | "bottom";
  align?: "start" | "end";
}

export default function LanguagePicker({ placement = "bottom", align = "start" }: LanguagePickerProps) {
  const { locale, setLocale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  // Keyboard accessibility & scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSelect = (code: SupportedLocale) => {
    setLocale(code);
    setIsOpen(false);
  };

  const activeNativeLabel = getDisplayNativeLabel(locale);

  const groups = ["Liturgical Core Network", "Middle East & Asia Core", "Global & European Extensions"];

  return (
    <div className="inline-block text-left select-none">
      {/* Sleek bottom portal trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 uppercase tracking-[0.1em] text-[11px] text-muted-foreground hover:text-foreground transition-colors duration-300 cursor-pointer focus:outline-none"
      >
        <svg className="w-4 h-4 transition-colors duration-300" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-.778.099-1.533.284-2.253m0 0A17.919 17.919 0 0 0 12 7.5a17.919 17.919 0 0 0 8.716 2.253" />
        </svg>
        <span>{activeNativeLabel}</span>
      </button>

      {/* Edge-to-Edge Full-Canvas Selection Overlap Layer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 w-screen h-screen bg-background text-foreground overflow-y-auto transition-opacity duration-200">
          <div className="max-w-7xl mx-auto px-6 py-12 sm:px-12 sm:py-20 flex flex-col min-h-full">
            {/* Header: minimalist system label and close button */}
            <div className="flex items-center justify-between pb-6 mb-12 border-b border-border">
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Politia System Matrix
                </span>
                <span className="h-4 w-[1px] bg-border"></span>
                <span className="text-xs text-primary font-medium uppercase tracking-wider">
                  {LOCALE_OPTIONS.length} Active System Nodes
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors cursor-pointer py-2 px-3 focus:outline-none"
              >
                ✕ Close (Esc)
              </button>
            </div>

            {/* Flat Matrix Grid Presentation */}
            <div className="flex-1 space-y-16">
              {groups.map((groupName) => {
                const options = LOCALE_OPTIONS.filter((o) => o.group === groupName);
                return (
                  <div key={groupName} className="space-y-5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {groupName}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-6">
                      {options.map((opt) => {
                        const isSelected = locale === opt.code;
                        return (
                          <button
                            key={opt.code}
                            type="button"
                            onClick={() => handleSelect(opt.code)}
                            dir={opt.isRtl ? "rtl" : "ltr"}
                            className={`w-full text-start flex items-center justify-between text-[13px] font-medium tracking-apple-body transition-all duration-150 cursor-pointer focus:outline-none hover:scale-[0.98] active:scale-[0.96] ${
                              isSelected
                                ? "text-primary font-bold scale-[0.98]"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            <span className="truncate">{opt.label}</span>
                            {isSelected && (
                              <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0 mx-2"></span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer System Meta */}
            <div className="border-t border-border pt-8 mt-16 text-[10px] text-muted-foreground flex flex-col sm:flex-row justify-between items-center gap-4">
              <span>POLITIA DIGITAL CITIZENSHIP LOCALIZATION CORE • v1.3.0</span>
              <span>LITURGICAL COMPLIANCE ACTIVE</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
