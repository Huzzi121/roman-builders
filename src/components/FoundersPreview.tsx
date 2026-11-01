"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Founder {
  id: string;
  name: string;
  role: string;
  email: string;
  image: string;
  description: string;
  signature: string;
}

const founders: Founder[] = [
  {
    id: "roman-gul",
    name: "Dr. Roman Gul",
    role: "Chief Executive Officer",
    email: "ceo@romanbuilders.pk",
    image: "/dr. roman gul.original.jpeg",
    description:
      "Dr. Roman Gul, CEO of Roman Builders & Developers (Private) Limited, is a seasoned business professional with extensive expertise in real estate development, town planning, construction, regulatory approvals, and legal consultancy for housing projects. As a lead partner, he also brings exceptional strength in real estate sales and marketing. In addition to his business achievements, he has served for several years as a consultant in cervical spondylitis rehabilitation and alternative medicine, reflecting his diverse professional expertise.",
    signature: "Dr. Roman Gul",
  },
  {
    id: "liaqat-jadoon",
    name: "Liaqat Khan Jadoon",
    role: "Executive Director",
    email: "director@romanbuilders.pk",
    image: "/liaqat khan jadoon.jpeg",
    description:
      "Liaqat Khan Jadoon is a dynamic business leader and Executive Director of Roman Builders & Developers (Private) Limited, bringing strategic leadership and extensive expertise in real estate development, town planning, construction, regulatory approvals, and project commercialization. With a strong command of sales and marketing, he plays a pivotal role in driving business growth and advancing real estate ventures. A retired Navy SEAL commando with distinguished national and international achievements in skydiving, sailing, and allied disciplines, he embodies strategic vision, operational excellence, discipline, and decisive leadership.",
    signature: "Liaqat Khan Jadoon",
  },
];

const advisoryMember: Founder = {
  id: "raja-gulfam",
  name: "Raja Gulfam",
  role: "Advisory, Compliance and Financial Management",
  email: "info@romanbuilders.pk",
  image: "/raja gulfam.jpeg",
  description:
    "Raja Gulfam oversees advisory, compliance, and financial management at Roman Builders & Developers. With deep domain knowledge in financial planning, statutory compliances, and strategic oversight, he ensures every project meets rigorous institutional standards and regulatory integrity.",
  signature: "Raja Gulfam",
};

export default function FoundersPreview() {
  const [selectedFounder, setSelectedFounder] = useState<Founder | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const openModal = (founder: Founder) => {
    setSelectedFounder(founder);
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      setIsAnimating(true);
    }, 15);
  };

  const closeModal = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setSelectedFounder(null);
      document.body.style.overflow = "unset";
    }, 250);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (selectedFounder) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedFounder]);

  return (
    <section className="w-full py-16 sm:py-20 relative overflow-hidden" data-purpose="founders">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">

        {/* Header - Our Founders */}
        <div className="text-center mb-12 sm:mb-16 relative">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="h-px bg-[#4a5240]/30 w-12"></div>
            <span className="text-[#4a5240] text-xs font-bold tracking-[0.2em] uppercase">Our Founders</span>
            <div className="h-px bg-[#4a5240]/30 w-12"></div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#1a1c19] mb-3 tracking-tight">
            The Visionaries Behind Roman Builders & Developers
          </h2>
          <p className="text-gray-700 text-sm">Two Leaders. One Vision. A Better Tomorrow.</p>
        </div>

        {/* Founders Grid - Card where top section IS the image with borders continuing down */}
        <div className="grid grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto gap-8 sm:gap-12">
          {founders.map((founder) => (
            <div
              key={founder.id}
              onClick={() => openModal(founder)}
              className="group cursor-pointer w-full max-w-[290px] sm:max-w-[310px] mx-auto rounded-t-[100px] sm:rounded-t-[120px] rounded-b-3xl border-2 border-[#dfd2ba] bg-gradient-to-b from-[#fdfbf7] to-[#ede2cd] shadow-[0_14px_38px_rgba(157,120,62,0.14)] hover:shadow-[0_24px_50px_rgba(157,120,62,0.25)] transition-all duration-500 hover:-translate-y-2 flex flex-col overflow-hidden text-center"
            >
              {/* Top Section - Image covers the entire area with no surrounding gap */}
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-white shrink-0">
                <img
                  src={founder.image}
                  alt={founder.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Lower Section - Borders coming straight down for name and profile section */}
              <div className="bg-gradient-to-b from-[#f5eee0] to-[#e8dcbf] border-t-2 border-[#dfd2ba] py-5 px-5 sm:px-6 flex flex-col items-center justify-center relative z-10 transition-colors duration-300 group-hover:from-[#f2e8d7] group-hover:to-[#e4d6b5]">
                <h3 className="text-xl sm:text-2xl font-serif text-[#161f18] group-hover:text-[#4a5240] transition-colors font-semibold leading-tight">
                  {founder.name}
                </h3>
                <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.16em] text-[#4a5240] mt-1.5">
                  {founder.role}
                </p>

                <div className="mt-3.5 inline-flex items-center gap-2 bg-white/85 group-hover:bg-[#4a5240] text-[#4a5240] group-hover:text-white px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-wider transition-all duration-300 shadow-sm border border-[#dfd2ba]">
                  <span>View Profile</span>
                  <i className="fa-solid fa-arrow-right text-[9px] group-hover:translate-x-0.5 transition-transform"></i>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Advisory Header */}
        <div className="text-center mt-16 sm:mt-24 mb-10 sm:mb-12 relative">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="h-px bg-[#4a5240]/30 w-12"></div>
            <span className="text-[#4a5240] text-xs font-bold tracking-[0.2em] uppercase">
              ADVISORY & COMPLIANCE
            </span>
            <div className="h-px bg-[#4a5240]/30 w-12"></div>
          </div>
          <h3 className="text-3xl sm:text-4xl font-serif text-[#1a1c19] mb-3 tracking-tight">
            ADVISORY, COMPLIANCE AND FINANCIAL MANAGEMENT
          </h3>
        </div>

        {/* Third Member Space - Raja Gulfam */}
        <div className="max-w-2xl mx-auto flex justify-center">
          <div
            onClick={() => openModal(advisoryMember)}
            className="group cursor-pointer w-full max-w-[290px] sm:max-w-[310px] rounded-t-[100px] sm:rounded-t-[120px] rounded-b-3xl border-2 border-[#dfd2ba] bg-gradient-to-b from-[#fdfbf7] to-[#ede2cd] shadow-[0_14px_38px_rgba(157,120,62,0.14)] hover:shadow-[0_24px_50px_rgba(157,120,62,0.25)] transition-all duration-500 hover:-translate-y-2 flex flex-col overflow-hidden text-center"
          >
            {/* Top Section - Image covers the entire area with no surrounding gap */}
            <div className="relative w-full aspect-[4/5] overflow-hidden bg-white shrink-0">
              <img
                src={advisoryMember.image}
                alt={advisoryMember.name}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>

            {/* Lower Section - Borders coming straight down for name and profile section */}
            <div className="bg-gradient-to-b from-[#f5eee0] to-[#e8dcbf] border-t-2 border-[#dfd2ba] py-5 px-5 sm:px-6 flex flex-col items-center justify-center relative z-10 transition-colors duration-300 group-hover:from-[#f2e8d7] group-hover:to-[#e4d6b5]">
              <h3 className="text-xl sm:text-2xl font-serif text-[#161f18] group-hover:text-[#4a5240] transition-colors font-semibold leading-tight">
                {advisoryMember.name}
              </h3>
              <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.16em] text-[#4a5240] mt-1.5">
                {advisoryMember.role}
              </p>

              <div className="mt-3.5 inline-flex items-center gap-2 bg-white/85 group-hover:bg-[#4a5240] text-[#4a5240] group-hover:text-white px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-wider transition-all duration-300 shadow-sm border border-[#dfd2ba]">
                <span>View Profile</span>
                <i className="fa-solid fa-arrow-right text-[9px] group-hover:translate-x-0.5 transition-transform"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Join our team bar */}
        <div className="mt-16 sm:mt-20 max-w-5xl mx-auto bg-[#f8f5ee]/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-[#dfd2ba] shadow-sm">
          <div>
            <h4 className="text-xl font-serif text-[#1a1c19] mb-1">Join our team</h4>
            <p className="text-xs sm:text-sm text-gray-600">
              We&apos;re looking for talented professionals to help shape the future of luxury real estate.
            </p>
          </div>
          <Link
            href="/contact"
            className="text-xs font-bold uppercase tracking-widest text-[#9d783e] hover:text-[#7f5f2d] transition-colors shrink-0"
          >
            Apply Now
          </Link>
        </div>

      </div>

      {/* Popup Modal with Smooth Spring/Fade Animation & Goldenish-White Luxury Palette */}
      {selectedFounder && (
        <div
          className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 transition-all duration-300 ease-out ${
            isAnimating ? "opacity-100" : "opacity-0"
          }`}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
          role="dialog"
          aria-modal="true"
        >
          <div
            className={`bg-gradient-to-br from-[#fdfbf7] via-[#f7f2e5] to-[#ece1cc] text-[#1a1c19] rounded-[2.5rem] max-w-2xl w-full p-6 sm:p-10 shadow-[0_25px_60px_rgba(110,85,45,0.25)] relative overflow-hidden max-h-[90vh] overflow-y-auto border-2 border-[#dfd2ba] transition-all duration-300 ease-out transform ${
              isAnimating
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 translate-y-4"
            }`}
          >
            {/* Subtle Decorative Ambient Background Spheres */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#9d783e]/[0.05] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#9d783e]/[0.05] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 text-gray-500 hover:text-[#161f18] bg-white/80 hover:bg-white w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-md active:scale-95 border border-[#dfd2ba] z-20 cursor-pointer"
              aria-label="Close popup"
            >
              <i className="fa-solid fa-xmark text-sm"></i>
            </button>

            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start relative z-10">
              {/* Image in modal with elevated Roman Arch & crisp white border */}
              <div className="relative w-44 sm:w-52 aspect-[4/5] shrink-0 overflow-hidden rounded-t-[80px] rounded-b-2xl shadow-xl border-4 border-white bg-white">
                <img
                  src={selectedFounder.image}
                  alt={selectedFounder.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Details */}
              <div className="flex-1 text-left w-full">
                <h3 className="text-2xl sm:text-3xl font-serif text-[#161f18] mb-1 font-semibold leading-tight">
                  {selectedFounder.name}
                </h3>
                <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#4a5240] mb-1.5">
                  {selectedFounder.role}
                </p>
                <div className="mb-4">
                  <a
                    href={`mailto:${selectedFounder.email}`}
                    className="text-xs text-gray-600 hover:text-[#4a5240] transition-colors inline-flex items-center gap-1.5"
                  >
                    <i className="fa-regular fa-envelope text-[11px]"></i>
                    <span>{selectedFounder.email}</span>
                  </a>
                </div>

                {/* Description Box with Styled Background matching Page & Watermark Design */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#e6dcbf]/50 border border-[#dfd2ba] shadow-inner relative overflow-hidden backdrop-blur-sm mb-6">
                  {/* Subtle architectural dot grid in background */}
                  <div className="absolute inset-0 opacity-[0.09] bg-[radial-gradient(#9d783e_1.5px,transparent_1.5px)] [background-size:14px_14px] pointer-events-none"></div>

                  {/* Subtle Quotation Watermark */}
                  <i className="fa-solid fa-quote-right text-5xl text-[#9d783e]/[0.12] absolute bottom-2 right-3 pointer-events-none"></i>

                  <p className="text-[13px] sm:text-[14px] text-[#2c3325] leading-relaxed text-justify font-normal relative z-10">
                    {selectedFounder.description}
                  </p>
                </div>

                {/* Signature Bar */}
                <div className="flex items-center justify-between border-t border-[#dfd2ba] pt-4">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-[#4a5240]/60 uppercase">
                    Signature
                  </span>
                  <div className="font-serif italic text-2xl text-gray-800/80 -rotate-3">
                    {selectedFounder.signature}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
