"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { CompanyData, HeaderData } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";
import { sectionId, useActiveSection } from "@/components/ui/useActiveSection";

export const Header = ({ data, company }: { data?: HeaderData; company: CompanyData }) => {
  const [ids] = useState(() => data?.navLinks.map((link) => sectionId(link.url)) ?? []);
  const { active, scrolled } = useActiveSection(ids);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!data) return null;
  const phone = company.contactItems.find((item) => item.id === data.buttonContactId);

  /** The logo scrolls back to the top and drops any "#section" from the address bar, without reloading the page */
  const goHome = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setOpen(false);
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    window.scrollTo({ top: 0 });
    if (window.location.hash) history.pushState(null, "", window.location.pathname + window.location.search);
  };

  // at the top of the page the header is the design's tall bar; once the page scrolls it gets compact with a shadow
  const compact = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 mx-auto max-w-[120rem] bg-[var(--color-bg-header)] transition-shadow duration-300 ${
        compact ? "shadow-[0_0.5rem_1.75rem_-1rem_var(--color-shadow-card)]" : ""
      }`}
    >
      <div
        className={`mx-auto flex max-w-[90rem] items-center gap-4 px-4 transition-[height] duration-300 sm:px-6 lg:gap-0 lg:pl-[2.67rem] lg:pr-[1.45rem] ${
          compact ? "h-[4.5rem] lg:h-[6rem]" : "h-[4.5rem] sm:h-[5.5rem] lg:h-[10.41rem]"
        }`}
      >
        <Link href={data.logoUrl} onClick={goHome} aria-label={data.homeLabel} className={`shrink-0 transition-[margin] duration-300 ${compact ? "" : "lg:mt-[0.75rem]"}`}>
          <Image
            src={company.logo}
            alt={company.logoAlt}
            width={company.logoWidth}
            height={company.logoHeight}
            preload
            sizes="(min-width: 1024px) 231px, 120px"
            className={`h-auto transition-[width] duration-300 ${compact ? "w-[6.5rem] lg:w-[8.5rem]" : "w-[6.5rem] sm:w-[8rem] lg:w-[14.44rem]"}`}
          />
        </Link>

        <span aria-hidden="true" className={`ml-[2.25rem] hidden h-[2.25rem] w-[0.1rem] bg-[var(--color-divider-header)] lg:block ${compact ? "" : "lg:mt-[1.15rem]"}`} />

        <nav aria-label={data.mainNavLabel} className={`ml-[2.79rem] hidden items-center gap-[2.36rem] lg:flex ${compact ? "" : "lg:mt-[1.33rem]"}`}>
          {data.navLinks.map((link) => {
            const current = sectionId(link.url) === active;
            return (
              <a
                key={link.id}
                href={link.url}
                aria-current={current ? "location" : undefined}
                className={`relative whitespace-nowrap py-[0.6rem] font-sans text-[1.24rem] font-medium leading-none transition-colors after:absolute after:inset-x-0 after:-bottom-[0.38rem] after:h-[0.33rem] after:rounded-full after:bg-[var(--color-gold)] after:transition-transform after:duration-300 ${
                  current ? "text-[var(--color-gold)] after:scale-x-100" : "text-[var(--color-navy)] after:scale-x-0 hover:text-[var(--color-gold)]"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className={`ml-auto flex items-center gap-3 ${compact ? "" : "lg:mt-[1.39rem]"}`}>
          {phone && (
            <a
              href={phone.url}
              className="group inline-flex h-11 items-center gap-[0.6rem] rounded-full border-[0.12rem] border-[var(--color-gold-bright)] bg-[var(--color-navy-deep)] px-4 font-sans text-[0.95rem] font-medium text-[var(--color-white)] transition-colors duration-300 hover:bg-[var(--color-gold-bright)] max-sm:hidden lg:h-[3rem] lg:w-[12rem] lg:gap-[0.6rem] lg:px-0 lg:pl-[0.95rem] lg:text-[1rem]"
            >
              <Icon name={data.buttonIcon} className="size-[1.1rem] shrink-0 text-[var(--color-gold-bright)] transition-colors group-hover:text-[var(--color-white)] lg:size-[1.2rem]" />
              {phone.lines[0]}
            </a>
          )}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? data.closeMenuLabel : data.openMenuLabel}
            className="grid size-11 place-items-center rounded-full border border-[var(--color-gold-line)] text-[var(--color-navy)] transition-colors hover:bg-[var(--color-bg-tile)] lg:hidden"
          >
            <Icon name={open ? "LuX" : "LuMenu"} className="size-6" />
          </button>
        </div>
      </div>

      {/* phones and tablets: a card under the bar, only as tall as its links */}
      <nav
        id="mobile-menu"
        aria-label={data.mobileNavLabel}
        className={`absolute inset-x-4 top-full mt-2 grid max-h-[calc(100dvh-5.5rem)] overflow-hidden rounded-2xl bg-[var(--color-white)] shadow-[0_1.25rem_3.125rem_-1.25rem_var(--color-shadow-menu)] transition-[grid-template-rows,opacity] duration-500 sm:inset-x-6 lg:hidden ${
          open ? "grid-rows-[1fr] opacity-100" : "pointer-events-none invisible grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-y-auto">
          <ul className="flex flex-col px-5 py-4 sm:px-6">
            {data.navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.url}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between border-b border-[var(--color-border-light)] py-3.5 font-sans text-lg font-medium transition-colors hover:text-[var(--color-gold)] ${
                    sectionId(link.url) === active ? "text-[var(--color-gold)]" : "text-[var(--color-navy)]"
                  }`}
                >
                  {link.label}
                  <Icon name="LuChevronRight" className="size-4 text-[var(--color-gold)]" strokeWidth={2.2} />
                </a>
              </li>
            ))}
            {phone && (
              <li className="pt-5 sm:hidden">
                <a
                  href={phone.url}
                  onClick={() => setOpen(false)}
                  className="flex h-12 w-full items-center justify-center gap-[0.6rem] rounded-full border-2 border-[var(--color-gold-bright)] bg-[var(--color-navy-deep)] font-sans text-base font-medium text-[var(--color-white)]"
                >
                  <Icon name={data.buttonIcon} className="size-4 text-[var(--color-gold-bright)]" />
                  {phone.lines[0]}
                </a>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};
