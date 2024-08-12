import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import { useDrag } from "react-use-gesture";

interface Item {
  label: number;
  description: string;
}

const Test: React.FC<{ visibleCount?: number }> = ({ visibleCount = 6 }) => {
  const items: Item[] = [
    { label: 1, description: "Technology" },
    { label: 2, description: "Healthcare" },
    { label: 3, description: "Finance" },
    { label: 4, description: "Education" },
    { label: 5, description: "Retail" },
    { label: 6, description: "Manufacturing" },
    { label: 7, description: "Telecommunications" },
    { label: 8, description: "Energy" },
    { label: 9, description: "Transportation" },
    { label: 10, description: "Hospitality" },
    { label: 11, description: "Real Estate" },
    { label: 12, description: "Construction" },
    { label: 13, description: "Entertainment" },
    { label: 14, description: "Agriculture" },
    { label: 15, description: "Automotive" },
  ];

  const [index, setIndex] = useState<number>(0);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(
    Math.floor(visibleCount / 2)
  );
  const [dragging, setDragging] = useState<boolean>(false); // Track dragging state

  // Spring for handling carousel transition
  const [springProps, setSpring] = useSpring(() => ({
    y: 0,
    config: { tension: 120, friction: 20 }, // Adjusted for smoother glide
  }));

  // Handle drag gestures
  const bind = useDrag(
    ({ movement: [, my], direction: [, dy], distance, cancel, active }) => {
      if (distance > 10) {
        if (dy > 0) {
          // Swipe down
          setIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : items.length - visibleCount
          );
        } else if (dy < 0) {
          // Swipe up
          setIndex((prevIndex) =>
            prevIndex < items.length - visibleCount ? prevIndex + 1 : 0
          );
        }
        cancel();
      }
      // Animate the vertical offset based on drag
      setSpring({ y: active ? my : 0 });
      if (active) {
        setDragging(true);
      } else if (dragging) {
        // Reset highlight to center item on drag end
        setHighlightedIndex(index + Math.floor(visibleCount / 2));
        setDragging(false);
      }
    }
  );

  // Handle click and move highlight to clicked item
  const handleClick = (i: number) => {
    setHighlightedIndex(index + i);
    // alert(`Clicked ${items[index + i].label}`);
  };

  // Function to calculate position of each item
  const calculatePosition = (
    i: number,
    radius: number,
    centerX: number,
    centerY: number,
    offset: number
  ) => {
    const angle = ((i + offset) / (visibleCount - 1)) * Math.PI; // Distribute along a semi-circle
    const x = centerX + radius * Math.cos(angle - Math.PI / 2);
    const y = centerY + radius * Math.sin(angle - Math.PI / 2);
    return { x, y };
  };

  const radius = 200;
  const centerX = 200; // Center the semi-circle horizontally
  const centerY = 150; // Center the semi-circle vertically

  // Calculate positions of the first and last visible items for the arc
  const startPosition = calculatePosition(0, radius, centerX, centerY, 0);
  const endPosition = calculatePosition(
    visibleCount - 1,
    radius,
    centerX,
    centerY,
    0
  );

  return (
    <div
      {...bind()}
      style={{
        position: "relative",
        width: "400px",
        height: "300px",
        overflow: "hidden",
        touchAction: "none", // Prevent default browser gestures
      }}
    >
      <svg width="400" height="300" viewBox="0 0 500 300">
        {/* Draw semi-circle line */}
        <path
          d={`M ${startPosition.x},${startPosition.y} A ${radius},${radius} 0 0,1 ${endPosition.x},${endPosition.y}`}
          fill="none"
          stroke="grey"
          strokeWidth="2"
        />
        <animated.g
          style={{
            transform: springProps.y.to((y) => `translateY(${y}px)`),
            userSelect: "none",
          }}
        >
          {items.slice(index, index + visibleCount).map((item, i) => {
            const { x, y } = calculatePosition(i, radius, centerX, centerY, 0);
            const isHighlighted = index + i === highlightedIndex; // Highlight clicked item or center item during drag
            return (
              <animated.g
                key={i}
                transform={`translate(${x}, ${y})`}
                onClick={() => handleClick(i)}
                style={{ userSelect: "none" }} // Prevent text selection
              >
                <circle
                  cx={0}
                  cy={0}
                  r="15"
                  fill={isHighlighted ? "blue" : "lightblue"}
                  stroke={isHighlighted ? "black" : "none"}
                  strokeWidth={isHighlighted ? "2" : "0"}
                />
                <text
                  x={24} // Position label to the right of the circle
                  y={5}
                  fontSize="12"
                  fill={isHighlighted ? "blue" : "black"}
                  textAnchor="start"
                >
                  {item.description}
                </text>
              </animated.g>
            );
          })}
        </animated.g>
      </svg>
    </div>
  );
};

export default Test;
