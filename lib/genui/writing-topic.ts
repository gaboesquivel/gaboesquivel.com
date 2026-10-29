import { publishedPosts } from "./content-records";

const stopwords = new Set(
  "a about an and are as at be can do does for follow from have how i in is it me my of on or the to use using what when which who why with you your".split(
    " "
  )
);

/** Related words that count as one topic, so a paraphrase still matches. */
const topicGroups: string[][] = [
  ["agent", "agentic", "coding"],
  ["process", "workflow", "delivery", "factory", "method", "stage"],
  ["develop", "build", "engineer", "implement", "coding", "ship"],
  ["review", "verify", "verification", "test"],
  ["design", "domain", "spec"],
];

const stem = (word: string) => word.slice(0, 5);

const topicsOf = (text: string) => {
  const words = (text.toLowerCase().match(/[a-z]+/g) ?? []).filter(
    (word) => word.length > 2 && !stopwords.has(word)
  );
  return words.map((word) => {
    const group = topicGroups.find((terms) =>
      terms.some((term) => stem(term) === stem(word))
    );
    return group ?? [word];
  });
};

/**
 * Published posts whose title and summary cover the request's topics.
 * Requires at least two matching topics, so a single shared word is not
 * treated as an answer.
 */
export const writingForTopic = (text: string, limit = 3) => {
  const topics = topicsOf(text);
  if (!topics.length) return [];
  return publishedPosts()
    .map((post) => {
      const haystack: string[] = [
        ...(post.title.toLowerCase().match(/[a-z]+/g) ?? []),
        ...(post.summary?.toLowerCase().match(/[a-z]+/g) ?? []),
      ];
      const stems = new Set(haystack.map(stem));
      const score = new Set(
        topics
          .filter((terms) => terms.some((term) => stems.has(stem(term))))
          .map((terms) => terms.join("|"))
      ).size;
      return { post, score };
    })
    .filter((item) => item.score >= 2)
    .sort(
      (a, b) =>
        b.score - a.score ||
        b.post.publishedAt.localeCompare(a.post.publishedAt)
    )
    .slice(0, limit)
    .map((item) => item.post);
};
