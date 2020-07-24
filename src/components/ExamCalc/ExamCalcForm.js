import React from "react";
import styles from "./ExamCalcForm.module.css";
import PropTypes from "prop-types";

class ExamCalcForm extends React.Component {
  constructor(props) {
    super(props);
    this.WrittenAnswerHandle = this.WrittenAnswerHandle.bind(this);
    this.OralAnswerHandle = this.OralAnswerHandle.bind(this);
    this.TestHandle = this.TestHandle.bind(this);
    this.AttendanceHandle = this.AttendanceHandle.bind(this);
  }

  WrittenAnswerHandle(e) {
    this.props.onWrittenAnswerChange(e.target.checked);
  }

  OralAnswerHandle(e) {
    this.props.onOralAnswerChange(e.target.checked);
  }

  TestHandle(e) {
    this.props.onTestChange(e.target.checked);
  }

  AttendanceHandle(e) {
    this.props.onAttendanceChange(e.target.checked);
  }

  render() {
    const { WrittenAnswer, OralAnswer, Test, Attendance } = this.props;
    return (
      <div className={styles.checkboxBlock}>
        <label>
          {" "}
          <input
            className={styles.checkbox}
            type="Checkbox"
            checked={WrittenAnswer}
            onChange={this.WrittenAnswerHandle}
          />{" "}
          <p>Письменный ответ</p>
        </label>
        <label>
          {" "}
          <input
            className={styles.checkbox}
            type="Checkbox"
            checked={OralAnswer}
            onChange={this.OralAnswerHandle}
          />{" "}
          <p>Устный ответ</p>
        </label>
        <label>
          {" "}
          <input
            className={styles.checkbox}
            type="Checkbox"
            checked={Test}
            onChange={this.TestHandle}
          />{" "}
          <p>Тест</p>
        </label>
        <label>
          {" "}
          <input
            className={styles.checkbox}
            type="Checkbox"
            checked={Attendance}
            onChange={this.AttendanceHandle}
          />{" "}
          <p>Посещение</p>
        </label>
      </div>
    );
  }
}

ExamCalcForm.propTypes = {
  WrittenAnswer: PropTypes.bool,
  OralAnswer: PropTypes.bool,
  Test: PropTypes.bool,
  Attendance: PropTypes.bool,
  onWrittenAnswerChange: PropTypes.func,
  onOralAnswerChange: PropTypes.func,
  onTestChange: PropTypes.func,
  onAttendanceChange: PropTypes.func,
};

export default ExamCalcForm;
