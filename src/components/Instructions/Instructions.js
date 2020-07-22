import React from "react";
import Infoblock from "./InfoBlock";

const INSTRUCTIONS_STYLE = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-around"
};

class Instructions extends React.Component {
  render() {
    return (
      <div>
        <div style={INSTRUCTIONS_STYLE}>
          <Infoblock
            header={"Что это?"}
            text={
              "Это веб-приложение, которое поможет понять, сколько баллов на экзамене Вам нужно набрать, чтобы получить желаемую оценку."
            }
          />
          <Infoblock
            header={"Где подсчеты?"}
            text={
              "На этой странице есть 2 кнопки - \"Сколько баллов за экзамен нужно набрать, чтобы получить \"5\" или \"4\"\" и \"Экзамен по 30-ти и 100 бальной шкале\". При нажатии на эти кнопки Вы можете открыть или скрыть калькулятор."
            }
          />
          <Infoblock
            header={"Какие данные нужны?"}
            text={
              "Для калькулятора … Вам нужно ввести … .Для калькулятора «Сколько баллов за экзамен нужно набрать, чтобы получить «5» или «4»» Вам нужно вписать количество баллов и весовой коэффициент для каждого семестра."
            }
          />
          <Infoblock
            header={"Изменение итогового рейтинга на 2%"}
            text={
              "Если Вы набираете меньше 70% за семестры, то Вас отчисляют. Если Вы набинаете меньше 70% за ответ на экзамене, то Вас отправляют на комиссию, вне зависимости от рейтинга за семестры. В системе предусмотрено добавление или вычитание 2% из итогового рейтинга. С условиями Вы можете ознакомиться на вкладках семестров."
            }
          />
        </div>

        <h3>Полезные ссылки</h3>
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
    );
  }
}

export default Instructions;
