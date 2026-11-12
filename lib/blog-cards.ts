import type { BlogCard } from "#velite";

// The slim listing collection only: importing `#velite` here would also pull
// the compiled bodies into client bundles.
import cards from "../.velite/blogCards.json";

export type { BlogCard };

/** Post listing fields (no body), safe to import from client components. */
export const allBlogCards = cards as BlogCard[];
