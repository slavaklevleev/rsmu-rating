import React from "react";
import "./Calculator.css";

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.AddTermButtonHandle = this.AddTermButtonHandle.bind(this);
    this.RemoveTermButtonHandle = this.RemoveTermButtonHandle.bind(this);
    this.CanBeDowngradeHandle = this.CanBeDowngradeHandle.bind(this);
    this.CanBeIncreasedHandle = this.CanBeIncreasedHandle.bind(this);

    this.state = {
      termsInfo: [
        {
          num: 1,
          score: 0.0,
          coefficient1: 1.0,
          coefficient2: 0.7,
          scoreWithCoeff: 0.00,
        },
      ],
      CanBeDowngrade: false,
      CanBeIncreased: false,
    };
  }

  scoreWithCoeffCount(score, coefficient1, coefficient2) {
    return (
      Math.round(score * coefficient1 * coefficient2 * 10000) / 10000
    );
  }

  ExamScoreWithCoeffCount(termsInfo) {
    let ExamScore = 100;
    for (let index = 0; index < termsInfo.length; index++) {
      ExamScore = Math.round((ExamScore - termsInfo[index].scoreWithCoeff) * 10000) / 10000;
      console.log(ExamScore, Math.round(termsInfo[index].scoreWithCoeff * 10000) / 10000)
    }
    return (Math.round(ExamScore * 100) / 100).toFixed(2);
  }

  ExamScoreCount(x, CanBeDowngrade, CanBeIncreased) {
    // let x = this.ExamScore5WithCoeffCount(termsInfo);
    if (CanBeIncreased) {
      //возможность повышения
      if (CanBeDowngrade) {
        //возможность понижения
        if (x > 32) {
          return ":(";
        } else {
          if (x <= 19) {
            return ":)";
          } else {
            return (x / 0.3).toFixed(2) + " %";
          }
        }
      } else {
        if (x > 32) {
          return ":(";
        } else {
          if (x <= 21) {
            return ":)";
          } else {
            return (x / 0.3).toFixed(2) + " %";
          }
        }
      }
    } else {
      if (CanBeDowngrade) {
        //возможность понижения
        if (x > 30) {
          return ":(";
        } else {
          if (x <= 19) {
            return ":)";
          } else {
            return (x / 0.3).toFixed(2) + " %";
          }
        }
      } else {
        if (x > 30) {
          return ":(";
        } else {
          if (x <= 21) {
            return ":)";
          } else {
            return (x / 0.3).toFixed(2) + " %";
          }
        }
      }
    }
  }

  CanBeIncreasedHandle(e) {
    this.setState({
      CanBeIncreased: e.target.checked,
    });
  }

  CanBeDowngradeHandle(e) {
    this.setState({
      CanBeDowngrade: e.target.checked,
    });
  }

  AddTermButtonHandle(e) {
    if (this.state.termsInfo.length < 5) {
      let termsInfo = this.state.termsInfo.slice(0);

      termsInfo.push({
        num: termsInfo.length + 1,
        score: 0.00,
        coefficient1: 1,
        coefficient2: 0.7,
        scoreWithCoeff: 0.00,
      });

      for (let index = 0; index < termsInfo.length; index++) {
        termsInfo[index].coefficient1 = (1 / termsInfo.length).toFixed(4);
        termsInfo[index].scoreWithCoeff = this.scoreWithCoeffCount(
          termsInfo[index].score,
          termsInfo[index].coefficient1,
          termsInfo[index].coefficient2
        );
      }

      this.setState({
        termsInfo: termsInfo,
      });
      console.log(this.state.termsInfo);
    } else {
      //Выдать ошибку
    }
  }

  RemoveTermButtonHandle(e) {
    if (this.state.termsInfo.length > 1) {
      let termsInfo = this.state.termsInfo.slice(0);
      termsInfo.pop();

      for (let index = 0; index < termsInfo.length; index++) {
        termsInfo[index].coefficient1 = (1 / termsInfo.length).toFixed(4);
        termsInfo[index].scoreWithCoeff = this.scoreWithCoeffCount(
          termsInfo[index].score,
          termsInfo[index].coefficient1,
          termsInfo[index].coefficient2
        );
      }

      this.setState({
        termsInfo: termsInfo,
      });

      console.log(this.state.termsInfo);
    } else {
      //Выдать ошибку
    }
  }

  ScoreChangeHandle(score, index) {
    if (score <= 100 && score >= 0) {
      const { termsInfo } = this.state;
      const newTermsInfo = [...termsInfo];
      newTermsInfo[index].score = score;

      newTermsInfo[index].scoreWithCoeff = this.scoreWithCoeffCount(
        newTermsInfo[index].score,
        newTermsInfo[index].coefficient1,
        newTermsInfo[index].coefficient2
      );

      this.setState({ termsInfo: newTermsInfo });
    } else {
      //ошибка
    }
  }

  CoefficientChangeHandle(coefficient, index) {
    if (coefficient <= 1 && coefficient >= 0) {
      const { termsInfo } = this.state;
      const newTermsInfo = [...termsInfo];
      newTermsInfo[index].coefficient1 = coefficient;

      //проверка на сумму > 1
      let count = 0;
      for (let i = 0; i < newTermsInfo.length; i++) {
        count += Number(newTermsInfo[i].coefficient1);
      }

      if (count > 1) {
        newTermsInfo[index].coefficient1 = 0;
      }
      newTermsInfo[index].scoreWithCoeff = this.scoreWithCoeffCount(
        newTermsInfo[index].score,
        newTermsInfo[index].coefficient1,
        newTermsInfo[index].coefficient2
      );
      this.setState({ termsInfo: newTermsInfo });
    } else {
      //ошитбка
    }
  }

  render() {
    const { termsInfo } = this.state;
    return (
      <div>
        <div className="termInfo">
          <p>Количество семестров: {this.state.termsInfo.length}</p>
          <button onClick={this.AddTermButtonHandle}>Добавить семестр</button>
          <button onClick={this.RemoveTermButtonHandle}>Убрать семестр</button>
          <div>
            <label>
              {" "}
              <input
                type="Checkbox"
                checked={this.state.CanBeIncreased}
                onChange={this.CanBeIncreasedHandle}
              />{" "}
              Учесть возможность повышения ИР
            </label>
            <label>
              {" "}
              <input
                type="Checkbox"
                checked={this.state.CanBeDowngrade}
                onChange={this.CanBeDowngradeHandle}
              />{" "}
              Учесть возможность понижения ИР
            </label>
          </div>
        </div>

        <table>
          <tr>
            <th></th>
            <th>Балл</th>
            <th>Вессовой коэф. #1</th>
            <th>Вессовой коэф. #2</th>
            <th>Балл с учетом весовых коэф.</th>
          </tr>

          {termsInfo.map((i, index) => (
            <tr>
              <th>
                <p>Семестр #{i.num}</p>
              </th>
              <td>
                <input
                  key={index}
                  type="text"
                  value={i.score}
                  onChange={(e) =>
                    this.ScoreChangeHandle(e.target.value, index)
                  }
                />
              </td>
              <td>
                <input
                  key={index}
                  type="text"
                  value={i.coefficient1}
                  onChange={(e) =>
                    this.CoefficientChangeHandle(e.target.value, index)
                  }
                />
              </td>
              <td>
                <p>{i.coefficient2}</p>
              </td>
              <td>
                <p>{i.scoreWithCoeff.toFixed(2)}</p>
              </td>
            </tr>
          ))}
        </table>

        <div>
          <div>5</div>
          <div>
            <p>
              Балл за экзамен{" "}
              <span>
                {this.ExamScoreCount(
                  this.ExamScoreWithCoeffCount(this.state.termsInfo) - 10,
                  this.state.CanBeDowngrade,
                  this.state.CanBeIncreased
                )}
              </span>
            </p>
          </div>
          <div>
            <p>
              Балл за экзамен c учетом вессового коэф.{" "}
              <span>
                {this.ExamScoreWithCoeffCount(this.state.termsInfo) - 10}
              </span>
            </p>
          </div>
        </div>

        <div>
          <div>4</div>
          <div>
            <p>
              Балл за экзамен <span>{this.ExamScoreCount(
                  this.ExamScoreWithCoeffCount(this.state.termsInfo) - 20,
                  this.state.CanBeDowngrade,
                  this.state.CanBeIncreased
                )}</span>
            </p>
          </div>
          <div>
            <p>
              Балл за экзамен c учетом вессового коэф.{" "}
              <span>
                {this.ExamScoreWithCoeffCount(this.state.termsInfo) - 20}
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
