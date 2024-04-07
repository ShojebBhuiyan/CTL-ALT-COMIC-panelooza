import { pick } from "@/lib/pick";

export type ComicFamily = "american" | "asian" | "european";

export type ComicColor = "color" | "grayscale" | "monochrome";

export interface Preset {
  id: string;
  label: string;
  family: ComicFamily;
  color: ComicColor;
  thumbnail: string;
  llmPrompt: string;
  imagePrompt: (prompt: string) => string[];
  negativePrompt: (prompt: string) => string[];
}

export const presets: Record<string, Preset> = {
  random: {
    id: "random",
    label: "Random style",
    family: "european",
    color: "color",
    thumbnail: "question-mark-pattern_1319-109.avif",
    llmPrompt: "",
    imagePrompt: (prompt: string) => [],
    negativePrompt: () => [],
  },
  neutral: {
    id: "neutral",
    label: "Neutral (no style)",
    family: "american",
    color: "color",
    thumbnail:
      "colorful-abstract-watercolor-circles-design-vector_53876-140311.avif",
    llmPrompt: "",
    imagePrompt: (prompt: string) => [prompt],
    negativePrompt: () => [],
  },

  japanese_manga: {
    id: "japanese_manga",
    label: "Manga",
    family: "asian",
    color: "grayscale",
    thumbnail: "japanese-comic-books-e1504202757909.jpg",
    llmPrompt: "japanese manga",
    imagePrompt: (prompt: string) => [
      `grayscale`,
      `detailed drawing`,
      `japanese manga`,
      prompt,
      "single panel",
      "manga",
      "japanese",
      "intricate",
      "detailed",
      "drawing",
    ],
    negativePrompt: () => [
      "franco-belgian comic",
      "color album",
      "color",
      "american comic",
      "photo",
      "painting",
      "3D render",
    ],
  },
  franco_belgian: {
    id: "franco_belgian",
    label: "Franco-Belgian",
    family: "european",
    color: "color",
    thumbnail: "_119699014_bcf264bf-5874-463a-ac7f-3095222ae8f1.jpg",
    llmPrompt:
      'Franco-Belgian comic (a "bande dessinée"), in the style of Franquin, Moebius etc',
    imagePrompt: (prompt: string) => [
      "bande dessinée",
      "franco-belgian comic",
      prompt,
      "comic album",
      "detailed drawing",
      "color drawing",
    ],
    negativePrompt: () => [
      "manga",
      "anime",
      "american comic",
      "grayscale",
      "monochrome",
      "photo",
      "painting",
      "3D render",
    ],
  },
  american_comic_50: {
    id: "american_comic_50",
    label: "American (Vintage)",
    family: "american",
    color: "color",
    thumbnail: "IMG_6655.webp",
    llmPrompt: "american comic",
    imagePrompt: (prompt: string) => [
      "1950",
      "50s",
      `vintage american color comic`,
      prompt,
      "detailed drawing",
      "single panel",
      "comicbook style",
      "color comicbook",
      "color drawing",
    ],
    negativePrompt: () => [
      "manga",
      "anime",
      "american comic",
      "action",
      "grayscale",
      "monochrome",
      "photo",
      "painting",
      "3D render",
    ],
  },
  american_comic_70: {
    id: "american_comic_70",
    label: "American (Golden Age)",
    family: "american",
    color: "color",
    thumbnail: "IMG_6672.webp",
    llmPrompt: "american comic",
    imagePrompt: (prompt: string) => [
      `american comic`,
      prompt,
      "single panel",
      "american comic",
      "comicbook style",
      "1970",
      "70s",
      "color comicbook",
      "color drawing",
    ],
    negativePrompt: () => [
      "manga",
      "anime",
      "american comic",
      "action",
      "grayscale",
      "monochrome",
      "photo",
      "painting",
      "3D render",
    ],
  },
  american_comic_90: {
    id: "american_comic_90",
    label: "American (Modern)",
    family: "american",
    color: "color",
    thumbnail: "photo-output-63.webp",
    llmPrompt: "american comic",
    imagePrompt: (prompt: string) => [
      "digital color comicbook style",
      `modern american comic`,
      prompt,
      "detailed drawing",
      "single panel",
      "2010s",
      "digital print",
      "color comicbook",
      "color drawing",
    ],
    negativePrompt: () => [
      "manga",
      "anime",
      "american comic",
      "action",
      "grayscale",
      "monochrome",
      "photo",
      "painting",
      "3D render",
    ],
  },

  flying_saucer: {
    id: "flying_saucer",
    label: "Flying saucer",
    family: "european",
    color: "color",
    thumbnail: "360_F_545008714_xqQ2dU7cAOVUL6VWg2ljnPW2DFf1Y9x0.jpg",
    llmPrompt: "new pulp science fiction",
    imagePrompt: (prompt: string) => [
      `vintage science fiction`,
      "40s",
      "color pulp comic panel",
      "1940",
      `${prompt}`,
      "detailed drawing",
      "single panel",
      "comic album",
    ],
    negativePrompt: () => [
      "manga",
      "anime",
      "american comic",
      "grayscale",
      "monochrome",
      "photo",
      "painting",
      "3D render",
    ],
  },
  render: {
    id: "render",
    label: "3D Render",
    family: "european",
    color: "color",
    thumbnail: "8.webp",
    llmPrompt: "new movie",
    imagePrompt: (prompt: string) => [
      `3D render animation`,
      `Pixar`,
      `cute`,
      `funny`,
      `Unreal engine`,
      `${prompt}`,
      `crisp`,
      `sharp`,
    ],
    negativePrompt: () => [
      "manga",
      "anime",
      "american comic",
      "grayscale",
      "monochrome",
      "painting",
    ],
  },
  medieval: {
    id: "medieval",
    label: "Medieval",
    family: "european",
    color: "color",
    thumbnail: "screenshot-2415.png",
    llmPrompt: "medieval story (write in this style)",
    imagePrompt: (prompt: string) => [
      `medieval illuminated manuscript`,
      `illuminated manuscript of`,
      `medieval`,
      `medieval color engraving`,
      `${prompt}`,
      `intricate details`,
    ],
    negativePrompt: () => [
      "manga",
      "anime",
      "american comic",
      "grayscale",
      "monochrome",
      "painting",
    ],
  },
  pixel: {
    id: "pixel",
    label: "Pixel",
    family: "european",
    color: "color",
    thumbnail: "b642023a21ee223fc7a9b8783f7f16d0.png",
    llmPrompt: "new movie",
    imagePrompt: (prompt: string) => [
      `pixelart`,
      `isometric`,
      `pixelated`,
      `low res`,
      `${prompt}`,
    ],
    negativePrompt: () => [
      "manga",
      "anime",
      "american comic",
      "grayscale",
      "monochrome",
      "painting",
    ],
  },
};

export type PresetName = keyof typeof presets;

export const defaultPreset: PresetName = "neutral";

export const nonRandomPresets = Object.keys(presets).filter(
  (p) => p !== "random"
);

export const getPreset = (preset?: PresetName): Preset =>
  presets[preset || defaultPreset] || presets[defaultPreset];

export const getRandomPreset = (): Preset => {
  const presetName = pick(
    Object.keys(presets).filter((preset) => preset !== "random")
  ) as PresetName;
  return getPreset(presetName);
};

export const addPreset = (styles: any) => {
  const newPresets: Record<string, Preset> = styles.reduce(
    (acc: Record<string, Preset>, item: any) => {
      acc[item.id] = {
        id: item.id,
        label: item.label,
        family: item.family,
        color: item.color,
        thumbnail: item.thumbnail,
        llmPrompt: item.llmPrompt,
        imagePrompt: (prompt: string) => [...item.imagePrompt, prompt],
        negativePrompt: (prompt: string) => [...item.negativePrompt, prompt],
      };
      return acc;
    },
    {}
  );

  Object.assign(presets, newPresets);
};
