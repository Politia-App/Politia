"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function LiveStreamingPage() {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [streamStatus, setStreamStatus] = useState<"connecting" | "live" | "idle">("connecting");

  useEffect(() => {
    const timer = setTimeout(() => {
      setStreamStatus("live");
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

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
            {t("directory.liveStreaming.title")}
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-300">
            {t("directory.liveStreaming.desc")}
          </p>
        </div>

        {/* Video Canvas Container */}
        <div className="w-full max-w-2xl space-y-6">
          {/* Status Badge */}
          <div className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${
              streamStatus === "live" && isPlaying
                ? "bg-emerald-500 animate-pulse"
                : streamStatus === "connecting"
                ? "bg-amber-500 animate-pulse"
                : "bg-neutral-300 dark:bg-neutral-700"
            }`}></span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
              {streamStatus === "live"
                ? t("directory.liveStreaming.statusLive")
                : streamStatus === "connecting"
                ? t("directory.liveStreaming.connecting")
                : t("directory.liveStreaming.statusOffline")}
            </span>
          </div>

          {/* Premium Video Block Placeholder */}
          <div className="relative aspect-video w-full rounded-2xl bg-[#F5F5F7] dark:bg-[#001933] overflow-hidden flex items-center justify-center transition-all duration-300">
            {streamStatus === "connecting" ? (
              <div className="flex flex-col items-center gap-3">
                <svg className="w-8 h-8 text-amber-500 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : !isPlaying ? (
              <button
                type="button"
                onClick={() => setIsPlaying(true)}
                className="w-16 h-16 rounded-full bg-white dark:bg-[#001F3F] flex items-center justify-center text-zinc-900 dark:text-zinc-100 hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer focus:outline-none"
              >
                <svg className="w-6 h-6 fill-current translate-x-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            ) : (
              /* Simulated audio-visual wave pattern for live transmission */
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-zinc-950/20 dark:bg-zinc-950/40 select-none">
                <div className="flex items-center gap-1.5 h-12">
                  <span className="w-[3px] bg-amber-500 dark:bg-amber-400 rounded-full h-8 animate-[wave_1.2s_ease-in-out_infinite]"></span>
                  <span className="w-[3px] bg-amber-500 dark:bg-amber-400 rounded-full h-12 animate-[wave_0.8s_ease-in-out_infinite_0.2s]"></span>
                  <span className="w-[3px] bg-amber-500 dark:bg-amber-400 rounded-full h-6 animate-[wave_1.5s_ease-in-out_infinite_0.4s]"></span>
                  <span className="w-[3px] bg-amber-500 dark:bg-amber-400 rounded-full h-10 animate-[wave_1.0s_ease-in-out_infinite_0.1s]"></span>
                  <span className="w-[3px] bg-amber-500 dark:bg-amber-400 rounded-full h-4 animate-[wave_1.4s_ease-in-out_infinite_0.3s]"></span>
                </div>
                <span className="text-xs text-neutral-400 dark:text-neutral-500 uppercase tracking-widest font-mono">
                  {t("directory.liveStreaming.player")}
                </span>
              </div>
            )}
          </div>

          {/* Controls Bar */}
          {streamStatus === "live" && (
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-6">
                {/* Play / Pause Toggle */}
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-xs font-semibold uppercase tracking-wider text-neutral-500 hover:text-zinc-900 dark:text-neutral-400 dark:hover:text-zinc-50 cursor-pointer focus:outline-none"
                >
                  {isPlaying ? "Pause" : "Play"}
                </button>

                {/* Mute Toggle */}
                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-xs font-semibold uppercase tracking-wider text-neutral-500 hover:text-zinc-900 dark:text-neutral-400 dark:hover:text-zinc-50 cursor-pointer focus:outline-none"
                >
                  {isMuted ? "Unmute" : "Mute"}
                </button>
              </div>

              {/* Volume status */}
              <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-600 uppercase">
                {isMuted ? "Vol: 0%" : "Vol: 100%"}
              </span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
