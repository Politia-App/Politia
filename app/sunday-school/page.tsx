import PageShell from "@/components/PageShell";

export default function SundaySchoolPage() {
  return (
    <PageShell titleKey="directory.sundaySchool.title" descKey="directory.sundaySchool.desc" maxWidth="max-w-3xl" centered>
      <div className="mx-auto max-w-prose space-y-4 rounded-2xl border border-border bg-card p-8 text-sm leading-relaxed text-muted-foreground">
        <p>
          Explore Sunday School curricula, educational materials, and youth group portals. Designed to nurture spiritual
          growth and theological literacy among the next generation of believers.
        </p>
      </div>
    </PageShell>
  );
}
