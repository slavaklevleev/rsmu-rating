import React from "react";
import ResultInterpretation from "./ResultInterpretation";
import Indicator from "./Indicator";
import PropTypes from "prop-types";
import styles from "./styles/Result.module.css";

const Result = ({ mark, score, scoreWithCoeff }) => (
  <div className={styles.resultBlock}>
      <div className={styles.mark}>«{mark}»</div>
      <div className={styles.score} id="score">
        <p>Балл за экзамен</p>
        <p>{score}</p>
      </div>
      <div className={styles.scoreWithCoeff} id="scoreWithCoeff">
        <p>
          Балл за экзамен c учетом вессового коэффициента
        </p>
        <p>{scoreWithCoeff}</p>
        <Indicator score={scoreWithCoeff} />
      </div>
    <div className={styles.resultInterpretetion}>
      <h3 className={styles.header}>Трактовка результа</h3>
      <ResultInterpretation score={score} />
    </div>
  </div>
);

Result.propTypes = {
  mark: PropTypes.number,
  score: PropTypes.number,
  scoreWithCoeff: PropTypes.number,
};

export default Result;
