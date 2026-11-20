import Image from "next/image";
import type { RoomCard, RoomsData } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";
import { Eyebrow, SectionTitle } from "@/components/ui/SectionHeading";
import { sectionSpace } from "@/components/ui/sectionSpace";

type CardProps = { room: RoomCard; locationIcon: string; badgeText: string; index: number };

/** Width of each card and its gap to the one before, from the design (the cards differ by a few pixels) */
const cardSize = ["lg:w-[16.25rem]", "lg:ml-[1rem] lg:w-[16.25rem]", "lg:ml-[0.81rem] lg:w-[18.56rem]", "lg:ml-[0.88rem] lg:w-[16.31rem]", "lg:ml-[1rem] lg:w-[16.44rem]"];

/** Text colour of the card body: navy, white while the card is hovered */
const cardText = "text-[var(--color-navy)] transition-colors duration-300 group-hover:text-[var(--color-white)]";

/** One stay: photo, guests / bedrooms / bathrooms, name and wing. Any card turns navy with a gold border on hover; the featured one keeps its ribbon. */
const Card = ({ room, locationIcon, badgeText, index }: CardProps) => {
  const { featured } = room;
  return (
    <article
      data-reveal
      data-reveal-delay={index * 80}
      className={`group relative flex flex-col overflow-hidden rounded-[0.6rem] border-[0.14rem] border-transparent bg-[var(--color-white)] shadow-[0_0.3rem_1rem_-0.2rem_var(--color-shadow-card)] transition-[transform,background-color,border-color] duration-300 hover:-translate-y-1 hover:border-[var(--color-gold-bright)] hover:bg-[var(--color-navy-deep)] lg:shrink-0 ${cardSize[index] ?? ""} ${featured ? "" : "lg:mt-[1.13rem]"}`}
    >
      <div className={`relative aspect-[346/313] w-full overflow-hidden lg:aspect-auto ${featured ? "lg:h-[15.66rem]" : "lg:h-[14.67rem]"}`}>
        <Image src={room.image} alt={room.imageAlt} fill quality={90} sizes="(min-width: 1024px) 300px, (min-width: 640px) 46vw, 92vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
        {featured && (
          <span className="absolute left-[0.98rem] top-[0.94rem] font-sans text-[0.94rem] font-medium leading-none text-[var(--color-white)]">
            <span className="flex h-[2.25rem] items-center bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-bright)] pl-[0.75rem] pr-[1.6rem] [clip-path:polygon(0_0,100%_0,calc(100%-0.85rem)_100%,0_100%)]">
              {badgeText}
            </span>
            <span aria-hidden="true" className="absolute left-0 top-full h-[0.45rem] w-[0.5rem] bg-[var(--color-gold)] brightness-75 [clip-path:polygon(0_0,100%_0,100%_100%)]" />
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-4 pb-6 pt-5 lg:px-0 lg:pb-[1.85rem] lg:pt-[1.43rem]">
        <ul className={`flex flex-wrap items-center justify-center gap-y-1 font-sans text-[0.8rem] font-medium leading-none lg:flex-nowrap lg:text-[0.73rem] ${cardText}`}>
          {room.facts.map((fact, n) => (
            <li key={fact.id} className={`flex items-center gap-[0.25rem] whitespace-nowrap px-[0.62rem] lg:px-[0.42rem] ${n > 0 ? "border-l border-[var(--color-border)] transition-colors duration-300 group-hover:border-[var(--color-white-60)]" : ""}`}>
              <Icon name={fact.icon} className="size-[0.95rem] text-[var(--color-gold)] lg:size-[0.88rem]" strokeWidth={2.1} />
              {fact.text}
            </li>
          ))}
        </ul>
        <h3 className={`mt-4 font-heading text-[1.6rem] font-semibold leading-none lg:ml-[1.41rem] lg:mt-[0.72rem] lg:text-[1.69rem] ${cardText}`}>{room.name}</h3>
        <p className={`mt-3 flex items-center gap-[0.65rem] font-sans text-[0.95rem] font-medium leading-tight lg:ml-[1.36rem] lg:mt-[0.82rem] lg:text-[0.89rem] ${cardText}`}>
          <Icon name={locationIcon} className="size-[1.05rem] shrink-0 text-[var(--color-gold)] lg:size-[1rem]" strokeWidth={2} />
          {room.location}
        </p>
      </div>
    </article>
  );
};

/** Centred intro, then the five stays in one row (the featured one taller, in the middle) */
export const RoomsSection = ({ data }: { data?: RoomsData }) => {
  if (!data) return null;

  return (
    <section id={data.id} className={`scroll-mt-[4.5rem] lg:scroll-mt-[6rem] ${sectionSpace}`}>
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-[1.27rem]">
        <div data-reveal className="text-center">
          <Eyebrow text={data.label} tracking={0.281} textClass="text-[0.95rem] font-semibold text-[var(--color-navy)] sm:text-[1.1rem] lg:text-[1.41rem]" lineClass="w-[3rem] lg:w-[4.64rem]" className="gap-[1rem] lg:relative lg:-left-[0.41rem] lg:gap-[1.45rem]" />
          <SectionTitle titleTop={data.titleTop} titleAccent={data.titleAccent} className="mt-5 text-[length:min(3rem,calc((100vw-2rem)/9.6))] sm:text-[3.4rem] lg:mt-[1.12rem] lg:text-[4.16rem]" />
          <p className="mx-auto mt-5 max-w-[44rem] text-[1rem] leading-[1.6] text-[var(--color-text-grey)] sm:text-[1.1rem] lg:mt-[1rem] lg:max-w-none lg:whitespace-pre-line lg:text-[1.3rem] lg:leading-[1.59rem]">
            {data.description}
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-[2.4rem] lg:flex lg:items-start lg:gap-0">
          {data.rooms.map((room, index) => (
            <Card key={room.id} room={room} locationIcon={data.locationIcon} badgeText={data.badgeText} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
