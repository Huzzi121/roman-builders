export default function ExploreSocietyLoading() {
  return (
    <main className="relative min-h-screen pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-[96rem] mx-auto">
      <div className="h-8 w-64 bg-[#161f18]/10 rounded-xl mb-6 animate-pulse"></div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-9 h-[640px] bg-white/50 rounded-3xl border border-white animate-pulse"></div>
        <div className="lg:col-span-3 h-[640px] bg-white/50 rounded-3xl border border-white animate-pulse"></div>
      </div>
    </main>
  );
}

