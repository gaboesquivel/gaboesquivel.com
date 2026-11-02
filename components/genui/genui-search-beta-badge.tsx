import { Badge } from "components/ui/badge";

/** Visible only: the field's accessible name already says "beta". */
export const GenuiSearchBetaBadge = () => (
  <Badge
    aria-hidden="true"
    className="pointer-events-none border-neutral-600 bg-neutral-900/80 text-neutral-300"
    variant="outline"
  >
    Beta
  </Badge>
);
