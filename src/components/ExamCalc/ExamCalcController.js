import React, { useState } from "react";
import ExamCalc from "./ExamCalc";
import styles from "./../../Controllers.module.css";

const ExamCalcController = () => {
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
      <div className={styles.controller}>
        <button onClick={switchShowState} type="submit">
          {" "}
          Оценка за экзамен{" "}
        </button>
      </div>

      {showState.show && <ExamCalc />}
    </div>
  );
};

export default ExamCalcController;
