"use client";

import { SocialIcons } from "@/components/ui/social-icons";
import { useLanguage } from "@/context/LanguageContext";

export default function Page() {
  const { t, dir } = useLanguage();

  return (
    <main
      dir={dir}
      className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 w-full transition-colors duration-300"
    >
      <div className="flex flex-col items-center gap-10 max-w-md px-6 text-center">
        <div className="space-y-3">
          {/* Typography-first Display Title with "Apple tight" tracking */}
          <h1 className="text-3xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 font-sans">
            {t("socialsPage.title")}
          </h1>
          {/* Muted body text following zero-distraction layout guidelines */}
          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-sans max-w-[280px] mx-auto leading-relaxed">
            {t("socialsPage.subtitle")}
          </p>
        </div>

        {/* Refactored, localized, and physicalized Social Icon panel */}
        <SocialIcons />
      </div>
    </main>
  );
}
