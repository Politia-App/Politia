"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const OT_BOOKS = [
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth",
  "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra",
  "Nehemiah", "Esther", "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon",
  "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos",
  "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi"
];

const NT_BOOKS = [
  "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians",
  "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians",
  "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews", "James", "1 Peter", "2 Peter",
  "1 John", "2 John", "3 John", "Jude", "Revelation"
];

export default function HolyBiblePage() {
  const { t } = useLanguage();
  const [testament, setTestament] = useState<"OT" | "NT">("OT");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState<string | null>(null);

  const activeBooks = testament === "OT" ? OT_BOOKS : NT_BOOKS;
  const filteredBooks = activeBooks.filter((book) =>
    book.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="flex-1 bg-white dark:bg-[#001F3F] transition-colors duration-300">
      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24 flex flex-col items-center">
        {/* Navigation Return */}
        <div className="w-full flex justify-start mb-8">
          <Link
            href="/"
            className="text-[13px] font-medium text-neutral-400 hover:text-neutral-900 dark:hover:text-zinc-50 transition-colors"
          >
            {t("directory.returnToSanctuary")}
          </Link>
        </div>

        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mb-12">
          <h1 className="text-4xl font-bold tracking-apple-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            {t("directory.holyBible.title")}
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-300">
            {t("directory.holyBible.desc")}
          </p>
        </div>

        {/* Interactive Canvas Grid */}
        <div className="w-full space-y-8">
          {/* Testament Tabs & Search Control Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-zinc-100 dark:border-zinc-800/40">
            {/* Tabs */}
            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => {
                  setTestament("OT");
                  setSelectedBook(null);
                }}
                className={`text-sm font-semibold tracking-apple-body transition-colors cursor-pointer focus:outline-none ${
                  testament === "OT"
                    ? "text-amber-600 dark:text-amber-400"
                    : "text-neutral-400 hover:text-neutral-900 dark:hover:text-zinc-50"
                }`}
              >
                {t("directory.holyBible.oldTestament")}
              </button>
              <span className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800"></span>
              <button
                type="button"
                onClick={() => {
                  setTestament("NT");
                  setSelectedBook(null);
                }}
                className={`text-sm font-semibold tracking-apple-body transition-colors cursor-pointer focus:outline-none ${
                  testament === "NT"
                    ? "text-amber-600 dark:text-amber-400"
                    : "text-neutral-400 hover:text-neutral-900 dark:hover:text-zinc-50"
                }`}
              >
                {t("directory.holyBible.newTestament")}
              </button>
            </div>

            {/* Minimalist Search Input */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("directory.holyBible.searchPlaceholder")}
                className="w-full bg-zinc-50 dark:bg-zinc-900/60 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 text-xs rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-900 dark:hover:text-zinc-50 focus:outline-none"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Book Matrix Selection */}
          {!selectedBook ? (
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                {t("directory.holyBible.books")} ({filteredBooks.length})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {filteredBooks.map((book) => (
                  <button
                    key={book}
                    type="button"
                    onClick={() => setSelectedBook(book)}
                    className="w-full text-start flex items-center justify-between text-[13px] font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white transition-all duration-150 cursor-pointer focus:outline-none hover:scale-[0.98] active:scale-[0.96]"
                  >
                    <span>{book}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Chapter view mockup */
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                  {selectedBook}
                </h3>
                <button
                  type="button"
                  onClick={() => setSelectedBook(null)}
                  className="text-xs font-semibold text-neutral-400 hover:text-neutral-900 dark:hover:text-zinc-50 focus:outline-none py-1.5 px-3"
                >
                  ← Back to Books
                </button>
              </div>

              {/* Chapters list mockup */}
              <div className="grid grid-cols-6 sm:grid-cols-10 gap-3">
                {Array.from({ length: 15 }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className="h-10 w-10 flex items-center justify-center text-xs font-mono border border-zinc-100 dark:border-zinc-800/40 rounded-md text-neutral-400 hover:text-zinc-900 hover:border-zinc-300 dark:hover:text-white dark:hover:border-zinc-700 transition-all cursor-pointer focus:outline-none hover:scale-[0.96]"
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
