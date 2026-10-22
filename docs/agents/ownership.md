# Where information lives

One source per kind of fact. Other repos and files point here or install a copy.

| Kind | Owner |
| --- | --- |
| Voice, approved wording, standing identity | `gaboesquivel-skills` → `skills/gabo` (`SKILL.md`, `references/identity.md`, `references/channels.md`) |
| Shipped projects, tech, employment, CV variants | `gaboesquivel` → `content/` |
| Routes, page jobs, keyword owners | `gaboesquivel.com` → `PRODUCT.md` |
| Site headline role and homepage pitch | `references/identity.md`, then `lib/site-identity.ts` and `PRODUCT.md` `/` |
| Hire terms (rendered on the site) | `references/identity.md` factual background, then `lib/hire-terms.ts` and `components/shared/lets-connect.tsx` |
| Featured membership (six slugs) | Package `FEATURED_PROJECT_SLUGS` and project `type: featured` |
| `/work` display order | `lib/work-types.ts` → `featuredProjectSlugs` |
| Homepage selected work (four slugs) | `lib/work/project-cover.ts` → `homepageEditorialSlugs` and `PRODUCT.md` `/` evidence |
| Layout and motion | `DESIGN.md` |
| Site data flow and agent boundary | `ARCHITECTURE.md` |
| Background ideas and superseded plans | `docs/ideas/`, `docs/research/`, marked specs — not current direction |

Writing tasks: read this page, then the one owning file for the change. Full propagation checklists live in [propagation.md](propagation.md).
