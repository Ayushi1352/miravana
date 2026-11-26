import Image from "next/image";
import type { HeroData } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";
import { PalmShadowArt } from "@/components/ui/LineArt";
import { buttonArrow, buttonArrowBox, buttonClass, buttonText } from "@/components/ui/buttonStyles";

/** Plays once on load (CSS @starting-style), so the hero never waits for JavaScript */
const enter = "transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] starting:translate-y-6 starting:opacity-0";

/** The three title lines; the design draws each one at its own size */
const lineClass = [
  "lg:text-[4.48rem]",
  "text-[var(--color-gold)] lg:text-[4.04rem]",
  "lg:text-[4.76rem]",
];

/*
  From 1024px up every piece sits where the 1920px design has it (1 design pixel = 0.046875rem, measured from
  the top of the section below the header). Phones and tablets stack the text above the photos.
*/
export const HeroSection = ({ data }: { data?: HeroData }) => {
  if (!data) return null;

  return (
    <section id={data.id} className="relative isolate overflow-hidden bg-[var(--color-bg-hero)] pt-[4.5rem] sm:pt-[5.5rem] lg:pb-16 lg:pt-[10.41rem]">
      <PalmShadowArt className="pointer-events-none absolute left-0 top-[4.5rem] -z-10 h-auto w-[12rem] text-[var(--color-palm-shadow)] sm:top-[5.5rem] lg:top-[10.41rem] lg:w-[19.69rem]" />

      <div className="relative mx-auto max-w-[90rem] px-4 pb-10 pt-8 sm:px-6 sm:pb-14 sm:pt-12 lg:h-[36.66rem] lg:p-0">
        {/* text */}
        <div className={`relative text-center lg:static lg:text-left ${enter}`}>
          <p className="mx-auto flex w-fit items-center gap-[1.08rem] font-sans text-[0.8rem] uppercase leading-none tracking-[0.2em] text-[var(--color-label)] sm:text-[1rem] lg:absolute lg:left-[3.98rem] lg:top-[4.22rem] lg:mx-0 lg:text-[1.14rem] lg:tracking-[0.274em]">
            {data.label}
            <span aria-hidden="true" className="hidden h-[0.1rem] w-[4.55rem] bg-[var(--color-gold-line)] lg:block" />
          </p>
          {/* on phones the size follows the screen width so the longest line always fits on one line */}
          <h1 className="mt-4 font-display text-[length:min(3.3rem,calc((100vw-2rem)/9.4))] uppercase leading-[1.08] text-[var(--color-navy)] sm:mt-5 sm:text-[4rem] lg:mt-0 lg:leading-none">
            {data.titleLines.map((line, index) => (
              <span
                key={line}
                className={`flex items-center justify-center gap-[0.3em] whitespace-nowrap lg:absolute lg:left-[3.84rem] lg:justify-start ${lineClass[index] ?? ""} ${
                  ["lg:top-[6.72rem]", "lg:top-[12.15rem] lg:!left-[3.36rem] lg:gap-[0.98rem]", "lg:top-[17.28rem]"][index] ?? ""
                }`}
              >
                {index === 1 && (
                  <span className="relative inline-block h-[0.9em] w-[1.9em] shrink-0 overflow-hidden rounded-full lg:h-[4.55rem] lg:w-[10.41rem]">
                    <Image src={data.pillImage} alt={data.pillImageAlt} fill sizes="(min-width: 1024px) 167px, 25vw" className="object-cover" />
                  </span>
                )}
                {line}
              </span>
            ))}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[1rem] leading-[1.625] text-[var(--color-text)] sm:mt-6 sm:text-[1.125rem] lg:absolute lg:left-[3.98rem] lg:top-[23.06rem] lg:mx-0 lg:mt-0 lg:max-w-none lg:whitespace-pre-line lg:text-[1.373rem] lg:leading-[1.9rem]">
            {data.description}
          </p>
          <a
            href={data.buttonUrl}
            className={`${buttonClass} mx-auto mt-6 w-fit sm:mt-8 lg:absolute lg:left-[4.03rem] lg:top-[30.94rem] lg:mx-0 lg:mt-0 lg:h-[3.8rem] lg:w-[22.92rem]`}
          >
            <span className={`flex ${buttonText} px-4 text-[length:min(0.95rem,calc((100vw-8.5rem)/12.5))] min-[400px]:px-6 sm:text-[1.05rem] lg:w-[18.52rem] lg:px-0 lg:pl-[1.97rem] lg:text-[1.2rem]`}>
              {data.buttonText}
            </span>
            <span className={`${buttonArrowBox} lg:w-auto lg:flex-1`}>
              <Icon name="LuArrowUpRight" className={buttonArrow} strokeWidth={2} />
            </span>
          </a>
        </div>

        {/* photos: the resort photo with the room photo over its top-left corner */}
        <div className={`relative mx-auto mt-8 max-w-xl pl-[8%] pt-[14%] sm:mt-12 lg:static lg:mt-0 lg:max-w-none lg:p-0 ${enter} delay-150`}>
          <div className="relative aspect-[867/704] w-full border-[0.19rem] border-[var(--color-white)] shadow-[0_0.6rem_1.6rem_-0.8rem_var(--color-shadow-photo)] lg:absolute lg:left-[46.64rem] lg:top-[3.66rem] lg:h-[33rem] lg:w-[40.64rem]">
            <Image src={data.image} alt={data.imageAlt} fill preload quality={90} sizes="(min-width: 1024px) 650px, 92vw" className="object-cover" />
          </div>
          <div className="absolute left-0 top-0 aspect-[471/360] w-[54%] border-[0.19rem] border-[var(--color-white)] shadow-[0_0.6rem_1.6rem_-0.6rem_var(--color-shadow-photo)] lg:left-[42.8rem] lg:top-[2.06rem] lg:h-[16.88rem] lg:w-[22.08rem]">
            <Image src={data.secondImage} alt={data.secondImageAlt} fill quality={90} sizes="(min-width: 1024px) 354px, 50vw" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};
