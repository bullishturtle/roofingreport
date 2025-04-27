import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function StaticHeroSearch() {
  return (
    <form
      action="/dashboard/new-report"
      method="get"
      className="flex w-full max-w-md flex-col gap-2 min-[400px]:flex-row"
    >
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white/50" />
        <Input
          type="text"
          name="address"
          placeholder="Enter property address..."
          className="w-full bg-white/5 border-white/10 pl-9 text-white placeholder:text-white/50 focus-visible:ring-neon-gold"
        />
      </div>
      <Button
        type="submit"
        className="bg-gradient-to-r from-neon-gold to-neon-orange hover:from-neon-orange hover:to-neon-gold text-black border-none shadow-neon-glow"
      >
        Get Report
      </Button>
    </form>
  )
}
