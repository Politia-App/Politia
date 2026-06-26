import PageShell from "@/components/PageShell";

export default function HymnsPage() {
  return (
    <PageShell titleKey="directory.hymns.title" descKey="directory.hymns.desc" maxWidth="max-w-3xl" centered>
      <div className="mx-auto max-w-prose space-y-4 rounded-2xl border border-border bg-card p-8 text-sm leading-relaxed text-muted-foreground">
        <p>
          Immerse yourself in Coptic liturgical hymnology. Explore sacred chants, audio recordings, and structural
          guides designed to teach and preserve our rich musical oral heritage.
        </p>
      </div>
    </PageShell>
  );
}
