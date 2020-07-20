import React from "react";
import CalculatorForm from "./CalculatorForm";
import Result from "./Result";
import Table from "./Table";
import Indicator from "./Indicator";
import Alert from "react-s-alert";

const RESULT_STYLE = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  flexWrap: "wrap",
};

const COLOR_EXPLAIN = {
  display: "flex",
  margin: "0px 10px",
  flexDirection: "row",
  alignItems: "center",
  width: "max-content",
};

const COLOR_EXPLAIN_BLOCK = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "auto",
};

const COLOR_EXPLAIN_INNER_BLOCK = {
  width: "80%",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-around",
  margin: "auto",
};

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.AddTermButtonHandle = this.AddTermButtonHandle.bind(this);
    this.RemoveTermButtonHandle = this.RemoveTermButtonHandle.bind(this);
    this.ScoreChangeHandle = this.ScoreChangeHandle.bind(this);
    this.CoefficientChangeHandle = this.CoefficientChangeHandle.bind(this);
    this.CoefficientBlurHandle = this.CoefficientBlurHandle.bind(this);
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
      Alert.warning("В таблице максимальное количество семестров", {
        position: "top-right",
        effect: "slide",
        timeout: 5000,
      });
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
      Alert.warning("В таблице минимальное количество семестров", {
        position: "top-right",
        effect: "slide",
        timeout: 5000,
      });
    }
  }

  ScoreChangeHandle(score, id) {
    console.log(this.state.termsInfo);
    const { termsInfo } = this.state;
    const newTermsInfo = [...termsInfo];

    if (score > 100) {
      Alert.error("Количество баллов не может быть больше 100", {
        position: "top-right",
        effect: "slide",
        timeout: 5000,
      });

      score = 100;
    }

    if (score < 0) {
      Alert.error("Количество баллов не может быть меньше 0", {
        position: "top-right",
        effect: "slide",
        timeout: 5000,
      });

      score = 0;
    }

    newTermsInfo[id].score = score;

    newTermsInfo[id].scoreWithCoeff = this.scoreWithCoeffCount(
      newTermsInfo[id].score,
      newTermsInfo[id].coefficient1,
      newTermsInfo[id].coefficient2
    );

    this.setState({ termsInfo: newTermsInfo });
  }

  CoefficientChangeHandle(coefficient, index) {
    const { termsInfo } = this.state;
    const newTermsInfo = [...termsInfo];

    if (coefficient > 1) {
      Alert.error("Коэффициент не может быть больше 1", {
        position: "top-right",
        effect: "slide",
        timeout: 5000,
      });

      coefficient = 1;
    }

    if (coefficient < 0) {
      Alert.error("Коэффициент не может быть меньше 0", {
        position: "top-right",
        effect: "slide",
        timeout: 5000,
      });

      coefficient = 0;
    }

    newTermsInfo[index].coefficient1 = coefficient;
    newTermsInfo[index].scoreWithCoeff = this.scoreWithCoeffCount(
      newTermsInfo[index].score,
      newTermsInfo[index].coefficient1,
      newTermsInfo[index].coefficient2
    );
    this.setState({ termsInfo: newTermsInfo });
  }

  CoefficientBlurHandle(coefficient, index) {
    const { termsInfo } = this.state;
    const newTermsInfo = [...termsInfo];

    let count = 0;
    for (let i = 0; i < newTermsInfo.length; i++) {
      count += Number(newTermsInfo[i].coefficient1);
    }

    if (count > 1) {
      console.log("blur");

      Alert.error("Сумма коэффициентов не может быть больше 1", {
        position: "top-right",
        effect: "slide",
        timeout: 5000,
      });

      coefficient = 0;
    }

    newTermsInfo[index].coefficient1 = coefficient;

    newTermsInfo[index].scoreWithCoeff = this.scoreWithCoeffCount(
      newTermsInfo[index].score,
      newTermsInfo[index].coefficient1,
      newTermsInfo[index].coefficient2
    );
    this.setState({ termsInfo: newTermsInfo });
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
          onCoefficientBlur={this.CoefficientBlurHandle}
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

        <div style={COLOR_EXPLAIN_BLOCK}>
          <h3>Пояснение к цветам</h3>
          <div style={COLOR_EXPLAIN_INNER_BLOCK}>
            <div style={COLOR_EXPLAIN}>
              <Indicator score={25} />
              <p>— баллы можно получить без изменения ИР на 2%</p>
            </div>
            <div style={COLOR_EXPLAIN}>
              <Indicator score={20} />
              <p>— баллы можно получить с изменением ИР на 2%</p>
            </div>
            <div style={COLOR_EXPLAIN}>
              <Indicator score={18} />
              <p>— такое количество баллов нельзя получить. Никак</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
