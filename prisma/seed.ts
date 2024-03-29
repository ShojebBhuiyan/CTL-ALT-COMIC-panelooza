import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const styles = [
    {
      id: "random",
      label: "Random style",
      family: "european",
      color: "color",
      thumbnail:
        "https://t4.ftcdn.net/jpg/04/89/42/05/360_F_489420550_hEK2OQOwH7coSWYjvFPZ5Uw0XlNuDRMO.jpg",
      llmPrompt: "",
      imagePrompt: [],
      negativePrompt: [],
    },
    {
      id: "neutral",
      label: "Neutral (no style)",
      family: "american",
      color: "color",
      thumbnail:
        "https://img.freepik.com/free-vector/colorful-abstract-watercolor-circles-design-vector_53876-140311.jpg",
      llmPrompt: "",
      imagePrompt: [],
      negativePrompt: [],
    },
    {
      id: "japanese_manga",
      label: "Manga",
      family: "asian",
      color: "grayscale",
      thumbnail:
        "https://www.fluentu.com/blog/japanese/wp-content/uploads/sites/6/2016/06/japanese-comic-books-e1504202757909.jpeg",
      llmPrompt: "japanese manga",
      imagePrompt: [`grayscale`, `detailed drawing`, `japanese manga`],
      negativePrompt: [
        "franco-belgian comic",
        "color album",
        "color",
        "american comic",
        "photo",
        "painting",
        "3D render",
      ],
    },
    {
      id: "nihonga",
      label: "Nihonga",
      family: "asian",
      color: "color",
      thumbnail:
        "https://cdn.thecollector.com/wp-content/uploads/2019/08/daimyo-japanese-samurai-by-toyotomi-hideyoshi.jpg?width=1400&quality=55",
      llmPrompt: "japanese manga",
      imagePrompt: [
        "Nihonga",
        "ancient japanese painting",
        "intricate",
        "detailed",
        "detailed painting",
      ],
      negativePrompt: [
        "franco-belgian comic",
        "color album",
        "color",
        "manga",
        "comic",
        "american comic",
        "photo",
        "painting",
        "3D render",
      ],
    },
  ];

  for (const style of styles) {
    await prisma.style.create({
      data: {
        userId: "0",
        thumbnail: style.thumbnail,
        label: style.label,
        family: style.family,
        color: style.color,
        llmPrompt: style.llmPrompt,
        imagePrompt: style.imagePrompt,
        negativePrompt: style.negativePrompt,
        isDefault: true,
        imagePaths: ["path1", "path2"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  const allStyles = await prisma.style.findMany();
  console.log(allStyles);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
