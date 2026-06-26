import PageShell from "@/components/PageShell";

export default function ParishDirectoryPage() {
  return (
    <PageShell titleKey="directory.parishDirectory.title" descKey="directory.parishDirectory.desc" maxWidth="max-w-3xl" centered>
      <div className="mx-auto max-w-prose space-y-4 rounded-2xl border border-border bg-card p-8 text-sm leading-relaxed text-muted-foreground">
        <p>
          An interactive geographic registry of all parishes, monasteries, and dioceses. Access contact details,
          service schedules, and locations within the Coptic Orthodox Church network.
        </p>
      </div>
    </PageShell>
  );
}
