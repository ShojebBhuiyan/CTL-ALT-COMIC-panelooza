import { cleanJson } from "@/lib/cleanJson";
import { createZephyrPrompt } from "@/lib/createZephyrPrompt";
import { dirtyGeneratedPanelCleaner } from "@/lib/dirtyGeneratedPanelCleaner";
import { dirtyGeneratedPanelsParser } from "@/lib/dirtyGeneratedPanelsParser";
import { sleep } from "@/lib/sleep";
import { GeneratedPanel } from "@/types/ai";
import { Preset } from "../../constants/presets";
import { predictWithOpenAI } from "./predictWithOpenAI";

export const predictNextPanels = async ({
  preset,
  prompt = "",
  nbPanelsToGenerate = 2,
  maxNbPanels = 4,
  existingPanels = [],
}: {
  preset: Preset;
  prompt: string;
  nbPanelsToGenerate?: number;
  maxNbPanels?: number;
  existingPanels: GeneratedPanel[];
}): Promise<GeneratedPanel[]> => {
  const existingPanelsTemplate = existingPanels.length
    ? ` To help you, here are the previous panels and their captions (note: if you see an anomaly here eg. no caption or the same description repeated multiple times, do not hesitate to fix the story): ${JSON.stringify(
        existingPanels,
        null,
        2
      )}`
    : "";

  const firstNextOrLast =
    existingPanels.length === 0
      ? "first"
      : maxNbPanels - existingPanels.length === maxNbPanels
      ? "last"
      : "next";
  const query =
    createZephyrPrompt([
      {
        role: "system",
        content: [
          `You are a writer specialized in ${preset.llmPrompt}`,
          `Please write detailed drawing instructions and short (2-3 sentences long) speech captions for the ${firstNextOrLast} ${nbPanelsToGenerate} panels (out of ${maxNbPanels} in total) of a new story, but keep it open-ended (it will be continued and expanded later). Please make sure each of those ${nbPanelsToGenerate} panels include info about character gender, age, origin, clothes, colors, location, lights, etc. Only generate those ${nbPanelsToGenerate} panels, but take into account the fact the panels are part of a longer story (${maxNbPanels} panels long).`,
          `Give your response as a VALID JSON array like this: \`Array<{ panel: number; instructions: string; caption: string; }>\`.`,
          `Be brief in the instructions and narrative captions of those ${nbPanelsToGenerate} panels, don't add your own comments. The captions must be captivating, smart, entertaining. Be straight to the point, and never reply things like "Sure, I can.." etc. Reply using valid JSON!! Important: Write valid JSON!`,
        ]
          .filter((item) => item)
          .join("\n"),
      },
      {
        role: "user",
        content: `The story is about: ${prompt}.${existingPanelsTemplate}`,
      },
    ]) + "\n[{";

  let result = "";

  const nbTokensPerPanel = 130;

  const nbMaxNewTokens = nbPanelsToGenerate * nbTokensPerPanel;

  try {
    result = `${await predictWithOpenAI(query, nbMaxNewTokens)}`.trim();
    console.log("LLM result (1st trial):", result);
    if (!result.length) {
      throw new Error("empty result on 1st trial!");
    }
  } catch (err) {
    await sleep(2000);

    try {
      result = `${await predictWithOpenAI(
        query + " \n ",
        nbMaxNewTokens
      )}`.trim();
      console.log("LLM result (2nd trial):", result);
      if (!result.length) {
        throw new Error("empty result on 2nd trial!");
      }
    } catch (err) {
      console.error(`prediction of the story failed twice 💩`);
      throw new Error(`failed to generate the story twice 💩 ${err}`);
    }
  }

  const tmp = cleanJson(result);

  let generatedPanels: GeneratedPanel[] = [];

  try {
    generatedPanels = dirtyGeneratedPanelsParser(tmp);
  } catch (err) {
    generatedPanels = tmp
      .split("*")
      .map((item) => item.trim())
      .map((cap, i) => ({
        panel: i,
        caption: cap,
        instructions: cap,
      }));
  }

  return generatedPanels.map((res) => dirtyGeneratedPanelCleaner(res));
};
