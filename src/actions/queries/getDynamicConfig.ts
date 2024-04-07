"use server";

import { getValidNumber } from "@/lib/getValidNumber";
import { DynamicConfig } from "@/types/ai";

export async function getDynamicConfig(): Promise<DynamicConfig> {
  const maxNbPages = getValidNumber(
    process.env.MAX_NB_PAGES,
    1,
    Number.MAX_SAFE_INTEGER,
    1
  );
  const nbPanelsPerPage = 4;
  const nbTotalPanelsToGenerate = maxNbPages * nbPanelsPerPage;

  const config = {
    maxNbPages,
    nbPanelsPerPage,
    nbTotalPanelsToGenerate,
  };

  return config;
}
