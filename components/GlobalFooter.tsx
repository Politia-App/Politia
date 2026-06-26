"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import LanguagePicker from "@/components/LanguagePicker";
import GlobalFooterPortal from "@/components/GlobalFooterPortal";
import { socials } from "@/components/ui/social-icons";

export default function GlobalFooter() {
  const { t } = useLanguage();

  const footerSocialsOrder = [
    "socials.facebook",
    "socials.youtube",
    "socials.instagram",
    "socials.threads",
    "socials.whatsapp",
    "socials.email",
  ];

  const footerSocials = footerSocialsOrder
    .map((key) => socials.find((s) => s.nameKey === key))
    .filter((s): s is (typeof socials)[number] => !!s);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{ sender: "user" | "bot"; text: string }>>([
    { sender: "bot", text: "Peace be with you. How can I assist you in our spiritual ecosystem today?" },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userMsg = chatMessage;
    setChatHistory((prev) => [...prev, { sender: "user", text: userMsg }]);
    setChatMessage("");

    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        {
          sender: "bot",
          text: `Thank you for reaching out. A servant from our community has received your message: "${userMsg}" and will respond shortly. May the grace of our Lord be with you.`,
        },
      ]);
    }, 1000);
  };

  const legalLinks = [
    "footer.sitemap",
    "footer.contact",
    "footer.privacy",
    "footer.terms",
    "footer.trademarks",
    "footer.safety",
    "footer.recycling",
  ];

  return (
    <footer className="mt-auto w-full border-t border-border bg-muted/40 text-muted-foreground font-sans">
      <div className="mx-auto max-w-7xl space-y-12 px-6 py-14 sm:px-8">
        {/* 1. Header & Social Engagement Row */}
        <div className="flex flex-col gap-4 border-b border-border pb-8 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm font-semibold text-foreground">{t("footer.follow")}</span>
          <div className="flex items-center gap-4">
            {footerSocials.map((social) => (
              <a
                key={social.nameKey}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 transition-all duration-200 hover:text-primary active:scale-[0.96]"
                aria-label={t(social.labelKey)}
                title={t(social.nameKey)}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* 2. Information Architecture (Directory Portal) */}
        <GlobalFooterPortal />

        {/* 3. Base Utility & Localization Bar */}
        <div className="flex flex-col gap-6 border-t border-border pt-8 text-[11px] text-muted-foreground lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <LanguagePicker placement="top" align="start" />
            <a href="#" className="flex items-center gap-1.5 transition-colors hover:text-foreground">
              <svg className="h-4 w-4 text-primary" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944a11.954 11.954 0 007.834 3.056 12.012 12.012 0 01-1.92 9.057A11.964 11.964 0 0110 18.056a11.964 11.964 0 01-5.914-3.999 12.012 12.012 0 01-1.92-9.058zm9.541 4.708a1 1 0 00-1.414-1.414L9 9.586l-.293-.293a1 1 0 00-1.414 1.414l1 1a1 1 0 001.414 0l2-2z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{t("footer.privacyChoices")}</span>
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              {t("footer.healthPrivacy")}
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {legalLinks.map((key) => (
              <a key={key} href="#" className="transition-colors hover:text-foreground hover:underline">
                {t(key)}
              </a>
            ))}
          </div>
        </div>

        <p className="text-[11px] text-muted-foreground/70">
          {"\u00A9"} {new Date().getFullYear()} Politia. {t("nav.brandName")}.
        </p>
      </div>

      {/* 4. Floating Support Assistant */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        {isChatOpen && (
          <div className="animate-fade-in mb-2 flex h-96 w-80 flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-2xl">
            <div className="flex items-center justify-between border-b border-border bg-foreground px-4 py-3 text-background">
              <span className="text-[13px] font-semibold">{t("footer.ask")}</span>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-sm font-bold opacity-80 transition-opacity hover:opacity-100"
                aria-label="Close chat"
              >
                {"\u2715"}
              </button>
            </div>
            <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4 text-[12px]">
              {chatHistory.map((msg, index) => (
                <div
                  key={index}
                  className={`max-w-[80%] rounded-xl px-3 py-2 ${
                    msg.sender === "user"
                      ? "self-end rounded-tr-none bg-primary text-primary-foreground"
                      : "self-start rounded-tl-none bg-muted text-foreground"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="flex gap-2 border-t border-border p-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 rounded-full border border-border bg-transparent px-3 py-1.5 text-[12px] text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-full bg-primary px-3 py-1.5 text-[12px] font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-95"
              >
                Send
              </button>
            </form>
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="flex items-center rounded-full border border-border bg-card py-1.5 pl-4 pr-1.5 shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <svg className="mr-2 h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a.598.598 0 0 1-.652-.768 5.26 5.26 0 0 0 .733-2.082A8.25 8.25 0 0 1 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
            />
          </svg>
          <span className="mr-4 select-none text-[12px] font-semibold text-foreground">{t("footer.ask")}</span>
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground shadow-inner">
            {isChatOpen ? "\u2715" : "+"}
          </span>
        </button>
      </div>
    </footer>
  );
}
