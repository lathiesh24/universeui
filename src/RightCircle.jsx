import React from "react";

const RightCircle = ({
  rightSemicircleOpen,
  useSecondRightSemicircle,
  rightCircleRef,
  handleMouseDownRight,
  rightDots,
  handleDotClickRight,
  rightCenterIndex,
  rightCircleData,
}) => {
  return (
    <>
      {/* Right Circle */}
      {rightSemicircleOpen && !useSecondRightSemicircle && (
        <div
          className="fixed top-0 right-0 h-full w-[375px] rounded-l-full border-2"
          ref={rightCircleRef}
          onMouseDown={handleMouseDownRight}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <div className="absolute h-[500px] w-[250px] rounded-l-full bg-blue-100 shadow-md top-32 right-0"></div>
          {rightDots.map((dot) => {
            const isMiddleDot = dot.index === rightCenterIndex; // Check if this is the middle dot

            return (
              <div
                key={dot.index}
                className="absolute flex flex-col items-center justify-center cursor-pointer"
                style={{
                  right: `${dot.x}px`,
                  top: `${dot.y + 356}px`,
                  userSelect: "none",
                }}
                onClick={() => handleDotClickRight(dot.index)}
              >
                <div
                  className={`flex flex-col items-center justify-center ${
                    isMiddleDot ? "border-blue-500" : "border-black"
                  }`}
                  style={{
                    textAlign: "center",
                  }}
                >
                  <div
                    className={`rounded-full flex items-center justify-center ${
                      isMiddleDot
                        ? "bg-[#3AB8FF] border-2 border-[#FFEFA7]"
                        : "bg-[#D8D8D8]"
                    }  ${isMiddleDot ? "w-10 h-10" : "w-8 h-8"}`}
                    style={{
                      flexShrink: 0,
                    }}
                  >
                    {/* Removed number display */}
                  </div>
                  <div
                    className={`text-sm mt-1 ${
                      isMiddleDot
                        ? "font-semibold text-base text-[#4C4C4C]"
                        : "text-[#797979]"
                    }`}
                    style={{
                      maxWidth: "100px",
                      wordWrap: "break-word",
                      whiteSpace: "normal",
                    }}
                  >
                    {rightCircleData[dot.index].technologyName || "N/A"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default RightCircle;
