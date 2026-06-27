"use client";

import { useEffect, useState } from "react";
import PageShell from "@/components/PageShell";
import { supabase } from "@/lib/supabaseClient";
import { useLanguage } from "@/context/LanguageContext";

interface Broadcast {
  id: string;
  created_at: string;
  title: Record<string, string>;
  body: Record<string, string>;
  category: string;
  media_url?: string;
  is_live: boolean;
}

export default function ParishNewsPage() {
  const { t, locale } = useLanguage();
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBroadcasts() {
      try {
        const { data, error } = await supabase
          .from("parish_broadcasts")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (data) setBroadcasts(data);
      } catch (err) {
        console.warn("Failed to fetch parish broadcasts, using fallback static data.", err);
        // Fallback static data
        setBroadcasts([
          {
            id: "fallback-1",
            created_at: new Date().toISOString(),
            title: {
              en: "Welcome to Politia",
              ar: "مرحباً بكم في بوليتيا",
              ro: "Bine ați venit la Politia",
              cop: "Ⲫⲱⲧ ⲉ̀ϩⲣⲏⲓ ⲉ̀ⲡⲓⲥⲩⲛⲁⲝⲓⲥ"
            },
            body: {
              en: "Politia is a sanctuary for Orthodox digital resources. Stay tuned for parish news, announcements, and liturgy updates from your diocese.",
              ar: "بوليتيا هي ملاذ للموارد الرقمية الأرثوذكسية. تابعونا لمعرفة أخبار الرعية والإعلانات وتحديثات القداس الإلهي من إيبارشيتكم.",
              ro: "Politia este un sanctuar pentru resurse digitale ortodoxe. Rămâneți conectați pentru noutăți parohiale, anunțuri și actualizări din eparhia dumneavoastră.",
              cop: "Ⲡⲓⲥⲩⲛⲁⲝⲓⲥ ⲉⲑⲟⲩⲁⲃ ⲛ̀ⲧⲉ ϯⲉⲕⲕⲗⲏⲥⲓⲁ ⲛ̀ⲟⲣⲑⲟⲡⲟⲝⲟⲥ ⲛ̀ⲧⲉ ⲛⲓⲣⲉⲙⲛ̀ⲭⲏⲙⲓ."
            },
            category: "news",
            is_live: false,
          }
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchBroadcasts();
  }, []);

  // Safe dictionary translator
  const getLocalizedText = (textMap: Record<string, string> | any) => {
    if (!textMap || typeof textMap !== "object") return "";
    
    // Normalize locale to base code (e.g. 'ar-EG' to 'ar')
    const baseLocale = locale.split("-")[0];
    
    return textMap[locale] || textMap[baseLocale] || textMap["en"] || Object.values(textMap)[0] || "";
  };

  return (
    <PageShell titleKey="directory.parishNews.title" descKey="directory.parishNews.desc" maxWidth="max-w-3xl" centered>
      <div className="mx-auto w-full space-y-6">
        {loading ? (
          <div className="flex justify-center py-12">
            <span className="text-sm text-muted-foreground animate-pulse">Loading news...</span>
          </div>
        ) : broadcasts.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-2xl">
            <p className="text-sm text-muted-foreground">No recent announcements found.</p>
          </div>
        ) : (
          broadcasts.map((broadcast) => {
            const title = getLocalizedText(broadcast.title);
            const body = getLocalizedText(broadcast.body);

            return (
              <article
                key={broadcast.id}
                className="space-y-4 rounded-2xl bg-card p-8 touch-response"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                    {broadcast.category}
                  </span>
                  {broadcast.is_live && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-accent">
                      <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                      LIVE
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold tracking-apple-tight text-foreground">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed tracking-apple-body text-muted-foreground whitespace-pre-line">
                  {body}
                </p>
                <div className="text-[11px] text-muted-foreground pt-4">
                  {new Date(broadcast.created_at).toLocaleDateString(locale, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </article>
            );
          })
        )}
      </div>
    </PageShell>
  );
}
