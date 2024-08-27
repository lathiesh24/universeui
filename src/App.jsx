import React from "react";
import {Route, Routes } from "react-router-dom";
import OrbitingSubsectors from "./OrbitingSubsectors";
import MobileOrbit from "./MobileOrbit";
import Practice from "./Practice";
import Homepage from "./Homepage";
import CurvedLineUp from "./CurvedLineUp";

const App = () => {
  return (
      <div>
        <Routes>
          <Route path="/" exact element={<Homepage/>}/>
          <Route path="/orbiting-subsectors" element={<OrbitingSubsectors />} />
          <Route path="/mobile-orbit" element={<MobileOrbit />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/curved-lineup" element={<CurvedLineUp/>}/>
        </Routes>
      </div>
  );
};

export default App;
