import PageShell from "@/components/PageShell";

export default function ChurchServicesPage() {
  return (
    <PageShell titleKey="directory.churchServices.title" descKey="directory.churchServices.desc" maxWidth="max-w-3xl" centered>
      <div className="mx-auto max-w-prose space-y-4 rounded-2xl border border-border bg-card p-8 text-sm leading-relaxed text-muted-foreground">
        <p>
          Access parish social support, administrative request platforms, and pastoral coordination tools designed to
          serve the spiritual and material needs of our community members.
        </p>
      </div>
    </PageShell>
  );
}
