/** Escape a value for OpenUI double-quoted string literals. */
export const escapeOpenUiString = (value: string) =>
  value
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\r/g, "\\r")
    .replace(/\n/g, "\\n")
    .replace(/\t/g, "\\t")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");

export const openUiStringLiteral = (value: string) =>
  `"${escapeOpenUiString(value)}"`;

export const openUiStringList = (values: string[]) =>
  `[${values.map(openUiStringLiteral).join(", ")}]`;
