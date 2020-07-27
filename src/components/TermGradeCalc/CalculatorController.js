import React, { useState } from "react";
import { Calculator } from "./Calculator";
import styles from "./../../Controllers.module.css";

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
      <div className={styles.controller}>
        <button onClick={switchShowState} type="submit">
          {" "}
          Итоговая оценка{" "}
        </button>
      </div>

      {showState.show && <Calculator />}
    </div>
  );
};

export default CalculatorController;
