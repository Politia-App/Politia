"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import LanguagePicker from "@/components/LanguagePicker";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navLinks = [
    { href: "/#home", label: t("nav.home") },
    { href: "/#despre", label: t("nav.about") },
    { href: "/#servicii", label: t("nav.services") },
    { href: "/#contact", label: t("nav.contact") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo and Brand Name */}
        <Link
          href="/#home"
          className="flex items-center gap-3 transition-transform duration-200 hover:scale-[1.02]"
        >
          <div className="relative h-9 w-9 overflow-hidden rounded-full border border-border shadow-sm">
            <Image
              src="/logo.jpeg"
              alt="Politia App Logo"
              fill
              priority
              className="object-cover"
              sizes="36px"
            />
          </div>
          <span className="text-lg font-semibold tracking-tight text-foreground">
            {t("nav.brandName")}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden items-center gap-2 md:flex">
          <LanguagePicker placement="bottom" align="end" />
          <Link
            href="/login"
            className="inline-flex h-9 items-center justify-center rounded-full bg-primary px-5 text-xs font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90 active:scale-[0.98]"
          >
            {t("nav.login")}
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguagePicker placement="bottom" align="end" />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none"
            aria-controls="mobile-menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="sr-only">{t("nav.openMenu")}</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="animate-fade-in space-y-1 border-b border-border bg-background/95 px-4 pb-4 pt-2 shadow-lg backdrop-blur-xl md:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3">
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex w-full items-center justify-center rounded-full bg-primary py-2.5 text-center text-sm font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
            >
              {t("nav.login")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
