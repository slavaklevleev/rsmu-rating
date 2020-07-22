import React, { useState } from "react";
import Instructions from "./Instructions";

const InstructionsController = () => {
  const [showState, switchState] = useState({
    show: true,
  });

  const switchShowState = () => {
    switchState({
      show: !showState.show,
    });
  };

  return (
    <div>
      <button onClick={switchShowState} type="submit">
        {" "}
        Общая информация{" "}
      </button>
      {showState.show && <Instructions />}
    </div>
  );
};

export default InstructionsController;
