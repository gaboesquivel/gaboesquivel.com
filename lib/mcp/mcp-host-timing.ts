/** Browser-side delays for the MCP host harness (Playwright). */

export const mcpHostSleep = (ms: number) =>
  // oxlint-disable-next-line eslint-plugin-promise(avoid-new)
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

export const mcpHostRaceTimeout = <T>({
  ms,
  task,
}: {
  ms: number;
  task: Promise<T>;
}) => {
  // oxlint-disable-next-line eslint-plugin-promise(avoid-new)
  const timeout = new Promise<never>((_resolve, reject) => {
    setTimeout(() => reject(new Error("connect-timeout")), ms);
  });
  return Promise.race([task, timeout]);
};
