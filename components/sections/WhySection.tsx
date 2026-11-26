import Image from "next/image";
import type { WhyData } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";
import { Eyebrow, sectionTitleSize } from "@/components/ui/SectionHeading";
import { sectionSpace } from "@/components/ui/sectionSpace";

const line = "absolute bg-[var(--color-gold-line)]";

/** Photo in a white mat over a navy block, with thin gold lines around it (positions from the design, from 1024px up) */
const FramedPhoto = ({ data }: { data: WhyData }) => (
  <div data-reveal className="relative mx-auto aspect-[707/695] w-full max-w-[34rem] lg:mx-0 lg:aspect-auto lg:h-[32.58rem] lg:w-[33.14rem] lg:max-w-none">
    <span aria-hidden="true" className="absolute left-0 top-0 h-[39.6%] w-[36.6%] bg-[var(--color-navy-deep)]" />
    <span aria-hidden="true" className={`${line} left-[7.07%] top-[2.88%] h-[0.1rem] w-[76.5%]`} />
    <span aria-hidden="true" className={`${line} left-[83.45%] top-[2.88%] h-[2.3%] w-[0.1rem]`} />
    <span aria-hidden="true" className={`${line} left-[7.07%] top-[2.88%] h-[85.2%] w-[0.1rem]`} />
    <span aria-hidden="true" className={`${line} left-[7.07%] top-[88.05%] h-[0.1rem] w-[1.85%]`} />
    <span aria-hidden="true" className={`${line} left-[97.3%] top-[24.9%] h-[0.1rem] w-[2.7%]`} />
    <span aria-hidden="true" className={`${line} right-0 top-[24.9%] bottom-0 w-[0.1rem]`} />
    <span aria-hidden="true" className={`${line} bottom-0 left-[31.54%] right-0 h-[0.1rem]`} />
    <div className="absolute bottom-[2.88%] left-[8.9%] right-[2.83%] top-[4.89%] border-[0.375rem] border-[var(--color-white)] bg-[var(--color-white)]">
      <div className="relative size-full">
        <Image src={data.image} alt={data.imageAlt} fill quality={90} sizes="(min-width: 1024px) 456px, 88vw" className="object-cover" />
      </div>
    </div>
  </div>
);

/** Framed photo on the left; title, text and eight reasons in a 4 × 2 grid on the right */
export const WhySection = ({ data }: { data?: WhyData }) => {
  if (!data) return null;

  return (
    <section id={data.id} className={`scroll-mt-[4.5rem] lg:scroll-mt-[6rem] ${sectionSpace}`}>
      <div className="mx-auto grid max-w-[90rem] gap-8 px-4 sm:gap-10 sm:px-6 lg:grid-cols-[33.14rem_1fr] lg:items-center lg:gap-[3rem] lg:pl-[2.5rem] lg:pr-[3rem]">
        <FramedPhoto data={data} />

        {/* phones and tablets: heading first, then the photo, then the reasons (from 1024px up the photo sits on the left) */}
        <div className="contents lg:block">
          <div data-reveal className="text-center max-lg:order-first lg:text-left">
            <Eyebrow text={data.label} tracking={0.188} textClass="text-[0.95rem] font-semibold text-[var(--color-navy)] sm:text-[1.1rem] lg:text-[1.54rem]" lineClass="w-[3rem] lg:w-[6.05rem]" className="gap-[1rem] lg:w-fit lg:gap-[1.7rem]" />
            <h2 className={`mt-4 font-heading font-semibold leading-[1.08] text-[var(--color-navy)] sm:mt-5 lg:mt-[0.8rem] lg:whitespace-nowrap lg:leading-none ${sectionTitleSize}`}>
              {data.titleTop} <span className="text-[var(--color-gold)]">{data.titleAccent}</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[40rem] text-[1rem] leading-[1.6] text-[var(--color-text-grey)] sm:mt-5 sm:text-[1.1rem] lg:ml-0 lg:mt-[0.8rem] lg:max-w-none lg:whitespace-pre-line lg:text-[1.38rem] lg:leading-[1.83rem]">
              {data.description}
            </p>
          </div>

          <ul className="mt-6 grid grid-cols-2 gap-y-6 sm:mt-10 sm:grid-cols-4 sm:gap-y-8 lg:mt-[2rem] lg:w-full lg:gap-y-[2.75rem]">
            {data.features.map((item, index) => (
              <li
                key={item.id}
                data-reveal
                data-reveal-delay={(index % 4) * 80}
                className="group relative flex flex-col items-center text-center before:absolute before:left-0 before:top-[0.56rem] before:h-[6.28rem] before:w-[0.1rem] before:bg-[var(--color-border-light)] first:before:hidden [&:nth-child(2n+1)]:max-sm:before:hidden sm:[&:nth-child(4n+1)]:before:hidden"
              >
                <span className="grid h-[3.75rem] w-[4.78rem] place-items-center rounded-[0.7rem] bg-[var(--color-bg-tile)] text-[var(--color-gold)] transition-colors duration-300 group-hover:bg-[var(--color-gold-bright)] group-hover:text-[var(--color-white)]">
                  <Icon name={item.icon} className="size-[3.35rem]" strokeWidth={1.15} />
                </span>
                <span className="mt-[0.47rem] font-sans text-[1.02rem] font-medium leading-[1.3] text-[var(--color-navy)] sm:text-[1.1rem] lg:text-[1.22rem] lg:leading-[1.31rem]">
                  {item.lines.map((text) => (
                    <span key={text} className="block">
                      {text}
                    </span>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
