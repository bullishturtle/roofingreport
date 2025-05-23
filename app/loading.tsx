export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black to-blue-950">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="h-10 w-32 bg-neon-gold/20 rounded-md"></div>
        <div className="h-6 w-48 bg-white/20 rounded-md"></div>
        <div className="h-6 w-64 bg-white/10 rounded-md"></div>
        <div className="mt-4 h-10 w-40 bg-neon-gold/30 rounded-md"></div>
      </div>
    </div>
  )
}
