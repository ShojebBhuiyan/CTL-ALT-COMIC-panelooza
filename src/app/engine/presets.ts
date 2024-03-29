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
    thumbnail:
      "https://t4.ftcdn.net/jpg/04/89/42/05/360_F_489420550_hEK2OQOwH7coSWYjvFPZ5Uw0XlNuDRMO.jpg",
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
      "https://img.freepik.com/free-vector/colorful-abstract-watercolor-circles-design-vector_53876-140311.jpg",
    llmPrompt: "",
    imagePrompt: (prompt: string) => [prompt],
    negativePrompt: () => [],
  },

  japanese_manga: {
    id: "japanese_manga",
    label: "Manga",
    family: "asian",
    color: "grayscale",
    thumbnail:
      "https://www.fluentu.com/blog/japanese/wp-content/uploads/sites/6/2016/06/japanese-comic-books-e1504202757909.jpeg",
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
    thumbnail:
      "https://ichef.bbci.co.uk/news/624/cpsprodpb/A08B/production/_119699014_bcf264bf-5874-463a-ac7f-3095222ae8f1.jpg",
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
    thumbnail:
      "https://i0.wp.com/www.toonsmag.com/wp-content/uploads/2023/10/IMG_6655.jpeg?fit=662%2C922&ssl=1",
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
    thumbnail:
      "https://i0.wp.com/www.toonsmag.com/wp-content/uploads/2023/10/IMG_6672.jpeg?fit=662%2C497&ssl=1",
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
    thumbnail:
      "https://i0.wp.com/www.toonsmag.com/wp-content/uploads/2023/10/photo-output-63.jpeg?fit=662%2C441&ssl=1",
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
    thumbnail:
      "https://t4.ftcdn.net/jpg/05/45/00/87/360_F_545008714_xqQ2dU7cAOVUL6VWg2ljnPW2DFf1Y9x0.jpg",
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
    thumbnail:
      "https://www.origastock.com/midjourney-ai/source/pixar-midjourney-styles/8.webp",
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
    thumbnail:
      "https://manuscriptroadtrip.files.wordpress.com/2021/12/screenshot-2415.png",
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
    thumbnail:
      "https://i.pinimg.com/originals/b6/42/02/b642023a21ee223fc7a9b8783f7f16d0.png",
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
