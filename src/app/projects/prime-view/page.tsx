import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";

export default function PrimeViewPage() {
  return (
    <main className="pt-24">
      {/* Prime View Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img src="/images/prime-view-showcase.jpg" alt="Prime View Aerial" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto text-white">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur-md px-4 py-2 rounded-full border border-emerald-400/50 mb-6">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="text-[10px] font-bold tracking-wider uppercase">Now Selling</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif mb-6 drop-shadow-lg">Prime View Co-Operative Housing Society</h1>
         <p className="text-lg md:text-xl font-light text-white/90">A Brighter Tomorrow in Abbottabad</p>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-20 px-6 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-serif text-[#161f18] mb-6">Experience Unparalleled Living</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Prime View Co-Operative Housing Society is Abbottabad's premier real estate destination. Nestled against a backdrop of breathtaking mountains, this society combines the tranquility of nature with the convenience of modern urban planning.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Developed by Roman Builders, the project is fully legal, TMA & EPA approved, and designed to foster a secure, thriving community.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm min-w-[140px]">
                <div className="text-2xl font-serif text-[#4a5240] mb-1">100%</div>
                <div className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Approved</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm min-w-[140px]">
                <div className="text-2xl font-serif text-[#4a5240] mb-1">24/7</div>
                <div className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Security</div>
              </div>
            </div>
          </div>
          <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-xl">
            <img src="/images/prime-view-gate.jpg" alt="Prime View Gate" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Features & Amenities */}
      <section className="bg-[#4a5240] py-20 px-6 sm:px-8 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif mb-4">World-Class Amenities</h2>
            <p className="text-white/70 max-w-2xl mx-auto">Everything you need for a comfortable, modern lifestyle is built right into the community.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: "fa-bolt", title: "Underground Electrification", desc: "Uninterrupted power supply without the clutter of overhead cables." },
              { icon: "fa-droplet", title: "Modern Sewerage", desc: "State-of-the-art waste management and drainage systems." },
              { icon: "fa-tree", title: "Parks & Green Belts", desc: "Ample green spaces for recreation and a healthy lifestyle." },
              { icon: "fa-road", title: "Wide Carpeted Roads", desc: "Spacious infrastructure for smooth traffic flow." },
              { icon: "fa-shield-halved", title: "Gated Community", desc: "24/7 surveillance and secure entry points." },
              { icon: "fa-mosque", title: "Grand Mosque", desc: "A beautiful central mosque for the community." },
              { icon: "fa-shop", title: "Commercial Area", desc: "Dedicated spaces for retail and daily necessities." },
              { icon: "fa-file-contract", title: "TMA & EPA Approved", desc: "100% legal project with all required NOCs." },
            ].map((feat, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-4">
                  <i className={`fa-solid ${feat.icon} text-sm`}></i>
                </div>
                <h3 className="font-serif text-lg mb-2">{feat.title}</h3>
                <p className="text-white/60 text-xs leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Presentation */}
      <section className="py-20 px-6 sm:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-serif text-[#161f18] mb-4">See It For Yourself</h2>
          <p className="text-gray-600">Take a virtual tour of the Prime View society.</p>
        </div>
        <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white relative bg-slate-900">
          <video className="w-full h-full object-cover" src="/search_about_Prime_View_City_–.mp4" controls preload="none" poster="/images/prime-view-showcase.jpg"></video>
        </div>
      </section>

      {/* Brochure / Download */}
      <section className="py-16 px-6 sm:px-8 max-w-3xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 text-center mb-20">
        <div className="w-16 h-16 rounded-full bg-[#e8e5da] text-[#4a5240] flex items-center justify-center mx-auto mb-6">
          <i className="fa-solid fa-file-pdf text-2xl"></i>
        </div>
        <h2 className="text-2xl font-serif text-[#161f18] mb-4">Download the Official Brochure</h2>
        <p className="text-gray-500 mb-8 text-sm max-w-md mx-auto">Get complete details about payment plans, plot sizes, and the master plan layout.</p>
        <button className="inline-flex items-center gap-3 bg-[#4a5240] text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-[#3d4435] transition-all shadow-md">
          <i className="fa-solid fa-download"></i>
          <span>Download PDF</span>
        </button>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
}
