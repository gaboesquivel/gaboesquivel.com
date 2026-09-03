import {
  type CvExperience,
  type CvKey,
  cvKeys,
  resolveCv as resolveCvBase,
} from 'gaboesquivel'
import { cvPageBreaks } from './page-breaks'

export type CvEntry = CvExperience & { pageBreak?: boolean }

const withPageBreaks = ({
  key,
  entries,
}: {
  key: CvKey
  entries: CvExperience[]
}): CvEntry[] => {
  const breaks = new Set(cvPageBreaks[key])
  return entries.map((entry) => ({
    ...entry,
    pageBreak: breaks.has(entry.company),
  }))
}

export { type CvKey, cvKeys }

export const cvSectionBreak = ({ key, id }: { key: CvKey; id: string }) =>
  cvPageBreaks[key].includes(id) ? 'page-break-before ' : ''

export const resolveCv = ({ focus }: { focus?: string | string[] }) => {
  const resolved = resolveCvBase({ focus })
  return {
    ...resolved,
    entries: withPageBreaks({
      key: resolved.key,
      entries: resolved.entries,
    }),
  }
}

export const cvPath = ({ key }: { key: CvKey }) =>
  key === 'full' ? '/cv' : `/cv?focus=${key}`

export const cvPdfFile = ({ key }: { key: CvKey }) =>
  key === 'full' ? 'gaboesquivel-cv.pdf' : `gaboesquivel-cv-${key}.pdf`
