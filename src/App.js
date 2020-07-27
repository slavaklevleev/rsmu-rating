import React from "react";
import CalculatorController from "./components/TermGradeCalc/CalculatorController";
import InstructionsController from "./components/Instructions/InstructionsController";
import ExamCalcController from "./components/ExamCalc/ExamCalcController";
import styles from "./App.module.css";
import "./button.module.css";
import { ToastContainer, toast } from "react-toastify";
import "./ReactToastify.css";

toast.configure({
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
});

function App() {
  return (
    <div className="App">
      <div className={styles.header}>
        <h1 className={styles.h1}>БРС: Экзаменационный рейтинг</h1>
      </div>
      <InstructionsController />
      <ExamCalcController />
      <CalculatorController />
      <ToastContainer limit={3}/>
    </div>
  );
}

export default App;
