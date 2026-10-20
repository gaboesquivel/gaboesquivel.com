# Checks

Run the set that matches the changed behavior. Command definitions in `package.json` are authoritative.

- Documentation only: verify claims against source, local links and paths, changed-file formatting, and diff scope. No application build or browser pass is required.
- Content or page changes: run `bun run verify` and `bun run test:llms`. Add route checks when routing changes.
- UI or interaction changes: run the relevant existing checks and [verify.md](verify.md).
- Backend or integration changes: run the owning modules' existing tests and relevant contract checks. Report any live integration left unverified. Local tests do not prove external delivery or booking.

Gotchas the script name does not state:

- `bun run verify`: Velite content build and Ultracite (`oxlint` + `oxfmt`). This is not a production build.
- `bun run test:llms`: regenerates exports and runs an explicit selection of corpus, blog, CV, API, and chat tests. Run it after page, blog, or CV changes. It does not run every test file. Add existing module tests when the change needs them.
- `bun run verify:routes [base-url]`: checks core pages, CV variants, chat/contact, API responses, sample posts, and redirects. Needs a local content build (`bun run content:build`, or a running `bun run dev`) and a reachable server (default `http://localhost:3099`).
- `bun run verify:calendar`: calls Calendar `freeBusy` using `GOOGLE_SERVICE_ACCOUNT_JSON` and `GOOGLE_CALENDAR_ID` from the environment. Run it after Admin delegation is authorized. `sh scripts/sync-google-calendar-vercel.sh` pushes those vars from the environment to Vercel Production and Preview.

Pre-commit (`simple-git-hooks`) always runs `bun qa` (`lint:fix`, `format`, `build`). When `app/cv/`, `app/global.css`, or `components/shared/contact-info.tsx` is staged, it then runs `bun run cvs`: local Google Chrome prints the CV PDFs (it starts `next dev` on port 3099 if nothing is running), then the PDFs and `app/cv/page-breaks.ts` are staged. Formatter edits to files already in the index are written back with `git update-index --again`.
