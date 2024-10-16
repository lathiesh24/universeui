import React from "react";
import {Route, Routes } from "react-router-dom";
import OrbitingSubsectors from "./OrbitingSubsectors";
import MobileOrbit from "./MobileOrbit";
import SubSectors from "./SubSectors";
import CurvedLineUp from "./CurvedLineUp";
import StartupInfo from "./StartupInfo";
import Homepage from "./Homepage";
import UsecaseDescription from "./UsecaseDescription";
import Ecosystem from "./EcoSystem";
import Usecase from "./Usecase";
import EcosystemWeb from "./EcosystemWeb";
import StartupsWeb from "./StartupsWeb";
import WebCircleOne from "./WebCircleOne";
import WebCircleTwo from "./WebCircleTwo";
import WebCircleThree from "./WebCircleThree";
import WebCombined from "./WebCombined";
import WebIndustries from "./WebIndustries";
import WebUsecases from "./WebUsecases";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<Homepage />} />
        <Route path="/subsectors" exact element={<SubSectors />} />
        <Route path="/orbiting-subsectors" element={<OrbitingSubsectors />} />
        <Route path="/mobile-orbit" element={<MobileOrbit />} />
        <Route path="/curved-lineup" element={<CurvedLineUp />} />
        <Route path="/startup-info" element={<StartupInfo />} />
        <Route path="/usecase-description" element={<UsecaseDescription />} />
        <Route path="/ecosystem" element={<Ecosystem />} />
        <Route path="/usecase" element={<Usecase/>}/>
        <Route path="/ecosystem-web" element={<EcosystemWeb />} />
        <Route path="/startup" element={<StartupsWeb/>} />
        <Route path="/webone" element={<WebCircleOne/>} />
        <Route path="/webtwo" element={<WebCircleTwo/>} />
        <Route path="/webthree" element={<WebUsecases/>}/>
        <Route path="/webtrends" element={<WebIndustries/>} />
      </Routes>
    </div>
  );
};

export default App;
