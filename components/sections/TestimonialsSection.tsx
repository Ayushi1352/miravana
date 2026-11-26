import type { TestimonialsData } from "@/types/templates.types";
import { Eyebrow, SectionTitle, sectionTitleSize } from "@/components/ui/SectionHeading";
import { sectionSpace } from "@/components/ui/sectionSpace";
import { TestimonialSlider } from "@/components/sections/TestimonialSlider";

/** Centred heading over a full-width hairline, then the guest slider */
export const TestimonialsSection = ({ data }: { data?: TestimonialsData }) => {
  if (!data) return null;

  return (
    <section id={data.id} className={`scroll-mt-[4.5rem] lg:scroll-mt-[6rem] ${sectionSpace}`}>
      <div data-reveal className="px-4 text-center sm:px-6">
        <Eyebrow text={data.label} tracking={0.256} textClass="text-[0.95rem] font-medium text-[var(--color-navy)] sm:text-[1.1rem] lg:text-[1.67rem]" lineClass="w-[3rem] lg:w-[5.11rem]" className="gap-[1rem] lg:gap-[1.95rem]" />
        <SectionTitle titleTop={data.titleTop} titleAccent={data.titleAccent} className={`mt-4 sm:mt-5 ${sectionTitleSize} lg:mt-[1.24rem]`} />
      </div>
      <span aria-hidden="true" className="mt-7 block h-[0.14rem] w-full bg-[var(--color-border)] sm:mt-10 lg:mt-[2.48rem]" />
      <div className="mx-auto mt-7 max-w-[90rem] px-4 sm:mt-10 sm:px-6 lg:mt-0 lg:px-0">
        <TestimonialSlider data={data} />
      </div>
    </section>
  );
};
