"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { TestimonialsData } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";
import { fill } from "@/components/ui/text";

const AUTOPLAY_MS = 7000;
const line = "absolute bg-[var(--color-gold-line)]";
/** fades the new photo and quote in each time the slide changes */
const swap = "transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] starting:opacity-0";

/** The big serif quotation mark of the design */
const QuoteMark = ({ className }: { className: string }) => (
  <svg aria-hidden="true" viewBox="0 0 78 61" fill="currentColor" className={className}>
    {[0, 41].map((x) => (
      <path key={x} d={`M${x + 34} 2C${x + 14} 10 ${x + 1} 26 ${x + 1} 44A16 16 0 1 0 ${x + 12} 29.5C${x + 15} 19 ${x + 23} 11.5 ${x + 35} 7Z`} />
    ))}
  </svg>
);

/** One guest at a time: photo in its frame on the left, the quote on the right; moves on by itself */
export const TestimonialSlider = ({ data }: { data: TestimonialsData }) => {
  const { items } = data;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = items.length;
  const item = items[index];
  const go = (step: number) => setIndex((current) => (current + step + count) % count);

  useEffect(() => {
    if (paused || count < 2) return;
    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % count), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused, count]);

  return (
    <div
      // a mouse over the slider pauses it; on phones and tablets a tap does not stop the autoplay
      onPointerEnter={(event) => event.pointerType === "mouse" && setPaused(true)}
      onPointerLeave={(event) => event.pointerType === "mouse" && setPaused(false)}
      className="relative grid gap-10 lg:block lg:h-[27.7rem]"
    >
      {/* photo over a navy block with thin gold lines (positions from the design) */}
      <div data-reveal className="relative mx-auto aspect-[597/552] w-full max-w-[30rem] lg:absolute lg:left-[2.16rem] lg:top-[1.83rem] lg:w-[27.98rem] lg:max-w-none">
        <span aria-hidden="true" className="absolute left-0 top-0 h-[43.3%] w-[35%] bg-[var(--color-navy-deep)]" />
        <span aria-hidden="true" className={`${line} left-[1.84%] top-[1.09%] h-[0.1rem] w-[90.3%]`} />
        <span aria-hidden="true" className={`${line} left-[91.96%] top-[1.09%] h-[3.26%] w-[0.1rem]`} />
        <span aria-hidden="true" className={`${line} left-[1.84%] top-[1.09%] h-[87%] w-[0.1rem]`} />
        <span aria-hidden="true" className={`${line} left-[1.84%] top-[88.04%] h-[0.1rem] w-[2.7%]`} />
        <span aria-hidden="true" className={`${line} bottom-0 left-[32.3%] right-0 h-[0.1rem]`} />
        <span aria-hidden="true" className={`${line} bottom-0 right-0 top-[96.4%] w-[0.1rem]`} />
        <div className="absolute bottom-[2.17%] left-[3.18%] right-[0.84%] top-[3.08%] border-[0.375rem] border-[var(--color-white)] bg-[var(--color-white)]">
          <div key={item.id} className={`relative size-full ${swap}`}>
            <Image src={item.image} alt={item.imageAlt} fill quality={90} sizes="(min-width: 1024px) 418px, 90vw" className="object-cover object-top" />
          </div>
        </div>
      </div>

      {/* the line between the photo and the quote */}
      <span aria-hidden="true" className="absolute left-[32.16rem] top-0 hidden h-full w-[0.14rem] bg-[var(--color-border)] lg:block" />

      <div className="relative text-center lg:static lg:text-left">
        <QuoteMark className="mx-auto h-[2.4rem] w-auto text-[var(--color-gold-line)] lg:absolute lg:left-[35.3rem] lg:top-[2.39rem] lg:mx-0 lg:h-[3rem]" />
        <div aria-live="polite">
          <blockquote key={item.id} className={swap}>
            <p className="mx-auto mt-5 max-w-[40rem] font-quote text-[1.3rem] leading-[1.45] text-[var(--color-navy)] sm:text-[1.55rem] lg:absolute lg:left-[36.05rem] lg:top-[6.44rem] lg:mt-0 lg:w-[53rem] lg:max-w-none lg:whitespace-pre-line lg:text-[2.1rem] lg:leading-[2.6rem]">
              {item.quote}
            </p>
            <span aria-hidden="true" className="mx-auto mt-6 block h-[0.14rem] w-24 bg-[var(--color-gold-pale)] lg:absolute lg:left-[36.05rem] lg:top-[16.55rem] lg:mt-0 lg:w-[51.33rem]" />
            <footer>
              <cite className="mt-6 block font-display text-[1.7rem] not-italic leading-none text-[var(--color-navy)] lg:absolute lg:left-[36.19rem] lg:top-[18.41rem] lg:mt-0 lg:text-[2.35rem]">{item.name}</cite>
              <span className="mt-2 block font-sans text-[1.05rem] leading-none text-[var(--color-text-light)] lg:absolute lg:left-[36.14rem] lg:top-[21.42rem] lg:mt-0 lg:text-[1.43rem]">{item.role}</span>
              <span
                role="img"
                aria-label={fill(data.ratingLabel, { stars: item.stars })}
                className="mt-4 flex justify-center gap-[0.52rem] text-[var(--color-star)] lg:absolute lg:left-[36.14rem] lg:top-[24.02rem] lg:mt-0"
              >
                {Array.from({ length: item.stars }, (_, n) => (
                  <Icon key={n} name="FaStar" className="size-[1.2rem] lg:size-[1.5rem]" />
                ))}
              </span>
            </footer>
          </blockquote>
        </div>

        <div className="mt-8 flex justify-center gap-[1.3rem] lg:mt-0">
          <button
            type="button"
            aria-label={data.previousLabel}
            onClick={() => go(-1)}
            className="grid size-14 place-items-center rounded-full border-[0.07rem] border-[var(--color-border)] bg-[var(--color-white)] text-[var(--color-navy)] transition-colors duration-300 hover:border-[var(--color-navy)] hover:bg-[var(--color-navy)] hover:text-[var(--color-white)] lg:absolute lg:left-[78.61rem] lg:top-[21.94rem] lg:size-[3.75rem]"
          >
            <Icon name="LuArrowLeft" className="size-6 lg:size-[1.6rem]" strokeWidth={1.6} />
          </button>
          <button
            type="button"
            aria-label={data.nextLabel}
            onClick={() => go(1)}
            className="grid size-14 place-items-center rounded-full bg-[var(--color-gold-bright)] text-[var(--color-white)] transition-colors duration-300 hover:bg-[var(--color-navy)] lg:absolute lg:left-[83.58rem] lg:top-[21.94rem] lg:size-[3.75rem]"
          >
            <Icon name="LuArrowRight" className="size-6 lg:size-[1.6rem]" strokeWidth={1.6} />
          </button>
        </div>
      </div>
    </div>
  );
};
