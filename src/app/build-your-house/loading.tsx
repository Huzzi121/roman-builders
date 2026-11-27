export default function BuildYourHouseLoading() {
  return (
    <main className="relative min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-[92rem] mx-auto">
      <div className="text-center mb-10">
        <div className="h-4 w-40 bg-[#4a5240]/15 rounded-full mx-auto mb-3 animate-pulse"></div>
        <div className="h-10 w-80 bg-[#161f18]/10 rounded-2xl mx-auto mb-3 animate-pulse"></div>
        <div className="h-4 w-96 max-w-full bg-gray-400/20 rounded-full mx-auto animate-pulse"></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 h-[580px] bg-white/60 rounded-3xl border border-white animate-pulse"></div>
        <div className="lg:col-span-4 h-[580px] bg-white/60 rounded-3xl border border-white animate-pulse"></div>
      </div>
    </main>
  );
}

