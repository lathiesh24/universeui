import React from "react";

const Usecase = ({ onSelectUsecase }) => {
  const usecases = [
    "Hyper-Personalized Financial Planning Using Generative AI for Investment Advisory",
    "AI-Generated Automated Compliance Reports and Risk Assessment Summaries",
    "Generative AI in Simulating and Detecting Fraudulent Transaction Patterns",
    "Improve performance by enabling hardware action with AI-Generated Marketing Campaigns for Targeted Financial Products",
  ];

  const handleUsecaseClick = (usecase) => {
    onSelectUsecase(usecase); 
  };

  return (
    <div>
      <div className="flex flex-col gap-8">
        <div className="border flex mx-auto w-max border-t-0 rounded-md px-8 py-3 -mt-2 border-blue-500">
          Usecases
        </div>
        <div className="flex flex-col gap-y-12 justify-center items-center">
          {usecases.map((usecase, index) => (
            <div
              className="bg-white shadow-md rounded-sm shadow-gray-300 p-4 w-[500px] cursor-pointer"
              key={index}
              onClick={() => handleUsecaseClick(usecase)} 
            >
              {usecase}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Usecase;
