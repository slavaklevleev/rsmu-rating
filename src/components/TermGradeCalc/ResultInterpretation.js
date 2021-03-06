import React from "react";
import styles from "./styles/ResultInterpretation.module.css";
import PropTypes from "prop-types";

const ResultInterpretation = ({ score }) => {
  let text = "";

  if (score === ":)") {
    text =
      "Нужно просто прийти на экзамен и сдать его на минимальный балл (70% за экзамен и вычитание 2% из итогового рейтинга)";
  } else if (score < 70) {
    text =
      "Может быть, если получить за ответ на экзамене от 21 Б с ВК (70,00% за ответ) до 23 Б с ВК (76,66% за ответ). В этом случае у Вас преподаватель может вычесть 2% из итогового рейтинга и в строке экзамена окажется значение от 19 Б с ВК до 21 Б с ВК.";
  } else if (score >= 70 && score <= 100) {
    text = "Баллы за экзамен. Соответствует диапазону от 21 до 30 Б с ВК.";
  } else if (score > 100) {
    text =
      "Может быть, если получить за ответ на экзамене 100%, написать тест при его наличии на 90%, а преподаватель согласен добавить Вам к итоговому рейтингу 2%. В этом случае за экзамен Вы можете получить до 32 Б с ВК.";
  } else {
    text =
      "Вы не можете получить оценку, даже если сдадите экзамен на 100% и преподаватель согласится повысить ваш итоговый рейтинг на 2%.";
  }
  return <p className={styles.resultInterpretation}>{text}</p>;
};

ResultInterpretation.propTypes = {
  score: PropTypes.number,
};

export default ResultInterpretation;
