"use client";

import { useContext } from "react";
import { FiCheck, FiX } from "react-icons/fi";
import { ActiveCardContext } from "./ActiveCardContext";

const PlanCard = ({
  plan,
  price,
  planFeatures,
  allFeatures,
}: {
  plan: string;
  price: string;
  planFeatures: string[];
  allFeatures: string[];
}) => {
  return (
    <div className="bg-white flex flex-col items-center p-4 w-[35vw] drop-shadow-[3px_3px_0px_rgba(0,0,0,1)]">
      <p className="text-[2vw] font-bold">{plan}</p>
      <p className="text-[1.5vw] mb-5">{price}</p>
      <div className="grid grid-rows-[repeat(auto-fill,minmax(20px,1fr))] space-y-[3vh]">
        {allFeatures.map((feature, index) => (
          <div key={index} className="flex items-center space-x-2">
            {planFeatures.includes(feature) ? (
              <FiCheck className="text-green-600" />
            ) : (
              <FiX className="text-red-600" />
            )}
            <p className="text-[1.2vw]">{feature}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export function Pricing() {
  const { activeCard } = useContext(ActiveCardContext);
  const allFeatures = [
    "Access to advanced comic creation tools",
    "Unlimited selection of characters and backgrounds",
    "Ability to save and share comics with no watermark",
    "Priority access to new features and updates",
    "Unlimited cloud storage for comics",
    "Ad-free experience",
    "Access to premium community forums",
  ];

  const basicFeatures = [
    "Access to basic comic creation tools",
    "Limited selection of characters and backgrounds",
    "Ability to save and share comics",
    "Access to community forums",
  ];

  const picassoFeatures = [
    "Access to advanced comic creation tools",
    "Unlimited selection of characters and backgrounds",
    "Ability to save and share comics with no watermark",
    "Priority access to new features and updates",
    "Unlimited cloud storage for comics",
    "Ad-free experience",
    "Access to premium community forums",
  ];

  return (
    <div className="p-16 h-[100vh] text-black">
      <div
        className={
          activeCard === 6
            ? "h-full flex flex-col items-center justify-between"
            : "hidden"
        }
      >
        <p className="font-syne font-bold text-[3vw]">
          Whatever you need, we have it all
        </p>
        <div className="grid grid-cols-2 items-center justify-between mt-5 space-x-6">
          <PlanCard
            plan="Basic"
            price="Free"
            planFeatures={basicFeatures}
            allFeatures={allFeatures}
          />
          <PlanCard
            plan="Picasso"
            price="$1000"
            planFeatures={picassoFeatures}
            allFeatures={allFeatures}
          />
        </div>
      </div>
    </div>
  );
}
