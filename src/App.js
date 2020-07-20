import React from "react";
import CalculatorController from "./components/TermGradeCalc/CalculatorController";
import Alert from 'react-s-alert';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

function App() {
  return (
    <div className="App">
      {/* <InfoBlock /> */}
      <CalculatorController />
      <Alert stack={{limit: 3}} />
    </div>
  );
}

export default App;
