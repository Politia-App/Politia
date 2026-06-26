"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  
  // Contact Form state
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setStatus("sending");
    
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    }, 1200);
  };

  return (
    <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-zinc-950">
      
      {/* 1. Hero & Features Section */}
      <section id="home" className="relative w-full border-b border-zinc-200/40 dark:border-zinc-800/40">
        <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center sm:px-12 md:py-32 max-w-7xl mx-auto w-full">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/5 px-3 py-1 text-xs font-medium text-amber-600 dark:text-amber-400 mb-6">
            <span className="flex h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            {t("hero.badge")}
          </div>

          {/* Heading */}
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-apple-tight text-zinc-900 sm:text-6xl dark:text-zinc-50 leading-[1.1]">
            {t("hero.title")}
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mt-6 text-lg leading-8 tracking-apple-body text-zinc-600 dark:text-zinc-400">
            {t("hero.subtitle")}
          </p>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <a
              href="#servicii"
              className="flex h-12 items-center justify-center rounded-full bg-zinc-900 px-6 text-sm font-semibold text-white transition-all hover:bg-zinc-800 hover:scale-[1.02] duration-200 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 cursor-pointer"
            >
              {t("hero.cta_online")}
            </a>
            <a
              href="#despre"
              className="flex h-12 items-center justify-center rounded-full border border-zinc-200 bg-white/50 px-6 text-sm font-semibold text-zinc-900 backdrop-blur-sm transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-50 dark:hover:bg-zinc-800/80 cursor-pointer"
            >
              {t("hero.cta_more")}
            </a>
          </div>

          {/* Features Grid */}
          <div className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 text-left w-full">
            {/* Card 1 */}
            <div className="relative overflow-hidden rounded-2xl border border-zinc-200/60 bg-white p-8 dark:border-zinc-800/60 dark:bg-zinc-900/50 backdrop-blur-sm transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:translate-y-[-2px]">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-6">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold tracking-apple-body text-zinc-900 dark:text-zinc-50">{t("features.reports_title")}</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {t("features.reports_desc")}
              </p>
            </div>

            {/* Card 2 */}
            <div className="relative overflow-hidden rounded-2xl border border-zinc-200/60 bg-white p-8 dark:border-zinc-800/60 dark:bg-zinc-900/50 backdrop-blur-sm transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:translate-y-[-2px]">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-6">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold tracking-apple-body text-zinc-900 dark:text-zinc-50">{t("features.docs_title")}</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {t("features.docs_desc")}
              </p>
            </div>

            {/* Card 3 */}
            <div className="relative overflow-hidden rounded-2xl border border-zinc-200/60 bg-white p-8 dark:border-zinc-800/60 dark:bg-zinc-900/50 backdrop-blur-sm transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:translate-y-[-2px] sm:col-span-2 lg:col-span-1">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-6">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold tracking-apple-body text-zinc-900 dark:text-zinc-50">{t("features.alerts_title")}</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {t("features.alerts_desc")}
              </p>
            </div>
          </div>
        </main>
      </section>

      {/* 2. About Section */}
      <section id="despre" className="relative w-full border-b border-zinc-200/40 dark:border-zinc-800/40 py-20 px-6 sm:px-12 md:py-28 bg-white dark:bg-zinc-950/20">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header Block */}
          <div className="space-y-4 text-center md:text-start">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-500">
              {t("aboutPage.story_title")}
            </span>
            <h2 className="text-3xl font-extrabold tracking-apple-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
              {t("aboutPage.title")}
            </h2>
            <p className="text-lg tracking-apple-body text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
              {t("aboutPage.subtitle")}
            </p>
          </div>

          {/* Narrative Gallery Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            <div className="bg-white dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl p-8 backdrop-blur-sm space-y-4">
              <div className="h-2 w-12 bg-amber-500 rounded-full" />
              <h3 className="text-xl font-bold tracking-apple-body text-zinc-900 dark:text-zinc-50">
                {t("aboutPage.story_title")}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {t("aboutPage.story_desc")}
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl p-8 backdrop-blur-sm flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                  POLITIA ECOSYSTEM
                </span>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 italic leading-relaxed">
                  "The kingdom of God is within you." — Luke 17:21
                </p>
              </div>
              <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800/50 mt-6 flex justify-between items-center text-xs text-zinc-400 dark:text-zinc-500">
                <span>Established 2026</span>
                <span>v1.0.0</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Services Section */}
      <section id="servicii" className="relative w-full border-b border-zinc-200/40 dark:border-zinc-800/40 py-20 px-6 sm:px-12 md:py-28">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Header Block */}
          <div className="space-y-4 text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-500">
              {t("nav.services")}
            </span>
            <h2 className="text-3xl font-extrabold tracking-apple-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
              {t("servicesPage.title")}
            </h2>
            <p className="text-lg tracking-apple-body text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              {t("servicesPage.subtitle")}
            </p>
          </div>

          {/* Pillars Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: Liturgical Stream */}
            <div className="relative overflow-hidden rounded-2xl border border-zinc-200/60 bg-white p-8 dark:border-zinc-800/60 dark:bg-zinc-900/50 backdrop-blur-sm transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:translate-y-[-2px]">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-6">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
              <h3 className="text-xl font-bold tracking-apple-body text-zinc-900 dark:text-zinc-50">
                {t("servicesPage.liturgical_title")}
              </h3>
              <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {t("servicesPage.liturgical_desc")}
              </p>
            </div>

            {/* Card 2: Parish Connection */}
            <div className="relative overflow-hidden rounded-2xl border border-zinc-200/60 bg-white p-8 dark:border-zinc-800/60 dark:bg-zinc-900/50 backdrop-blur-sm transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:translate-y-[-2px]">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-6">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold tracking-apple-body text-zinc-900 dark:text-zinc-50">
                {t("servicesPage.community_title")}
              </h3>
              <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {t("servicesPage.community_desc")}
              </p>
            </div>

            {/* Card 3: Sacred Media Vault */}
            <div className="relative overflow-hidden rounded-2xl border border-zinc-200/60 bg-white p-8 dark:border-zinc-800/60 dark:bg-zinc-900/50 backdrop-blur-sm transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:translate-y-[-2px]">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-6">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold tracking-apple-body text-zinc-900 dark:text-zinc-50">
                {t("servicesPage.media_title")}
              </h3>
              <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {t("servicesPage.media_desc")}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Contact Section */}
      <section id="contact" className="relative w-full py-20 px-6 sm:px-12 md:py-28 bg-white dark:bg-zinc-950/20">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header Block */}
          <div className="space-y-4 text-center md:text-start">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-500">
              {t("nav.contact")}
            </span>
            <h2 className="text-3xl font-extrabold tracking-apple-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
              {t("contactPage.title")}
            </h2>
            <p className="text-lg tracking-apple-body text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
              {t("contactPage.subtitle")}
            </p>
          </div>

          {/* Side-by-Side balanced layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start pt-6">
            
            {/* Left Panel: Form */}
            <div className="bg-white dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/60 rounded-3xl p-8 backdrop-blur-sm">
              {status === "success" ? (
                <div className="py-12 text-center space-y-4 animate-fade-in">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold tracking-apple-body text-zinc-900 dark:text-zinc-50">
                    {t("locale") === "ar" ? "تم إرسال الرسالة بنجاح!" : "Message Sent Successfully!"}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {t("locale") === "ar" 
                      ? "سلام الرب معك. تم استلام رسالتك وسيتواصل معك أحد الخدام قريباً." 
                      : "Peace be with you. Your message has been received, and a servant will contact you shortly."}
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-4 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {t("locale") === "ar" ? "إرسال رسالة أخرى" : "Send another message"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                      {t("contactPage.form_name")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-zinc-900 dark:text-zinc-100"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                      {t("contactPage.form_email")}
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-zinc-900 dark:text-zinc-100"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                      {t("contactPage.form_message")}
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-zinc-900 dark:text-zinc-100 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full h-12 flex items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors duration-200 disabled:opacity-50 cursor-pointer"
                  >
                    {status === "sending" 
                      ? (t("locale") === "ar" ? "جاري الإرسال..." : "Sending...") 
                      : t("contactPage.form_submit")}
                  </button>
                </form>
              )}
            </div>

            {/* Right Panel: Information Details */}
            <div className="bg-white dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/60 rounded-3xl p-8 backdrop-blur-sm space-y-6">
              <h3 className="text-xl font-bold tracking-apple-body text-zinc-900 dark:text-zinc-50">
                {t("contactPage.info_title")}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {t("contactPage.info_desc")}
              </p>

              <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800/50 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25 2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div className="text-sm">
                    <p className="text-zinc-500 dark:text-zinc-400 text-xs uppercase tracking-wider font-semibold">
                      Support Email
                    </p>
                    <a href="mailto:politia.app@outlook.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                      politia.app@outlook.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
