import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Inter,
  Cairo,
  Noto_Sans_Arabic,
  Noto_Sans_Ethiopic,
  Noto_Sans,
} from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import GlobalFooter from "@/components/GlobalFooter";
import { cookies, headers } from "next/headers";
import { LanguageProvider, SupportedLocale } from "@/context/LanguageContext";

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

const notoEthiopic = Noto_Sans_Ethiopic({
  variable: "--font-noto-ethiopic",
  subsets: ["ethiopic"],
});

const notoGreek = Noto_Sans({
  variable: "--font-noto-greek",
  subsets: ["greek"],
});

export const metadata: Metadata = {
  title: "Politia App",
  description: "Politia App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const headerStore = await headers();

  const VALID_LOCALES: SupportedLocale[] = [
    "ar", "ar-EG", "ar-SA", "ar-AE",
    "cop",
    "en", "en-US", "en-GB", "en-CA", "en-AU", "en-IN",
    "fr", "fr-FR",
    "it", "it-IT",
    "de", "de-DE",
    "es", "es-ES",
    "am", "am-ET",
    "pt", "pt-PT",
    "nl", "nl-NL",
    "sv", "sv-SE",
    "el", "el-GR",
    "sw", "sw-KE"
  ];

  let locale: SupportedLocale = "en";
  const localeHeader = headerStore.get("x-locale");
  const localeCookie = cookieStore.get("NEXT_LOCALE")?.value;

  if (localeHeader && VALID_LOCALES.includes(localeHeader as SupportedLocale)) {
    locale = localeHeader as SupportedLocale;
  } else if (localeCookie && VALID_LOCALES.includes(localeCookie as SupportedLocale)) {
    locale = localeCookie as SupportedLocale;
  }

  const dir = locale.startsWith("ar") ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${cairo.variable} ${notoArabic.variable} ${notoEthiopic.variable} ${notoGreek.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider initialLocale={locale}>
          <Header />
          {children}
          <GlobalFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}
