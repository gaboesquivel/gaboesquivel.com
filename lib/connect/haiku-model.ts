export const HAIKU_GATEWAY_MODEL = "anthropic/claude-haiku-4.5";

export const haikuSessionSelection = ({
  anthropicApiKey,
}: {
  anthropicApiKey: string | undefined;
}) => {
  const apiKey = anthropicApiKey?.trim();
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is required for the connect agent.");
  }

  return {
    model: HAIKU_GATEWAY_MODEL,
    modelOptions: {
      providerOptions: {
        gateway: {
          byok: {
            anthropic: [{ apiKey }],
          },
          caching: "auto",
          only: ["anthropic"],
        },
      },
    },
  };
};
