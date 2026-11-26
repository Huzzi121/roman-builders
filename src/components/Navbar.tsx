"use client";
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { STATIC_TEAM_CATEGORIES, TeamCategoryItem } from '@/lib/team-data';

interface NavbarProps {
  teamCategories?: TeamCategoryItem[];
}

export default function Navbar({ teamCategories }: NavbarProps) {
  const categories = teamCategories && teamCategories.length > 0 ? teamCategories : STATIC_TEAM_CATEGORIES;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTeamMenuOpen, setIsTeamMenuOpen] = useState(false);
  const [isMobileTeamOpen, setIsMobileTeamOpen] = useState(false);
  const pathname = usePathname();
  const isWhiteLogo = pathname?.startsWith('/about') || pathname?.startsWith('/services');

  if (pathname?.startsWith('/admin')) {
    return (
      <div className="fixed top-0 left-0 w-full z-50 px-4 sm:px-8 pt-4 pointer-events-none">
        <div className="pointer-events-auto flex">
          <Link href="/" className="inline-flex items-center gap-2 bg-[#3d4435]/80 backdrop-blur-md text-[#e8e4db] border border-white/10 px-5 py-2.5 rounded-full text-[13px] font-medium hover:bg-[#3d4435] transition-all shadow-lg">
            <i className="fa-solid fa-arrow-left text-[11px]"></i>
            <span>Go back to home</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Brand Logo: Absolute positioned so it stays at the top of the page and scrolls naturally with the page */}
      <div className="absolute top-0 left-0 w-full z-40 px-4 sm:px-6 lg:px-8 pt-2 sm:pt-2.5 pointer-events-none">
        <div className="w-full max-w-[96rem] mx-auto flex items-center justify-between relative min-h-[50px] sm:min-h-[54px]">
          {/* Top-Left: Brand Logo (Aligned vertically to the exact same area as navbar) */}
          <div className="pointer-events-auto shrink-0 z-10 -mt-1 sm:-mt-1.5">
            <Link
              href="/"
              className="flex items-center transition-all hover:scale-105 active:scale-95 focus:outline-none -translate-y-0.5 sm:-translate-y-1"
              data-purpose="brand-logo"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <img
                src={isWhiteLogo ? "/logo-white.png" : "/logo.png"}
                alt="Roman Builders & Developers"
                className="h-10 sm:h-11 md:h-13 lg:h-15 w-auto object-contain drop-shadow-sm"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Fixed Navigation Bar & Mobile Menu Toggle */}
      <div className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 lg:px-8 pt-2 sm:pt-2.5 pointer-events-none">
        <div className="w-full max-w-[96rem] mx-auto flex items-center justify-between relative min-h-[50px] sm:min-h-[54px]">
          {/* Left Spacer matching logo area */}
          <div className="shrink-0 pointer-events-none w-10 sm:w-11 md:w-13 lg:w-15"></div>

          {/* Center: Complete Single-Line Navigation Bar with all buttons */}
          <header className="pointer-events-auto hidden md:flex items-center justify-center bg-[#3d4435]/85 backdrop-blur-md rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.15)] border border-white/10 px-3 lg:px-4 py-2 transition-all md:absolute md:left-1/2 md:-translate-x-1/2 md:top-1/2 md:-translate-y-1/2 z-0">
          <nav className="flex items-center flex-nowrap whitespace-nowrap gap-1.5 lg:gap-2.5 text-[15px] lg:text-[16px] font-medium text-[#e8e4db]" data-purpose="primary-navigation">
            <Link
              href="/"
              className={`px-5 lg:px-6 py-2.5 rounded-full transition-all whitespace-nowrap ${
                pathname === '/'
                  ? 'bg-white/20 text-white font-semibold shadow-sm'
                  : 'hover:bg-white/10 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`px-5 lg:px-6 py-2.5 rounded-full transition-all whitespace-nowrap ${
                pathname === '/about'
                  ? 'bg-white/20 text-white font-semibold shadow-sm'
                  : 'hover:bg-white/10 hover:text-white'
              }`}
            >
              About us
            </Link>
            <Link
              href="/projects"
              className={`px-5 lg:px-6 py-2.5 rounded-full transition-all whitespace-nowrap ${
                pathname?.startsWith('/projects')
                  ? 'bg-white/20 text-white font-semibold shadow-sm'
                  : 'hover:bg-white/10 hover:text-white'
              }`}
            >
              Projects
            </Link>
            <Link
              href="/services"
              className={`px-5 lg:px-6 py-2.5 rounded-full transition-all whitespace-nowrap ${
                pathname === '/services'
                  ? 'bg-white/20 text-white font-semibold shadow-sm'
                  : 'hover:bg-white/10 hover:text-white'
              }`}
            >
              Services
            </Link>

            {/* Team Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setIsTeamMenuOpen(true)}
              onMouseLeave={() => setIsTeamMenuOpen(false)}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setIsTeamMenuOpen((prev) => !prev);
                }}
                className={`px-5 lg:px-6 py-2.5 rounded-full transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer focus:outline-none ${
                  pathname?.startsWith('/team')
                    ? 'bg-white/20 text-white font-semibold shadow-sm'
                    : 'hover:bg-white/10 hover:text-white'
                }`}
                aria-haspopup="true"
                aria-expanded={isTeamMenuOpen}
              >
                <span>Team</span>
                <i className="fa-solid fa-chevron-down text-[10px] opacity-70 group-hover:rotate-180 transition-transform duration-200"></i>
              </button>

              {/* Invisible hover bridge to prevent premature closing */}
              <div className="absolute -bottom-2 left-0 right-0 h-3 pointer-events-auto"></div>

              {/* Dropdown Menu */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 pointer-events-auto transition-all duration-200 ${
                  isTeamMenuOpen
                    ? 'opacity-100 visible translate-y-0'
                    : 'opacity-0 invisible -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0'
                }`}
              >
                <div className="bg-[#3d4435]/95 backdrop-blur-xl border border-white/15 rounded-2xl shadow-2xl p-2 min-w-[260px] flex flex-col gap-1">
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/team?category=${cat.slug}`}
                      onClick={() => setIsTeamMenuOpen(false)}
                      className="px-4 py-2.5 rounded-xl hover:bg-white/15 text-[#e8e4db] hover:text-white text-[13.5px] font-medium transition-all text-left flex items-center gap-2.5"
                    >
                      <i className={`fa-solid ${cat.icon || 'fa-users'} text-xs text-[#dfd2ba]`}></i>
                      <span>{cat.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              className={`ml-1 px-6 lg:px-7 py-2.5 rounded-full transition-all whitespace-nowrap flex items-center gap-2 ${
                pathname === '/contact'
                  ? 'bg-white text-[#161f18] font-semibold shadow-md'
                  : 'bg-[#e8e4db] text-[#161f18] hover:bg-white hover:shadow-md'
              }`}
            >
              <span>Contact us</span>
              <i className="fa-solid fa-arrow-right text-[11px]"></i>
            </Link>
          </nav>
        </header>

        {/* Mobile Menu Toggle Button */}
        <div className="pointer-events-auto md:hidden flex items-center shrink-0 z-10" data-purpose="header-actions">
          <button 
            className="bg-[#3d4435]/85 backdrop-blur-md text-[#e8e4db] p-2 focus:outline-none hover:bg-[#3d4435] rounded-full transition-colors flex items-center justify-center w-11 h-11 shadow-lg border border-white/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`pointer-events-auto md:hidden absolute top-[calc(100%+8px)] left-4 right-4 bg-[#3d4435]/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 transition-all duration-300 origin-top overflow-hidden ${isMobileMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'}`}>
        <nav className="flex flex-col py-4 px-2">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="px-6 py-4 text-[#e8e4db] font-medium border-b border-white/5 hover:bg-white/10 rounded-xl transition-colors">Home</Link>
          <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="px-6 py-4 text-[#e8e4db] font-medium border-b border-white/5 hover:bg-white/10 rounded-xl transition-colors">About us</Link>
          <Link href="/projects" onClick={() => setIsMobileMenuOpen(false)} className="px-6 py-4 text-[#e8e4db] font-medium border-b border-white/5 hover:bg-white/10 rounded-xl transition-colors">Projects</Link>
          <Link href="/services" onClick={() => setIsMobileMenuOpen(false)} className="px-6 py-4 text-[#e8e4db] font-medium border-b border-white/5 hover:bg-white/10 rounded-xl transition-colors">Services</Link>
          
          {/* Team Mobile Menu Section with Expandable Categories */}
          <div className="border-b border-white/5 py-1">
            <button
              type="button"
              onClick={() => setIsMobileTeamOpen(!isMobileTeamOpen)}
              className="w-full flex items-center justify-between px-6 py-3 text-[#e8e4db] font-medium hover:text-white focus:outline-none cursor-pointer"
            >
              <span>Team</span>
              <i className={`fa-solid fa-chevron-down text-xs transition-transform duration-200 ${isMobileTeamOpen ? 'rotate-180' : ''}`}></i>
            </button>
            {isMobileTeamOpen && (
              <div className="flex flex-col pl-10 pr-4 pb-3 space-y-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/team?category=${cat.slug}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-xs text-[#dfd2ba] hover:text-white py-1.5 flex items-center gap-2"
                  >
                    <i className={`fa-solid ${cat.icon || 'fa-users'} text-[10px]`}></i>
                    <span>{cat.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="px-6 py-4 text-white font-bold hover:bg-white/10 rounded-xl transition-colors mt-2 flex items-center justify-between">
            Contact us <i className="fa-solid fa-arrow-right text-[11px]"></i>
          </Link>
        </nav>
      </div>
    </div>
    </>
  );
}
