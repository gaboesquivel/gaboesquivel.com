import type { CvKey } from "gaboesquivel";

export const cvPageBreaks: Record<CvKey, string[]> = {
  full: ["Opyn", "skills"],
  ai: ["Bitcash"],
  web3: ["RareMint"],
  fullstack: ["Wink"],
};

export const cvSectionBreak = ({ key, id }: { key: CvKey; id: string }) =>
  cvPageBreaks[key].includes(id) ? "page-break-before " : "";
