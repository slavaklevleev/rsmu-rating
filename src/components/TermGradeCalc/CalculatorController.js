import React, { useState } from "react";
import { Calculator } from "./Calculator";

const CalculatorController = () => {
  const [showState, switchState] = useState({
    show: false,
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
        Итоговая оценка{" "}
      </button>
      {showState.show && <Calculator />}
    </div>
  );
};

export default CalculatorController;
