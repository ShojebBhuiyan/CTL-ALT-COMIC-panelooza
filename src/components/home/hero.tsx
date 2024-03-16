"use client";

export function Hero() {
  return (
    <div className="p-16 h-[30rem] items-center justify-center text-white">
      <p className="text-4xl mb-4">Welcome to Panelooza</p>
      <p className="text-xl mb-8">This is some dummy text to fill the space.</p>
      <button className="bg-blue py-2 px-4 drop-shadow-[2px_2px_0px_rgba(255,255,255,1)]">
        <p className="text-yellow font-karla text-6xl font-bold  drop-shadow-[0px_1px_0px_rgba(0,0,0,1)]">
          Get Started
        </p>
      </button>
      <p className="text-xl mb-8">or, find on</p>
    </div>
  );
}
