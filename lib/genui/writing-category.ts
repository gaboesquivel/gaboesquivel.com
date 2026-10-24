export const writingCategoryFromText = (text: string) => {
  if (/\bweb3\b/i.test(text)) return "web3";
  if (
    /\b(ai|agent|generative interface|genui|mcp app|declarative ui)\b/i.test(
      text
    )
  )
    return "ai";
  return null;
};
