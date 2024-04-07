interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

/**
 * Formats the messages for the chat with the LLM model in the style of a pirate.
 * @param messages - Array of message objects with role and content.
 * @returns The formatted chat prompt.
 */
export function createZephyrPrompt(messages: Message[]): string {
  let prompt = ``;

  messages.forEach((message) => {
    prompt += `<|${message.role}|>\n${message.content.trim()}</s>`;
  });

  if (messages.at(-1)?.role === "user") {
    prompt += `<|assistant|>`;
  }

  return prompt;
}
