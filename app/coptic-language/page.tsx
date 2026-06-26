import PageShell from "@/components/PageShell";

export default function CopticLanguagePage() {
  return (
    <PageShell titleKey="directory.copticLanguage.title" descKey="directory.copticLanguage.desc" maxWidth="max-w-3xl" centered>
      <div className="mx-auto max-w-prose space-y-4 rounded-2xl border border-border bg-card p-8 text-sm leading-relaxed text-muted-foreground">
        <p>
          Study Coptic language philology, grammar, and vocabulary. Designed to provide both beginners and advanced
          scholars with resources to read and chant Coptic texts in their original native beauty.
        </p>
      </div>
    </PageShell>
  );
}
