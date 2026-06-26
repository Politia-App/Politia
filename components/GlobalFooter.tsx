"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import LanguagePicker from "@/components/LanguagePicker";
import GlobalFooterPortal from "@/components/GlobalFooterPortal";
import { socials } from "@/components/ui/social-icons";

export default function GlobalFooter() {
  const { t, locale, setLocale, dir } = useLanguage();
  
  const footerSocialsOrder = [
    "socials.facebook",
    "socials.youtube",
    "socials.instagram",
    "socials.threads",
    "socials.whatsapp",
    "socials.email"
  ];

  const footerSocials = footerSocialsOrder
    .map(key => socials.find(s => s.nameKey === key))
    .filter((s): s is typeof socials[number] => !!s);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{ sender: "user" | "bot"; text: string }>>([
    { sender: "bot", text: "Peace be with you. How can I assist you in our spiritual ecosystem today?" }
  ]);

  const appleFontStack = {
    fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userMsg = chatMessage;
    setChatHistory((prev) => [...prev, { sender: "user", text: userMsg }]);
    setChatMessage("");

    // Simulate bot response
    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        {
          sender: "bot",
          text: `Thank you for reaching out. A servant from our community has received your message: "${userMsg}" and will respond shortly. May the grace of our Lord be with you.`
        }
      ]);
    }, 1000);
  };

  const footerColumns = [
    {
      titleKey: "footer.whatsNew.title",
      items: [
        { key: "footer.whatsNew.item1", href: "#" },
        { key: "footer.whatsNew.item2", href: "#" },
        { key: "footer.whatsNew.item3", href: "#" },
        { key: "footer.whatsNew.item4", href: "#" },
        { key: "footer.whatsNew.item5", href: "#" },
        { key: "footer.whatsNew.item6", href: "#" },
        { key: "footer.whatsNew.item7", href: "#" },
        { key: "footer.whatsNew.item8", href: "#" },
      ]
    },
    {
      titleKey: "footer.store.title",
      items: [
        { key: "footer.store.item1", href: "#" },
        { key: "footer.store.item2", href: "#" },
        { key: "footer.store.item3", href: "#" },
        { key: "footer.store.item4", href: "#" },
        { key: "footer.store.item5", href: "#" },
        { key: "footer.store.item6", href: "#" },
        { key: "footer.store.item7", href: "#" },
        { key: "footer.store.item8", href: "#" },
      ]
    },
    {
      titleKey: "footer.education.title",
      items: [
        { key: "footer.education.item1", href: "#" },
        { key: "footer.education.item2", href: "#" },
        { key: "footer.education.item3", href: "#" },
        { key: "footer.education.item4", href: "#" },
        { key: "footer.education.item5", href: "#" },
        { key: "footer.education.item6", href: "#" },
        { key: "footer.education.item7", href: "#" },
        { key: "footer.education.item8", href: "#" },
      ]
    },
    {
      titleKey: "footer.business.title",
      items: [
        { key: "footer.business.item1", href: "#" },
        { key: "footer.business.item2", href: "#" },
        { key: "footer.business.item3", href: "#" },
        { key: "footer.business.item4", href: "#" },
        { key: "footer.business.item5", href: "#" },
        { key: "footer.business.item6", href: "#" },
        { key: "footer.business.item7", href: "#" },
        { key: "footer.business.item8", href: "#" },
      ]
    },
    {
      titleKey: "footer.devIt.title",
      items: [
        { key: "footer.devIt.item1", href: "#" },
        { key: "footer.devIt.item2", href: "#" },
        { key: "footer.devIt.item3", href: "#" },
        { key: "footer.devIt.item4", href: "#" },
        { key: "footer.devIt.item5", href: "#" },
        { key: "footer.devIt.item6", href: "#" },
        { key: "footer.devIt.item7", href: "#" },
        { key: "footer.devIt.item8", href: "#" },
      ]
    },
    {
      titleKey: "footer.company.title",
      items: [
        { key: "footer.company.item1", href: "#" },
        { key: "footer.company.item2", href: "#" },
        { key: "footer.company.item3", href: "#" },
        { key: "footer.company.item4", href: "#" },
        { key: "footer.company.item5", href: "#" },
        { key: "footer.company.item6", href: "#" },
        { key: "footer.company.item7", href: "#" },
        { key: "footer.company.item8", href: "#" },
      ]
    }
  ];

  return (
    <footer
      style={appleFontStack}
      className="w-full bg-[#F5F5F7] text-zinc-600 dark:bg-zinc-950 dark:text-zinc-400 border-t border-[#E0E0E0] dark:border-zinc-800 py-12 mt-auto"
    >
      <div className="max-w-[1440px] mx-auto px-8 space-y-12">
        {/* 1. Header & Social Engagement Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#E0E0E0]/50 dark:border-zinc-800/50 pb-6">
          <div className="flex items-center gap-4">
            <span className="text-[13px] font-[600] text-zinc-800 dark:text-zinc-200">
              {t("footer.follow")}
            </span>
            <div className="flex items-center gap-3.5">
              {footerSocials.map((social) => (
                <a
                  key={social.nameKey}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-800 hover:text-zinc-900 active:scale-[0.96] dark:text-zinc-200 dark:hover:text-zinc-50 transition-all duration-200"
                  aria-label={t(social.labelKey)}
                  title={t(social.nameKey)}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Information Architecture (4-Column Flat Directory Portal) */}
        <GlobalFooterPortal />

        {/* 3. Base Utility & Localization Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 border-t border-[#E0E0E0]/50 dark:border-zinc-800/50 pt-6 text-[11px] text-zinc-500 dark:text-zinc-400 pb-2">
          {/* Left-Aligned Cluster */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {/* Globe & Localization Toggle */}
            <LanguagePicker placement="top" align="start" />

            {/* Privacy Settings */}
            <a href="#" className="flex items-center gap-1.5 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors">
              {/* Privacy Shield Icon */}
              <svg className="w-4 h-4 text-amber-600 dark:text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944a11.954 11.954 0 007.834 3.056 12.012 12.012 0 01-1.077 8.59c-.24.475-.522.92-.843 1.332A11.962 11.962 0 0110 18.056a11.962 11.962 0 01-5.914-3.133 12.01 12.01 0 01-1.077-8.59c-.24.475-.521.92-.843 1.332H2.166zm7.834-1.63a10.05 10.05 0 00-6.31 2.378 10.088 10.088 0 00.785 7.151 9.96 9.96 0 005.525 2.766 9.96 9.96 0 005.525-2.766 10.088 10.088 0 00.785-7.15 10.05 10.05 0 00-6.31-2.38z" clipRule="evenodd" />
              </svg>
              <span>{t("footer.privacyChoices")}</span>
            </a>

            <a href="#" className="hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors">
              {t("footer.healthPrivacy")}
            </a>
          </div>

          {/* Right-Aligned Legal Links */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
            <a href="#" className="hover:underline">{t("footer.sitemap")}</a>
            <a href="#" className="hover:underline">{t("footer.contact")}</a>
            <a href="#" className="hover:underline">{t("footer.privacy")}</a>
            <a href="#" className="hover:underline">{t("footer.terms")}</a>
            <a href="#" className="hover:underline">{t("footer.trademarks")}</a>
            <a href="#" className="hover:underline">{t("footer.safety")}</a>
            <a href="#" className="hover:underline">{t("footer.recycling")}</a>
          </div>
        </div>
      </div>

      {/* 4. Floating Action Component & Dialogue Assistant */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {/* Support Chat Popup Dialogue */}
        {isChatOpen && (
          <div className="w-80 h-96 rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 flex flex-col overflow-hidden mb-2 animate-fade-in text-zinc-800 dark:text-zinc-100">
            {/* Header */}
            <div className="bg-zinc-900 dark:bg-zinc-950 px-4 py-3 flex items-center justify-between text-white border-b border-zinc-100 dark:border-zinc-800">
              <span className="font-semibold text-[13px]">{t("footer.ask")}</span>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-white/80 hover:text-white transition-colors cursor-pointer text-sm font-bold"
              >
                ✕
              </button>
            </div>
            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-[12px] flex flex-col">
              {chatHistory.map((msg, index) => (
                <div
                  key={index}
                  className={`max-w-[80%] rounded-xl px-3 py-2 ${
                    msg.sender === "user"
                      ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 self-end rounded-tr-none"
                      : "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 self-start rounded-tl-none"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            {/* Form Input */}
            <form onSubmit={handleSendMessage} className="border-t border-zinc-200 dark:border-zinc-800 p-2 flex gap-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border border-zinc-200 dark:border-zinc-800 rounded-full px-3 py-1.5 text-[12px] focus:outline-none focus:border-zinc-800 dark:focus:border-zinc-700 bg-transparent"
              />
              <button
                type="submit"
                className="bg-zinc-900 text-white px-3 py-1.5 rounded-full text-[12px] font-semibold hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 active:scale-95 transition-all cursor-pointer"
              >
                Send
              </button>
            </form>
          </div>
        )}

        {/* Floating Bubble Trigger */}
        <div
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="flex items-center bg-white border border-dashed border-zinc-400 rounded-full pl-4 pr-1.5 py-1.5 shadow-lg cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all dark:bg-zinc-900 dark:border-zinc-700"
        >
          {/* Support Icon */}
          <svg className="w-5 h-5 text-amber-600 dark:text-amber-500 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a.598.598 0 0 1-.655-.705 5.26 5.26 0 0 0 2.224-4.517C6.004 14.28 5 12.02 5 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
          </svg>
          <span className="text-[12px] font-semibold text-zinc-700 dark:text-zinc-300 mr-4 select-none">
            {t("footer.ask")}
          </span>
          {/* Gold/Zinc Plus button */}
          <div className="w-7 h-7 bg-zinc-900 dark:bg-zinc-800 rounded-md flex items-center justify-center text-white font-bold select-none text-sm shadow-inner transition-transform duration-200">
            {isChatOpen ? "✕" : "+"}
          </div>
        </div>
      </div>
    </footer>
  );
}
