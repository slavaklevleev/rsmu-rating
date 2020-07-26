import React from "react";
import styles from "./styles/Instructions.module.css";
import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
  default: 2,
  850: 1,
};

const Instructions = () => {
  return (
    <div className={styles.infoblockContainer}>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={styles.myMasonryGrid}
        columnClassName={styles.myMasonryGridColumn}
      >
        <div className={styles.infoblock}>
          <div className={styles.header}>Инструкции</div>
          <div className={styles.content}>
            <ol>
              <li>
                Откройте в кабинете студента вкладку &#34;Экзаменационный
                рейтинг&#34;.
              </li>
              <li>
                Внесите максимальный балл (указаны в скобках) за все виды
                контроля и их весовые коэффициенты в таблицу выше.
              </li>
              <li>
                Изменяйте значения в столбце с баллами до получения необходимой
                оценки.
              </li>
            </ol>
          </div>
        </div>

        <div className={styles.infoblock}>
          <div className={styles.header}>Примечения</div>
          <div className={styles.content}>
            <p>
              Для расчётов неважно, как называются виды контроля. Здесь
              предусмотрен расчёт, если в экзамене от двух (например, УО и П) до
              четырёх видов контроля (ПО, УО, Т и П).
            </p>
            <p>
              Если Вы хотите, чтобы выбранный вид контроля не учитывался, просто
              поставьте нули.
            </p>
          </div>
        </div>
      </Masonry>
    </div>
  );
};

export default Instructions;
