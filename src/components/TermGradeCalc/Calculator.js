import React from "react";
import CalculatorForm from "./CalculatorForm";
import Result from "./Result";
import Table from "./Table";
import Indicator from "./Indicator";
import Alert from "react-s-alert";
import Instructions from "./Instructions";
import styles from "./styles/Calculator.module.css";
import Masonry from "react-masonry-css";

const EX_COEFF = 0.3;

const breakpointColumnsObj = {
  default: 2,
  850: 1,
};

const scoreWithCoeffCount = (score, coefficient1, coefficient2) => {
  return Math.round(score * coefficient1 * coefficient2 * 10000) / 10000;
};

const ExamScoreWithCoeffCount = (termsInfo) => {
  let ExamScore = 100;
  for (let index = 0; index < termsInfo.length; index++) {
    ExamScore =
      Math.round((ExamScore - termsInfo[index].scoreWithCoeff) * 10000) / 10000;
  }
  return (Math.round(ExamScore * 100) / 100).toFixed(2);
};

//добавить изменяемый коэффициент2
const ExamScoreCount = (x, CanBeDowngrade, CanBeIncreased, coeff2) => {
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
          return (x / coeff2).toFixed(2);
        }
      }
    } else {
      if (x > 32) {
        return ":(";
      } else {
        if (x <= 21) {
          return ":)";
        } else {
          return (x / coeff2).toFixed(2);
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
          return (x / coeff2).toFixed(2);
        }
      }
    } else {
      if (x > 30) {
        return ":(";
      } else {
        if (x <= 21) {
          return ":)";
        } else {
          return (x / coeff2).toFixed(2);
        }
      }
    }
  }
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
          coefficient2: 1 - EX_COEFF,
          scoreWithCoeff: 0.0,
        },
      ],
      CanBeDowngrade: false,
      CanBeIncreased: false,
    };
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

  AddTermButtonHandle() {
    if (this.state.termsInfo.length < 5) {
      let termsInfo = this.state.termsInfo.slice(0);

      termsInfo.push({
        num: termsInfo.length + 1,
        score: 0.0,
        coefficient1: 1,
        coefficient2: 1 - EX_COEFF,
        scoreWithCoeff: 0.0,
      });

      for (let index = 0; index < termsInfo.length; index++) {
        termsInfo[index].coefficient1 = (1 / termsInfo.length).toFixed(4);
        termsInfo[index].scoreWithCoeff = scoreWithCoeffCount(
          termsInfo[index].score,
          termsInfo[index].coefficient1,
          termsInfo[index].coefficient2
        );
      }

      this.setState({
        termsInfo: termsInfo,
      });
    } else {
      Alert.warning("В таблице максимальное количество семестров", {
        position: "top-right",
        effect: "slide",
        timeout: 5000,
      });
    }
  }

  RemoveTermButtonHandle() {
    if (this.state.termsInfo.length > 1) {
      let termsInfo = this.state.termsInfo.slice(0);
      termsInfo.pop();

      for (let index = 0; index < termsInfo.length; index++) {
        termsInfo[index].coefficient1 = (1 / termsInfo.length).toFixed(4);
        termsInfo[index].scoreWithCoeff = scoreWithCoeffCount(
          termsInfo[index].score,
          termsInfo[index].coefficient1,
          termsInfo[index].coefficient2
        );
      }

      this.setState({
        termsInfo: termsInfo,
      });
    } else {
      Alert.warning("В таблице минимальное количество семестров", {
        position: "top-right",
        effect: "slide",
        timeout: 5000,
      });
    }
  }

  ScoreChangeHandle(score, id) {
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

    newTermsInfo[id].scoreWithCoeff = scoreWithCoeffCount(
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
    newTermsInfo[index].scoreWithCoeff = scoreWithCoeffCount(
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
      Alert.error("Сумма коэффициентов не может быть больше 1", {
        position: "top-right",
        effect: "slide",
        timeout: 5000,
      });

      coefficient = 0;
    }

    newTermsInfo[index].coefficient1 = coefficient;
    newTermsInfo[index].scoreWithCoeff = scoreWithCoeffCount(
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
        <Instructions />
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

        <Masonry
          breakpointCols={breakpointColumnsObj}
          className={styles.myMasonryGrid}
          columnClassName={styles.myMasonryGridColumn}
        >
          <Result
            mark="5"
            score={ExamScoreCount(
              ExamScoreWithCoeffCount(termsInfo) - 10,
              this.state.CanBeDowngrade,
              this.state.CanBeIncreased,
              EX_COEFF
            )}
            scoreWithCoeff={(ExamScoreWithCoeffCount(termsInfo) - 10).toFixed(
              2
            )}
          />

          <Result
            mark="4"
            score={ExamScoreCount(
              ExamScoreWithCoeffCount(termsInfo) - 20,
              this.state.CanBeDowngrade,
              this.state.CanBeIncreased,
              EX_COEFF
            )}
            scoreWithCoeff={(ExamScoreWithCoeffCount(termsInfo) - 20).toFixed(
              2
            )}
          />
        </Masonry>

        <div className={styles.colorExplainBlock}>
          <h3>Пояснение к цветам</h3>
          <div className={styles.colorExplainInner}>
            <div className={styles.colorExplain}>
              <Indicator score={25} />
              <p className={styles.explanation}>
                — баллы можно получить без изменения ИР на 2%
              </p>
            </div>
            <div className={styles.colorExplain}>
              <Indicator score={20} />
              <p className={styles.explanation}>
                — баллы можно получить с изменением ИР на 2%
              </p>
            </div>
            <div className={styles.colorExplain}>
              <Indicator score={18} />
              <p className={styles.explanation}>
                — такое количество баллов нельзя получить. Никак
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export {
  Calculator,
  scoreWithCoeffCount,
  ExamScoreWithCoeffCount,
  ExamScoreCount,
};
