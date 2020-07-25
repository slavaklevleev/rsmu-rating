import React from "react";
import styles from "./styles/Infoblock.module.css";
import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
    default: 3,
    1300: 2,
    850: 1,
  };
class Instructions extends React.Component {
  
  render() {
    return (
      <div className={styles.infoblockContainer}>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className={styles.myMasonryGrid}
          columnClassName={styles.myMasonryGridColumn}
        >
          <div className={styles.infoblock}>
          <div className={styles.header}>Что это?</div>
          <div className={styles.content}>
            <p>
              Это веб-приложение, которое поможет понять, сколько баллов на
              экзамене Вам нужно набрать, чтобы получить желаемую оценку.
            </p>
          </div>
        </div>
        <div className={styles.infoblock}>
          <div className={styles.header}>Где подсчеты?</div>
          <div className={styles.content}>
            <p>
              На этой странице есть 2 кнопки - «Оценка за экзамен» и «Итоговая
              оценка». При нажатии на эти кнопки Вы можете открыть или скрыть
              калькулятор.
            </p>
          </div>
        </div>
        <div className={styles.infoblock}>
          <div className={styles.header}>Какие данные нужны?</div>
          <div className={styles.content}>
            <p>
              Для калькулятора «Оценка за экзамен» Вам нужно ввести балл,
              максимальный балл и весовой коэффициент.
            </p>
            <p>
              Для калькулятора «Итоговая оценка» Вам нужно вписать количество
              баллов и весовой коэффициент для каждого семестра.
            </p>
          </div>
        </div>
        <div className={styles.infoblock}>
          <div className={styles.header}>
            Изменение итогового <br/>рейтинга на 2%
          </div>
          <div className={styles.content}>
            <p>Если Вы набираете меньше 70% за семестры, то Вас отчисляют.</p>
            <p>
              Если Вы набираете меньше 70% за ответ на экзамене, то Вас
              отправляют на комиссию, вне зависимости от рейтинга за семестры.
            </p>
            <p>
              В системе предусмотрено добавление или вычитание 2% из итогового
              рейтинга.
            </p>
          </div>
        </div>
        <div className={styles.infoblock}>
          <div className={styles.header}>Полезные ссылки</div>
          <div className={styles.content}>
            <ul>
              <li>
                <a href="http://rsmu.ru/fileadmin/rsmu/img/about_rsmu/normativn_documents/kontrol_uspevaemosti/Polozhenie_o_BRS.pdf?bustcache=1590836026473">
                  Положение о БРС
                </a>
              </li>
              <li>
                <a href="https://ks.rsmu.ru/">Кабинет студента</a>
              </li>
              <li>
                <a href="https://vk.com/ciom_rnimu">Ссылка на группу</a>
              </li>
              <li>
                <a href="https://t.me/magetm">Связаться с автором в Telegram</a>
              </li>
            </ul>
          </div>
        </div>
        </Masonry>
        
      </div>
    );
  }
}

export default Instructions;
