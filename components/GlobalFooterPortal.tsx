"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

interface DirectoryColumn {
  titleKey: string;
  links: { href: string; labelKey: string; index: string }[];
}

const COLUMNS: DirectoryColumn[] = [
  {
    titleKey: "directory.liturgicalLife",
    links: [
      { href: "/holy-bible", labelKey: "directory.holyBible.title", index: "01" },
      { href: "/agpeya", labelKey: "directory.agpeya.title", index: "02" },
      { href: "/synaxarium", labelKey: "directory.synaxarium.title", index: "03" },
      { href: "/hymns", labelKey: "directory.hymns.title", index: "04" },
    ],
  },
  {
    titleKey: "directory.communityPortal",
    links: [
      { href: "/parish-news", labelKey: "directory.parishNews.title", index: "05" },
      { href: "/church-services", labelKey: "directory.churchServices.title", index: "06" },
      { href: "/sunday-school", labelKey: "directory.sundaySchool.title", index: "07" },
      { href: "/parish-directory", labelKey: "directory.parishDirectory.title", index: "08" },
    ],
  },
  {
    titleKey: "directory.mediaBroadcast",
    links: [
      { href: "/live-streaming", labelKey: "directory.liveStreaming.title", index: "09" },
      { href: "/sermons", labelKey: "directory.sermons.title", index: "10" },
      { href: "/media-vault", labelKey: "directory.mediaVault.title", index: "11" },
    ],
  },
  {
    titleKey: "directory.educationStudies",
    links: [
      { href: "/patristics", labelKey: "directory.patristics.title", index: "12" },
      { href: "/church-history", labelKey: "directory.churchHistory.title", index: "13" },
      { href: "/coptic-language", labelKey: "directory.copticLanguage.title", index: "14" },
    ],
  },
];

export default function GlobalFooterPortal() {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
      {COLUMNS.map((column) => (
        <div key={column.titleKey} className="space-y-4">
          <h4 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            {t(column.titleKey)}
          </h4>
          <ul className="space-y-2.5">
            {column.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group flex items-baseline gap-2 text-[13px] text-muted-foreground transition-colors hover:text-foreground focus:outline-none"
                >
                  <span className="font-mono text-[10px] text-primary/60 group-hover:text-primary">
                    {link.index}
                  </span>
                  <span>{t(link.labelKey)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
