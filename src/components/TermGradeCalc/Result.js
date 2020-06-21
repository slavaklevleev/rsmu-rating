import React from "react";
import ResultInterpretetion from "./ResultInterpretetion";

const Result = ({ mark, score, scoreWithCoeff }) => (
  <div>
    <div>
      <div>«{mark}»</div>
      <div>
        <div>
          <p>Балл за экзамен</p>
          <p>{score}</p>
        </div>
        <div>
          <p>
            Балл за экзамен c учетом <br /> вессового коэффициента
          </p>
          <p>{scoreWithCoeff}</p>
        </div>
      </div>
    </div>
    <div>
    <h3>Трактовка результа</h3>
      <ResultInterpretetion score={score} />
    </div>
  </div>
);

export default Result;
