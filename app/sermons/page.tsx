import PageShell from "@/components/PageShell";

export default function SermonsPage() {
  return (
    <PageShell titleKey="directory.sermons.title" descKey="directory.sermons.desc" maxWidth="max-w-3xl" centered>
      <div className="mx-auto max-w-prose space-y-4 rounded-2xl border border-border bg-card p-8 text-sm leading-relaxed text-muted-foreground">
        <p>
          Explore our pastoral sermon archives. Access rich, high-fidelity audio streams containing patristic insights,
          biblical explanations, and contemporary theological guidance from our bishops and priests.
        </p>
      </div>
    </PageShell>
  );
}
