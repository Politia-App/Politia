import { SocialIcons } from "@/components/ui/social-icons";

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-neutral-900 w-full">
      <div className="flex flex-col items-center gap-12">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-white">Connect with me</h1>
          <p className="text-sm text-neutral-400">Hover over the icons below</p>
        </div>

        <SocialIcons />
      </div>
    </main>
  )
}
