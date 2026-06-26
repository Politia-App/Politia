"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function GlobalFooterPortal() {
  const { t } = useLanguage();

  return (
    <div className="w-full bg-white dark:bg-[#001F3F] transition-colors duration-300">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 py-10">
        {/* Column 1: Liturgical Life */}
        <div className="space-y-4">
          <h4 className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
            {t("directory.liturgicalLife")}
          </h4>
          <ul className="space-y-2.5">
            <li>
              <Link href="/holy-bible" className="group flex items-baseline gap-2 transition-transform duration-200 ease-out hover:scale-[0.98] active:scale-[0.96] text-[13px] text-neutral-500 hover:text-zinc-900 dark:text-neutral-400 dark:hover:text-zinc-50 focus:outline-none">
                <span className="font-mono text-[10px] text-neutral-300 dark:text-neutral-600">01</span>
                <span>{t("directory.holyBible.title")}</span>
              </Link>
            </li>
            <li>
              <Link href="/agpeya" className="group flex items-baseline gap-2 transition-transform duration-200 ease-out hover:scale-[0.98] active:scale-[0.96] text-[13px] text-neutral-500 hover:text-zinc-900 dark:text-neutral-400 dark:hover:text-zinc-50 focus:outline-none">
                <span className="font-mono text-[10px] text-neutral-300 dark:text-neutral-600">02</span>
                <span>{t("directory.agpeya.title")}</span>
              </Link>
            </li>
            <li>
              <Link href="/synaxarium" className="group flex items-baseline gap-2 transition-transform duration-200 ease-out hover:scale-[0.98] active:scale-[0.96] text-[13px] text-neutral-500 hover:text-zinc-900 dark:text-neutral-400 dark:hover:text-zinc-50 focus:outline-none">
                <span className="font-mono text-[10px] text-neutral-300 dark:text-neutral-600">03</span>
                <span>{t("directory.synaxarium.title")}</span>
              </Link>
            </li>
            <li>
              <Link href="/hymns" className="group flex items-baseline gap-2 transition-transform duration-200 ease-out hover:scale-[0.98] active:scale-[0.96] text-[13px] text-neutral-500 hover:text-zinc-900 dark:text-neutral-400 dark:hover:text-zinc-50 focus:outline-none">
                <span className="font-mono text-[10px] text-neutral-300 dark:text-neutral-600">04</span>
                <span>{t("directory.hymns.title")}</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 2: Community Portal */}
        <div className="space-y-4">
          <h4 className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
            {t("directory.communityPortal")}
          </h4>
          <ul className="space-y-2.5">
            <li>
              <Link href="/parish-news" className="group flex items-baseline gap-2 transition-transform duration-200 ease-out hover:scale-[0.98] active:scale-[0.96] text-[13px] text-neutral-500 hover:text-zinc-900 dark:text-neutral-400 dark:hover:text-zinc-50 focus:outline-none">
                <span className="font-mono text-[10px] text-neutral-300 dark:text-neutral-600">05</span>
                <span>{t("directory.parishNews.title")}</span>
              </Link>
            </li>
            <li>
              <Link href="/church-services" className="group flex items-baseline gap-2 transition-transform duration-200 ease-out hover:scale-[0.98] active:scale-[0.96] text-[13px] text-neutral-500 hover:text-zinc-900 dark:text-neutral-400 dark:hover:text-zinc-50 focus:outline-none">
                <span className="font-mono text-[10px] text-neutral-300 dark:text-neutral-600">06</span>
                <span>{t("directory.churchServices.title")}</span>
              </Link>
            </li>
            <li>
              <Link href="/sunday-school" className="group flex items-baseline gap-2 transition-transform duration-200 ease-out hover:scale-[0.98] active:scale-[0.96] text-[13px] text-neutral-500 hover:text-zinc-900 dark:text-neutral-400 dark:hover:text-zinc-50 focus:outline-none">
                <span className="font-mono text-[10px] text-neutral-300 dark:text-neutral-600">07</span>
                <span>{t("directory.sundaySchool.title")}</span>
              </Link>
            </li>
            <li>
              <Link href="/parish-directory" className="group flex items-baseline gap-2 transition-transform duration-200 ease-out hover:scale-[0.98] active:scale-[0.96] text-[13px] text-neutral-500 hover:text-zinc-900 dark:text-neutral-400 dark:hover:text-zinc-50 focus:outline-none">
                <span className="font-mono text-[10px] text-neutral-300 dark:text-neutral-600">08</span>
                <span>{t("directory.parishDirectory.title")}</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Media & Broadcast */}
        <div className="space-y-4">
          <h4 className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
            {t("directory.mediaBroadcast")}
          </h4>
          <ul className="space-y-2.5">
            <li>
              <Link href="/live-streaming" className="group flex items-baseline gap-2 transition-transform duration-200 ease-out hover:scale-[0.98] active:scale-[0.96] text-[13px] text-neutral-500 hover:text-zinc-900 dark:text-neutral-400 dark:hover:text-zinc-50 focus:outline-none">
                <span className="font-mono text-[10px] text-neutral-300 dark:text-neutral-600">09</span>
                <span>{t("directory.liveStreaming.title")}</span>
              </Link>
            </li>
            <li>
              <Link href="/sermons" className="group flex items-baseline gap-2 transition-transform duration-200 ease-out hover:scale-[0.98] active:scale-[0.96] text-[13px] text-neutral-500 hover:text-zinc-900 dark:text-neutral-400 dark:hover:text-zinc-50 focus:outline-none">
                <span className="font-mono text-[10px] text-neutral-300 dark:text-neutral-600">10</span>
                <span>{t("directory.sermons.title")}</span>
              </Link>
            </li>
            <li>
              <Link href="/media-vault" className="group flex items-baseline gap-2 transition-transform duration-200 ease-out hover:scale-[0.98] active:scale-[0.96] text-[13px] text-neutral-500 hover:text-zinc-900 dark:text-neutral-400 dark:hover:text-zinc-50 focus:outline-none">
                <span className="font-mono text-[10px] text-neutral-300 dark:text-neutral-600">11</span>
                <span>{t("directory.mediaVault.title")}</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Education & Studies */}
        <div className="space-y-4">
          <h4 className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
            {t("directory.educationStudies")}
          </h4>
          <ul className="space-y-2.5">
            <li>
              <Link href="/patristics" className="group flex items-baseline gap-2 transition-transform duration-200 ease-out hover:scale-[0.98] active:scale-[0.96] text-[13px] text-neutral-500 hover:text-zinc-900 dark:text-neutral-400 dark:hover:text-zinc-50 focus:outline-none">
                <span className="font-mono text-[10px] text-neutral-300 dark:text-neutral-600">12</span>
                <span>{t("directory.patristics.title")}</span>
              </Link>
            </li>
            <li>
              <Link href="/church-history" className="group flex items-baseline gap-2 transition-transform duration-200 ease-out hover:scale-[0.98] active:scale-[0.96] text-[13px] text-neutral-500 hover:text-zinc-900 dark:text-neutral-400 dark:hover:text-zinc-50 focus:outline-none">
                <span className="font-mono text-[10px] text-neutral-300 dark:text-neutral-600">13</span>
                <span>{t("directory.churchHistory.title")}</span>
              </Link>
            </li>
            <li>
              <Link href="/coptic-language" className="group flex items-baseline gap-2 transition-transform duration-200 ease-out hover:scale-[0.98] active:scale-[0.96] text-[13px] text-neutral-500 hover:text-zinc-900 dark:text-neutral-400 dark:hover:text-zinc-50 focus:outline-none">
                <span className="font-mono text-[10px] text-neutral-300 dark:text-neutral-600">14</span>
                <span>{t("directory.copticLanguage.title")}</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
