import { GeneratedPanel } from "@/types/ai";

export function dirtyGeneratedPanelCleaner({
  panel,
  instructions,
  caption,
}: GeneratedPanel): GeneratedPanel {
  let newCaption = `${caption || ""}`.split(":").pop()?.trim() || "";
  let newInstructions =
    (`${instructions || ""}`.split(":").pop() || "")
      .replaceAll("Draw a", "")
      .replaceAll("Draw the", "")
      .replaceAll("Draw", "")
      .replaceAll("Show a", "")
      .replaceAll("Show the", "")
      .replaceAll("Opens with a", "")
      .replaceAll("Opens with the", "")
      .replaceAll("Opens with", "")
      .replaceAll("Cut to a", "")
      .replaceAll("Cut to the", "")
      .replaceAll("Cut to", "")
      .replaceAll("End with a", "")
      .replaceAll("End with", "")
      .trim() || "";

  return {
    panel,
    instructions: newInstructions,
    caption: newCaption,
  };
}
