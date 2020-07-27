import React from "react";
import Table from "./Table";
import ExamCalcForm from "./ExamCalcForm";
import Result from "./Result";
import Alert from "react-s-alert";
import Instructions from "./Instructions";
import styles from "./styles/ExamCalc.module.css";

const scoreWithCoeffCount = (score, coeff) => {
  return Math.round(score * coeff * 10000) / 10000;
};

const scoreSum = (WA, OA, T, A) => {
  return Math.round((WA + OA + T + A) * 10000) / 10000;
};

const resultCount = (score, maxScore) => {
  if (maxScore === 0) {
    return 0;
  } else {
    return Math.round((score / maxScore) * 10000) / 10000;
  }
};

const prediction = (state) => {
  const { WrittenAnswer, OralAnswer, Test, Attendance } = state;

  if (
    WrittenAnswer.coefficient +
      OralAnswer.coefficient +
      Attendance.coefficient ===
    0
  ) {
    if (Test.coefficient === 0) {
      return "Введите коэффициент";
    } else {
      if (Test.scoreWithCoeff / Test.maxScoreWithCoeff >= 0.9) {
        return "+2%";
      } else {
        if (
          resultCount(state.scoreWithCoeffSum, state.maxScoreWithCoeffSum) <=
          23 / 0.3 / 100
        ) {
          return "-2%";
        } else {
          return "~";
        }
      }
    }
  } else {
    if (Test.coefficient === 0) {
      return "";
    } else {
      if (
        Test.scoreWithCoeff / Test.maxScoreWithCoeff >= 0.9 &&
        (WrittenAnswer.scoreWithCoeff +
          OralAnswer.scoreWithCoeff +
          Attendance.scoreWithCoeff) /
          (WrittenAnswer.maxScoreWithCoeff +
            OralAnswer.maxScoreWithCoeff +
            Attendance.maxScoreWithCoeff) ===
          1
      ) {
        return "+2%";
      } else {
        if (
          resultCount(state.scoreWithCoeffSum, state.maxScoreWithCoeffSum) <=
          23 / 0.3 / 100
        ) {
          return "-2%";
        } else {
          return "~";
        }
      }
    }
  }
};

class ExamCalc extends React.Component {
  constructor(props) {
    super(props);
    this.ScoreChangeHandle = this.ScoreChangeHandle.bind(this);
    this.MaxScoreChangeHandle = this.MaxScoreChangeHandle.bind(this);
    this.CoefficientChangeHandle = this.CoefficientChangeHandle.bind(this);
    this.WrittenAnswerHandle = this.WrittenAnswerHandle.bind(this);
    this.OralAnswerHandle = this.OralAnswerHandle.bind(this);
    this.TestHandle = this.TestHandle.bind(this);
    this.AttendanceHandle = this.AttendanceHandle.bind(this);
    this.CoefficientBlurHandle = this.CoefficientBlurHandle.bind(this);
    this.CleanHandle = this.CleanHandle.bind(this);

    this.state = {
      WrittenAnswer: {
        rowName: "Письменный ответ",
        rowID: 0,
        display: true,
        score: 0,
        maxScore: 0,
        coefficient: 0,
        scoreWithCoeff: 0,
        maxScoreWithCoeff: 0,
      },
      OralAnswer: {
        rowName: "Устный ответ",
        rowID: 1,
        display: true,
        score: 0,
        maxScore: 0,
        coefficient: 0,
        scoreWithCoeff: 0,
        maxScoreWithCoeff: 0,
      },
      Test: {
        rowName: "Тест",
        rowID: 2,
        display: true,
        score: 0,
        maxScore: 0,
        coefficient: 0,
        scoreWithCoeff: 0,
        maxScoreWithCoeff: 0,
      },
      Attendance: {
        rowName: "Посещение",
        rowID: 3,
        display: true,
        score: 0,
        maxScore: 0,
        coefficient: 0,
        scoreWithCoeff: 0,
        maxScoreWithCoeff: 0,
      },
      scoreWithCoeffSum: 0,
      maxScoreWithCoeffSum: 0,
    };
  }

  WrittenAnswerHandle(WrittenAnswerDisplay) {
    let WrittenAnswer = this.state.WrittenAnswer;
    WrittenAnswer.display = WrittenAnswerDisplay;
    WrittenAnswer.score = 0;
    WrittenAnswer.maxScore = 0;
    WrittenAnswer.coefficient = 0;
    WrittenAnswer.scoreWithCoeff = 0;
    WrittenAnswer.maxScoreWithCoeff = 0;

    this.setState({
      WrittenAnswer: WrittenAnswer,
      scoreWithCoeffSum: scoreSum(
        WrittenAnswer.scoreWithCoeff,
        this.state.OralAnswer.scoreWithCoeff,
        this.state.Test.scoreWithCoeff,
        this.state.Attendance.scoreWithCoeff
      ),
      maxScoreWithCoeffSum: scoreSum(
        WrittenAnswer.maxScoreWithCoeff,
        this.state.OralAnswer.maxScoreWithCoeff,
        this.state.Test.maxScoreWithCoeff,
        this.state.Attendance.maxScoreWithCoeff
      ),
    });
  }

  OralAnswerHandle(OralAnswerDisplay) {
    let OralAnswer = this.state.OralAnswer;
    OralAnswer.display = OralAnswerDisplay;
    OralAnswer.score = 0;
    OralAnswer.maxScore = 0;
    OralAnswer.coefficient = 0;
    OralAnswer.scoreWithCoeff = 0;
    OralAnswer.maxScoreWithCoeff = 0;

    this.setState({
      OralAnswer: OralAnswer,
      scoreWithCoeffSum: scoreSum(
        this.state.WrittenAnswer.scoreWithCoeff,
        OralAnswer.scoreWithCoeff,
        this.state.Test.scoreWithCoeff,
        this.state.Attendance.scoreWithCoeff
      ),
      maxScoreWithCoeffSum: scoreSum(
        this.state.WrittenAnswer.maxScoreWithCoeff,
        OralAnswer.maxScoreWithCoeff,
        this.state.Test.maxScoreWithCoeff,
        this.state.Attendance.maxScoreWithCoeff
      ),
    });
  }

  TestHandle(TestDisplay) {
    let Test = this.state.Test;
    Test.display = TestDisplay;
    Test.score = 0;
    Test.maxScore = 0;
    Test.coefficient = 0;
    Test.scoreWithCoeff = 0;
    Test.maxScoreWithCoeff = 0;

    this.setState({
      Test: Test,
      scoreWithCoeffSum: scoreSum(
        this.state.WrittenAnswer.scoreWithCoeff,
        this.state.OralAnswer.scoreWithCoeff,
        Test.scoreWithCoeff,
        this.state.Attendance.scoreWithCoeff
      ),
      maxScoreWithCoeffSum: scoreSum(
        this.state.WrittenAnswer.maxScoreWithCoeff,
        this.state.OralAnswer.maxScoreWithCoeff,
        Test.maxScoreWithCoeff,
        this.state.Attendance.maxScoreWithCoeff
      ),
    });
  }

  AttendanceHandle(AttendanceDisplay) {
    let Attendance = this.state.Attendance;
    Attendance.display = AttendanceDisplay;
    Attendance.score = 0;
    Attendance.maxScore = 0;
    Attendance.coefficient = 0;
    Attendance.scoreWithCoeff = 0;
    Attendance.maxScoreWithCoeff = 0;

    this.setState({
      Attendance: Attendance,
      scoreWithCoeffSum: scoreSum(
        this.state.WrittenAnswer.scoreWithCoeff,
        this.state.OralAnswer.scoreWithCoeff,
        this.state.Test.scoreWithCoeff,
        Attendance.scoreWithCoeff
      ),
      maxScoreWithCoeffSum: scoreSum(
        this.state.WrittenAnswer.maxScoreWithCoeff,
        this.state.OralAnswer.maxScoreWithCoeff,
        this.state.Test.maxScoreWithCoeff,
        Attendance.maxScoreWithCoeff
      ),
    });
  }

  CleanHandle() {
    this.setState({
      WrittenAnswer: {
        rowName: "Письменный ответ",
        rowID: 0,
        display: true,
        score: 0,
        maxScore: 0,
        coefficient: 0,
        scoreWithCoeff: 0,
        maxScoreWithCoeff: 0,
      },
      OralAnswer: {
        rowName: "Устный ответ",
        rowID: 1,
        display: true,
        score: 0,
        maxScore: 0,
        coefficient: 0,
        scoreWithCoeff: 0,
        maxScoreWithCoeff: 0,
      },
      Test: {
        rowName: "Тест",
        rowID: 2,
        display: true,
        score: 0,
        maxScore: 0,
        coefficient: 0,
        scoreWithCoeff: 0,
        maxScoreWithCoeff: 0,
      },
      Attendance: {
        rowName: "Посещение",
        rowID: 3,
        display: true,
        score: 0,
        maxScore: 0,
        coefficient: 0,
        scoreWithCoeff: 0,
        maxScoreWithCoeff: 0,
      },
      scoreWithCoeffSum: 0,
      maxScoreWithCoeffSum: 0,
    });
  }

  ScoreChangeHandle(score, id) {
    let WrittenAnswer = this.state.WrittenAnswer;
    let OralAnswer = this.state.OralAnswer;
    let Test = this.state.Test;
    let Attendance = this.state.Attendance;

    switch (id) {
      case 0:
        WrittenAnswer.score = score;
        WrittenAnswer.scoreWithCoeff = scoreWithCoeffCount(
          score,
          WrittenAnswer.coefficient
        );
        break;

      case 1:
        OralAnswer.score = score;
        OralAnswer.scoreWithCoeff = scoreWithCoeffCount(
          score,
          OralAnswer.coefficient
        );
        break;

      case 2:
        Test.score = score;
        Test.scoreWithCoeff = scoreWithCoeffCount(score, Test.coefficient);
        break;

      case 3:
        Attendance.score = score;
        Attendance.scoreWithCoeff = scoreWithCoeffCount(
          score,
          Attendance.coefficient
        );
        break;
    }

    this.setState({
      WrittenAnswer: WrittenAnswer,
      OralAnswer: OralAnswer,
      Test: Test,
      Attendance: Attendance,
      scoreWithCoeffSum: scoreSum(
        WrittenAnswer.scoreWithCoeff,
        OralAnswer.scoreWithCoeff,
        Test.scoreWithCoeff,
        Attendance.scoreWithCoeff
      ),
    });
  }

  MaxScoreChangeHandle(maxScore, id) {
    let WrittenAnswer = this.state.WrittenAnswer;
    let OralAnswer = this.state.OralAnswer;
    let Test = this.state.Test;
    let Attendance = this.state.Attendance;

    switch (id) {
      case 0:
        WrittenAnswer.maxScore = maxScore;
        WrittenAnswer.maxScoreWithCoeff = scoreWithCoeffCount(
          maxScore,
          WrittenAnswer.coefficient
        );
        break;

      case 1:
        OralAnswer.maxScore = maxScore;
        OralAnswer.maxScoreWithCoeff = scoreWithCoeffCount(
          maxScore,
          OralAnswer.coefficient
        );
        break;

      case 2:
        Test.maxScore = maxScore;
        Test.maxScoreWithCoeff = scoreWithCoeffCount(
          maxScore,
          Test.coefficient
        );
        break;

      case 3:
        Attendance.maxScore = maxScore;
        Attendance.maxScoreWithCoeff = scoreWithCoeffCount(
          maxScore,
          Attendance.coefficient
        );
        break;
    }

    this.setState({
      WrittenAnswer: WrittenAnswer,
      OralAnswer: OralAnswer,
      Test: Test,
      Attendance: Attendance,
      maxScoreWithCoeffSum: scoreSum(
        WrittenAnswer.maxScoreWithCoeff,
        OralAnswer.maxScoreWithCoeff,
        Test.maxScoreWithCoeff,
        Attendance.maxScoreWithCoeff
      ),
    });
  }

  CoefficientChangeHandle(coefficient, id) {
    let WrittenAnswer = this.state.WrittenAnswer;
    let OralAnswer = this.state.OralAnswer;
    let Test = this.state.Test;
    let Attendance = this.state.Attendance;

    console.log("клэф", coefficient);
    if (coefficient > 1) {
      Alert.error("Коэффициент не может быть больше 1", {
        position: "top-right",
        effect: "slide",
        timeout: 5000,
      });

      coefficient = 0;
    }

    if (coefficient < 0) {
      Alert.error("Коэффициент не может быть меньше 0", {
        position: "top-right",
        effect: "slide",
        timeout: 5000,
      });

      coefficient = 0;
    }

    switch (id) {
      case 0:
        WrittenAnswer.coefficient = coefficient;
        WrittenAnswer.scoreWithCoeff = scoreWithCoeffCount(
          WrittenAnswer.score,
          coefficient
        );
        WrittenAnswer.maxScoreWithCoeff = scoreWithCoeffCount(
          WrittenAnswer.maxScore,
          coefficient
        );
        break;

      case 1:
        OralAnswer.coefficient = coefficient;
        OralAnswer.scoreWithCoeff = scoreWithCoeffCount(
          OralAnswer.score,
          coefficient
        );
        OralAnswer.maxScoreWithCoeff = scoreWithCoeffCount(
          OralAnswer.maxScore,
          coefficient
        );
        break;

      case 2:
        Test.coefficient = coefficient;
        Test.scoreWithCoeff = scoreWithCoeffCount(Test.score, coefficient);
        Test.maxScoreWithCoeff = scoreWithCoeffCount(
          Test.maxScore,
          coefficient
        );
        break;

      case 3:
        Attendance.coefficient = coefficient;
        Attendance.scoreWithCoeff = scoreWithCoeffCount(
          Attendance.score,
          coefficient
        );
        Attendance.maxScoreWithCoeff = scoreWithCoeffCount(
          Attendance.maxScore,
          coefficient
        );
        break;
    }

    this.setState({
      WrittenAnswer: WrittenAnswer,
      OralAnswer: OralAnswer,
      Test: Test,
      Attendance: Attendance,
      scoreWithCoeffSum: scoreSum(
        WrittenAnswer.scoreWithCoeff,
        OralAnswer.scoreWithCoeff,
        Test.scoreWithCoeff,
        Attendance.scoreWithCoeff
      ),
      maxScoreWithCoeffSum: scoreSum(
        WrittenAnswer.maxScoreWithCoeff,
        OralAnswer.maxScoreWithCoeff,
        Test.maxScoreWithCoeff,
        Attendance.maxScoreWithCoeff
      ),
    });
  }

  CoefficientBlurHandle(coefficient, id) {
    let WrittenAnswer = this.state.WrittenAnswer;
    let OralAnswer = this.state.OralAnswer;
    let Test = this.state.Test;
    let Attendance = this.state.Attendance;
    coefficient = Number(coefficient);
    console.log("клэфblur", coefficient);
    let count = 0;
    count =
      Number(WrittenAnswer.coefficient) +
      Number(OralAnswer.coefficient) +
      Number(Test.coefficient) +
      Number(Attendance.coefficient);

    if (count > 1) {
      Alert.error("Сумма коэффициентов не может быть больше 1", {
        position: "top-right",
        effect: "slide",
        timeout: 5000,
      });

      coefficient = 0;
    }

    switch (id) {
      case 0:
        WrittenAnswer.coefficient = coefficient;
        WrittenAnswer.scoreWithCoeff = scoreWithCoeffCount(
          WrittenAnswer.score,
          coefficient
        );
        WrittenAnswer.maxScoreWithCoeff = scoreWithCoeffCount(
          WrittenAnswer.maxScore,
          coefficient
        );
        break;

      case 1:
        OralAnswer.coefficient = coefficient;
        OralAnswer.scoreWithCoeff = scoreWithCoeffCount(
          OralAnswer.score,
          coefficient
        );
        OralAnswer.maxScoreWithCoeff = scoreWithCoeffCount(
          OralAnswer.maxScore,
          coefficient
        );
        break;

      case 2:
        Test.coefficient = coefficient;
        Test.scoreWithCoeff = scoreWithCoeffCount(Test.score, coefficient);
        Test.maxScoreWithCoeff = scoreWithCoeffCount(
          Test.maxScore,
          coefficient
        );
        break;

      case 3:
        Attendance.coefficient = coefficient;
        Attendance.scoreWithCoeff = scoreWithCoeffCount(
          Attendance.score,
          coefficient
        );
        Attendance.maxScoreWithCoeff = scoreWithCoeffCount(
          Attendance.maxScore,
          coefficient
        );
        break;
    }

    this.setState({
      WrittenAnswer: WrittenAnswer,
      OralAnswer: OralAnswer,
      Test: Test,
      Attendance: Attendance,
      scoreWithCoeffSum: scoreSum(
        WrittenAnswer.scoreWithCoeff,
        OralAnswer.scoreWithCoeff,
        Test.scoreWithCoeff,
        Attendance.scoreWithCoeff
      ),
      maxScoreWithCoeffSum: scoreSum(
        WrittenAnswer.maxScoreWithCoeff,
        OralAnswer.maxScoreWithCoeff,
        Test.maxScoreWithCoeff,
        Attendance.maxScoreWithCoeff
      ),
    });
  }

  render() {
    let conditionalRender;
    if (
      this.state.WrittenAnswer.display ||
      this.state.OralAnswer.display ||
      this.state.Test.display ||
      this.state.Attendance.display
    ) {
      conditionalRender = (
        <React.Fragment>
          <Table
            onScoreChange={this.ScoreChangeHandle}
            onMaxScoreChange={this.MaxScoreChangeHandle}
            onCoefficientChange={this.CoefficientChangeHandle}
            onCoefficientBlur={this.CoefficientBlurHandle}
            rows={this.state}
          />
          <Result
            mark30={(
              resultCount(
                this.state.scoreWithCoeffSum,
                this.state.maxScoreWithCoeffSum
              ) * 30
            ).toFixed(2)}
            mark100={(
              resultCount(
                this.state.scoreWithCoeffSum,
                this.state.maxScoreWithCoeffSum
              ) * 100
            ).toFixed(2)}
            prediction={prediction(this.state)}
          />
        </React.Fragment>
      );
    } else {
      conditionalRender = (
        <p className={styles.conditionalRender}>
          Необходимо выбрать хотя бы один вид оценивания
        </p>
      );
    }

    return (
      <div>
        <Instructions />
        <ExamCalcForm
          WrittenAnswer={this.state.WrittenAnswer.display}
          OralAnswer={this.state.OralAnswer.display}
          Test={this.state.Test.display}
          Attendance={this.state.Attendance.display}
          onCleanClick={this.CleanHandle}
          onWrittenAnswerChange={this.WrittenAnswerHandle}
          onOralAnswerChange={this.OralAnswerHandle}
          onTestChange={this.TestHandle}
          onAttendanceChange={this.AttendanceHandle}
        />
        {conditionalRender}
      </div>
    );
  }
}

export default ExamCalc;
