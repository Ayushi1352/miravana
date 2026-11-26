import type { FaqData } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";
import { PalmBeachArt } from "@/components/ui/LineArt";
import { Eyebrow, SectionTitle, sectionTitleSize } from "@/components/ui/SectionHeading";
import { sectionSpace } from "@/components/ui/sectionSpace";
import { FaqAccordion } from "@/components/sections/FaqAccordion";

/** Centred heading; a short "Have Questions?" note on the left and the question list on the right */
export const FaqSection = ({ data }: { data?: FaqData }) => {
  if (!data) return null;

  return (
    <section id={data.id} className={`scroll-mt-[4.5rem] lg:scroll-mt-[6rem] ${sectionSpace}`}>
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:pl-[3.98rem] lg:pr-[3.8rem]">
        <div data-reveal className="text-center">
          <Eyebrow text={data.label} tracking={0.376} textClass="text-[0.95rem] font-medium text-[var(--color-navy)] sm:text-[1.1rem] lg:text-[1.61rem]" lineClass="w-[3rem] lg:w-[5.58rem]" className="gap-[1rem] lg:gap-[1.97rem]" />
          <SectionTitle titleTop={data.titleTop} titleAccent={data.titleAccent} className={`mt-4 sm:mt-5 ${sectionTitleSize} lg:mt-[0.98rem]`} />
          <p className="mx-auto mt-3.5 max-w-[40rem] text-[1rem] leading-[1.6] text-[var(--color-text-grey)] sm:mt-4 sm:text-[1.1rem] lg:mt-[1.2rem] lg:max-w-none lg:text-[1.364rem] lg:leading-none">{data.description}</p>
        </div>

        <div className="mt-7 grid gap-7 sm:mt-10 sm:gap-10 lg:mt-[2.54rem] lg:flex lg:items-start lg:gap-0">
          <div data-reveal className="text-center lg:-mt-[0.19rem] lg:w-[19.97rem] lg:shrink-0 lg:text-left">
            <span className="mx-auto grid h-[5.5rem] w-[6.8rem] place-items-center rounded-[1rem] bg-[var(--color-bg-tile-light)] text-[var(--color-gold)] lg:mx-0 lg:h-[6.33rem] lg:w-[7.88rem]">
              <Icon name={data.helpIcon} className="size-[4.6rem] lg:size-[5.9rem]" strokeWidth={1.1} />
            </span>
            <h3 className="mt-5 font-heading text-[2.4rem] font-semibold leading-[1.05] text-[var(--color-navy)] lg:mt-[0.7rem] lg:w-min lg:text-[3.26rem] lg:leading-[2.69rem]">{data.helpTitle}</h3>
            <span aria-hidden="true" className="mx-auto mt-5 block h-[0.28rem] w-[4.22rem] bg-[var(--color-gold)] lg:mx-0 lg:mt-[1.36rem]" />
            <p className="mx-auto mt-4 max-w-[28rem] text-[1rem] leading-[1.6] text-[var(--color-text-grey)] sm:text-[1.1rem] lg:mx-0 lg:mt-[0.8rem] lg:max-w-none lg:whitespace-pre-line lg:text-[1.32rem] lg:leading-[1.5rem]">
              {data.helpText}
            </p>
            <PalmBeachArt className="pointer-events-none mx-auto mt-6 hidden h-auto w-[21.1rem] text-[var(--color-palm-sand)] lg:-ml-[1.17rem] lg:mt-[1.22rem] lg:block" />
          </div>

          <span aria-hidden="true" className="hidden h-[26.25rem] w-[0.14rem] shrink-0 bg-[var(--color-border-light)] lg:block" />

          <div className="lg:ml-[3.05rem] lg:flex-1">
            <FaqAccordion items={data.items} />
          </div>
        </div>
      </div>
    </section>
  );
};
