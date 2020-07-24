import React from "react";
import CalculatorController from "./components/TermGradeCalc/CalculatorController";
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import InstructionsController from './components/Instructions/InstructionsController'
import ExamCalcController from './components/ExamCalc/ExamCalcController'
function App() {
  return (
    <div className="App">
      <InstructionsController />
      <ExamCalcController />
      <CalculatorController />
      <Alert stack={{limit: 3}} />
    </div>
  );
}

export default App;
