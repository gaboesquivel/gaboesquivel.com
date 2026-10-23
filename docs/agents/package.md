# Package facts

Edit facts in the `gaboesquivel` package, not in this repository. The boundary is in [ARCHITECTURE.md](../../ARCHITECTURE.md). Project cards use package descriptions, as [PRODUCT.md](../../PRODUCT.md) requires.

When package copy or types change: edit the package, run `bun run build` there (it runs `generate` first), run `bun link` in the package, run `bun link gaboesquivel` here, then edit site pages. The site imports the package `dist/` bundle, not markdown under `content/`; skipping `build` leaves stale project images and facts in dev until you rebuild and refresh. Production installs the published npm version, so linked changes go live only after the package is published and the dependency here is updated.

Keep each repository's commit separate. Leave generated package output unedited.

Done when the site reads the updated package facts and no package source was edited in this repository.
