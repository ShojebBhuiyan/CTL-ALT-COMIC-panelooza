import { DynamicConfig } from "@/types/ai";

export const getDefaultDynamicConfig = (): DynamicConfig => ({
  maxNbPages: 1,
  nbPanelsPerPage: 4,
  nbTotalPanelsToGenerate: 4,
});
