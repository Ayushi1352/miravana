import Image from "next/image";
import type { AboutData } from "@/types/templates.types";
import { Eyebrow, sectionTitleSize } from "@/components/ui/SectionHeading";
import { sectionSpace } from "@/components/ui/sectionSpace";

/** Photo sizes from the design (left, middle, right); the middle one is the large one */
const photoClass = [
  "aspect-[444/303] lg:mt-[0.42rem] lg:w-[20.81rem]",
  "aspect-[736/531] max-lg:order-first sm:col-span-2 lg:col-span-1 lg:w-[34.5rem]",
  "aspect-[447/302] lg:mt-[0.47rem] lg:w-[20.95rem]",
];

/** Centred intro, then three photos with a short feature under the two side photos */
export const AboutSection = ({ data }: { data?: AboutData }) => {
  if (!data) return null;
  const [left, right] = data.features;

  const feature = (item: typeof left | undefined, className: string) =>
    item && (
      <div data-reveal className={className}>
        <span aria-hidden="true" className="block h-[0.19rem] w-[3.1rem] bg-[var(--color-gold-pale)]" />
        <h3 className="mt-4 font-display text-[1.3rem] uppercase leading-none text-[var(--color-navy-soft)] lg:mt-[1.06rem] lg:text-[1.52rem]">{item.title}</h3>
        <p className="mt-3 text-[1rem] leading-[1.55] text-[var(--color-text-soft)] lg:mt-[0.45rem] lg:whitespace-pre-line lg:text-[1.134rem] lg:leading-[1.52rem]">{item.text}</p>
      </div>
    );

  return (
    <section id={data.id} className={`scroll-mt-[4.5rem] lg:scroll-mt-[6rem] ${sectionSpace}`}>
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-[4.69rem]">
        <div data-reveal className="text-center">
          <Eyebrow text={data.label} tracking={0.17} textClass="text-[0.9rem] font-normal text-[var(--color-eyebrow-soft)] sm:text-[1.05rem] lg:text-[1.27rem]" lineClass="w-[2.5rem] lg:w-[3.05rem]" className="gap-[1rem] lg:gap-[1.27rem]" />
          <h2 className={`mt-4 font-display uppercase leading-[1.08] text-[var(--color-navy-soft)] sm:mt-5 lg:mt-[1.55rem] lg:leading-[1.02] ${sectionTitleSize}`}>
            {data.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mx-auto mt-4 max-w-[44rem] text-[1rem] leading-[1.65] text-[var(--color-text-soft)] sm:mt-5 sm:text-[1.1rem] lg:mt-[1.16rem] lg:max-w-none lg:whitespace-pre-line lg:text-[1.266rem] lg:leading-[1.83rem]">
            {data.description}
          </p>
        </div>

        <div className="mt-7 grid gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:mt-[1.65rem] lg:flex lg:items-start lg:justify-between">
          {data.images.map((image, index) => (
            <div key={image.id} className={index === 1 ? "contents lg:block" : "grid gap-5 sm:gap-6 lg:block"}>
              <div data-reveal data-reveal-delay={index * 100} className={`relative w-full overflow-hidden ${photoClass[index] ?? ""}`}>
                <Image src={image.src} alt={image.alt} fill quality={90} sizes={index === 1 ? "(min-width: 1024px) 552px, 92vw" : "(min-width: 1024px) 335px, (min-width: 640px) 46vw, 92vw"} className="object-cover" />
              </div>
              {index === 0 && feature(left, "lg:ml-[0.23rem] lg:mt-[2.3rem]")}
              {index === 2 && feature(right, "lg:ml-[0.38rem] lg:mt-[2.3rem]")}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
