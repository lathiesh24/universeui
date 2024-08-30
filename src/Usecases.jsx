import React, { useState } from "react";
import sectorsData from "./data/sector_data.json"; // Import the JSON data
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Usecases = ({ selectedIndustry, selectedTechnology }) => {
  const navigate = useNavigate();

  // Find the selected industry's data within the sectors
  const selectedSector = sectorsData.sectors.find((sector) =>
    sector.industries.some(
      (industry) => industry.industryName === selectedIndustry
    )
  );

  const selectedIndustryData = selectedSector
    ? selectedSector.industries.find(
        (industry) => industry.industryName === selectedIndustry
      )
    : null;

  // Find the selected technology data within the selected industry
  const selectedTechnologyData = selectedIndustryData
    ? selectedIndustryData.technologies.find(
        (tech) => tech.technologyName === selectedTechnology
      )
    : null;

  // Extract use cases from the selected technology
  const useCases = selectedTechnologyData
    ? selectedTechnologyData.useCases
    : [];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextUsecase = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === useCases.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Ensure we have valid use cases before rendering
  const currentUseCase = useCases.length > 0 ? useCases[currentIndex] : null;

  const handleUsecaseClick = () => {
    if (currentUseCase) {
      navigate("/usecase-description", {
        state: {
          useCaseTitle: currentUseCase.useCaseTitle,
          description: currentUseCase.description,
          startups: currentUseCase.startups, // Pass the startups data
        },
      });
    }
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
        {currentUseCase ? (
          <div
            key={currentUseCase.useCaseId}
            className="flex flex-col justify-between border shadow-custom px-7 py-4 rounded-md text-center w-full h-32 cursor-pointer"
            onClick={handleUsecaseClick}
          >
            <div className="text-xl">{currentUseCase.useCaseTitle}</div>
            <div className="flex text-[#0081CA] justify-end">
              <BsArrowRight size={24} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-between items-center border shadow-custom px-8 py-6 rounded-md text-center w-full">
            <div className="text-xl">No Use Cases Available</div>
          </div>
        )}
      </div>

      {/* Arrow on the right side */}
      {useCases.length > 1 && (
        <div
          className="border-2 rounded-full p-2 text-[#0081CA] border-[#0081CA] cursor-pointer"
          onClick={handleNextUsecase}
        >
          <BsArrowRight size={24} />
        </div>
      )}
    </div>
  );
};

export default Usecases;
