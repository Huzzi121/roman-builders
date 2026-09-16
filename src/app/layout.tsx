import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

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
        <div 
          className="fixed inset-0 z-[-1] pointer-events-none bg-cover bg-center bg-no-repeat bg-fixed"
          style={{ backgroundImage: "url('/images/global-bg.png')" }}
        ></div>
        
        <Navbar />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
