import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SUPPORTED_LOCALES = [
  "ar", "ar-EG", "ar-SA", "ar-AE",
  "cop",
  "en", "en-US", "en-GB", "en-CA", "en-AU", "en-IN",
  "fr", "fr-FR",
  "it", "it-IT",
  "de", "de-DE",
  "es", "es-ES",
  "am", "pt", "nl", "sv", "el", "sw"
];
const DEFAULT_LOCALE = "en";

const BASE_MAPPINGS: Record<string, string> = {
  ar: "ar-EG",
  en: "en-US",
  fr: "fr-FR",
  de: "de-DE",
  es: "es-ES",
  it: "it-IT",
  cop: "cop",
  am: "am",
  pt: "pt",
  nl: "nl",
  sv: "sv",
  el: "el",
  sw: "sw"
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Exclude static assets and API routes from proxy processing
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") // captures favicon.ico, logo.jpeg, manifest.json, etc.
  ) {
    return NextResponse.next();
  }

  // 1. Check for locale in the cookie
  let locale = request.cookies.get("NEXT_LOCALE")?.value;

  // 2. If no cookie, parse the Accept-Language header
  if (!locale || !SUPPORTED_LOCALES.includes(locale)) {
    const acceptLanguage = request.headers.get("accept-language") || "";
    
    // Simple parser for accept-language header:
    // e.g. "ar-EG,ar;q=0.9,en-US;q=0.8" -> prioritize first matches
    const preferredLanguages = acceptLanguage
      .split(",")
      .map((lang) => lang.split(";")[0].trim().toLowerCase());

    let matchedLocale: string | undefined;

    for (const lang of preferredLanguages) {
      // Find exact match in SUPPORTED_LOCALES (case-insensitive)
      const found = SUPPORTED_LOCALES.find(sl => sl.toLowerCase() === lang);
      if (found) {
        matchedLocale = found;
        break;
      }
      
      // Try prefix match (e.g. "en" matches "en-US", "fr" matches "fr-FR")
      const primaryCode = lang.split("-")[0];
      const fallbackForPrimary = BASE_MAPPINGS[primaryCode];
      if (fallbackForPrimary) {
        matchedLocale = fallbackForPrimary;
        break;
      }
    }

    if (matchedLocale) {
      locale = matchedLocale;
    } else {
      locale = DEFAULT_LOCALE;
    }
  }

  // Clone headers to pass custom header to Server Components
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Persist the locale in the cookie to avoid re-detection on every navigation
  response.cookies.set("NEXT_LOCALE", locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: "lax",
  });

  return response;
}

export const config = {
  matcher: [
    // Match all routes except files with extensions, api routes, or _next
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
