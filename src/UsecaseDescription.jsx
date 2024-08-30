import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UsecaseDescription = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { useCaseTitle, description, startups } = location.state || {};

  const handleExploreEcosystem = () => {
    navigate("/ecosystem", {
      state: {
        useCaseTitle,
        startups,
        description // Pass startups data to the Ecosystem page
      },
    });
  };

  return (
    <div>
      <div className="flex flex-col bg-[#005585] px-4 justify-center items-center text-center gap-8 py-8">
        <div className="font-semibold text-white text-4xl">
          {useCaseTitle || "No Use Case Title Available"}
        </div>
        <div
          className="text-black text-lg font-medium bg-[#00A3FF] mx-auto p-2 cursor-pointer"
          onClick={handleExploreEcosystem}
        >
          Explore Ecosystem
        </div>
      </div>
      <div className="mx-4 py-4 leading-9 text-xl">
        {description || "No description available for this use case."}
      </div>
    </div>
  );
};

export default UsecaseDescription;
