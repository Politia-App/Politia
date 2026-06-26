import PageShell from "@/components/PageShell";

export default function ChurchHistoryPage() {
  return (
    <PageShell titleKey="directory.churchHistory.title" descKey="directory.churchHistory.desc" maxWidth="max-w-3xl" centered>
      <div className="mx-auto max-w-prose space-y-4 rounded-2xl border border-border bg-card p-8 text-sm leading-relaxed text-muted-foreground">
        <p>
          Explore the historical timeline of the Orthodox Christian Church. From the apostolic age and early Roman
          persecutions to ecumenical councils and global expansion, follow the path of truth preserved through
          generations.
        </p>
      </div>
    </PageShell>
  );
}
