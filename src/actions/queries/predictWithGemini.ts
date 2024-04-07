"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

export const predictWithGemini = async function predict({
  prompt,
  image,
}: {
  prompt: string;
  image: string;
}) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

  const promptImage = base64ToGenerativePart(image, "image/png");

  const result = await model.generateContent([prompt, promptImage]);
  const response = result.response;
  const text = response.text();
  console.log(text);
  return text;
};

import { readFileSync } from "fs";

function fileToGenerativePart(path: string, mimeType: string) {
  return {
    inlineData: {
      data: Buffer.from(readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
}

function base64ToGenerativePart(base64: string, mimeType: string) {
  return {
    inlineData: {
      data: base64.split(",")[1],
      mimeType,
    },
  };
}
