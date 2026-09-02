import {
  type CvExperience,
  type CvKey,
  cvKeys,
  resolveCv as resolveCvBase,
} from 'gaboesquivel'

export type CvEntry = CvExperience & { pageBreak?: boolean }

const pageBreakCompanies = new Set(['Bitlauncher', 'Bitcash', 'Wink'])

const withPageBreaks = ({
  key,
  entries,
}: {
  key: CvKey
  entries: CvExperience[]
}): CvEntry[] =>
  key === 'full'
    ? entries.map((entry) => ({
        ...entry,
        pageBreak: pageBreakCompanies.has(entry.company),
      }))
    : entries

export { type CvKey, cvKeys }

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
