import React, { useState } from "react";
import ExamCalc from "./ExamCalc";

const ExamCalcController = () => {
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
        Оценка за экзамен{" "}
      </button>
      {showState.show && <ExamCalc />}
    </div>
  );
};

export default ExamCalcController;
