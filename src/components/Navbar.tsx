"use client";
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full z-50 px-4 sm:px-8 pt-2 sm:pt-3 pointer-events-none">
      <header className="relative pointer-events-auto max-w-7xl mx-auto px-6 py-3 flex items-center justify-between bg-[#3d4435]/80 backdrop-blur-md rounded-full shadow-lg border border-white/10 transition-all">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity" data-purpose="brand-logo" onClick={() => setIsMobileMenuOpen(false)}>
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
        <div className="flex items-center space-x-3 sm:space-x-6" data-purpose="header-actions">
          <Link href="/contact" className="hidden sm:inline-flex items-center gap-2 bg-[#e8e4db] text-[#161f18] px-6 py-2.5 rounded-full text-[13px] font-medium hover:bg-white transition-colors shadow-sm">
            <span>Contact us</span>
            <i className="fa-solid fa-arrow-right text-[11px]"></i>
          </Link>
          
          {/* Mobile Menu Toggle Button */}
          <button 
            className="md:hidden text-[#e8e4db] p-2 focus:outline-none hover:bg-white/10 rounded-full transition-colors flex items-center justify-center w-10 h-10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      <div className={`pointer-events-auto md:hidden absolute top-[calc(100%+10px)] left-4 right-4 bg-[#3d4435]/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 transition-all duration-300 origin-top overflow-hidden ${isMobileMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'}`}>
        <nav className="flex flex-col py-4 px-2">
          <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="px-6 py-4 text-[#e8e4db] font-medium border-b border-white/5 hover:bg-white/10 rounded-xl transition-colors">About us</Link>
          <Link href="/projects" onClick={() => setIsMobileMenuOpen(false)} className="px-6 py-4 text-[#e8e4db] font-medium border-b border-white/5 hover:bg-white/10 rounded-xl transition-colors">Projects</Link>
          <Link href="/services" onClick={() => setIsMobileMenuOpen(false)} className="px-6 py-4 text-[#e8e4db] font-medium border-b border-white/5 hover:bg-white/10 rounded-xl transition-colors">Services</Link>
          <Link href="/process" onClick={() => setIsMobileMenuOpen(false)} className="px-6 py-4 text-[#e8e4db] font-medium border-b border-white/5 hover:bg-white/10 rounded-xl transition-colors">Process</Link>
          <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="px-6 py-4 text-[#e8e4db] font-medium border-b border-white/5 hover:bg-white/10 rounded-xl transition-colors">Blog</Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="px-6 py-4 text-white font-bold hover:bg-white/10 rounded-xl transition-colors mt-2 flex items-center justify-between">
            Contact us <i className="fa-solid fa-arrow-right text-[11px]"></i>
          </Link>
        </nav>
      </div>
    </div>
  );
}
