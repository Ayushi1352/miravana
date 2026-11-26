import Image from "next/image";
import type { CompanyData, FooterData, LinkItem } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";
import { fill } from "@/components/ui/text";

/** Fills `{year}` in the copyright line; cached so the footer can still be prerendered. */
async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

const heading = "whitespace-nowrap font-display text-[1.35rem] leading-none text-[var(--color-white)] min-[400px]:text-[1.5rem] lg:text-[2.04rem]";
const underline = "mt-3 block h-[0.21rem] w-[3.75rem] bg-[var(--color-footer-gold)] lg:mt-[0.91rem]";

const LinkList = ({ title, links }: { title: string; links: LinkItem[] }) => (
  <nav aria-label={title}>
    <h2 className={heading}>{title}</h2>
    <span aria-hidden="true" className={underline} />
    <ul className="mt-3 lg:mt-[1.1rem]">
      {links.map((link) => (
        <li key={link.id}>
          <a href={link.url} className="group inline-flex h-10 items-center gap-[0.6rem] whitespace-nowrap font-sans text-[0.95rem] text-[var(--color-white)] transition-colors hover:text-[var(--color-footer-gold)] min-[400px]:text-[1rem] sm:gap-[0.75rem] lg:h-[2.44rem] lg:gap-[1.25rem] lg:text-[1.355rem]">
            <Icon name="LuChevronRight" className="ml-[0.1rem] size-[0.9rem] shrink-0 text-[var(--color-footer-gold)] lg:ml-[0.2rem] transition-transform group-hover:translate-x-0.5 lg:size-[1.1rem]" strokeWidth={2.6} />
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

// Logo; quick links; useful links; contact details; then the copyright line and social links.
export const Footer = async ({ data, company }: { data?: FooterData; company: CompanyData }) => {
  if (!data) return null;
  // the footer lists some of the company contact details (the same ones as the contact section), in its own order
  const contactItems = data.contactIds.flatMap((id) => company.contactItems.filter((item) => item.id === id));
  const copyright = fill(data.copyrightText, { year: await currentYear() });

  return (
    <footer className="bg-[var(--color-bg-footer)] text-[var(--color-white)]">
      <div className="relative mx-auto max-w-[90rem] px-4 sm:px-6 lg:h-[28.31rem] lg:px-0">
        {/* phones: two link lists side by side, contact below; tablets: the three lists in one row, spread evenly between the side margins */}
        <div className="grid grid-cols-2 items-start gap-x-4 gap-y-9 pb-10 pt-12 sm:grid-cols-[repeat(3,auto)] sm:justify-between sm:gap-x-6 lg:block lg:p-0">
          <Image
            src={company.logoLight}
            alt={company.logoAlt}
            width={company.logoWidth}
            height={company.logoHeight}
            sizes="(min-width: 1024px) 248px, 184px"
            className="col-span-2 h-auto w-[9.5rem] sm:col-span-3 sm:w-[11.5rem] lg:absolute lg:left-[4.41rem] lg:top-[7.2rem] lg:w-[15.5rem]"
          />
          <div className="lg:absolute lg:left-[31.64rem] lg:top-[4.64rem]">
            <LinkList title={data.quickLinksTitle} links={data.quickLinks} />
          </div>
          <div className="lg:absolute lg:left-[48.52rem] lg:top-[4.64rem]">
            <LinkList title={data.usefulLinksTitle} links={data.usefulLinks} />
          </div>

          <span aria-hidden="true" className="hidden w-[0.1rem] bg-[var(--color-footer-divider)] lg:absolute lg:left-[62.91rem] lg:top-[4.83rem] lg:block lg:h-[14.3rem]" />

          <div className="col-span-2 sm:col-span-1 lg:absolute lg:left-[66.47rem] lg:top-[4.64rem]">
            <h2 className={heading}>{data.contactTitle}</h2>
            <span aria-hidden="true" className={underline} />
            <ul className="mt-4 grid gap-3 sm:mt-[1.15rem] lg:mt-[1.3rem] lg:gap-[0.94rem]">
              {contactItems.map((item) => {
                const external = item.url.startsWith("http");
                return (
                  <li key={item.id}>
                    <a
                      href={item.url}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      aria-label={`${item.title}: ${item.lines.join(" ")}`}
                      className="group flex items-center gap-3 font-sans text-[1rem] leading-[1.45] text-[var(--color-white)] transition-colors hover:text-[var(--color-footer-gold)] sm:text-[0.9rem] md:text-[0.95rem] lg:gap-[1.17rem] lg:text-[1.21rem] lg:leading-[1.55rem]"
                    >
                      <span className="grid size-[2.5rem] shrink-0 place-items-center rounded-[0.47rem] lg:size-[2.81rem] border border-[var(--color-footer-tile-border)] bg-[var(--color-bg-footer-tile)] text-[var(--color-footer-gold)]">
                        <Icon name={item.footerIcon ?? item.icon} className={item.footerIcon ? "size-[1.45rem]" : "size-[1.7rem]"} strokeWidth={1.7} />
                      </span>
                      <span className="min-w-0 break-words">
                        {item.lines.map((line) => (
                          <span key={line} className="block lg:whitespace-nowrap">
                            {line}
                          </span>
                        ))}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="border-t-[0.19rem] border-[var(--color-footer-gold)] py-6 sm:flex sm:items-center sm:justify-between sm:gap-6 lg:absolute lg:left-[4.64rem] lg:right-[4.08rem] lg:top-[22.22rem] lg:flex lg:h-[5.31rem] lg:items-center lg:justify-between lg:py-0">
          <p className="text-center font-sans text-[1rem] text-[var(--color-white)] sm:text-left lg:text-[1.195rem]">{copyright}</p>
          <ul aria-label={data.socialLabel} className="mt-5 flex shrink-0 justify-center gap-[0.94rem] sm:mt-0">
            {data.socialLinks.map((social) => (
              <li key={social.id}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="grid size-[2.6rem] place-items-center rounded-full border-[0.1rem] border-[var(--color-footer-gold)] text-[var(--color-footer-gold)] transition-colors duration-300 hover:bg-[var(--color-footer-gold)] hover:text-[var(--color-bg-footer)] lg:size-[2.81rem]"
                >
                  <Icon name={social.icon} className="size-[1.2rem] lg:size-[1.25rem]" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};
