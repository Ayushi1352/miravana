import type { Metadata } from "next";
import { EB_Garamond, Jost, Marcellus, Trirong } from "next/font/google";
import rawData from "@/data/templates.json";
import type { HotelTemplateData, RootVariables } from "@/types/templates.types";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import "./globals.css";

const jost = Jost({ subsets: ["latin"], weight: ["400", "500", "600"], fallback: ["Arial", "sans-serif"], variable: "--font-jost" });
const marcellus = Marcellus({ subsets: ["latin"], weight: ["400"], fallback: ["Georgia", "serif"], variable: "--font-marcellus" });
const garamond = EB_Garamond({ subsets: ["latin"], fallback: ["Georgia", "serif"], variable: "--font-garamond" });
const trirong = Trirong({ subsets: ["latin"], weight: ["400"], fallback: ["Georgia", "serif"], variable: "--font-trirong" });

const templateData: HotelTemplateData = rawData;
const sectionData = templateData.categories.Hotel.sections;
const commonData = templateData.common;
const headerData = sectionData.Header?.variants?.HotelHeader1;

const rootVariables: RootVariables = {
  "--font-primary": commonData.theme.fonts.primary,
  "--font-heading": commonData.theme.fonts.heading,
  "--font-display": commonData.theme.fonts.display,
  "--font-quote": commonData.theme.fonts.quote,
};

export const metadata: Metadata = {
  title: commonData.metadata.title,
  description: commonData.metadata.description,
  icons: {
    icon: commonData.metadata.icon,
    shortcut: commonData.metadata.icon,
    apple: commonData.metadata.icon,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={commonData.metadata.lang}
      style={rootVariables}
      data-scroll-behavior="smooth"
      // Root font size: 16px, and from 1024px up it follows the 1440px design (1rem = 1/90 of the screen, at most 16px),
      // so 1024px shows exactly the 1440px layout, only smaller. Every size on the page is in rem, so it all scales together.
      // Header and footer links scroll smoothly to their section on this one page. Everything clickable gets the pointer.
      className={`${jost.variable} ${marcellus.variable} ${garamond.variable} ${trirong.variable} h-full text-[16px] lg:text-[length:min(16px,calc(100vw/90))] scroll-smooth antialiased [&_:where(a[href],button:not(:disabled),select,summary,[role=button])]:cursor-pointer motion-reduce:scroll-auto motion-reduce:[&_*]:!duration-[0.01ms]`}
    >
      <body className="min-h-full bg-[var(--color-bg-backdrop)] font-sans text-[var(--color-text)] selection:bg-[var(--color-navy)] selection:text-[var(--color-white)]">
        {/*
          The whole site sits in one frame, at most 1920px wide and centred. Up to 1920px it fills the screen, so
          nothing changes; on wider screens or when the browser is zoomed out the page stays in the middle.
        */}
        <div className="mx-auto flex min-h-screen w-full max-w-[120rem] flex-col overflow-x-clip bg-[var(--color-bg-main)]">
          <Header data={headerData} company={commonData.company} />
          {children}
          <ScrollReveal />
          <Footer data={commonData.Footer} company={commonData.company} />
        </div>
      </body>
    </html>
  );
}
