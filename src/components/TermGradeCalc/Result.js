import React from "react";
import ResultInterpretetion from "./ResultInterpretetion";
import Indicator from "./Indicator"

const BLOCK_STYLE = {
  border: "2px solid silver",
  borderRadius: "5px",
  padding: "15px",
  margin: "15px",
  width: "min-content",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "center",
};

const RESULT_BLOCK_STYLE = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
};

const MARK_STYLE = {
  fontSize: "72px",
  marginRight: "25px",
};

const MARK_BLOCK_STYLE = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "250px",
};

const Result = ({ mark, score, scoreWithCoeff }) => (
  <div style={BLOCK_STYLE}>
    <div style={RESULT_BLOCK_STYLE}>
      <div style={MARK_STYLE}>«{mark}»</div>
      <div>
        <div style={MARK_BLOCK_STYLE}>
          <p>Балл за экзамен</p>
          <p>{score}</p>
        </div>
        <div style={MARK_BLOCK_STYLE}>
          <p>
            Балл за экзамен c учетом <br /> вессового коэффициента
          </p>
          <p>{scoreWithCoeff}</p>
          <Indicator score = {scoreWithCoeff} />
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
