import React from "react";

const SecondLeftCircle = ({
  interactionStage,
  leftCircleRef2,
  handleMouseDownLeft2,
  leftDots2,
  setIsDraggingLeft2,
  setLastMouseYLeft2,
  handleDotClickLeft2,
  leftCenterIndex2,
  leftOuterCircleData2,
}) => {
  return (
    <div>
      {interactionStage === "left2" && (
        <div
          className="fixed top-0 left-0 h-full w-[432px] rounded-r-full border-2"
          ref={leftCircleRef2}
          onMouseDown={handleMouseDownLeft2}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="absolute h-[500px] w-[250px] rounded-r-full border-2 top-32"></div>

          {leftDots2.map((dot) => (
            <div
              key={dot.index}
              className="absolute flex flex-col items-center justify-center cursor-pointer"
              style={{
                left: `${dot.x}px`,
                top: `${dot.y + 346}px`,
                userSelect: "none",
              }}
              onMouseDown={() => {
                setIsDraggingLeft2(true);
                setLastMouseYLeft2(null);
              }}
              onClick={() => handleDotClickLeft2(dot.index)}
            >
              <div
                className={`flex flex-row items-center justify-center ${
                  dot.index === leftCenterIndex2
                    ? "border-blue-500"
                    : "border-black"
                }`}
                style={{
                  textAlign: "center",
                }}
              >
                <div
                  className={`bg-white shadow-xl border-2 rounded-full w-10 h-10 flex items-center justify-center ${
                    dot.index === leftCenterIndex2 ? "border-blue-500" : ""
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
                  className="text-sm w-32"
                  style={{
                    wordWrap: "break-word",
                    whiteSpace: "normal",
                  }}
                >
                  {leftOuterCircleData2[dot.index].technologyName || "N/A"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SecondLeftCircle;
