import React from "react";

const FirstLeftCircle = ({
  interactionStage,
  leftCircleRef1,
  handleMouseDownLeft1,
  leftDots1,
  setIsDraggingLeft1,
  setLastMouseYLeft1,
  handleDotClickLeft1,
  leftCenterIndex1,
  leftOuterCircleData1,
}) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-[432px] rounded-r-full border-2 ${
        interactionStage !== "left2" ? "block" : "hidden"
      }`}
      ref={leftCircleRef1}
      onMouseDown={handleMouseDownLeft1}
      onClick={(event) => event.stopPropagation()}
    >
      <div className="absolute h-[500px] w-[250px] rounded-r-full border-2 top-32"></div>

      {/* Display only 8 dots */}
      {leftDots1.map((dot) => {
        const isMiddleDot = dot.index === leftCenterIndex1; // Check if this is the middle dot

        return (
          <div
            key={dot.index}
            className="absolute flex flex-col items-center justify-center cursor-pointer"
            style={{
              left: `${dot.x}px`,
              top: `${dot.y + 346}px`,
              userSelect: "none",
            }}
            onMouseDown={() => {
              setIsDraggingLeft1(true);
              setLastMouseYLeft1(null);
            }}
            onClick={() => handleDotClickLeft1(dot.index)}
          >
            <div
              className={`flex flex-row items-center justify-center ${
                isMiddleDot ? "border-blue-500" : "border-black"
              }`}
              style={{
                textAlign: "center",
              }}
            >
              <div
                className={`rounded-full flex items-center justify-center ${
                  isMiddleDot
                    ? "bg-[#3AB8FF] border-[#FFEFA7] border-2 "
                    : "bg-[#D8D8D8]"
                }  ${isMiddleDot ? "w-10 h-10" : "w-8 h-8"}`}
                style={{
                  flexShrink: 0,
                }}
              >
                {/* Removed number display */}
              </div>
              <div
                className={`text-sm w-32 ${
                  isMiddleDot
                    ? "font-semibold text-base text-[#4C4C4C]"
                    : "text-[#797979]"
                }`}
                style={{
                  wordWrap: "break-word",
                  whiteSpace: "normal",
                }}
              >
                {leftOuterCircleData1[dot.index].industryName || "N/A"}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FirstLeftCircle;
