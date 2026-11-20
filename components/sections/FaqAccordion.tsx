"use client";

import { useState } from "react";
import type { FaqItem } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";

/** One answer open at a time (the first one to start with); the open question gets a gold border */
export const FaqAccordion = ({ items }: { items: FaqItem[] }) => {
  const [open, setOpen] = useState(items[0]?.id ?? "");

  return (
    <ul className="grid gap-3 lg:gap-[0.6rem]">
      {items.map((item, index) => {
        const isOpen = open === item.id;
        return (
          <li
            key={item.id}
            data-reveal
            data-reveal-delay={index * 80}
            className={`overflow-hidden rounded-[0.47rem] border-[0.1rem] bg-[var(--color-white)] transition-[border-color,margin] duration-300 ${
              isOpen ? "border-[var(--color-gold-bright)] lg:mb-[0.28rem]" : "border-[var(--color-border)] hover:border-[var(--color-gold-line)]"
            }`}
          >
            <h3>
              <button
                type="button"
                id={`faq-question-${item.id}`}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${item.id}`}
                onClick={() => setOpen(isOpen ? "" : item.id)}
                className={`flex min-h-[3.75rem] w-full items-center justify-between gap-4 px-4 py-3 text-left font-heading text-[1.2rem] font-semibold leading-snug text-[var(--color-navy)] transition-colors duration-300 sm:px-5 sm:text-[1.4rem] lg:min-h-[3.5rem] lg:py-0 lg:pl-[1.78rem] lg:pr-[1.73rem] lg:text-[1.69rem] lg:leading-none ${
                  isOpen ? "bg-gradient-to-b from-[var(--color-bg-faq-open)] to-[var(--color-bg-form)]" : "hover:text-[var(--color-gold)]"
                }`}
              >
                {item.question}
                <Icon name={isOpen ? "LuMinus" : "LuPlus"} className="size-[1.6rem] shrink-0 text-[var(--color-gold)] lg:size-[1.75rem]" strokeWidth={2.2} />
              </button>
            </h3>
            <div
              id={`faq-answer-${item.id}`}
              role="region"
              aria-labelledby={`faq-question-${item.id}`}
              className={`grid transition-[grid-template-rows] duration-500 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="min-h-0 overflow-hidden">
                <p className="bg-[var(--color-bg-form)] px-4 pb-5 pt-3 font-sans text-[1rem] leading-[1.6] text-[var(--color-text-grey)] sm:px-5 sm:text-[1.05rem] lg:whitespace-pre-line lg:pb-[1.68rem] lg:pl-[1.83rem] lg:pr-[1.73rem] lg:pt-[0.8rem] lg:text-[1.266rem] lg:leading-[1.45rem]">
                  {item.answer}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
