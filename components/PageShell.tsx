"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

interface PageShellProps {
  titleKey: string;
  descKey: string;
  /** Tailwind max-width class for the inner container. */
  maxWidth?: string;
  /** Center the header text and content. */
  centered?: boolean;
  children?: React.ReactNode;
}

export default function PageShell({
  titleKey,
  descKey,
  maxWidth = "max-w-4xl",
  centered = false,
  children,
}: PageShellProps) {
  const { t } = useLanguage();

  return (
    <main className="flex-1 bg-background">
      <div className={`mx-auto ${maxWidth} flex flex-col px-6 py-16 sm:py-24`}>
        {/* Back link */}
        <div className="mb-10 flex justify-start">
          <Link
            href="/"
            className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <svg className="h-4 w-4 transition-transform group-hover:-translate-x-0.5 rtl:rotate-180" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
            {t("directory.returnToSanctuary")}
          </Link>
        </div>

        {/* Header */}
        <div className={`mb-12 max-w-2xl space-y-4 ${centered ? "mx-auto text-center" : ""}`}>
          <h1 className="text-balance text-4xl font-bold tracking-apple-tight text-foreground sm:text-5xl">
            {t(titleKey)}
          </h1>
          <p className="text-pretty text-lg leading-8 text-muted-foreground">{t(descKey)}</p>
        </div>

        {children}
      </div>
    </main>
  );
}
