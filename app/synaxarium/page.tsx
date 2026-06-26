import PageShell from "@/components/PageShell";

export default function SynaxariumPage() {
  return (
    <PageShell titleKey="directory.synaxarium.title" descKey="directory.synaxarium.desc" maxWidth="max-w-3xl" centered>
      <div className="mx-auto max-w-prose space-y-4 rounded-2xl border border-border bg-card p-8 text-sm leading-relaxed text-muted-foreground">
        <p>
          The Synaxarium is the daily book of saints&apos; histories and church events. Read about the cloud of
          witnesses and historical milestones that have preserved our faith throughout the centuries.
        </p>
      </div>
    </PageShell>
  );
}
