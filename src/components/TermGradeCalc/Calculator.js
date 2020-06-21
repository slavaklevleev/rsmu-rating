import React from "react";
import CalculatorForm from "./CalculatorForm";
import Result from "./Result";
import Table from "./Table";

//--------------------------------TO-DO--------------------------------
// --- Предупреддение о том, что сумма коэфф > 1
// --- Предупреждение о том, что количество семместров макс или мин
// --- Изменение цветов
// --- Стили
//---------------------------------------------------------------------

const RESULT_STYLE = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  flexWrap: "wrap",
};

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.AddTermButtonHandle = this.AddTermButtonHandle.bind(this);
    this.RemoveTermButtonHandle = this.RemoveTermButtonHandle.bind(this);
    this.ScoreChangeHandle = this.ScoreChangeHandle.bind(this);
    this.CoefficientChangeHandle = this.CoefficientChangeHandle.bind(this);
    this.CanBeDowngradeHandle = this.CanBeDowngradeHandle.bind(this);
    this.CanBeIncreasedHandle = this.CanBeIncreasedHandle.bind(this);

    this.state = {
      termsInfo: [
        {
          num: 1,
          score: 0.0,
          coefficient1: 1.0,
          coefficient2: 0.7,
          scoreWithCoeff: 0.0,
        },
      ],
      CanBeDowngrade: false,
      CanBeIncreased: false,
    };
  }

  scoreWithCoeffCount(score, coefficient1, coefficient2) {
    return Math.round(score * coefficient1 * coefficient2 * 10000) / 10000;
  }

  ExamScoreWithCoeffCount(termsInfo) {
    let ExamScore = 100;
    for (let index = 0; index < termsInfo.length; index++) {
      ExamScore =
        Math.round((ExamScore - termsInfo[index].scoreWithCoeff) * 10000) /
        10000;
      console.log(
        ExamScore,
        Math.round(termsInfo[index].scoreWithCoeff * 10000) / 10000
      );
    }
    return (Math.round(ExamScore * 100) / 100).toFixed(2);
  }

  ExamScoreCount(x, CanBeDowngrade, CanBeIncreased) {
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
            return (x / 0.3).toFixed(2);
          }
        }
      } else {
        if (x > 32) {
          return ":(";
        } else {
          if (x <= 21) {
            return ":)";
          } else {
            return (x / 0.3).toFixed(2);
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
            return (x / 0.3).toFixed(2);
          }
        }
      } else {
        if (x > 30) {
          return ":(";
        } else {
          if (x <= 21) {
            return ":)";
          } else {
            return (x / 0.3).toFixed(2);
          }
        }
      }
    }
  }

  CanBeIncreasedHandle(CanBeIncreased) {
    this.setState({
      CanBeIncreased: CanBeIncreased,
    });
  }

  CanBeDowngradeHandle(CanBeDowngrade) {
    this.setState({
      CanBeDowngrade: CanBeDowngrade,
    });
  }

  AddTermButtonHandle(e) {
    if (this.state.termsInfo.length < 5) {
      let termsInfo = this.state.termsInfo.slice(0);

      termsInfo.push({
        num: termsInfo.length + 1,
        score: 0.0,
        coefficient1: 1,
        coefficient2: 0.7,
        scoreWithCoeff: 0.0,
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

  ScoreChangeHandle(score, id) {
    console.log(this.state.termsInfo);
    if (score <= 100 && score >= 0) {
      const { termsInfo } = this.state;
      const newTermsInfo = [...termsInfo];
      newTermsInfo[id].score = score;

      newTermsInfo[id].scoreWithCoeff = this.scoreWithCoeffCount(
        newTermsInfo[id].score,
        newTermsInfo[id].coefficient1,
        newTermsInfo[id].coefficient2
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

      // if (count > 1) {
      //   newTermsInfo[index].coefficient1 = 0;
      // }
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
        <CalculatorForm
          TermNumber={termsInfo.length}
          CanBeDowngrade={this.state.CanBeDowngrade}
          CanBeIncreased={this.state.CanBeIncreased}
          onAddTermButtonClick={this.AddTermButtonHandle}
          onRemoveTermButtonClick={this.RemoveTermButtonHandle}
          onCanBeDowngradeChange={this.CanBeDowngradeHandle}
          onCanBeIncreasedChange={this.CanBeIncreasedHandle}
        />

        <Table
          termsInfo={termsInfo}
          onScoreChange={this.ScoreChangeHandle}
          onCoefficientChange={this.CoefficientChangeHandle}
        />

        <div style={RESULT_STYLE}>
          <Result
            mark="5"
            score={this.ExamScoreCount(
              this.ExamScoreWithCoeffCount(termsInfo) - 10,
              this.state.CanBeDowngrade,
              this.state.CanBeIncreased
            )}
            scoreWithCoeff={(
              this.ExamScoreWithCoeffCount(termsInfo) - 10
            ).toFixed(2)}
          />

          <Result
            mark="4"
            score={this.ExamScoreCount(
              this.ExamScoreWithCoeffCount(termsInfo) - 20,
              this.state.CanBeDowngrade,
              this.state.CanBeIncreased
            )}
            scoreWithCoeff={(
              this.ExamScoreWithCoeffCount(termsInfo) - 20
            ).toFixed(2)}
          />
        </div>
      </div>
    );
  }
}

export default Calculator;
