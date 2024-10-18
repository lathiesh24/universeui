import React, { useState, useEffect, useRef } from "react";
import sectorData from "./data/sector_data.json"; // Assuming the JSON file is stored here
import FirstLeftCircle from "./FirstLeftCircle";
import SecondLeftCircle from "./SecondLeftCircle";
import MiddleCircle from "./MiddleCircle";
import VerticalLine from "./VerticalLine";
import RightCircle from "./RightCircle";
import SecondRightCircle from "./SecondRightCircl";


const App = () => {
  const sectors = sectorData.sectors;

  const getSectorData = () => {
    return sectors.slice(0, 8).map((sector) => ({
      sectorId: sector.sectorId,
      sectorName: sector.sectorName,
      industries: sector.industries || [], 
    }));
  };

  const getInitialIndustryData = () => {
    const bfsiSector = sectors.find((sector) => sector.sectorId === "bfsi");

    return bfsiSector
      ? bfsiSector.industries.slice(0,8).map((industry) => ({
          sectorName: bfsiSector.sectorName,
          industryName: industry.industryName,
          technologies: industry.technologies || [],
        }))
      : [];
  };

  const getTechnologyData = () => {
    const lifeHealthInsurance = getInitialIndustryData().find(
      (industry) => industry.industryName === "Life & Health Insurance"
    );

    return lifeHealthInsurance
      ? lifeHealthInsurance.technologies.slice(0,8).map((tech) => ({
          sectorName: "Banking, Financial Service & Insurance",
          industryName: "Life & Health Insurance",
          technologyName: tech.technologyName,
          useCases: tech.useCases || [],
        }))
      : [];
  };

  const getUseCaseData = (technologyName) => {
    const selectedTech = getTechnologyData().find(
      (tech) => tech.technologyName === technologyName
    );
    return selectedTech ? selectedTech.useCases : [];
  };

  const getStartupData = (useCaseId) => {
    const allUseCases = getTechnologyData().flatMap(
      (tech) => tech.useCases || []
    );

    const selectedUseCase = allUseCases.find(
      (useCase) => useCase.useCaseId === useCaseId
    );

    return selectedUseCase
      ? selectedUseCase.startups.map((startup) => ({
          companyName: startup,
          description: selectedUseCase.description,
        }))
      : [];
  };

  const [leftOuterCircleData1, setLeftOuterCircleData1] = useState(
    getInitialIndustryData()
  );
  const [leftOuterCircleData2, setLeftOuterCircleData2] = useState([]);
  const [innerLeftCircleData, setInnerLeftCircleData] = useState([]);
  const [verticalDotsData, setVerticalDotsData] = useState([]);
  const [secondRightCircleData, setSecondRightCircleData] = useState([]);
  const [rightCircleData, setRightCircleData] = useState(getTechnologyData());

  const totalLeftDots1 = leftOuterCircleData1.length;
  const totalLeftDots2 = leftOuterCircleData2.length;
  const totalMiddleDots = innerLeftCircleData.length;
  const totalVerticalDots = verticalDotsData.length;
  const totalRightDots = rightCircleData.length;
  const totalSecondRightDots = secondRightCircleData.length;

  const anglePerDotLeft1 = (2 * Math.PI) / totalLeftDots1;
  const anglePerDotLeft2 = (2 * Math.PI) / totalLeftDots2;
  const anglePerDotMiddle = (2 * Math.PI) / totalMiddleDots;
  const anglePerDotVertical = (2 * Math.PI) / totalVerticalDots;
  const anglePerDotRight = (2 * Math.PI) / totalRightDots;
  const anglePerDotSecondRight = (2 * Math.PI) / totalSecondRightDots;

  const [leftAngleOffset1, setLeftAngleOffset1] = useState(Math.PI / 2);
  const [leftAngleOffset2, setLeftAngleOffset2] = useState(Math.PI / 2);
  const [middleAngleOffset, setMiddleAngleOffset] = useState(Math.PI / 2);
  const [verticalAngleOffset, setVerticalAngleOffset] = useState(Math.PI / 2);
  const [rightAngleOffset, setRightAngleOffset] = useState(Math.PI / 2);
  const [secondRightAngleOffset, setSecondRightAngleOffset] = useState(
    Math.PI / 2
  );
  const [isDraggingLeft1, setIsDraggingLeft1] = useState(false);
  const [isDraggingLeft2, setIsDraggingLeft2] = useState(false);
  const [isDraggingMiddle, setIsDraggingMiddle] = useState(false);
  const [isDraggingVertical, setIsDraggingVertical] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);
  const [isDraggingSecondRight, setIsDraggingSecondRight] = useState(false);
  const [lastMouseYLeft1, setLastMouseYLeft1] = useState(null);
  const [lastMouseYLeft2, setLastMouseYLeft2] = useState(null);
  const [lastMouseYMiddle, setLastMouseYMiddle] = useState(null);
  const [lastMouseYVertical, setLastMouseYVertical] = useState(null);
  const [lastMouseYRight, setLastMouseYRight] = useState(null);
  const [lastMouseYSecondRight, setLastMouseYSecondRight] = useState(null);
  const [openVerticalLine, setOpenVerticalLine] = useState(false);
  const [rightSemicircleOpen, setRightSemicircleOpen] = useState(false);
  const [useSecondRightSemicircle, setUseSecondRightSemicircle] =
    useState(false);
  const [showMiddleCircle, setShowMiddleCircle] = useState(false);
  const [interactionStage, setInteractionStage] = useState("left1");

  const leftCircleRef1 = useRef(null);
  const leftCircleRef2 = useRef(null);
  const middleCircleRef = useRef(null);
  const verticalLineRef = useRef(null);
  const secondRightCircleRef = useRef(null);
  const rightCircleRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (isDraggingLeft1) {
        handleMouseMoveLeft1(event);
      }
      if (isDraggingLeft2) {
        handleMouseMoveLeft2(event);
      }
      if (isDraggingMiddle) {
        handleMouseMoveMiddle(event);
      }
      if (isDraggingVertical) {
        handleMouseMoveVertical(event);
      }
      if (isDraggingRight) {
        handleMouseMoveRight(event);
      }
      if (isDraggingSecondRight) {
        handleMouseMoveSecondRight(event);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    isDraggingLeft1,
    lastMouseYLeft1,
    isDraggingLeft2,
    lastMouseYLeft2,
    isDraggingMiddle,
    lastMouseYMiddle,
    isDraggingVertical,
    lastMouseYVertical,
    isDraggingRight,
    lastMouseYRight,
    isDraggingSecondRight,
    lastMouseYSecondRight,
  ]);

  const handleMouseMoveLeft1 = (event) => {
    if (isDraggingLeft1) {
      const { clientY } = event;
      if (lastMouseYLeft1 !== null) {
        const deltaY = clientY - lastMouseYLeft1;
        const rotationSpeed = 0.005;
        setLeftAngleOffset1(
          (prevOffset) => prevOffset - deltaY * rotationSpeed
        );
      }
      setLastMouseYLeft1(clientY);
    }
  };

  const handleMouseMoveLeft2 = (event) => {
    if (isDraggingLeft2) {
      const { clientY } = event;
      if (lastMouseYLeft2 !== null) {
        const deltaY = clientY - lastMouseYLeft2;
        const rotationSpeed = 0.005;
        setLeftAngleOffset2(
          (prevOffset) => prevOffset - deltaY * rotationSpeed
        );
      }
      setLastMouseYLeft2(clientY);
    }
  };

  const handleMouseMoveMiddle = (event) => {
    if (isDraggingMiddle) {
      const { clientY } = event;
      if (lastMouseYMiddle !== null) {
        const deltaY = clientY - lastMouseYMiddle;
        const rotationSpeed = 0.005;
        setMiddleAngleOffset(
          (prevOffset) => prevOffset - deltaY * rotationSpeed
        );
      }
      setLastMouseYMiddle(clientY);
    }
  };

  const handleMouseMoveVertical = (event) => {
    if (isDraggingVertical) {
      const { clientY } = event;
      if (lastMouseYVertical !== null) {
        const deltaY = clientY - lastMouseYVertical;
        const rotationSpeed = 0.005;
        setVerticalAngleOffset(
          (prevOffset) => prevOffset - deltaY * rotationSpeed
        );
      }
      setLastMouseYVertical(clientY);
    }
  };

  const handleMouseMoveRight = (event) => {
    if (isDraggingRight) {
      const { clientY } = event;
      if (lastMouseYRight !== null) {
        const deltaY = clientY - lastMouseYRight;
        const rotationSpeed = 0.005;
        setRightAngleOffset(
          (prevOffset) => prevOffset - deltaY * rotationSpeed
        );
      }
      setLastMouseYRight(clientY);
    }
  };

  const handleMouseMoveSecondRight = (event) => {
    if (isDraggingSecondRight) {
      const { clientY } = event;
      if (lastMouseYSecondRight !== null) {
        const deltaY = clientY - lastMouseYSecondRight;
        const rotationSpeed = 0.005;
        setSecondRightAngleOffset(
          (prevOffset) => prevOffset - deltaY * rotationSpeed
        );
      }
      setLastMouseYSecondRight(clientY);
    }
  };

  const handleMouseUp = () => {
    setIsDraggingLeft1(false);
    setIsDraggingLeft2(false);
    setIsDraggingMiddle(false);
    setIsDraggingVertical(false);
    setIsDraggingRight(false);
    setIsDraggingSecondRight(false);
    setLastMouseYLeft1(null);
    setLastMouseYLeft2(null);
    setLastMouseYMiddle(null);
    setLastMouseYVertical(null);
    setLastMouseYRight(null);
    setLastMouseYSecondRight(null);
  };

  const handleMouseDownLeft1 = (event) => {
    if (
      leftCircleRef1.current &&
      leftCircleRef1.current.contains(event.target)
    ) {
      setIsDraggingLeft1(true);
      setLastMouseYLeft1(event.clientY);
    }
  };

  const handleMouseDownLeft2 = (event) => {
    if (
      leftCircleRef2.current &&
      leftCircleRef2.current.contains(event.target)
    ) {
      setIsDraggingLeft2(true);
      setLastMouseYLeft2(event.clientY);
    }
  };

  const handleMouseDownMiddle = (event) => {
    if (
      middleCircleRef.current &&
      middleCircleRef.current.contains(event.target)
    ) {
      setIsDraggingMiddle(true);
      setLastMouseYMiddle(event.clientY);
    }
  };

  const handleMouseDownVertical = (event) => {
    if (
      verticalLineRef.current &&
      verticalLineRef.current.contains(event.target)
    ) {
      setIsDraggingVertical(true);
      setLastMouseYVertical(event.clientY);
    }
  };

  const handleMouseDownRight = (event) => {
    if (
      rightCircleRef.current &&
      rightCircleRef.current.contains(event.target)
    ) {
      setIsDraggingRight(true);
      setLastMouseYRight(event.clientY);
    }
  };

  const handleMouseDownSecondRight = (event) => {
    if (
      secondRightCircleRef.current &&
      secondRightCircleRef.current.contains(event.target)
    ) {
      setIsDraggingSecondRight(true);
      setLastMouseYSecondRight(event.clientY);
    }
  };

  const handleDotClickLeft1 = (dotIndex) => {
    if (interactionStage === "left1") {
      handleDotClick(
        dotIndex,
        setLeftAngleOffset1,
        leftAngleOffset1,
        totalLeftDots1
      );
      if (!rightSemicircleOpen) {
        setRightSemicircleOpen(true);
      }
    }
  };

  const handleDotClickLeft2 = (dotIndex) => {
    if (interactionStage === "left2") {
      handleDotClick(
        dotIndex,
        setLeftAngleOffset2,
        leftAngleOffset2,
        totalLeftDots2
      );
      setOpenVerticalLine(true); // Open vertical line
      const selectedTechName = leftOuterCircleData2[dotIndex].technologyName;
      const useCaseData = getUseCaseData(selectedTechName);
      setVerticalDotsData(useCaseData);
    }
  };

  const handleDotClickMiddle = (dotIndex) => {
    handleDotClick(
      dotIndex,
      setMiddleAngleOffset,
      middleAngleOffset,
      totalMiddleDots
    );
  };

  const handleVerticalDotClick = (useCaseId) => {
    setUseSecondRightSemicircle(true); 
    const startupData = getStartupData(useCaseId);
    setSecondRightCircleData(startupData);
  };

  const handleDotClickRight = (dotIndex) => {
    if (interactionStage === "left1") {
      handleDotClick(
        dotIndex,
        setRightAngleOffset,
        rightAngleOffset,
        totalRightDots
      );

      setLeftOuterCircleData2(rightCircleData); 
      setInnerLeftCircleData(leftOuterCircleData1); 
      setInteractionStage("left2"); 

      setRightSemicircleOpen(false); 
      setLeftOuterCircleData1([]); 

      setShowMiddleCircle(true); 
    }
  };

  const handleDotClickSecondRight = (dotIndex) => {
    handleDotClick(
      dotIndex,
      setSecondRightAngleOffset,
      secondRightAngleOffset,
      totalSecondRightDots
    );
  };

  const handleDotClick = (dotIndex, setAngleOffset, angleOffset, totalDots) => {
    const normalizedAngleOffset =
      ((angleOffset % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

    const currentCenterIndex = Math.round(
      ((Math.PI / 2 - normalizedAngleOffset) / anglePerDotLeft1 + totalDots) %
        totalDots
    );

    const distance = (dotIndex - currentCenterIndex + totalDots) % totalDots;
    const shortestDistance =
      distance <= totalDots / 2 ? distance : distance - totalDots;
    const angleDifference = shortestDistance * anglePerDotLeft1;
    setAngleOffset((prevOffset) => prevOffset - angleDifference);
  };

  const radiusX = 410;
  const radiusY = 378;

  const leftDots1 = Array.from({ length: totalLeftDots1 }).map((_, index) => {
    const angle = (index / totalLeftDots1) * Math.PI * 2 + leftAngleOffset1;
    const x = radiusX * Math.sin(angle);
    const y = radiusY * Math.cos(angle);
    return { x, y, index };
  });



  const leftDots2 = Array.from({ length: totalLeftDots2 }).map((_, index) => {
    const angle = (index / totalLeftDots2) * Math.PI * 2 + leftAngleOffset2;
    const x = radiusX * Math.sin(angle);
    const y = radiusY * Math.cos(angle);
    return { x, y, index };
  });

  const middleRadiusX = 230;
  const middleRadiusY = 248;
  const middleDots = Array.from({ length: totalMiddleDots }).map((_, index) => {
    const angle = (index / totalMiddleDots) * Math.PI * 2 + middleAngleOffset;
    const x = middleRadiusX * Math.sin(angle);
    const y = middleRadiusY * Math.cos(angle);
    return { x, y, index };
  });

  const verticalDots = Array.from({ length: totalVerticalDots }).map(
    (_, index) => {
      const angle =
        (index / totalVerticalDots) * Math.PI * 2 + verticalAngleOffset;
      const x = radiusX * Math.sin(angle);
      const y = radiusY * Math.cos(angle);
      return { x, y, index };
    }
  );

  const rightDots = Array.from({ length: totalRightDots }).map((_, index) => {
    const angle = (index / totalRightDots) * Math.PI * 2 + rightAngleOffset;
    const x = radiusX * Math.sin(angle);
    const y = radiusY * Math.cos(angle);
    return { x, y, index };
  });

  const secondRightDots = Array.from({ length: totalSecondRightDots }).map(
    (_, index) => {
      const angle =
        (index / totalSecondRightDots) * Math.PI * 2 + secondRightAngleOffset;
      const x = radiusX * Math.sin(angle);
      const y = radiusY * Math.cos(angle);
      return { x, y, index };
    }
  );

  const leftCenterIndex1 = Math.round(
    ((Math.PI / 2 - leftAngleOffset1) / anglePerDotLeft1 + totalLeftDots1) %
      totalLeftDots1
  );
  const leftCenterIndex2 = Math.round(
    ((Math.PI / 2 - leftAngleOffset2) / anglePerDotLeft2 + totalLeftDots2) %
      totalLeftDots2
  );
  const middleCenterIndex = Math.round(
    ((Math.PI / 2 - middleAngleOffset) / anglePerDotMiddle + totalMiddleDots) %
      totalMiddleDots
  );
  const verticalCenterIndex = Math.round(
    ((Math.PI / 2 - verticalAngleOffset) / anglePerDotVertical +
      totalVerticalDots) %
      totalVerticalDots
  );
  const rightCenterIndex = Math.round(
    ((Math.PI / 2 - rightAngleOffset) / anglePerDotRight + totalRightDots) %
      totalRightDots
  );
  const secondRightCenterIndex = Math.round(
    ((Math.PI / 2 - secondRightAngleOffset) / anglePerDotSecondRight +
      totalSecondRightDots) %
      totalSecondRightDots
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* First Left Circle */}
      <FirstLeftCircle
        interactionStage={interactionStage}
        leftCircleRef1={leftCircleRef1}
        handleMouseDownLeft1={handleMouseDownLeft1}
        leftDots1={leftDots1}
        setIsDraggingLeft1={setIsDraggingLeft1}
        setLastMouseYLeft1={setLastMouseYLeft1}
        handleDotClickLeft1={handleDotClickLeft1}
        leftCenterIndex1={leftCenterIndex1}
        leftOuterCircleData1={leftOuterCircleData1}
      />

      {/* Second Left Circle */}
      <SecondLeftCircle
        interactionStage={interactionStage}
        leftCircleRef2={leftCircleRef2}
        handleMouseDownLeft2={handleMouseDownLeft2}
        leftDots2={leftDots2}
        setIsDraggingLeft2={setIsDraggingLeft2}
        setLastMouseYLeft2={setLastMouseYLeft2}
        handleDotClickLeft2={handleDotClickLeft2}
        leftCenterIndex2={leftCenterIndex2}
        leftOuterCircleData2={leftOuterCircleData2}
      />
      <MiddleCircle
        showMiddleCircle={showMiddleCircle}
        middleDots={middleDots}
        handleMouseDownMiddle={handleMouseDownMiddle}
        handleDotClickMiddle={handleDotClickMiddle}
        middleCenterIndex={middleCenterIndex}
        innerLeftCircleData={innerLeftCircleData}
      />
      <VerticalLine
        openVerticalLine={openVerticalLine}
        verticalDots={verticalDots}
        verticalDotsData={verticalDotsData}
        handleVerticalDotClick={handleVerticalDotClick}
      />
      <RightCircle
        rightSemicircleOpen={rightSemicircleOpen}
        useSecondRightSemicircle={useSecondRightSemicircle}
        rightCircleRef={rightCircleRef}
        handleMouseDownRight={handleMouseDownRight}
        rightDots={rightDots}
        handleDotClickRight={handleDotClickRight}
        rightCenterIndex={rightCenterIndex}
        rightCircleData={rightCircleData}
      />

      <SecondRightCircle
        useSecondRightSemicircle={useSecondRightSemicircle}
        secondRightCircleRef={secondRightCircleRef}
        handleMouseDownSecondRight={handleMouseDownSecondRight}
        secondRightDots={secondRightDots}
        setIsDraggingSecondRight={setIsDraggingSecondRight}
        setLastMouseYSecondRight={setLastMouseYSecondRight}
        handleDotClickSecondRight={handleDotClickSecondRight}
        secondRightCenterIndex={secondRightCenterIndex}
        secondRightCircleData={secondRightCircleData}
      />
    </div>
  );
};

export default App;
