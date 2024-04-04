import { RenderedScene } from "@/types/ai";

export const getInitialRenderedScene = (): RenderedScene => ({
  renderId: "",
  status: "pending",
  assetUrl: "",
  alt: "",
  error: "",
  maskUrl: "",
  segments: [],
});
