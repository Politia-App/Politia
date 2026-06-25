"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import LanguagePicker from "@/components/LanguagePicker";

export default function GlobalFooter() {
  const { t, locale, setLocale, dir } = useLanguage();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{ sender: "user" | "bot"; text: string }>>([
    { sender: "bot", text: "Hello! How can we help you today?" }
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
          text: `Thank you for your message: "${userMsg}". POLITIA Support has received your request and will contact you shortly.`
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
            <div className="flex items-center gap-3">
              {/* LinkedIn */}
              <a href="#" className="text-zinc-800 hover:text-zinc-600 dark:text-zinc-200 dark:hover:text-zinc-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
              {/* X */}
              <a href="#" className="text-zinc-800 hover:text-zinc-600 dark:text-zinc-200 dark:hover:text-zinc-400 transition-colors">
                <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* YouTube */}
              <a href="#" className="text-zinc-800 hover:text-zinc-600 dark:text-zinc-200 dark:hover:text-zinc-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" clipRule="evenodd" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className="text-zinc-800 hover:text-zinc-600 dark:text-zinc-200 dark:hover:text-zinc-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* 2. Information Architecture (Column Layout) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-[11px] font-[400] text-zinc-500 dark:text-zinc-400">
          {footerColumns.map((col, idx) => (
            <div key={idx} className="space-y-3">
              <h4 className="font-[600] text-[12px] text-zinc-800 dark:text-zinc-200">
                {t(col.titleKey)}
              </h4>
              <ul className="space-y-2">
                {col.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <a
                      href={item.href}
                      className="hover:underline hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
                    >
                      {t(item.key)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 3. Base Utility & Localization Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 border-t border-[#E0E0E0]/50 dark:border-zinc-800/50 pt-6 text-[11px] text-zinc-500 dark:text-zinc-400 pb-2">
          {/* Left-Aligned Cluster */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {/* Globe & Localization Toggle */}
            <LanguagePicker placement="top" align="start" />

            {/* Privacy Settings */}
            <a href="#" className="flex items-center gap-1.5 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors">
              {/* Privacy Shield Icon */}
              <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
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
            <div className="bg-blue-600 px-4 py-3 flex items-center justify-between text-white">
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
                      ? "bg-blue-500 text-white self-end rounded-tr-none"
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
                className="flex-1 border border-zinc-200 dark:border-zinc-800 rounded-full px-3 py-1.5 text-[12px] focus:outline-none focus:border-blue-500 bg-transparent"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-3 py-1.5 rounded-full text-[12px] font-semibold hover:bg-blue-500 active:scale-95 transition-all cursor-pointer"
              >
                Send
              </button>
            </form>
          </div>
        )}

        {/* Floating Bubble Trigger */}
        <div
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="flex items-center bg-white border border-dashed border-zinc-400 rounded-full pl-4 pr-1.5 py-1.5 shadow-lg cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          {/* Support Icon */}
          <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a.598.598 0 0 1-.655-.705 5.26 5.26 0 0 0 2.224-4.517C6.004 14.28 5 12.02 5 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
          </svg>
          <span className="text-[12px] font-semibold text-zinc-700 mr-4 select-none">
            {t("footer.ask")}
          </span>
          {/* Blue Plus button */}
          <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold select-none text-sm shadow-inner transition-transform duration-200">
            {isChatOpen ? "✕" : "+"}
          </div>
        </div>
      </div>
    </footer>
  );
}
