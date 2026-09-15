"use client";
import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full z-50 px-4 sm:px-8 pt-2 sm:pt-3 pointer-events-none">
      <header className="relative pointer-events-auto max-w-7xl mx-auto px-6 py-3 flex items-center justify-between bg-[#3d4435]/80 backdrop-blur-md rounded-full shadow-lg border border-white/10 transition-all">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity" data-purpose="brand-logo">
          {/* Note: if the original logo is dark, we might need a light version here, but we will leave the current logo source for now */}
          <img src="/Asset 2@4x.png" alt="Roman Builders & Developers" className="h-10 sm:h-12 w-auto object-contain brightness-0 invert" />
        </Link>
        
        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-2 text-base font-medium text-[#e8e4db]" data-purpose="primary-navigation">
          <Link href="/about" className="px-5 py-2 rounded-full hover:bg-white/10 hover:text-white transition-all">About us</Link>
          <Link href="/projects" className="px-5 py-2 rounded-full hover:bg-white/10 hover:text-white transition-all">Projects</Link>
          <Link href="/services" className="px-5 py-2 rounded-full hover:bg-white/10 hover:text-white transition-all">Services</Link>
          <Link href="/process" className="px-5 py-2 rounded-full hover:bg-white/10 hover:text-white transition-all">Process</Link>
          <Link href="/blog" className="px-5 py-2 rounded-full hover:bg-white/10 hover:text-white transition-all">Blog</Link>
        </nav>
        
        {/* Action Icons & Button */}
        <div className="flex items-center space-x-4 sm:space-x-6" data-purpose="header-actions">
          <Link href="/contact" className="inline-flex items-center gap-2 bg-[#e8e4db] text-[#161f18] px-6 py-2.5 rounded-full text-[13px] font-medium hover:bg-white transition-colors shadow-sm">
            <span>Contact us</span>
            <i className="fa-solid fa-arrow-right text-[11px]"></i>
          </Link>
        </div>
      </header>
    </div>
  );
}
