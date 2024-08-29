import React from "react";
import UsecasesArc from "./UsecasesArc";
import Usecases from "./Usecases";

const CombinedComponent = () => {
  return (
    <div className="flex flex-col justify-between h-screen">
      {/* UsecasesAec arc at the top */}
      <div className="flex-grow-0 ">
        <UsecasesArc />
      </div>

      {/* Usecases component at the bottom */}
      <div className="flex-grow-0 pb-32">
        <Usecases />
      </div>
    </div>
  );
};

export default CombinedComponent;
