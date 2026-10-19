export const press =
  "touch-manipulation [-webkit-tap-highlight-color:transparent] transition-transform motion-safe:duration-[160ms] motion-safe:ease-[cubic-bezier(0.23,1,0.32,1)] motion-safe:active:scale-[0.97] motion-reduce:duration-[80ms] motion-reduce:active:scale-[0.99] active:translate-y-0 disabled:active:scale-100";

export const enter =
  "motion-safe:transition-[opacity,transform] motion-safe:duration-200 motion-safe:ease-[cubic-bezier(0.23,1,0.32,1)] motion-safe:starting:scale-[0.97] motion-safe:starting:opacity-0 motion-reduce:transition-opacity motion-reduce:duration-[120ms] motion-reduce:starting:opacity-0";

export const fieldClass =
  "w-full min-h-11 rounded-lg border border-hairline bg-transparent px-4 py-3 text-white scheme-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

export const chipClass = `min-h-11 rounded-md border border-hairline px-3 py-2 text-left hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${press}`;

export const accentButton = `min-h-11 rounded-lg border border-accent px-4 text-accent hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50 ${press}`;

export const quietButton = `min-h-11 rounded-lg border border-hairline px-4 hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${press}`;
