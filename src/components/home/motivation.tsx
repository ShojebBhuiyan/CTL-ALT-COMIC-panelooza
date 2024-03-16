"use client";

export function Motivation() {
  return (
    <div className="p-16 overflow-y-auto flex-col flex items-center justify-center space-y-6">
      <p className="text-4xl mb-4">Why Use Our AI Comic Strip Generator?</p>
      <div className="flex flex-col space-y-2">
        <div className="text-xl">
          <p className="font-bold">1. Fast and Efficient Storyboarding</p>
          <p>
            Got a deadline coming up? Our AI can help you speed up the
            storyboarding process, making it faster and more efficient.
          </p>
        </div>
        <div className="text-xl">
          <p className="font-bold">2. Get Inspired</p>
          <p>
            Experiencing a creative block? Get inspiration from our community
            gallery and see what others are creating.
          </p>
        </div>
        <div className="text-xl">
          <p className="font-bold">3. Save Money</p>
          <p>
            Broke after paying for background artists? Our AI can generate
            backgrounds and handle other repetitive tasks, saving you money.
          </p>
        </div>
        <p className="text-2xl font-bold">
          Dont be a sad mangaka. Try our AI Comic Strip Generator today!
        </p>
      </div>
    </div>
  );
}
