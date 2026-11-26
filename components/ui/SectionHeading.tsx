/*
  Sizes on this page are taken from the 1920px design: 1 design pixel = 0.046875rem
  (at 1440px the root font is 16px, so the whole 1920px design shows at 75%).
*/

type EyebrowProps = {
  text: string;
  /** size, weight and colour (the design sets each section's label a little differently) */
  textClass: string;
  /** letter spacing in em */
  tracking: number;
  /** width of the gold line on each side and its gap to the text */
  lineClass: string;
  className?: string;
};

/** Small spaced capitals between two short gold lines, above every section title */
export const Eyebrow = ({ text, textClass, tracking, lineClass, className = "" }: EyebrowProps) => (
  <p className={`flex items-center justify-center ${className}`}>
    <span aria-hidden="true" className={`h-[0.1rem] shrink-0 bg-[var(--color-gold-line)] ${lineClass}`} />
    {/* the trailing letter space is cancelled, so the text sits in the middle of the two lines */}
    <span className={`whitespace-nowrap font-sans uppercase leading-none ${textClass}`} style={{ letterSpacing: `${tracking}em`, marginRight: `${-tracking}em` }}>
      {text}
    </span>
    <span aria-hidden="true" className={`h-[0.1rem] shrink-0 bg-[var(--color-gold-line)] ${lineClass}`} />
  </p>
);

/** Bold serif capitals (Rooms, Testimonials, Contact and FAQ titles); the accent words in gold */
export const titleClass = "font-heading font-[450] uppercase leading-[1.08] tracking-[-0.005em] text-[var(--color-navy)] lg:leading-none";
export const sectionTitleSize = "text-[length:min(2.5rem,calc((100vw-2rem)/8.8))] sm:text-[3rem] lg:text-[4rem]";

type TitleProps = {
  titleTop: string;
  titleAccent: string;
  className?: string;
};

/** A section title with its last words in gold */
export const SectionTitle = ({ titleTop, titleAccent, className = "" }: TitleProps) => (
  <h2 className={`${titleClass} ${className}`}>
    {titleTop} <span className="text-[var(--color-gold)]">{titleAccent}</span>
  </h2>
);
