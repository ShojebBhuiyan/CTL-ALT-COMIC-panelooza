import { joinWords } from "@/lib/joinWords";
import { GeneratedPanel } from "@/types/ai";
import { Preset } from "../../constants/presets";
import { predictNextPanels } from "./predictNextPanels";

export const getStoryContinuation = async ({
  preset,
  stylePrompt = "",
  userStoryPrompt = "",
  nbPanelsToGenerate = 2,
  maxNbPanels = 4,
  existingPanels = [],
}: {
  preset: Preset;
  stylePrompt?: string;
  userStoryPrompt?: string;
  nbPanelsToGenerate?: number;
  maxNbPanels?: number;
  existingPanels?: GeneratedPanel[];
}): Promise<GeneratedPanel[]> => {
  let panels: GeneratedPanel[] = [];
  const startAt: number = existingPanels.length + 1 || 0;
  const endAt: number = startAt + nbPanelsToGenerate;

  try {
    const prompt = joinWords([userStoryPrompt]);

    const panelCandidates: GeneratedPanel[] = await predictNextPanels({
      preset,
      prompt,
      nbPanelsToGenerate,
      maxNbPanels,
      existingPanels,
    });

    for (let i = 0; i < nbPanelsToGenerate; i++) {
      panels.push({
        panel: startAt + i,
        instructions: `${panelCandidates[i]?.instructions || ""}`,
        caption: `${panelCandidates[i]?.caption || ""}`,
      });
    }
  } catch (err) {
    panels = [];
    for (let p = startAt; p < endAt && p; p++) {
      panels.push({
        panel: p,
        instructions: joinWords([
          stylePrompt,
          userStoryPrompt,
          `${".".repeat(p)}`,
        ]),
        caption: "(Sorry, LLM generation failed: using degraded mode)",
      });
    }
    console.error(err);
  } finally {
    return panels;
  }
};
