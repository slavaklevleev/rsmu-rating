import React from "react";
import styles from "./styles/Result.module.css";
import PropTypes from "prop-types";

const Result = ({ mark30, mark100, prediction }) => (
  <div className={styles.infoblock}>
    <div className={styles.result}>
      <p>Оценка по 30-ти бальной шкале: </p>
      <p>{mark30}</p>
    </div>
    <div className={styles.result}>
      <p>Оценка по 100 бальной шкале: </p>
      <p>{mark100}</p>
    </div>
    <div className={styles.result}>
      <p>Как могут изменить Ваш <br/> итоговый рейтинг: </p>
      <p className={styles.paragraphRight}>{prediction}</p>
    </div>
  </div>
);

Result.propTypes = {
  mark30: PropTypes.number,
  mark100: PropTypes.number,
  prediction: PropTypes.string,
};

export default Result;
