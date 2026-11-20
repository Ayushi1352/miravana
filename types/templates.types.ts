import type { CSSProperties } from "react";

export interface ThemeFonts {
  primary: string;
  heading: string;
  display: string;
  quote: string;
}

/** CSS variables set on <html> from templates.json (fonts) */
export type RootVariables = CSSProperties & {
  "--font-primary": string;
  "--font-heading": string;
  "--font-display": string;
  "--font-quote": string;
};

export interface ThemeData {
  fonts: ThemeFonts;
}

export interface SiteMetadataData {
  title: string;
  description: string;
  icon: string;
  lang: string;
}

export interface LinkItem {
  id: string;
  label: string;
  url: string;
}

export interface ContactItem {
  id: string;
  icon: string;
  /** icon in the footer, when it differs from `icon` */
  footerIcon?: string;
  title: string;
  lines: string[];
  url: string;
}

export interface CompanyData {
  name: string;
  logo: string;
  logoLight: string;
  logoAlt: string;
  logoWidth: number;
  logoHeight: number;
  contactItems: ContactItem[];
}

export interface SocialLink {
  id: string;
  icon: string;
  label: string;
  url: string;
}

export interface FooterData {
  quickLinksTitle: string;
  quickLinks: LinkItem[];
  usefulLinksTitle: string;
  usefulLinks: LinkItem[];
  contactTitle: string;
  /** which of the company contact details the footer lists, in order */
  contactIds: string[];
  socialLabel: string;
  socialLinks: SocialLink[];
  copyrightText: string;
}

export interface HeaderData {
  logoUrl: string;
  homeLabel: string;
  navLinks: LinkItem[];
  /** the company contact detail the header button shows (the phone number) */
  buttonContactId: string;
  buttonIcon: string;
  mainNavLabel: string;
  mobileNavLabel: string;
  openMenuLabel: string;
  closeMenuLabel: string;
}

/** A title with its highlighted words (titleAccent) in gold */
export interface SplitTitle {
  titleTop: string;
  titleAccent: string;
}

export interface HeroData {
  id: string;
  label: string;
  /** three title lines: the second one is gold and starts with the small pill photo */
  titleLines: string[];
  description: string;
  buttonText: string;
  buttonUrl: string;
  image: string;
  imageAlt: string;
  secondImage: string;
  secondImageAlt: string;
  pillImage: string;
  pillImageAlt: string;
}

export interface AboutFeature {
  id: string;
  title: string;
  text: string;
}

export interface AboutData {
  id: string;
  label: string;
  titleLines: string[];
  description: string;
  images: { id: string; src: string; alt: string }[];
  features: AboutFeature[];
}

export interface RoomFact {
  id: string;
  icon: string;
  text: string;
}

export interface RoomCard {
  id: string;
  name: string;
  location: string;
  image: string;
  imageAlt: string;
  facts: RoomFact[];
  /** the larger middle card with the "Most Popular" ribbon (every card turns navy only on hover) */
  featured: boolean;
}

export interface RoomsData extends SplitTitle {
  id: string;
  label: string;
  description: string;
  locationIcon: string;
  badgeText: string;
  rooms: RoomCard[];
}

export interface WhyFeature {
  id: string;
  icon: string;
  /** the label's two lines */
  lines: string[];
}

export interface WhyData extends SplitTitle {
  id: string;
  label: string;
  description: string;
  image: string;
  imageAlt: string;
  features: WhyFeature[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  quote: string;
  image: string;
  imageAlt: string;
  stars: number;
}

export interface TestimonialsData extends SplitTitle {
  id: string;
  label: string;
  ratingLabel: string;
  previousLabel: string;
  nextLabel: string;
  items: TestimonialItem[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqData extends SplitTitle {
  id: string;
  label: string;
  description: string;
  helpIcon: string;
  helpTitle: string;
  helpText: string;
  items: FaqItem[];
}

export interface ContactData extends SplitTitle {
  id: string;
  label: string;
  descriptionLines: string[];
  /** which of the company contact details are listed, in order */
  contactIds: string[];
}

/** One value per form field */
interface FormFields {
  name: string;
  email: string;
  phone: string;
  checkIn: string;
  message: string;
}

export interface ContactFormData {
  /** placeholder of each field */
  fields: FormFields;
  /** icon in front of each field */
  fieldIcons: FormFields;
  button: string;
  sending: string;
  successTitle: string;
  success: string;
  closeLabel: string;
}

interface Variants<T> {
  variants: Record<string, T>;
}

export interface TemplateComponent {
  key: string;
  component: string;
}

export interface HotelTemplateData {
  common: {
    theme: ThemeData;
    metadata: SiteMetadataData;
    company: CompanyData;
    Footer: FooterData;
  };
  categories: {
    Hotel: {
      sections: {
        Header?: Variants<HeaderData>;
        Hero?: Variants<HeroData>;
        About?: Variants<AboutData>;
        Rooms?: Variants<RoomsData>;
        Why?: Variants<WhyData>;
        Testimonials?: Variants<TestimonialsData>;
        Contact?: Variants<ContactData>;
        ContactForm?: Variants<ContactFormData>;
        Faq?: Variants<FaqData>;
      };
      templateComponents: {
        [template: string]: {
          shared: Record<string, string>;
          pages: Record<string, { components: TemplateComponent[] }>;
        };
      };
    };
  };
}
