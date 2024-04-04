import { RenderingModelVendor, Settings } from "@/types/ai";

export const defaultSettings: Settings = {
  renderingModelVendor: "SERVER" as RenderingModelVendor,
  openaiApiKey: "",
  openaiApiModel: "dall-e-3",
  openaiApiLanguageModel: "gpt-4",
  hasGeneratedAtLeastOnce: false,
  userDefinedMaxNumberOfPages: 1,
};
