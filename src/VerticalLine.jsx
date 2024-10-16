import React from "react";

const VerticalLine = ({
  openVerticalLine,
  verticalDots,
  verticalDotsData,
  handleVerticalDotClick,
}) => {
  return (
    <>
      {openVerticalLine && (
        <div className="flex-1 relative">
          <div className="absolute left-1/2 top-0 h-full w-1 bg-gray-300 transform -translate-x-1/2"></div>

          {verticalDots.map((dot, index) => (
            <div
              key={index}
              className="absolute bg-white shadow-xl border-2 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
              style={{
                left: "50%",
                transform: "translateX(-50%)",
                top: `${(index / verticalDotsData.length) * 60 + 5}%`,
                marginTop: "10px",
              }}
              onClick={() =>
                handleVerticalDotClick(verticalDotsData[index].useCaseId)
              }
            >
              <div
                className="text-xs absolute left-full ml-4"
                style={{
                  textAlign: "left",
                  whiteSpace: "nowrap",
                }}
              >
                {verticalDotsData[index].useCaseTitle || "N/A"}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default VerticalLine;
