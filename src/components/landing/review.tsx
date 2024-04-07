"use client";

import { useContext, useEffect, useState } from "react";
import { ActiveCardContext } from "./ActiveCardContext";

export function Review() {
  const { activeCard } = useContext(ActiveCardContext);
  const [selectedReviews, setSelectedReviews] = useState<
    { user: string; comment: string }[]
  >([]);

  useEffect(() => {
    const reviewsCopy = [...reviews];
    for (let i = reviewsCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [reviewsCopy[i], reviewsCopy[j]] = [reviewsCopy[j], reviewsCopy[i]];
    }
    setSelectedReviews(reviewsCopy.slice(0, 10));
  }, []);

  return (
    <div className="p-16 h-[100vh]">
      <div
        className={
          activeCard === 5
            ? "h-full flex flex-col items-center justify-between"
            : "hidden"
        }
      >
        <p className="font-syne font-bold text-[3vw] text-black">
          What artists saying about us
        </p>
        <div className="relative flex items-center justify-center text-black mt-5">
          <img src="images/bubbles.svg" alt="speech-bubbles" className="h-[70vh]" />
          {selectedReviews.map((review, index) => (
            <div
              key={index}
              className="absolute p-2 text-center text-[1vw]"
              style={{ top: positions[index].top, left: positions[index].left }}
            >
              <p className="font-bold">{review.user}</p>
              <p>{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const positions = [
  { top: "28%", left: "5%" },
  { top: "11%", left: "46%" },
  { top: "8%", left: "83%" },
  { top: "40%", left: "23%" },
  { top: "40%", left: "47%" },
  { top: "43%", left: "67%" },
  { top: "70%", left: "3%" },
  { top: "77%", left: "25%" },
  { top: "75%", left: "53%" },
  { top: "75%", left: "80%" },
];

const reviews = [
  {
    user: "John Doe",
    comment: "I love it!",
  },
  {
    user: "Jane Doe",
    comment: "What a great platform",
  },
  {
    user: "Linda Doe",
    comment: "Nice!",
  },
  {
    user: "Michael Smith",
    comment: "Fantastic experience!",
  },
  {
    user: "Sarah Johnson",
    comment: "Highly recommended!",
  },
  {
    user: "Robert Brown",
    comment: "Very useful.",
  },
  {
    user: "Emily Davis",
    comment: "Impressive!",
  },
  {
    user: "James Miller",
    comment: "It's a game changer.",
  },
  {
    user: "Jessica Wilson",
    comment: "Loved the interface.",
  },
  {
    user: "William Moore",
    comment: "Great job, guys!",
  },
  {
    user: "Emma Taylor",
    comment: "Keep up the good work!",
  },
  {
    user: "David Anderson",
    comment: "A must-have tool.",
  },
  {
    user: "Sophia Thomas",
    comment: "Very intuitive.",
  },
  {
    user: "Benjamin Jackson",
    comment: "Exceeded my expectations.",
  },
  {
    user: "Olivia White",
    comment: "I'm a fan!",
  },
];
