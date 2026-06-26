"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const FEATURE_ICONS = {
  book: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
  ),
  doc: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  ),
  speaker: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
  ),
  users: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
  ),
};

function FeatureCard({
  icon,
  title,
  desc,
  className = "",
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  className?: string;
}) {
  return (
    <div
      className={`group rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 ${className}`}
    >
      <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-transform duration-300 group-hover:scale-105">
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          {icon}
        </svg>
      </div>
      <h3 className="text-lg font-semibold tracking-apple-body text-card-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
    </div>
  );
}

export default function Home() {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    }, 1200);
  };

  return (
    <div className="flex flex-1 flex-col">
      {/* 1. Hero */}
      <section id="home" className="relative w-full overflow-hidden border-b border-border">
        {/* Decorative hero image, subtle */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <Image
            src="/hero-sanctuary.png"
            alt=""
            fill
            priority
            className="object-cover opacity-[0.08] dark:opacity-[0.18]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
        </div>

        <main className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 py-24 text-center sm:px-12 md:py-32">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-accent/60 px-3 py-1 text-xs font-medium text-accent-foreground">
            <span className="flex h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            {t("hero.badge")}
          </div>

          <h1 className="max-w-3xl text-balance text-4xl font-bold leading-[1.1] tracking-apple-tight text-foreground sm:text-6xl">
            {t("hero.title")}
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 tracking-apple-body text-muted-foreground">
            {t("hero.subtitle")}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href="#servicii"
              className="flex h-12 items-center justify-center rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:opacity-90 hover:shadow-md active:scale-[0.98]"
            >
              {t("hero.cta_online")}
            </a>
            <a
              href="#despre"
              className="flex h-12 items-center justify-center rounded-full border border-border bg-card px-7 text-sm font-semibold text-foreground transition-all hover:bg-muted active:scale-[0.98]"
            >
              {t("hero.cta_more")}
            </a>
          </div>

          {/* Features Grid */}
          <div className="mt-24 grid w-full grid-cols-1 gap-6 text-left sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard icon={FEATURE_ICONS.book} title={t("features.reports_title")} desc={t("features.reports_desc")} />
            <FeatureCard icon={FEATURE_ICONS.doc} title={t("features.docs_title")} desc={t("features.docs_desc")} />
            <FeatureCard
              icon={FEATURE_ICONS.speaker}
              title={t("features.alerts_title")}
              desc={t("features.alerts_desc")}
              className="sm:col-span-2 lg:col-span-1"
            />
          </div>
        </main>
      </section>

      {/* 2. About */}
      <section id="despre" className="w-full border-b border-border px-6 py-20 sm:px-12 md:py-28">
        <div className="mx-auto max-w-5xl space-y-12">
          <div className="space-y-4 text-center md:text-start">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              {t("aboutPage.story_title")}
            </span>
            <h2 className="text-balance text-3xl font-bold tracking-apple-tight text-foreground sm:text-5xl">
              {t("aboutPage.title")}
            </h2>
            <p className="max-w-2xl text-pretty text-lg leading-relaxed tracking-apple-body text-muted-foreground">
              {t("aboutPage.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 pt-2 md:grid-cols-2">
            <div className="space-y-4 rounded-2xl border border-border bg-card p-8">
              <div className="h-1.5 w-12 rounded-full bg-primary" />
              <h3 className="text-xl font-semibold tracking-apple-body text-card-foreground">
                {t("aboutPage.story_title")}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{t("aboutPage.story_desc")}</p>
            </div>

            <div className="flex flex-col justify-between rounded-2xl border border-border bg-accent/40 p-8">
              <div className="space-y-4">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-accent-foreground">
                  Politia Ecosystem
                </span>
                <p className="text-pretty text-base italic leading-relaxed text-foreground">
                  {"\u201CThe kingdom of God is within you.\u201D"} {"\u2014 Luke 17:21"}
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-border pt-6 text-xs text-muted-foreground">
                <span>Established 2026</span>
                <span>v1.0.0</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Services */}
      <section id="servicii" className="w-full border-b border-border px-6 py-20 sm:px-12 md:py-28">
        <div className="mx-auto max-w-7xl space-y-16">
          <div className="space-y-4 text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">{t("nav.services")}</span>
            <h2 className="text-balance text-3xl font-bold tracking-apple-tight text-foreground sm:text-5xl">
              {t("servicesPage.title")}
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed tracking-apple-body text-muted-foreground">
              {t("servicesPage.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <FeatureCard icon={FEATURE_ICONS.book} title={t("servicesPage.liturgical_title")} desc={t("servicesPage.liturgical_desc")} />
            <FeatureCard icon={FEATURE_ICONS.users} title={t("servicesPage.community_title")} desc={t("servicesPage.community_desc")} />
            <FeatureCard icon={FEATURE_ICONS.speaker} title={t("servicesPage.media_title")} desc={t("servicesPage.media_desc")} />
          </div>
        </div>
      </section>

      {/* 4. Contact */}
      <section id="contact" className="w-full px-6 py-20 sm:px-12 md:py-28">
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="space-y-4 text-center md:text-start">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">{t("nav.contact")}</span>
            <h2 className="text-balance text-3xl font-bold tracking-apple-tight text-foreground sm:text-5xl">
              {t("contactPage.title")}
            </h2>
            <p className="max-w-2xl text-pretty text-lg leading-relaxed tracking-apple-body text-muted-foreground">
              {t("contactPage.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 items-start gap-8 pt-2 lg:grid-cols-2">
            {/* Form */}
            <div className="rounded-3xl border border-border bg-card p-8">
              {status === "success" ? (
                <div className="animate-fade-in space-y-4 py-12 text-center">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold tracking-apple-body text-card-foreground">
                    {t("locale") === "ar" ? "تم إرسال الرسالة بنجاح!" : "Message Sent Successfully!"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t("locale") === "ar"
                      ? "سلام الرب معك. تم استلام رسالتك وسيتواصل معك أحد الخدام قريباً."
                      : "Peace be with you. Your message has been received, and a servant will contact you shortly."}
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-4 text-xs font-semibold text-primary hover:underline"
                  >
                    {t("locale") === "ar" ? "إرسال رسالة أخرى" : "Send another message"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {t("contactPage.form_name")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {t("contactPage.form_email")}
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {t("contactPage.form_message")}
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="flex h-12 w-full items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground transition-all duration-200 hover:opacity-90 active:scale-[0.99] disabled:opacity-50"
                  >
                    {status === "sending"
                      ? t("locale") === "ar"
                        ? "جاري الإرسال..."
                        : "Sending..."
                      : t("contactPage.form_submit")}
                  </button>
                </form>
              )}
            </div>

            {/* Information */}
            <div className="space-y-6 rounded-3xl border border-border bg-card p-8">
              <h3 className="text-xl font-semibold tracking-apple-body text-card-foreground">
                {t("contactPage.info_title")}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{t("contactPage.info_desc")}</p>

              <div className="space-y-4 border-t border-border pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div className="text-sm">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Support Email</p>
                    <a href="mailto:politia.app@outlook.com" className="text-primary hover:underline">
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
