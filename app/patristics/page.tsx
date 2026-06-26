import PageShell from "@/components/PageShell";

export default function PatristicsPage() {
  return (
    <PageShell titleKey="directory.patristics.title" descKey="directory.patristics.desc" maxWidth="max-w-3xl" centered>
      <div className="mx-auto max-w-prose space-y-4 rounded-2xl border border-border bg-card p-8 text-sm leading-relaxed text-muted-foreground">
        <p>
          Welcome to the library of the Early Church Fathers. This theological reader delivers clean translations of
          patristic commentaries, letters, and homilies in a refined, zero-distraction reading environment.
        </p>
      </div>
    </PageShell>
  );
}
