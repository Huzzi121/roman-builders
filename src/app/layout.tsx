import type { Metadata } from "next";
import { getImageProps } from "next/image";
import { Playfair_Display, Outfit, Great_Vibes } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import AdminLogoutWatcher from "@/components/AdminLogoutWatcher";
import FontAwesomeLoader from "@/components/FontAwesomeLoader";
import { getDynamicTeamCategories } from "@/lib/team-data";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif", display: "swap" });
const greatVibes = Great_Vibes({ weight: "400", subsets: ["latin"], variable: "--font-signature", display: "swap" });

export const metadata: Metadata = {
  title: "Roman Builders & Developers",
  description: "Your trusted partners in architecture, construction, and society management in Abbottabad, Hazara Division.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const teamCategories = await getDynamicTeamCategories();

  const commonBg = { alt: "", fill: true, sizes: "100vw", quality: 65 };
  const {
    props: { srcSet: desktopBgSrcSet },
  } = getImageProps({ ...commonBg, src: "/images/home-background.png" });
  const {
    props: { srcSet: mobileBgSrcSet, style: bgImgStyle, ...mobileBgRest },
  } = getImageProps({ ...commonBg, src: "/images/background for mobile view.png" });

  return (
    <html lang="en">
      <body className={`${outfit.variable} ${playfair.variable} ${greatVibes.variable} font-sans bg-[#e8e4db] text-slate-800 antialiased relative`}>
        <FontAwesomeLoader />
        {/* Global Background (Art Direction: downloads only mobile OR desktop image) */}
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
          <div className="w-full h-full md:blur-none blur-[4px] md:scale-100 scale-110 relative">
            <picture className="block w-full h-full relative">
              <source media="(min-width: 768px)" srcSet={desktopBgSrcSet} sizes="100vw" />
              <source media="(max-width: 767px)" srcSet={mobileBgSrcSet} sizes="100vw" />
              <img
                {...mobileBgRest}
                alt=""
                fetchPriority="low"
                style={bgImgStyle}
                className="w-full h-full object-cover object-center"
              />
            </picture>
            {/* Subtle white transparent layer on mobile for better text visibility */}
            <div className="md:hidden absolute inset-0 bg-white/25"></div>
          </div>
        </div>
        <AdminLogoutWatcher />
        <Navbar teamCategories={teamCategories} />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
