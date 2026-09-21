import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import AdminLogoutWatcher from "@/components/AdminLogoutWatcher";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "Roman Builders & Developers",
  description: "Your trusted partners in architecture, construction, and society management in Abbottabad, Hazara Division.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet" />
      </head>
      <body className={`${outfit.variable} ${playfair.variable} font-sans bg-[#e8e4db] text-slate-800 antialiased relative`}>
        {/* Global Background */}
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
          {/* Desktop Global Background */}
          <div 
            className="hidden md:block w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url('/images/home-background.png')" }}
          ></div>
          {/* Mobile Global Background */}
          <div 
            className="md:hidden w-full h-full bg-cover bg-center blur-[4px] scale-110 relative"
            style={{ backgroundImage: "url('/images/background for mobile view.png')" }}
          >
            {/* Subtle white transparent layer for better text visibility */}
            <div className="absolute inset-0 bg-white/25"></div>
          </div>
        </div>
        <AdminLogoutWatcher />
        <Navbar />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
