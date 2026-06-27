"use client";

import { useEffect, useState } from "react";
import PageShell from "@/components/PageShell";
import { supabase } from "@/lib/supabaseClient";
import { useLanguage } from "@/context/LanguageContext";

interface Profile {
  id: string;
  full_name: string | null;
  parish_affiliation: string | null;
  avatar_url: string | null;
  preferred_locale: string;
}

export default function ParishDirectoryPage() {
  const { t } = useLanguage();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfiles() {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .order("full_name", { ascending: true });

        if (error) throw error;
        if (data) setProfiles(data);
      } catch (err) {
        console.warn("Failed to fetch profiles, using fallback directory list.", err);
        // Fallback demo data
        setProfiles([
          {
            id: "d1",
            full_name: "Fr. John Coptic",
            parish_affiliation: "St. Mark Coptic Orthodox Cathedral",
            avatar_url: null,
            preferred_locale: "en",
          },
          {
            id: "d2",
            full_name: "Deacon Shenouda",
            parish_affiliation: "St. George Orthodox Church",
            avatar_url: null,
            preferred_locale: "cop",
          },
          {
            id: "d3",
            full_name: "Tasoni Mary",
            parish_affiliation: "St. Mary & St. Verena Church",
            avatar_url: null,
            preferred_locale: "ar",
          }
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchProfiles();
  }, []);

  return (
    <PageShell titleKey="directory.parishDirectory.title" descKey="directory.parishDirectory.desc" maxWidth="max-w-3xl" centered>
      <div className="mx-auto w-full space-y-6">
        <div className="rounded-2xl bg-card p-8 mb-6">
          <p className="text-sm leading-relaxed tracking-apple-body text-muted-foreground text-center">
            Connect with registered servants, clergy, and members across the diocese network.
          </p>
        </div>

        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
          Registered Servants & Directory ({profiles.length})
        </h3>

        {loading ? (
          <div className="flex justify-center py-12">
            <span className="text-sm text-muted-foreground animate-pulse">Loading directory...</span>
          </div>
        ) : profiles.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-2xl">
            <p className="text-sm text-muted-foreground">No directory profiles registered.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {profiles.map((profile) => (
              <div
                key={profile.id}
                className="flex items-center gap-4 rounded-2xl bg-card p-6 touch-response"
              >
                {/* Avatar Placeholder */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground text-base font-bold">
                  {profile.full_name ? profile.full_name.charAt(0).toUpperCase() : "?"}
                </div>
                
                <div className="space-y-1 min-w-0">
                  <h4 className="text-base font-bold tracking-apple-tight text-foreground truncate">
                    {profile.full_name || "Anonymous Member"}
                  </h4>
                  <p className="text-xs text-muted-foreground truncate">
                    {profile.parish_affiliation || "No Parish Affiliation"}
                  </p>
                  <div className="inline-block rounded-full bg-zinc-100 dark:bg-[#001A4D] px-2 py-0.5 text-[9px] font-medium text-muted-foreground uppercase tracking-wider">
                    {profile.preferred_locale}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}
