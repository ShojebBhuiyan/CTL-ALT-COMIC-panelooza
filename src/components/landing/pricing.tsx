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
    <div className="bg-white flex flex-col items-center justify-center p-4 w-64 drop-shadow-[3px_3px_0px_rgba(0,0,0,1)]">
      <p className="text-2xl font-bold mb-2">{plan}</p>
      <p className="text-xl mb-4">{price}</p>
      {allFeatures.map((feature, index) => (
        <div key={index} className="flex items-center mb-4">
          {planFeatures.includes(feature) ? (
            <FiCheck className="text-green-600" />
          ) : (
            <FiX className="text-red-600" />
          )}
        </div>
      ))}
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
    <div className="px-16 py-10 h-[100vh] text-black">
      <div
        className={
          activeCard === 6
            ? "h-full flex flex-col items-center justify-center"
            : "hidden"
        }
      >
        <p className="font-syne font-bold text-4xl mt-4 mb-auto">
          Whatever you need, we have it all
        </p>
        <div className="flex items-center justify-between space-x-6 mb-8">
          <div className="mt-16">
            {allFeatures.map((feature, index) => (
              <p key={index} className="text-base mb-2">
                {feature}
              </p>
            ))}
          </div>
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
