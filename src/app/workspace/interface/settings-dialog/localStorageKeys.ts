import { Settings } from "@/types";

export const localStorageKeys: Record<keyof Settings, string> = {
  renderingModelVendor: "CONF_RENDERING_MODEL_VENDOR",
  openaiApiKey: "CONF_AUTH_OPENAI_API_KEY",
  openaiApiModel: "CONF_AUTH_OPENAI_API_MODEL",
  openaiApiLanguageModel: "CONF_AUTH_OPENAI_API_LANGUAGE_MODEL",
  hasGeneratedAtLeastOnce: "CONF_HAS_GENERATED_AT_LEAST_ONCE",
  userDefinedMaxNumberOfPages: "CONF_USER_DEFINED_MAX_NUMBER_OF_PAGES",
};
