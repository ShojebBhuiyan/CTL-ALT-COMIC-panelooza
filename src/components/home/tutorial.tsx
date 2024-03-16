"use client";

export function Tutorial() {
  return (
    <div className="p-16 flex items-center justify-center space-y-6">
      <p className="text-4xl mb-4">How to Use Our AI Comic Strip Generator</p>
      <div className="flex flex-col items-start">
        <div className="text-xl">
          <p className="font-bold">Step 1: Give Text Prompts</p>
          <p>
            Start by giving text prompts. These will guide the AI in generating
            your comic strip.
          </p>
        </div>
        <div className="text-xl">
          <p className="font-bold">Step 2: Choose Styles</p>
          <p>
            Next, choose the styles you want for your comic strip. You can
            customize the characters, backgrounds, and more.
          </p>
        </div>
        <div className="text-xl">
          <p className="font-bold">Step 3: Generate the Strip</p>
          <p>
            Finally, click the Generate button. DALL-E 3 will create your
            comic strip based on your prompts and styles.
          </p>
        </div>
        <p className="text-2xl font-bold">
          Start creating your own comic strips today!
        </p>
      </div>
    </div>
  );
}
