"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, locale, setLocale } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/50 bg-white/80 backdrop-blur-md dark:border-zinc-800/50 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo and Brand Name */}
        <div className="flex items-center gap-3">
          <Link href="/#home" className="flex items-center gap-3 transition-transform hover:scale-[1.02] duration-200">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <Image
                src="/logo.jpeg"
                alt="Politia App Logo"
                fill
                priority
                className="object-cover"
                sizes="40px"
              />
            </div>
            <span className="font-semibold text-lg tracking-tight text-zinc-900 dark:text-zinc-50">
              {t("nav.brandName")}
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/#home"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            {t("nav.home")}
          </Link>
          <Link
            href="/#despre"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            {t("nav.about")}
          </Link>
          <Link
            href="/#servicii"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            {t("nav.services")}
          </Link>
          <Link
            href="/#contact"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            {t("nav.contact")}
          </Link>
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/login"
            className="inline-flex h-9 items-center justify-center rounded-full bg-zinc-900 px-4 text-xs font-semibold text-white shadow transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            {t("nav.login")}
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 focus:outline-none dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
            aria-controls="mobile-menu"
            aria-expanded={false}
          >
            <span className="sr-only">{t("nav.openMenu")}</span>
            {isMobileMenuOpen ? (
              <svg
                className="h-6 w-6 animate-fade-in"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 animate-fade-in"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-200/50 bg-white/95 px-4 pt-2 pb-4 space-y-1 shadow-lg dark:border-zinc-800/50 dark:bg-zinc-950/95 transition-all duration-300">
          <Link
            href="/#home"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block rounded-md px-3 py-2 text-base font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
          >
            {t("nav.home")}
          </Link>
          <Link
            href="/#despre"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block rounded-md px-3 py-2 text-base font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
          >
            {t("nav.about")}
          </Link>
          <Link
            href="/#servicii"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block rounded-md px-3 py-2 text-base font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
          >
            {t("nav.services")}
          </Link>
          <Link
            href="/#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block rounded-md px-3 py-2 text-base font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
          >
            {t("nav.contact")}
          </Link>
          <div className="pt-4 border-t border-zinc-200/50 dark:border-zinc-800/50">
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex w-full items-center justify-center rounded-full bg-zinc-900 py-2.5 text-center text-sm font-semibold text-white shadow hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              {t("nav.login")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
