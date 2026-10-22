import { siteOgAlt } from "lib/site-identity";

export const ogWidth = 1200;
export const ogHeight = 630;
export const ogAspect = ogWidth / ogHeight;

export const ogColors = {
  black: "#000000",
  white: "#ffffff",
  gray: "#a3a3a3",
  darkGray: "#404040",
  accent: "#5cded6",
} as const;

export const personalPortraitPath =
  "assets/homepage/gaboesquivel-homepage-master.webp";

export const personalOgUrl = "/og";

export const personalOgImage = {
  alt: siteOgAlt,
  height: ogHeight,
  url: personalOgUrl,
  width: ogWidth,
} as const;
