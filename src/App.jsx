import React from "react";
import {Route, Routes } from "react-router-dom";
import OrbitingSubsectors from "./OrbitingSubsectors";
import MobileOrbit from "./MobileOrbit";
import Practice from "./Practice";
import SubSectors from "./SubSectors";
import CurvedLineUp from "./CurvedLineUp";
import StartupInfo from "./StartupInfo";
import Usecases from "./Usecases";
import Sectors from "./Sectors";
import Homepage from "./Homepage";
import SubIndustries from "./SubIndustries";

const App = () => {
  return (
      <div>
        <Routes>
          <Route path="/" exact element={<Homepage/>} />
          <Route path="/subsectors" exact element={<SubSectors/>}/>
          <Route path="/orbiting-subsectors" element={<OrbitingSubsectors />} />
          <Route path="/mobile-orbit" element={<MobileOrbit />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/curved-lineup" element={<CurvedLineUp/>}/>
          <Route path="/startup-info" element={<StartupInfo />} />
          <Route path="/usecases" element={<Usecases />} />
          <Route path="/sectors" element={<Sectors />} />
          <Route path = "/sub-industries" element={<SubIndustries/>} />s
        </Routes>
      </div>
  );
};

export default App;
