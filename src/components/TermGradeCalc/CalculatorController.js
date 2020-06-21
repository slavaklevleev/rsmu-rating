import React, { useState } from 'react';
import Calculator from './Calculator';

const PetrovSDController = () => {
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
      <button onClick={switchShowState} type="submit"> Сколько баллов за экзамен нужно набрать, чтобы получить «5» или «4» </button>
      {showState.show && <Calculator />}
    </div>
  );
};

export default PetrovSDController;
