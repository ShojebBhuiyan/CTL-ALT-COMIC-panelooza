export function joinWords(inputs: any[] = [], separator = ", "): string {
  return inputs
    .map((x) => `${x || ""}`.trim())
    .filter((x) => x)
    .join(separator);
}
