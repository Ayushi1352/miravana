import type { IconType } from "react-icons";
import { FaFacebookF, FaInstagram, FaPhoneAlt, FaStar, FaYoutube } from "react-icons/fa";
import {
  LuArrowLeft,
  LuArrowRight,
  LuArrowUpRight,
  LuBath,
  LuBedDouble,
  LuCalendarDays,
  LuCheck,
  LuChevronRight,
  LuConciergeBell,
  LuMail,
  LuMapPin,
  LuMenu,
  LuMessageSquareMore,
  LuMinus,
  LuPhone,
  LuPlus,
  LuShieldCheck,
  LuUser,
  LuUsers,
  LuWifi,
  LuX,
} from "react-icons/lu";
import { PiFlowerLotus, PiUsersThree } from "react-icons/pi";

// The design's own outline emblems, drawn like the Lu icons
const MvMountains: IconType = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M1.5 19.5 8 7.5l3.2 5.6" />
    <path d="m6.2 19.5 7.3-13 9 13" />
    <path d="m11.4 9.4 2.1 1.6 2-1.4" />
  </svg>
);

const MvConcierge: IconType = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M8 7.2a4 4 0 0 1 8 0v1.3a4 4 0 0 1-8 0Z" />
    <path d="M8 7.2c1.8.5 5.8.6 8-.6" />
    <path d="M4 21.5v-2.2c0-3 2.6-5.3 5.4-5.6l2.6 3 2.6-3c2.8.3 5.4 2.6 5.4 5.6v2.2Z" />
    <path d="m10.8 18 1.2-1.3 1.2 1.3-1.2 1.2Z" />
  </svg>
);

const MvChats: IconType = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9.5 3.8h9.7a2.3 2.3 0 0 1 2.3 2.3v6a2.3 2.3 0 0 1-2.3 2.3h-.9v2.8l-3.1-2.8H9.5a2.3 2.3 0 0 1-2.3-2.3v-6a2.3 2.3 0 0 1 2.3-2.3Z" />
    <path d="M7.2 9.4H4.8a2.3 2.3 0 0 0-2.3 2.3v4.8a2.3 2.3 0 0 0 2.3 2.3h.7v2.8l3.1-2.8h3.5a2.3 2.3 0 0 0 2.3-2.3v-2.1" />
    <path d="M12.6 7.6a1.9 1.9 0 1 1 2.6 1.8c-.5.2-.8.6-.8 1.1v.6" />
    <path d="M14.4 12.6h.01" />
  </svg>
);

// Every icon the site can use, by the name templates.json stores. A new icon is added here once.
const icons: Record<string, IconType> = {
  FaFacebookF,
  FaInstagram,
  FaPhoneAlt,
  FaStar,
  FaYoutube,
  LuArrowLeft,
  LuArrowRight,
  LuArrowUpRight,
  LuBath,
  LuBedDouble,
  LuCalendarDays,
  LuCheck,
  LuChevronRight,
  LuConciergeBell,
  LuMail,
  LuMapPin,
  LuMenu,
  LuMessageSquareMore,
  LuMinus,
  LuPhone,
  LuPlus,
  LuShieldCheck,
  LuUser,
  LuUsers,
  LuWifi,
  LuX,
  MvChats,
  MvConcierge,
  MvMountains,
  PiFlowerLotus,
  PiUsersThree,
};

type Props = {
  name: string;
  className?: string;
  // Line thickness of the outline icons (Lu, Mv); the filled icons keep their own shape.
  strokeWidth?: number;
};

export const Icon = ({ name, className, strokeWidth = 1.6 }: Props) => {
  const Component = icons[name] ?? LuCheck;
  const outline = name.startsWith("Lu") || name.startsWith("Mv");
  return <Component className={className} strokeWidth={outline ? strokeWidth : undefined} aria-hidden="true" />;
};
