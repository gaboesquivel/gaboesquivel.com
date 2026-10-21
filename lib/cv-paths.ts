import type { CvKey } from "gaboesquivel";

export const cvSectionTitles: Record<CvKey, string> = {
  ai: "AI Engineering CV",
  full: "Curriculum Vitae",
  fullstack: "Full-Stack Product Engineering CV",
  web3: "Web3 Engineering CV",
};

export const cvPath = ({ key }: { key: CvKey }) =>
  key === "full" ? "/cv" : `/cv?focus=${key}`;

export const cvPdfFile = ({ key }: { key: CvKey }) =>
  key === "full" ? "gaboesquivel-cv.pdf" : `gaboesquivel-cv-${key}.pdf`;
