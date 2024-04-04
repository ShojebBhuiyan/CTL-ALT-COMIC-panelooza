"use client";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export function ProgressBar({
  className,
  progressPercentage,
  text,
}: {
  className?: string;
  progressPercentage?: number;
  text?: string;
}) {
  return (
    <div className={className}>
      <CircularProgressbar
        value={progressPercentage || 0}
        text={text || ""}
        strokeWidth={8}
        styles={buildStyles({
          rotation: 0,
          strokeLinecap: "round",
          textSize: "20px",
          pathTransitionDuration: 0.1,
          textColor: "#f88",
          trailColor: "#d6d6d6",
          backgroundColor: "#3e98c7",
        })}
      />
    </div>
  );
}
