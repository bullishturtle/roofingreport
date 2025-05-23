export default function DashboardLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black to-blue-950">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between px-2">
          <div className="grid gap-1">
            <div className="h-8 w-32 bg-white/20 rounded-md animate-pulse"></div>
            <div className="h-4 w-48 bg-white/10 rounded-md animate-pulse"></div>
          </div>
          <div className="h-9 w-24 bg-blue-600/30 rounded-md animate-pulse"></div>
        </div>

        <div className="grid gap-4 md:gap-8">
          <div className="grid gap-4 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-24 rounded-lg border border-white/10 bg-white/5 p-4 animate-pulse"
                style={{ animationDelay: `${i * 100}ms` }}
              ></div>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-7">
            <div className="md:col-span-5 h-80 rounded-lg border border-white/10 bg-white/5 animate-pulse"></div>
            <div className="md:col-span-2 h-80 rounded-lg border border-white/10 bg-white/5 animate-pulse"></div>
          </div>
        </div>
      </main>
    </div>
  )
}
