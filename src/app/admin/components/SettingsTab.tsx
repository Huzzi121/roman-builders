'use client'

export default function SettingsTab() {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-2xl font-serif text-[#161f18]">System Settings</h2>
        <p className="text-gray-600 text-sm mt-1">Manage global website configuration.</p>
      </div>

      <div className="bg-white/70 backdrop-blur-md border border-white p-12 rounded-[2rem] shadow-xl text-center">
        <div className="w-16 h-16 bg-[#4a5240]/10 text-[#4a5240] rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="fa-solid fa-gears text-2xl"></i>
        </div>
        <h3 className="text-xl font-serif mb-2">Coming Soon</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          Global settings (like contact information, social links, and site branding) will be configurable here in a future update.
        </p>
      </div>
    </div>
  )
}
