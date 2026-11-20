import type { CompanyData, ContactData, ContactFormData } from "@/types/templates.types";
import { ContactForm } from "@/components/sections/ContactForm";
import { Icon } from "@/components/ui/Icon";
import { Eyebrow, SectionTitle } from "@/components/ui/SectionHeading";
import { sectionSpace } from "@/components/ui/sectionSpace";

type Props = {
  data?: ContactData;
  form?: ContactFormData;
  company: CompanyData;
};

/** Centred heading; contact details on the left and the message form in a cream card on the right */
export const ContactSection = ({ data, form, company }: Props) => {
  if (!data) return null;
  const contactItems = data.contactIds.flatMap((id) => company.contactItems.filter((item) => item.id === id));

  return (
    <section id={data.id} className={`scroll-mt-[4.5rem] lg:scroll-mt-[6rem] ${sectionSpace}`}>
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-[4.31rem] lg:pr-[4.13rem]">
        <div data-reveal className="text-center">
          <Eyebrow text={data.label} tracking={0.268} textClass="text-[0.95rem] font-medium text-[var(--color-navy)] sm:text-[1.1rem] lg:text-[1.54rem]" lineClass="w-[3rem] lg:w-[5.58rem]" className="gap-[1rem] lg:gap-[1.8rem]" />
          <SectionTitle titleTop={data.titleTop} titleAccent={data.titleAccent} className="mt-5 text-[length:min(3.2rem,calc((100vw-2rem)/6.5))] sm:text-[3.6rem] lg:mt-[1.24rem] lg:text-[4.67rem]" />
          <p className="mx-auto mt-5 max-w-[40rem] text-[1rem] leading-[1.6] text-[var(--color-text-dark)] sm:text-[1.1rem] lg:mt-[0.92rem] lg:max-w-none lg:text-[1.415rem] lg:leading-[1.92rem]">
            {data.descriptionLines.map((line) => (
              <span key={line} className="lg:block">
                {line}{" "}
              </span>
            ))}
          </p>
        </div>

        <div className="mt-10 grid gap-10 lg:mt-[3.09rem] lg:flex lg:items-start lg:justify-between lg:gap-0">
          <ul data-reveal className="mx-auto grid w-full max-w-[30rem] lg:mx-0 lg:mt-[0.75rem] lg:w-[25.92rem] lg:max-w-none">
            {contactItems.map((item, index) => {
              const external = item.url.startsWith("http");
              return (
                <li key={item.id} className={index > 0 ? "border-t-[0.14rem] border-[var(--color-border-light)] pt-[1rem]" : ""}>
                  <a
                    href={item.url}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="group flex items-start gap-5 pb-[1.125rem] lg:gap-[1.69rem]"
                  >
                    <span className="grid h-[4.2rem] w-[4.6rem] shrink-0 place-items-center rounded-[0.75rem] bg-[var(--color-bg-tile)] text-[var(--color-gold)] transition-colors duration-300 group-hover:bg-[var(--color-gold-bright)] group-hover:text-[var(--color-white)] lg:h-[4.6rem] lg:w-[5.06rem]">
                      <Icon name={item.icon} className="size-[2.6rem] lg:size-[3.05rem]" strokeWidth={1.2} />
                    </span>
                    <span className="min-w-0 pt-1 lg:pt-[0.07rem]">
                      <span className="block font-sans text-[1.05rem] font-semibold uppercase leading-none tracking-[0.1em] text-[var(--color-navy)] lg:text-[1.41rem]">{item.title}</span>
                      <span className="mt-2 block break-words font-sans text-[1.05rem] leading-[1.5] text-[var(--color-text-dark)] transition-colors group-hover:text-[var(--color-gold)] lg:mt-[0.61rem] lg:text-[1.475rem] lg:leading-[1.73rem]">
                        {item.lines.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div data-reveal className="rounded-[1rem] border-[0.14rem] border-[var(--color-border-form)] bg-[var(--color-bg-form)] px-4 py-6 sm:px-6 lg:w-[53.67rem] lg:rounded-[1.03rem] lg:pb-[1.64rem] lg:pl-[1.97rem] lg:pr-[2.06rem] lg:pt-[2.11rem]">
            <ContactForm data={form} />
          </div>
        </div>
      </div>
    </section>
  );
};
