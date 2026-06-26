import type { Metadata, Viewport } from "next";
import {
  Geist,
  Geist_Mono,
  Inter,
  Cairo,
  Noto_Sans_Arabic,
  Noto_Sans,
  Noto_Naskh_Arabic,
  Noto_Sans_Thai,
} from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import GlobalFooter from "@/components/GlobalFooter";
import { cookies, headers } from "next/headers";
import { LanguageProvider, SupportedLocale, LOCALE_SCRIPT_FAMILIES } from "@/context/LanguageContext";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
});

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-noto-arabic",
  subsets: ["arabic"],
});

const notoGreek = Noto_Sans({
  variable: "--font-noto-greek",
  subsets: ["greek"],
});

const notoNaskh = Noto_Naskh_Arabic({
  variable: "--font-noto-naskh",
  subsets: ["arabic"],
});

const notoThai = Noto_Sans_Thai({
  variable: "--font-noto-thai",
  subsets: ["thai"],
});

export const metadata: Metadata = {
  title: {
    default: "Politia — Your Orthodox Digital Ecosystem",
    template: "%s · Politia",
  },
  description:
    "Politia is a Coptic Orthodox digital sanctuary — the Agpeya, Holy Bible, hymns, the Synaxarium, live liturgies, sermons, and parish life, all in one place.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f6" },
    { media: "(prefers-color-scheme: dark)", color: "#001a35" },
  ],
  colorScheme: "light dark",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const headerStore = await headers();

  const VALID_LOCALES: SupportedLocale[] = [
    "cop", "ar-EG", "am-ET", "el-GR",
    "ar", "ar-SA", "ar-AE", "he-IL", "fa-IR", "hi-IN", "ja-JP", "ko-KR", "zh-CN", "zh-TW", "th-TH", "vi-VN",
    "en", "en-US", "en-GB", "en-CA", "en-AU", "en-IN", "fr-FR", "fr-CA", "de-DE", "es-ES", "it-IT", "nl-NL", "pt-PT", "pt-BR",
    "ru-RU", "uk-UA", "pl-PL", "cs-CZ", "hu-HU", "ro-RO", "bg-BG",
    "sv-SE", "nb-NO", "da-DK", "fi-FI", "sw-KE", "af-ZA", "tr-TR", "id-ID", "ms-MY", "cy-GB"
  ];

  let locale: SupportedLocale = "en";
  const localeHeader = headerStore.get("x-locale");
  const localeCookie = cookieStore.get("NEXT_LOCALE")?.value;

  if (localeHeader && VALID_LOCALES.includes(localeHeader as SupportedLocale)) {
    locale = localeHeader as SupportedLocale;
  } else if (localeCookie && VALID_LOCALES.includes(localeCookie as SupportedLocale)) {
    locale = localeCookie as SupportedLocale;
  }

  const RTL_LOCALES = ["ar", "ar-EG", "ar-SA", "ar-AE", "he-IL", "fa-IR"];
  const dir = RTL_LOCALES.includes(locale) ? "rtl" : "ltr";
  const scriptFamily = LOCALE_SCRIPT_FAMILIES[locale] || "latin";

  return (
    <html
      lang={locale}
      dir={dir}
      data-script-family={scriptFamily}
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${cairo.variable} ${notoArabic.variable} ${notoGreek.variable} ${notoNaskh.variable} ${notoThai.variable} h-full antialiased bg-background text-foreground`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider initialLocale={locale}>
          <Header />
          {children}
          <GlobalFooter />
        </LanguageProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
