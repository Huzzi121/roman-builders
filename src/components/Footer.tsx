"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function Footer({ transparent = false }: { transparent?: boolean }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  // When transparent prop is passed (e.g. on home page), we keep the footer solid but
  // make the very top background path of the wave transparent so the background image shows through.

  return (
    <footer className="relative bg-transparent text-white">
      
      {/* Wave Divider — top layer transparent to show background image or body bg */}
      <div className="bg-transparent leading-[0] -mb-px relative z-20">
        <svg
          className="block w-full drop-shadow-sm"
          style={{ height: 'clamp(70px, 9vw, 120px)' }}
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Layer 1 (back) – transparent on home page to show background image, else beige */}
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z"
            fill={transparent ? "transparent" : "#e8e4db"}
          />
          {/* Layer 2 (mid) – olive */}
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V120H0Z"
            fill="#505A45"
          />
          {/* Layer 3 (front) – dark green: matches footer bg */}
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V120H0Z"
            fill="#3d4435"
          />
        </svg>
      </div>

      <div className="relative bg-[#3d4435] z-10">
        {/* Decorative leaf textures */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] opacity-[0.04] z-0 translate-y-1/4 -translate-x-1/4 text-white">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-current">
              <path d="M100,10 C100,10 20,40 20,100 C20,160 100,190 100,190 C100,190 180,160 180,100 C180,40 100,10 100,10 Z M100,20 C140,50 170,80 170,100 C170,140 110,175 100,180 C90,175 30,140 30,100 C30,80 60,50 100,20 Z" />
              <path d="M100,20 L100,180 M100,100 C120,80 140,70 140,70 M100,130 C120,110 140,100 140,100 M100,70 C80,50 60,40 60,40 M100,100 C80,80 60,70 60,70" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </div>
          <div className="absolute top-10 right-0 w-[500px] h-[500px] opacity-[0.03] z-0 translate-x-1/4 rotate-[120deg] text-white">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-current">
              <path d="M100,10 C100,10 20,40 20,100 C20,160 100,190 100,190 C100,190 180,160 180,100 C180,40 100,10 100,10 Z M100,20 C140,50 170,80 170,100 C170,140 110,175 100,180 C90,175 30,140 30,100 C30,80 60,50 100,20 Z" />
              <path d="M100,20 L100,180 M100,100 C120,80 140,70 140,70 M100,130 C120,110 140,100 140,100 M100,70 C80,50 60,40 60,40 M100,100 C80,80 60,70 60,70" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </div>
        </div>

        {/* Main content */}
        <div className="relative z-10 max-w-[90rem] mx-auto px-6 lg:px-8 xl:px-12 pt-10 pb-8">

          {/* 3-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-0 items-center">

            {/* Col 1: Newsletter */}
            <div className="flex flex-col justify-center lg:pr-10 xl:pr-14">
              <h4 className="text-[9px] tracking-[0.2em] uppercase text-white/50 mb-2 font-bold">Stay Updated</h4>
              <h2 className="text-2xl lg:text-[22px] font-serif mb-3 leading-tight text-white">Join Our Newsletter</h2>
              <p className="text-gray-300 text-[12px] lg:text-[13px] mb-5 leading-relaxed max-w-sm">
                Subscribe to get the latest updates on our projects, offers and real estate insights — straight to your inbox.
              </p>
              {subscribed ? (
                <div className="bg-[#4a5240]/20 border border-[#4a5240]/30 rounded-xl p-4 mb-3 max-w-[320px]">
                  <p className="text-emerald-400 text-sm font-medium flex items-center gap-2">
                    <i className="fa-solid fa-check"></i> Successfully subscribed!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="relative flex items-center bg-[#f0ece3] rounded-full p-1 mb-3 shadow-md max-w-[320px] border border-[#d4cfc5]/50">
                  <div className="pl-3 text-gray-400 shrink-0">
                    <i className="fa-regular fa-envelope text-xs"></i>
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 bg-transparent border-none outline-none px-2.5 text-[12px] text-gray-800 placeholder-gray-400 min-w-0"
                  />
                  <button type="submit" className="bg-[#2a3226] hover:bg-[#1f251c] text-white px-5 py-2 rounded-full text-[11px] font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 shrink-0">
                    Subscribe <i className="fa-solid fa-arrow-right text-[9px] opacity-80"></i>
                  </button>
                </form>
              )}
              <p className="text-[8px] tracking-[0.15em] uppercase text-white/40 font-bold ml-2">
                No Spam. Just valuable updates.
              </p>
            </div>

            {/* Col 2: Branding */}
            <div className="flex flex-col items-center justify-center text-center py-6 lg:py-0">
              <div className="lg:border-l lg:border-r lg:border-white/10 w-full flex flex-col items-center py-4 lg:px-8">
                <div className="mb-4 flex flex-col items-center">
                  <div className="w-14 h-14 flex items-center justify-center mb-3 text-[#e8e4db]">
                    <svg viewBox="0 0 48 48" fill="currentColor" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 4L4 18V44H18V30H30V44H44V18L24 4Z" fillOpacity="0.15" />
                      <path d="M24 4L4 18V44H18V30H30V44H44V18L24 4ZM40 40H34V26H14V40H8V20.1L24 9.2L40 20.1V40Z" />
                      <rect x="20" y="8" width="2" height="28" fillOpacity="0.4" />
                      <rect x="26" y="8" width="2" height="28" fillOpacity="0.4" />
                      <rect x="14" y="20" width="4" height="4" rx="1" fillOpacity="0.6" />
                      <rect x="30" y="20" width="4" height="4" rx="1" fillOpacity="0.6" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-2xl lg:text-[22px] leading-none tracking-tight mb-1.5 text-white">Roman Builders</h3>
                  <p className="text-[8px] tracking-[0.3em] font-sans text-white/60 uppercase">& Developers</p>
                </div>
                <div className="text-[7px] sm:text-[8px] font-bold tracking-[0.25em] text-white/35 uppercase mt-1">
                  People <span className="mx-2 text-white/10">|</span> Places <span className="mx-2 text-white/10">|</span> Progress <span className="mx-2 text-white/10">|</span> Together
                </div>
              </div>
            </div>

            {/* Col 3: Socials */}
            <div className="flex flex-col justify-center text-center lg:text-left">
              <div className="lg:border-l lg:border-white/10 w-full flex flex-col justify-center py-4 lg:pl-10 xl:pl-14">
                <h4 className="text-[9px] tracking-[0.2em] uppercase text-white/50 mb-2 font-bold">Follow Us</h4>
                <h2 className="text-2xl lg:text-[22px] font-serif mb-3 leading-tight text-white">{"Let's Stay Connected"}</h2>
                <p className="text-gray-300 text-[12px] lg:text-[13px] mb-5 leading-relaxed max-w-xs mx-auto lg:mx-0">
                  Follow us on social media for project updates, behind the scenes and more.
                </p>
                <div className="flex flex-wrap gap-3 lg:gap-4 items-start justify-center lg:justify-start">
                  {[
                    { name: 'Call', icon: 'fa-solid fa-phone', href: 'tel:+923139986707' },
                    { name: 'LinkedIn', icon: 'fa-brands fa-linkedin-in', href: 'https://www.linkedin.com/in/dr-roman-gul/' },
                    { name: 'WhatsApp', icon: 'fa-brands fa-whatsapp', href: "https://wa.me/923139986707?text=Assalamualaikum%2C%20I%20visited%20your%20website%20and%20I%27m%20interested%20in%20your%20services.%20I%20would%20like%20to%20discuss%20a%20project%20and%20get%20more%20information%20about%20your%20services%2C%20pricing%2C%20and%20process.%20Please%20let%20me%20know%20when%20you%27re%20available%20to%20discuss.%20Thank%20you%21" },
                  ].map((social, i) => (
                    <div key={i} className="flex flex-col items-center justify-start gap-1.5 group cursor-pointer w-10">
                      <a href={social.href} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-white/40 transition-all shadow-sm">
                        <i className={`${social.icon} text-[11px]`}></i>
                      </a>
                      <span className="text-[7px] text-white/35 group-hover:text-white/70 transition-colors text-center w-full">{social.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="mt-14 pt-5 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-4 pb-2">
            <div className="flex flex-col items-center lg:items-start gap-1.5 text-center lg:text-left">
              <p className="text-[9px] sm:text-[10px] text-white/60">
                &copy; 2024 Roman Builders &amp; Developers. All Rights Reserved.
              </p>
              <p className="text-[7px] sm:text-[8px] text-white/35 uppercase tracking-[0.15em] font-bold">
                Empowering your real estate journey. Together, we build your future.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[10px] sm:text-[11px] text-white/60 font-medium">
              <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
              <span className="text-white/20">|</span>
              <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
              <span className="text-white/20">|</span>
              <Link href="/services" className="hover:text-white transition-colors">Services</Link>
              <span className="text-white/20">|</span>
              <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
              <span className="text-white/20">|</span>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
            <div className="flex items-center gap-2.5 lg:justify-end">
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <i className="fa-solid fa-location-dot text-[9px] text-white/80"></i>
              </div>
              <div className="flex flex-col items-start justify-center">
                <span className="text-[10px] sm:text-xs text-white/80 font-medium leading-none mb-1">Abbottabad, Pakistan</span>
                <span className="text-[7px] sm:text-[8px] text-white/35 uppercase tracking-[0.15em] font-bold leading-none">
                  A Brighter Tomorrow Here
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
