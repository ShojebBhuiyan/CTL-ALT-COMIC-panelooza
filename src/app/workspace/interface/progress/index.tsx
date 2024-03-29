import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { ProgressBar } from "./progress-bar";

export function Progress({
  isLoading,
  resetKey = "",
  className = "",
}: {
  isLoading: boolean;
  resetKey?: string;
  className?: string;
}) {
  const timeoutRef = useRef<any>();
  const [progressPercent, setProcessPercent] = useState(0);
  const progressRef = useRef(0);
  const isLoadingRef = useRef(isLoading);

  const updateProgressBar = () => {
    const duration = 1000; 
    const frequency = 200; 
    const nbUpdatesPerSec = duration / frequency;
    const nbSeconds = 80;
    const amountInPercent = 100 / (nbUpdatesPerSec * nbSeconds); 

    progressRef.current = Math.min(100, progressRef.current + amountInPercent);
    setProcessPercent(progressRef.current);
  };

  useEffect(() => {
    clearInterval(timeoutRef.current);
    isLoadingRef.current = isLoading;
    progressRef.current = 0;
    setProcessPercent(0);
    if (isLoading) {
      timeoutRef.current = setInterval(updateProgressBar, 200);
    }
  }, [isLoading, resetKey]);

  return (
    <div
      className={cn(
        `flex w-10 h-10`,
        `animation-all duration-300 text-md`,
        isLoading ? `scale-100 opacity-100` : `scale-0 opacity-0`,
        className
      )}
    >
      <ProgressBar progressPercentage={progressPercent} />
    </div>
  );
}
