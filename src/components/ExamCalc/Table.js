import React from "react";
import styles from "./Table.module.css";
import PropTypes from "prop-types";

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.ScoreChangeHandle = this.ScoreChangeHandle.bind(this);
    this.MaxScoreChangeHandle = this.MaxScoreChangeHandle.bind(this);
    this.CoefficientChangeHandle = this.CoefficientChangeHandle.bind(this);
    this.CoefficientBlurHandle = this.CoefficientBlurHandle.bind(this);
  }

  ScoreChangeHandle(e) {
    this.props.onScoreChange(e.target.value, Number(e.target.id));
  }

  MaxScoreChangeHandle(e) {
    this.props.onMaxScoreChange(e.target.value, Number(e.target.id));
  }

  CoefficientChangeHandle(e) {
    this.props.onCoefficientChange(e.target.value, Number(e.target.id));
  }

  CoefficientBlurHandle(e) {
    this.props.onCoefficientBlur(e.target.value, Number(e.target.id));
  }

  render() {
    const displayedRows = [];

    if (this.props.rows.WrittenAnswer.display) {
      displayedRows.push(this.props.rows.WrittenAnswer);
    }

    if (this.props.rows.OralAnswer.display) {
      displayedRows.push(this.props.rows.OralAnswer);
    }

    if (this.props.rows.Test.display) {
      displayedRows.push(this.props.rows.Test);
    }

    if (this.props.rows.Attendance.display) {
      displayedRows.push(this.props.rows.Attendance);
    }

    console.log(displayedRows);

    return (
      <div className={styles.tableScroll}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Балл</th>
              <th>Макс. балл</th>
              <th>Весовой коэф.</th>
            </tr>
          </thead>
          <tbody>
            {displayedRows.map((row, i) => (
              <tr key={row}>
                <th>{row.rowName}</th>
                <td>
                  <input
                    key={i}
                    className={styles.tableInput}
                    id={row.rowID}
                    type="text"
                    value={row.score}
                    onChange={this.ScoreChangeHandle}
                  />
                </td>
                <td>
                  <input
                    key={i}
                    className={styles.tableInput}
                    id={row.rowID}
                    type="text"
                    value={row.maxScore}
                    onChange={this.MaxScoreChangeHandle}
                  />
                </td>
                <td>
                  <input
                    key={i}
                    className={styles.tableInput}
                    id={row.rowID}
                    type="text"
                    value={row.coefficient}
                    onChange={this.CoefficientChangeHandle}
                    onBlur={this.CoefficientBlurHandle}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

// Table.propTypes = {
//   termsInfo: PropTypes.number,
//   onScoreChange: PropTypes.func,
//   onCoefficientChange: PropTypes.func,
//   onCoefficientBlur: PropTypes.func,
// };

export default Table;
