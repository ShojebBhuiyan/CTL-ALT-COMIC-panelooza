import { sleep } from "@/lib/sleep";
import { predictWithGemini } from "./predictWithGemini";

export const predictStyle = async ({
  image,
}: {
  image: string;
}): Promise<void> => {

  const query = `
Generate a DALL·E 3 prompt to get a comic panel of the same art style as the given image. 
Please make sure the prompt include info about art style [American/Japanese/etc.], color [color/Black-and-White], 
llmPrompt [japanese manga/Franco-Belgian comic/Nihonga/etc], 
imagePrompt [stroke weight, color palette and all other intricate details of the drawing] to reproduce another drawing in the same style. 
Give your response as a VALID JSON like this: 
{ family: string; 
  color: string; 
  llmPrompt: string; 
  imagePrompt: [string, string..]; 
}. 
Remember, only the drawing style is important. The subject of the image is not. 
So don't give any reference of the contents of the given image. 
And don't add your own comments. 
Reply using valid JSON!! Important: Write valid JSON!
`;

  try {
    await predictWithGemini({ prompt: query, image: image });
  } catch (err) {
    await sleep(2000);
  }
};
