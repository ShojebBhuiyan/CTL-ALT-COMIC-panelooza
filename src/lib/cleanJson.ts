import { dirtyLLMResponseCleaner } from "./dirtyLLMResponseCleaner";

export function cleanJson(input: string): string {
  if (input.includes("```")) {
    input = input.split("```")[0];
  }
  let tmp = dirtyLLMResponseCleaner(input);
  tmp = `[${tmp.split("[").pop() || ""}`;
  tmp = `${tmp.split("]").shift() || ""}]`;

  tmp = dirtyLLMResponseCleaner(tmp);

  return tmp;
}
