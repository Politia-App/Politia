"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

interface CanonicalHour {
  id: string;
  nameKey: string;
  desc: string;
}

const HOURS: CanonicalHour[] = [
  { id: "prime", nameKey: "directory.agpeya.prime", desc: "Commemorates the Resurrection of our Lord, prayed upon waking in the morning." },
  { id: "terce", nameKey: "directory.agpeya.terce", desc: "Commemorates the Holy Spirit descending on the Apostles, and the condemnation of Christ by Pilate." },
  { id: "sext", nameKey: "directory.agpeya.sext", desc: "Commemorates the Crucifixion of our Lord Jesus Christ." },
  { id: "nona", nameKey: "directory.agpeya.nona", desc: "Commemorates the physical death of Christ on the Cross, and the salvation of the thief." },
  { id: "vespers", nameKey: "directory.agpeya.vespers", desc: "Commemorates the taking down of Christ's body from the Cross." },
  { id: "compline", nameKey: "directory.agpeya.compline", desc: "Commemorates the burial of Christ, reflecting on our departure from this world." },
  { id: "midnight", nameKey: "directory.agpeya.midnight", desc: "Commemorates the Second Coming of our Lord, prayed in three watches." }
];

export default function AgpeyaPage() {
  const { t } = useLanguage();
  const [selectedHour, setSelectedHour] = useState<CanonicalHour | null>(null);

  return (
    <main className="flex-1 bg-background">
      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24 flex flex-col items-center">
        {/* Navigation Return */}
        <div className="w-full flex justify-start mb-10">
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
        <div className="text-center space-y-4 max-w-2xl mb-12">
          <h1 className="text-balance text-4xl font-bold tracking-apple-tight text-foreground sm:text-5xl">
            {t("directory.agpeya.title")}
          </h1>
          <p className="text-pretty text-lg text-muted-foreground">
            {t("directory.agpeya.desc")}
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Hour Selector Column */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {t("directory.agpeya.canonicalHours")}
            </h3>
            <div className="flex flex-col gap-1">
              {HOURS.map((hour) => {
                const isSelected = selectedHour?.id === hour.id;
                return (
                  <button
                    key={hour.id}
                    type="button"
                    onClick={() => setSelectedHour(hour)}
                    className={`w-full text-start px-4 py-3 text-[13px] font-medium tracking-apple-body transition-all duration-150 cursor-pointer focus:outline-none rounded-lg ${
                      isSelected
                        ? "text-primary font-semibold bg-accent"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {t(hour.nameKey)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Hour Details Column */}
          <div className="md:col-span-7 bg-zinc-50/50 dark:bg-zinc-900/10 p-6 rounded-2xl min-h-[300px] flex flex-col justify-center">
            {selectedHour ? (
              <div className="space-y-4 animate-fade-in">
                <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                  {t(selectedHour.nameKey)}
                </h4>
                <p className="text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {selectedHour.desc}
                </p>
                <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800/40 space-y-3">
                  <p className="text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                    Typical Prayers Structure
                  </p>
                  <ul className="text-xs space-y-1.5 text-zinc-500 dark:text-zinc-400">
                    <li>• Introduction (Lord's Prayer, Thanksgiving, Psalm 50)</li>
                    <li>• Selected Psalms (e.g. Psalms 1, 2, 3...)</li>
                    <li>• Holy Gospel Reading</li>
                    <li>• Litanies & Lord Have Mercy (Kyrie Eleison 41 times)</li>
                    <li>• Absolution & Concluding Prayer</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center text-neutral-400 dark:text-neutral-500 text-sm italic py-12">
                {t("directory.agpeya.selectHour")}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
