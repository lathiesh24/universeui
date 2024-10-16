import React from "react";

const SecondRightCircle = ({
  useSecondRightSemicircle,
  secondRightCircleRef,
  handleMouseDownSecondRight,
  secondRightDots,
  setIsDraggingSecondRight,
  setLastMouseYSecondRight,
  handleDotClickSecondRight,
  secondRightCenterIndex,
  secondRightCircleData,
}) => {
  return (
    <>
      {useSecondRightSemicircle && (
        <div
          className="fixed top-0 right-0 h-full w-[375px] rounded-l-full border-2"
          ref={secondRightCircleRef}
          onMouseDown={handleMouseDownSecondRight}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="absolute h-[500px] w-[250px] rounded-l-full bg-blue-100 shadow-md top-32 right-0"></div>
          {secondRightDots.map((dot, index) => (
            <div
              key={dot.index}
              className="absolute flex flex-col items-center justify-center cursor-pointer"
              style={{
                right: `${dot.x}px`,
                top: `${dot.y + 356}px`,
                userSelect: "none",
              }}
              onMouseDown={() => {
                setIsDraggingSecondRight(true);
                setLastMouseYSecondRight(null);
              }}
              onClick={() => handleDotClickSecondRight(dot.index)}
            >
              <div
                className={`flex flex-row-reverse gap-4 items-center justify-center ${
                  dot.index === secondRightCenterIndex
                    ? "border-blue-500"
                    : "border-black"
                }`}
                style={{
                  textAlign: "center",
                }}
              >
                <div
                  className={`bg-white shadow-xl border-2 rounded-full w-10 h-10 flex items-center justify-center ${
                    dot.index === secondRightCenterIndex
                      ? "border-blue-500"
                      : ""
                  }`}
                  style={{
                    flexShrink: 0,
                    width: "40px",
                    height: "40px",
                  }}
                >
                  {dot.index + 1}
                </div>
                <div
                  className="text-sm mt-1"
                  style={{
                    maxWidth: "100px",
                    wordWrap: "break-word",
                    whiteSpace: "normal",
                  }}
                >
                  {secondRightCircleData[index].companyName || "N/A"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SecondRightCircle;
