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
    <div className="px-16 py-10 h-[100vh] text-black">
      <div
        className={
          activeCard === 5
            ? "h-full flex flex-col items-center justify-center"
            : "hidden"
        }
      >
        <p className="font-syne font-bold text-4xl mt-2">
          What artists saying about us
        </p>
        <div className="relative flex items-center justify-center mt-10">
          <img src="images/bubbles.svg" alt="speech-bubbles" className="h-96" />
          {selectedReviews.map((review, index) => (
            <div
              key={index}
              className="absolute p-2 text-center text-xs"
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
  { top: "98px", left: "24px" },
  { top: "144px", left: "208px" },
  { top: "158px", left: "406px" },
  { top: "28px", left: "434px" },
  { top: "168px", left: "634px" },
  { top: "20px", left: "774px" },
  { top: "268px", left: "40px" },
  { top: "308px", left: "264px" },
  { top: "298px", left: "494px" },
  { top: "298px", left: "754px" },
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
