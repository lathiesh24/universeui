import React, { useState } from "react";
import { BsArrowRight } from "react-icons/bs";

const Usecases = () => {
  const useCasesData = [
    {
      id: "1",
      useCase: "Dynamic Policy Adjustments",
    },
    {
      id: "2",
      useCase: "Fraud Detection",
    },
    {
      id: "3",
      useCase: "Investment Portfolio Optimization",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextUsecase = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === useCasesData.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="flex justify-between items-center gap-4">
      {/* Container for "Use Cases" Box */}
      <div className="flex items-center justify-center w-8 h-28">
        <div className="inline-block px-10 py-1.5 border border-[#0081CA] bg-[#F0FAFF] uppercase font-medium transform -rotate-90 text-nowrap">
          Use Cases
        </div>
      </div>

      {/* Visible Card */}
      <div className="flex flex-col items-center gap-4 w-full max-w-md">
        <div
          key={useCasesData[currentIndex].id}
          className="flex flex-col justify-between items-center border shadow-custom px-8 py-6 rounded-md text-center w-full"
        >
          <div className="text-xl">{useCasesData[currentIndex].useCase}</div>
          <div
            className="flex text-[#0081CA] justify-end"
          >
            <BsArrowRight size={24} />
          </div>
        </div>
      </div>

      {/* Arrow on the right side */}
      <div
        className="border-2 rounded-full p-2 text-[#0081CA] border-[#0081CA]"
        onClick={handleNextUsecase}
      >
        <BsArrowRight size={24} />
      </div>
    </div>
  );
};

export default Usecases;
