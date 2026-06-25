"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-zinc-950">
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center sm:px-12 md:py-32 max-w-7xl mx-auto w-full">
        {/* Decorative background gradients */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-[50%] top-0 h-[600px] w-[1000px] -translate-x-[50%] stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] dark:stroke-zinc-800 opacity-30">
            <svg className="h-full w-full" aria-hidden="true">
              <defs>
                <pattern
                  id="grid"
                  width="80"
                  height="80"
                  patternUnits="userSpaceOnUse"
                  x="50%"
                  y="-1"
                >
                  <path d="M.5 80V.5H80" fill="none" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/5 px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 mb-6 backdrop-blur-md">
          <span className="flex h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse"></span>
          {t("hero.badge")}
        </div>

        {/* Heading */}
        <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-6xl dark:text-zinc-50 leading-[1.1]">
          {t("hero.title")}
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          {t("hero.subtitle")}
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <Link
            href="/servicii"
            className="flex h-12 items-center justify-center rounded-full bg-blue-600 px-6 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-500 hover:scale-[1.02] duration-200"
          >
            {t("hero.cta_online")}
          </Link>
          <Link
            href="/despre"
            className="flex h-12 items-center justify-center rounded-full border border-zinc-200 bg-white/50 px-6 text-sm font-semibold text-zinc-900 shadow-sm backdrop-blur-sm transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-50 dark:hover:bg-zinc-800/80"
          >
            {t("hero.cta_more")}
          </Link>
        </div>

        {/* Features Grid */}
        <div className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 text-left w-full">
          {/* Card 1 */}
          <div className="relative overflow-hidden rounded-2xl border border-zinc-200/60 bg-white p-8 dark:border-zinc-800/60 dark:bg-zinc-900/50 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 hover:translate-y-[-2px]">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-6">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801-1.206a2.25 2.25 0 0 0-3.32 0c-1.18 1.18-2.673 1.93-4.321 2.192A2.25 2.25 0 0 0 2.25 6.108V16.5a2.25 2.25 0 0 0 2.25 2.25h1.5m9 0a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 18.75m12 0h1.5m-1.5-12.75a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm-12 0a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{t("features.reports_title")}</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {t("features.reports_desc")}
            </p>
          </div>

          {/* Card 2 */}
          <div className="relative overflow-hidden rounded-2xl border border-zinc-200/60 bg-white p-8 dark:border-zinc-800/60 dark:bg-zinc-900/50 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 hover:translate-y-[-2px]">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-6">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{t("features.docs_title")}</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {t("features.docs_desc")}
            </p>
          </div>

          {/* Card 3 */}
          <div className="relative overflow-hidden rounded-2xl border border-zinc-200/60 bg-white p-8 dark:border-zinc-800/60 dark:bg-zinc-900/50 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 hover:translate-y-[-2px] sm:col-span-2 lg:col-span-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 mb-6">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{t("features.alerts_title")}</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {t("features.alerts_desc")}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
