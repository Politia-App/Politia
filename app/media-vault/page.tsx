import PageShell from "@/components/PageShell";

export default function MediaVaultPage() {
  return (
    <PageShell titleKey="directory.mediaVault.title" descKey="directory.mediaVault.desc" maxWidth="max-w-3xl" centered>
      <div className="mx-auto max-w-prose space-y-4 rounded-2xl border border-border bg-card p-8 text-sm leading-relaxed text-muted-foreground">
        <p>
          An archive dedicated to traditional Coptic iconography, holy historical photographs, and rare ecclesiastical
          sound recordings. Curating beauty and reverence with extreme high-fidelity precision.
        </p>
      </div>
    </PageShell>
  );
}
