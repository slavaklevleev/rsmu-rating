import React from "react";
import styles from "./Result.module.css";
import PropTypes from "prop-types";

const Result = ({ mark30, mark100, prediction }) => (
    <div>
      <p>Оценка по 30-ти бальной шкале: {mark30}</p>
      <p>Оценка по 100 бальной шкале: {mark100}</p>
      <p>Как могут изменить Ваш итоговый рейтинг: {prediction}</p>
    </div>
  );
  
  Result.propTypes = {
    mark30: PropTypes.number,
    mark100: PropTypes.number,
    prediction: PropTypes.string,
  } 
  
  
  export default Result;
  