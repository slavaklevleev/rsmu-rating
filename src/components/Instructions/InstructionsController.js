import React, { useState } from "react";
import Instructions from "./Instructions";
import styles from "./../../Controllers.module.css";

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
      <div className={styles.controller}>
        <button onClick={switchShowState} type="submit">
          {" "}
          Общая информация{" "}
        </button>
      </div>
      {showState.show && <Instructions />}
    </div>
  );
};

export default InstructionsController;
