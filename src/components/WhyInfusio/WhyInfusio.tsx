import React from "react";
import { WheatOffIcon, TreeDeciduousIcon, MilkOffIcon, LeafIcon, TractorIcon, RefreshCwOffIcon } from "lucide-react";

const WhyInfusio = () => {
  return (
    <div className="bg-green-500 text-white p-16">
      <div>
        <h1 className="text-6xl font-bold font-arial text-center m-auto flex justify-center items-center">
          Why&nbsp;<span className="text-green-200">Infusio</span>?
        </h1>
      </div>
      <div className="mt-20 grid grid-cols-6 gap-4 text-center">
        <div className="flex flex-col items-center justify-center">
          <TreeDeciduousIcon className="size-12" />
          <h3 className="mt-4">Plant Based</h3>
        </div>
        <div className="flex flex-col items-center justify-center">
          <WheatOffIcon className="size-12" />
          <h3 className="mt-4">Gluten free</h3>
        </div><div className="flex flex-col items-center justify-center">
          <MilkOffIcon className="size-12" />
          <h3 className="mt-4">Dairy free</h3>
        </div><div className="flex flex-col items-center justify-center">
          <LeafIcon className="size-12" />
          <h3 className="mt-4">100% natural</h3>
        </div><div className="flex flex-col items-center justify-center">
          <TractorIcon className="size-12" />
          <h3 className="mt-4">Farmer powered</h3>
        </div><div className="flex flex-col items-center justify-center">
          <RefreshCwOffIcon className="size-12" />
          <h3 className="mt-4">No preservatives</h3>
        </div>
      </div>
    </div>
  );
};

export default WhyInfusio;
