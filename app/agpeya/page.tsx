"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { supabase } from "@/lib/supabaseClient";

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
  const { t, locale } = useLanguage();
  const [selectedHour, setSelectedHour] = useState<CanonicalHour | null>(null);
  
  const [liturgicalData, setLiturgicalData] = useState<{ title: string; body_content: string } | null>(null);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (!selectedHour) {
      setLiturgicalData(null);
      return;
    }

    const targetHourId = selectedHour.id;

    async function fetchLiturgicalContent() {
      setFetching(true);
      try {
        const baseLocale = locale.split("-")[0];
        
        // Try exact locale code, then base locale
        let { data, error } = await supabase
          .from("liturgical_content")
          .select("title, body_content")
          .eq("category", "agpeya")
          .eq("section_key", targetHourId)
          .eq("locale_code", locale)
          .maybeSingle();

        if (error) throw error;

        if (!data) {
          // Try base locale fallback
          const { data: fallbackData, error: fallbackErr } = await supabase
            .from("liturgical_content")
            .select("title, body_content")
            .eq("category", "agpeya")
            .eq("section_key", targetHourId)
            .eq("locale_code", baseLocale)
            .maybeSingle();

          if (fallbackErr) throw fallbackErr;
          data = fallbackData;
        }

        if (data) {
          setLiturgicalData(data);
        } else {
          setLiturgicalData(null);
        }
      } catch (err) {
        console.warn("Failed to fetch liturgical content from Supabase, using local defaults.", err);
        setLiturgicalData(null);
      } finally {
        setFetching(false);
      }
    }

    fetchLiturgicalContent();
  }, [selectedHour, locale]);

  return (
    <main className="flex-1 bg-background">
      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24 flex flex-col items-center">
        {/* Navigation Return */}
        <div className="w-full flex justify-start mb-10">
          <Link
            href="/"
            className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground touch-response hover:text-foreground"
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
          <p className="text-pretty text-lg tracking-apple-body text-muted-foreground">
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
                    className={`w-full text-start px-4 py-3 text-[13px] font-medium tracking-apple-body touch-response focus:outline-none rounded-lg ${
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
          <div className="md:col-span-7 bg-card p-6 rounded-2xl min-h-[300px] flex flex-col justify-center">
            {fetching ? (
              <div className="text-center py-12">
                <span className="text-sm text-muted-foreground animate-pulse">Loading text...</span>
              </div>
            ) : selectedHour ? (
              <div className="space-y-4 animate-fade-in">
                {liturgicalData ? (
                  <>
                    <h4 className="text-lg font-bold text-foreground">
                      {liturgicalData.title}
                    </h4>
                    <p className="text-[13px] leading-relaxed tracking-apple-body text-muted-foreground whitespace-pre-line">
                      {liturgicalData.body_content}
                    </p>
                  </>
                ) : (
                  <>
                    <h4 className="text-lg font-bold text-foreground">
                      {t(selectedHour.nameKey)}
                    </h4>
                    <p className="text-[13px] leading-relaxed tracking-apple-body text-muted-foreground">
                      {selectedHour.desc}
                    </p>
                    <div className="pt-6 space-y-3">
                      <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
                        Typical Prayers Structure
                      </p>
                      <ul className="text-xs space-y-1.5 text-muted-foreground">
                        <li>• Introduction (Lord's Prayer, Thanksgiving, Psalm 50)</li>
                        <li>• Selected Psalms (e.g. Psalms 1, 2, 3...)</li>
                        <li>• Holy Gospel Reading</li>
                        <li>• Litanies & Lord Have Mercy (Kyrie Eleison 41 times)</li>
                        <li>• Absolution & Concluding Prayer</li>
                      </ul>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="text-center text-muted-foreground text-sm italic py-12">
                {t("directory.agpeya.selectHour")}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
