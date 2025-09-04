export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050714] to-[#0a1128] text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
        <p className="text-gray-300">Loading Admin Dashboard...</p>
      </div>
    </div>
  )
}
