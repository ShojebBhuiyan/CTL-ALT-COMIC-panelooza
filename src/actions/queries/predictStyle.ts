import { sleep } from "@/lib/sleep";
import { predictWithGemini } from "./predictWithGemini";

export const predictStyle = async ({
  image,
}: {
  image: string;
}): Promise<any> => {
  const query = `
Generate a DALL·E 3 prompt to get a comic panel of the same art style as the given image. 
Please make sure the prompt includes info about art style like comic family [American/Japanese/etc.], color [color/grayscale], 
llmPrompt [japanese manga/Franco-Belgian comic/Nihonga/etc], imagePrompt [any 5 information - important details like similar to Van Gogh art style or art style of Attack On Titan etc, stroke weight, stroke style, color palette and all other intricate details of the drawing technique], negativePrompt [optional] to reproduce another drawing in the same style. 
Give your response as a VALID JSON with these 5 fields like this example: 
{
  family: "european",
  color: "color",
  llmPrompt: "new pulp science fiction",
  imagePrompt: [
    "similar to some art style",
    "stroke weight: ",
    "color palette: ",
    "linework: ",
    "shading: ",
    "perspective: ",
    "depth of field: "
  ],
  negativePrompt: [
    "manga",
    "anime",
    "american comic",
    "grayscale",
    "monochrome",
  ],
},
Remember, only the drawing style is important. The subject of the image is not. 
So don't give any reference of the contents of the given image. 
And don't add your own comments. 
Reply using valid JSON!! 
Important: Write valid JSON! Don't write anything about the subject of the image! Give only 5 information in the imagePrompt and negativePrompt.
`;

  try {
    const result = await predictWithGemini({ prompt: query, image: image });
    return JSON.parse(result.replace(/`{3}json\n|\n`{3}/g, '').replace(/,\s*}/g, '}').replace(/,\s*\]/g, ']'));
  } catch (err) {
    await sleep(2000);
    throw err;  
  }
};
