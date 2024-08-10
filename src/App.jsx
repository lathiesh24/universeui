import React, { useState } from 'react';
import { useSpring, animated, to as interpolate } from '@react-spring/web';
import {
  FaAppleAlt, FaBolt, FaHeartbeat, FaHome, FaIndustry, FaLaptopCode,
  FaPiggyBank, FaPlug, FaRing, FaSatelliteDish, FaShoppingBasket,
} from 'react-icons/fa';

const industries = [
  { name: 'Energy', icon: <FaBolt />, subSectors: ['Energy Equipment & Services', 'Oil, Gas & Consumable Fuels'] },
  { name: 'Materials', icon: <FaRing />, subSectors: ['Chemicals', 'Construction Materials', 'Metals & Mining'] },
  { name: 'Industrials', icon: <FaIndustry />, subSectors: ['Aerospace & Defense', 'Machinery', 'Construction & Engineering'] },
  { name: 'Consumer Discretionary', icon: <FaShoppingBasket />, subSectors: ['Automobiles', 'Household Durables', 'Leisure Products'] },
  { name: 'Consumer Staples', icon: <FaAppleAlt />, subSectors: ['Beverages', 'Food Products', 'Tobacco'] },
  { name: 'Health Care', icon: <FaHeartbeat />, subSectors: ['Health Care Equipment', 'Biotechnology', 'Pharmaceuticals'] },
  { name: 'Financials', icon: <FaPiggyBank />, subSectors: ['Banks', 'Insurance', 'Investment Funds'] },
  { name: 'Information Technology', icon: <FaLaptopCode />, subSectors: ['Software', 'Hardware', 'Semiconductors'] },
  { name: 'Communication Services', icon: <FaSatelliteDish />, subSectors: ['Telecommunications', 'Media'] },
  { name: 'Utilities', icon: <FaPlug />, subSectors: ['Electric Utilities', 'Gas Utilities'] },
  { name: 'Real Estate', icon: <FaHome />, subSectors: ['REITs', 'Real Estate Management'] },
];

const MagnifyingGlassAnimated = () => {
  const [clicked, setClicked] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [subSectors, setSubSectors] = useState([]);

  const { backgroundScale, backgroundOpacity } = useSpring({
    backgroundScale: clicked ? 1.5 : 1,
    backgroundOpacity: clicked ? 0 : 1,
    config: { tension: 200, friction: 20 },
  });

  const { progress } = useSpring({
    loop: true,
    from: { progress: 0 },
    to: { progress: 2 * Math.PI },
    config: { duration: 4000 },
    reset: true,
  });

  const { industryTransform, industryScale } = useSpring({
    industryTransform: selectedIndustry ? 'translate(-30%, -50%) translateX(-50vw)' : 'translate(0px, 0px)',
    industryScale: selectedIndustry ? 2.9 : 1,
    config: { tension: 200, friction: 18 },
  });

  const handleIndustryClick = (industry) => {
    setSelectedIndustry(industry);
    setSubSectors(industry.subSectors);
  };

  const handleClick = () => {
    setClicked(true);
  };

  return (
    <div className="relative flex justify-center items-center h-screen w-screen overflow-hidden bg-gray-100">
      <animated.img
        src="graph.svg"
        alt="Background graph"
        style={{
          transform: backgroundScale.to((s) => `scale(${s})`),
          opacity: backgroundOpacity,
        }}
        className="absolute w-1/2 h-1/2 mb-16 object-contain"
      />
      {!clicked && (
        <animated.img
          src="magnifying-glass.svg"
          alt="Magnifying glass"
          onClick={handleClick}
          style={{
            transform: interpolate([progress, industryScale], (t, s) => {
              const a = 50;
              const x = (a * Math.sqrt(2) * Math.cos(t)) / (Math.sin(t) * Math.sin(t) + 1);
              const y = (a * Math.sqrt(2) * Math.cos(t) * Math.sin(t)) / (Math.sin(t) * Math.sin(t) + 1);
              return `translate(${x}px, ${y}px) scale(${s})`;
            }),
          }}
          className="absolute z-10 w-24 h-24 cursor-pointer"
        />
      )}
      {clicked && (
        <div className="flex flex-row flex-wrap gap-x-32 gap-y-24 px-64">
          {industries.map((industry, index) => (
            <animated.div
              key={index}
              className={`flex flex-col items-center p-4 border border-gray-300 cursor-pointer rounded-full
                 w-36 h-36 justify-center text-center bg-white shadow-md z-10 hover:border-4 hover:border-blue-500 hover:bg-blue-100 ${
                   selectedIndustry && selectedIndustry.name !== industry.name
                     ? "hidden"
                     : "relative"
                 } ${
                selectedIndustry?.name === industry.name
                  ? "border-4 border-blue-500 bg-blue-100 shadow-2xl transform scale-110"
                  : "border border-gray-300 bg-white shadow-md"
              }`}
              onClick={() => handleIndustryClick(industry)}
              style={{
                transform:
                  selectedIndustry?.name === industry.name
                    ? industryTransform
                    : "translate(0px, 0px)",
                scale:
                  selectedIndustry?.name === industry.name ? industryScale : 1,
                position:
                  selectedIndustry?.name === industry.name
                    ? "absolute"
                    : "relative",
                top: selectedIndustry?.name === industry.name ? "50%" : "auto",
                left: selectedIndustry?.name === industry.name ? "50%" : "auto",
              }}
            >
              <div
                className={`text-3xl mb-2 ${
                  selectedIndustry?.name === industry.name ? "ml-8 mt-4" : ""
                }`}
              >
                {industry.icon}
              </div>
              <div
                className={`text-sm ${
                  selectedIndustry?.name === industry.name ? "hidden" : ""
                }`}
              >
                {industry.name}
              </div>
            </animated.div>
          ))}
          {selectedIndustry && (
            <div className="absolute text-lg font-semibold mt-8">
              Sub-Sectors:
              {subSectors.map((sub, idx) => (
                <div key={idx} className="mt-1">
                  {sub}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MagnifyingGlassAnimated;
