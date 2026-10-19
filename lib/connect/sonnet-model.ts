export const SONNET_GATEWAY_MODEL = "anthropic/claude-sonnet-5.5";

export const sonnetSessionSelection = ({
  anthropicApiKey,
}: {
  anthropicApiKey: string | undefined;
}) => {
  const apiKey = anthropicApiKey?.trim();
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is required for the connect agent.");
  }

  return {
    model: SONNET_GATEWAY_MODEL,
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
