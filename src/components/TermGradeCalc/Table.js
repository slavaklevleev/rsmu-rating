import React from "react";
import styles from "./styles/Table.module.css";
import PropTypes from "prop-types";

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.ScoreChangeHandle = this.ScoreChangeHandle.bind(this);
    this.CoefficientChangeHandle = this.CoefficientChangeHandle.bind(this);
    this.CoefficientBlurHandle = this.CoefficientBlurHandle.bind(this);
  }

  ScoreChangeHandle(e) {
    this.props.onScoreChange(e.target.value.replace(/[^0-9+.+,]/g, "").replace(",","."), Number(e.target.id));
  }

  CoefficientChangeHandle(e) {
    this.props.onCoefficientChange(e.target.value.replace(/[^0-9+.]/g, "").replace(",","."), Number(e.target.id));
  }

  CoefficientBlurHandle(e) {
    this.props.onCoefficientBlur(e.target.value.replace(/[^0-9+.+,]/g, "").replace(",","."), Number(e.target.id));
  }

  render() {
    return (
      <div>
        {/* <p className={styles.explanation}>
          Весовой коэффициент #2 равен <b>{this.props.termsInfo[0].coefficient2}</b>
        </p> */}
        <table className={styles.table}>
          <tr className={styles.tr}>
            <th className={styles.th}>Семестр №</th>
            <th className={styles.th}>Балл</th>
            <th className={styles.th}>Вессовой коэф. #1</th>
            <th className={styles.th}>Балл с учетом весовых коэф.</th>
          </tr>

          {this.props.termsInfo.map((i, index) => (
            <tr className={styles.tr} key={i}>
              <td className={styles.td}>
                <p>{i.num}</p>
              </td>
              <td className={styles.td}>
                <input
                  key={index}
                  className={styles.TableInput}
                  id={index}
                  type="text"
                  value={i.score}
                  onChange={this.ScoreChangeHandle}
                />
              </td>
              <td className={styles.td}>
                <input
                  key={index}
                  className={styles.TableInput}
                  id={index}
                  type="text"
                  value={i.coefficient1}
                  onChange={this.CoefficientChangeHandle}
                  onBlur={this.CoefficientBlurHandle}
                />
              </td>
              <td className={styles.td}>
                <p>{i.scoreWithCoeff.toFixed(2)}</p>
              </td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  termsInfo: PropTypes.number,
  onScoreChange: PropTypes.func,
  onCoefficientChange: PropTypes.func,
  onCoefficientBlur: PropTypes.func,
};

export default Table;
