"use client";

import html2canvas from "html2canvas";
import { create } from "zustand";

import {
  Preset,
  PresetName,
  defaultPreset,
  getPreset,
  getRandomPreset,
} from "@/constants/presets";
import { RenderedScene } from "@/types/ai";

export const useStore = create<{
  prompt: string;
  preset: Preset;
  currentNbPanelsPerPage: number;
  maxNbPanelsPerPage: number;
  currentNbPages: number;
  maxNbPages: number;
  currentNbPanels: number;
  maxNbPanels: number;
  panels: string[];
  captions: string[];
  upscaleQueue: Record<string, RenderedScene>;
  showCaptions: boolean;
  renderedScenes: Record<string, RenderedScene>;
  zoomLevel: number;
  page: HTMLDivElement;
  isGeneratingStory: boolean;
  panelGenerationStatus: Record<number, boolean>;
  isGeneratingText: boolean;
  atLeastOnePanelIsBusy: boolean;

  setCurrentNbPanelsPerPage: (currentNbPanelsPerPage: number) => void;
  setMaxNbPanelsPerPage: (maxNbPanelsPerPage: number) => void;
  setCurrentNbPages: (currentNbPages: number) => void;
  setMaxNbPages: (maxNbPages: number) => void;
  setCurrentNbPanels: (currentNbPanels: number) => void;
  setMaxNbPanels: (maxNbPanels: number) => void;

  setRendered: (panelId: string, renderedScene: RenderedScene) => void;
  addToUpscaleQueue: (panelId: string, renderedScene: RenderedScene) => void;
  removeFromUpscaleQueue: (panelId: string) => void;
  setPrompt: (prompt: string) => void;
  setPreset: (preset: Preset) => void;
  setPanels: (panels: string[]) => void;
  setPanelPrompt: (newPrompt: string, index: number) => void;
  setShowCaptions: (showCaptions: boolean) => void;
  setCaptions: (captions: string[]) => void;
  setPanelCaption: (newCaption: string, index: number) => void;
  setZoomLevel: (zoomLevel: number) => void;
  setPage: (page: HTMLDivElement) => void;
  setGeneratingStory: (isGeneratingStory: boolean) => void;
  setGeneratingImages: (panelId: string, value: boolean) => void;
  setGeneratingText: (isGeneratingText: boolean) => void;
  pageToImage: () => Promise<string>;
  download: () => Promise<void>;
  generate: (
    prompt: string,
    presetName: PresetName
  ) => void;
}>((set, get) => ({
  prompt: "",
  font: "actionman",
  preset: getPreset(defaultPreset),

  currentNbPanelsPerPage: 4,
  maxNbPanelsPerPage: 4,
  currentNbPages: 1,
  maxNbPages: 1,
  currentNbPanels: 4,
  maxNbPanels: 4,

  panels: [],
  captions: [],
  upscaleQueue: {} as Record<string, RenderedScene>,
  renderedScenes: {} as Record<string, RenderedScene>,
  showCaptions: false,
  zoomLevel: 60,
  page: undefined as unknown as HTMLDivElement,
  isGeneratingStory: false,
  panelGenerationStatus: {},
  isGeneratingText: false,
  atLeastOnePanelIsBusy: false,

  setCurrentNbPanelsPerPage: (currentNbPanelsPerPage: number) => {
    const { currentNbPages } = get();
    set({
      currentNbPanelsPerPage,
      currentNbPanels: currentNbPanelsPerPage * currentNbPages,
    });
  },
  setMaxNbPanelsPerPage: (maxNbPanelsPerPage: number) => {
    const { maxNbPages } = get();
    set({
      maxNbPanelsPerPage,
      maxNbPanels: maxNbPanelsPerPage * maxNbPages,
    });
  },
  setCurrentNbPages: (currentNbPages: number) => {
    const { currentNbPanelsPerPage } = get();
    set({
      currentNbPages,
      currentNbPanels: currentNbPanelsPerPage * currentNbPages,
    });
  },
  setMaxNbPages: (maxNbPages: number) => {
    const { maxNbPanelsPerPage } = get();
    set({
      maxNbPages,
      maxNbPanels: maxNbPanelsPerPage * maxNbPages,
    });
  },
  setCurrentNbPanels: (currentNbPanels: number) => {
    set({
      currentNbPanels,
    });
  },
  setMaxNbPanels: (maxNbPanels: number) => {
    set({
      maxNbPanels,
    });
  },

  setRendered: (panelId: string, renderedScene: RenderedScene) => {
    const { renderedScenes } = get();
    set({
      renderedScenes: {
        ...renderedScenes,
        [panelId]: renderedScene,
      },
    });
  },
  addToUpscaleQueue: (panelId: string, renderedScene: RenderedScene) => {
    const { upscaleQueue } = get();
    set({
      upscaleQueue: {
        ...upscaleQueue,
        [panelId]: renderedScene,
      },
    });
  },
  removeFromUpscaleQueue: (panelId: string) => {
    const upscaleQueue = { ...get().upscaleQueue };
    delete upscaleQueue[panelId];
    set({
      upscaleQueue,
    });
  },
  setPrompt: (prompt: string) => {
    const existingPrompt = get().prompt;
    if (prompt === existingPrompt) {
      return;
    }
    set({
      prompt,
    });
  },
  setPreset: (preset: Preset) => {
    const existingPreset = get().preset;
    if (preset.label === existingPreset.label) {
      return;
    }
    set({
      preset,
    });
  },
  setPanels: (panels: string[]) => set({ panels }),
  setPanelPrompt: (newPrompt, index) => {
    const { panels } = get();
    set({
      panels: panels.map((p, i) => (index === i ? newPrompt : p)),
    });
  },
  setCaptions: (captions: string[]) => {
    set({
      captions,
    });
  },
  setShowCaptions: (showCaptions: boolean) => {
    set({
      showCaptions,
    });
  },
  setPanelCaption: (newCaption, index) => {
    const { captions } = get();
    set({
      captions: captions.map((c, i) => (index === i ? newCaption : c)),
    });
  },
  setZoomLevel: (zoomLevel: number) => set({ zoomLevel }),
  setPage: (page: HTMLDivElement) => {
    if (!page) {
      return;
    }
    set({ page });
  },
  setGeneratingStory: (isGeneratingStory: boolean) =>
    set({ isGeneratingStory }),
  setGeneratingImages: (panelId: string, value: boolean) => {
    const panelGenerationStatus: Record<string, boolean> = {
      ...get().panelGenerationStatus,
      [panelId]: value,
    };

    const atLeastOnePanelIsBusy = Object.values(panelGenerationStatus).includes(
      true
    );

    set({
      panelGenerationStatus,
      atLeastOnePanelIsBusy,
    });
  },
  setGeneratingText: (isGeneratingText: boolean) => set({ isGeneratingText }),
  pageToImage: async () => {
    const { page } = get();
    if (!page) {
      return "";
    }

    const canvas = await html2canvas(page);

    const data = canvas.toDataURL("image/jpeg", 0.97);
    return data;
  },
  download: async () => {
    const { pageToImage } = get();
    const data = await pageToImage();

    const link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = data;
      link.download = "comic.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  },
  generate: (
    prompt: string,
    presetName: PresetName
  ) => {
    const { currentNbPages } = get();

    set({
      prompt,
      panels: [],
      captions: [],
      preset:
        presetName === "random" ? getRandomPreset() : getPreset(presetName),
    });
  },
}));
