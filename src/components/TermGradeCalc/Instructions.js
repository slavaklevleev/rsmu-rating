import React from "react";
import styles from "./styles/Instructions.module.css";

const Instructions = () => {
  return (
    <div className={styles.infoblock}>
      <div className={styles.header}>
        <h3>Инструкции</h3>
      </div>
      <div className={styles.content}>
        <ul>
          <li>
            Откройте в кабинете студента вкладку &#34;Экзаменационный
            рейтинг&#34;.
          </li>
          <li>
            Найдите строчку с указанием семестра и перенесите из него баллы и
            весовой коэффициет в соответствующие ячейки.
          </li>
          <li>Настройте возможность повышения или понижения ИР.</li>
        </ul>
      </div>
    </div>
  );
};

export default Instructions;
