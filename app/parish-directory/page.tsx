"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function ParishDirectoryPage() {
  const { t } = useLanguage();

  return (
    <main className="flex-1 bg-white dark:bg-[#001F3F] transition-colors duration-300">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24 flex flex-col items-center text-center">
        {/* Navigation Return */}
        <div className="w-full flex justify-start mb-8">
          <Link
            href="/"
            className="text-[13px] font-medium text-neutral-400 hover:text-neutral-900 dark:hover:text-zinc-50 transition-colors"
          >
            {t("directory.returnToSanctuary")}
          </Link>
        </div>

        <h1 className="text-4xl font-bold tracking-apple-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          {t("directory.parishDirectory.title")}
        </h1>
        <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-300">
          {t("directory.parishDirectory.desc")}
        </p>
        <div className="mt-10 max-w-prose text-zinc-500 dark:text-zinc-400 text-sm space-y-4 text-justify leading-relaxed">
          <p>
            An interactive geographic registry of all parishes, monasteries, and dioceses. Access contact details, service schedules, and locations within the Coptic Orthodox Church network.
          </p>
        </div>
      </div>
    </main>
  );
}
