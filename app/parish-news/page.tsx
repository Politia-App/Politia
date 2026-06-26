import PageShell from "@/components/PageShell";

export default function ParishNewsPage() {
  return (
    <PageShell titleKey="directory.parishNews.title" descKey="directory.parishNews.desc" maxWidth="max-w-3xl" centered>
      <div className="mx-auto max-w-prose space-y-4 rounded-2xl border border-border bg-card p-8 text-sm leading-relaxed text-muted-foreground">
        <p>
          Stay connected with the latest updates from your local diocese and parish. Access newsletters, event
          schedules, announcements, and network updates directly within Politia.
        </p>
      </div>
    </PageShell>
  );
}
