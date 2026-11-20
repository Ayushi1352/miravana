import rawData from "@/data/templates.json";
import type { HotelTemplateData } from "@/types/templates.types";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { RoomsSection } from "@/components/sections/RoomsSection";
import { WhySection } from "@/components/sections/WhySection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FaqSection } from "@/components/sections/FaqSection";

const templateData: HotelTemplateData = rawData;
const sectionData = templateData.categories.Hotel.sections;
const commonData = templateData.common;

/*
  One landing page built from the Miravana design.
  Each section's id (templates.json) matches the header and footer links ("#about" → id="about").
*/
export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection data={sectionData.Hero?.variants?.HotelHero1} />
      <AboutSection data={sectionData.About?.variants?.HotelAbout1} />
      <RoomsSection data={sectionData.Rooms?.variants?.HotelRooms1} />
      <WhySection data={sectionData.Why?.variants?.HotelWhy1} />
      <TestimonialsSection data={sectionData.Testimonials?.variants?.HotelTestimonials1} />
      <ContactSection data={sectionData.Contact?.variants?.HotelContact1} form={sectionData.ContactForm?.variants?.HotelContactForm1} company={commonData.company} />
      <FaqSection data={sectionData.Faq?.variants?.HotelFaq1} />
    </main>
  );
}
