import React from "react";
import PropTypes from "prop-types";
import styles from "./styles/CalculatorForm.module.css";

class CalculatorForm extends React.Component {
  constructor(props) {
    super(props);
    this.AddTermButtonHandle = this.AddTermButtonHandle.bind(this);
    this.RemoveTermButtonHandle = this.RemoveTermButtonHandle.bind(this);
    this.CanBeDowngradeHandle = this.CanBeDowngradeHandle.bind(this);
    this.CanBeIncreasedHandle = this.CanBeIncreasedHandle.bind(this);
  }

  AddTermButtonHandle(e) {
    this.props.onAddTermButtonClick(e.target);
  }

  RemoveTermButtonHandle(e) {
    this.props.onRemoveTermButtonClick(e.target);
  }

  CanBeDowngradeHandle(e) {
    this.props.onCanBeDowngradeChange(e.target.checked);
  }

  CanBeIncreasedHandle(e) {
    this.props.onCanBeIncreasedChange(e.target.checked);
  }

  render() {
    const { TermNumber, CanBeIncreased, CanBeDowngrade } = this.props;
    return (
      <div className={styles.CalculatorForm}>
        <div className={styles.termNumber}>
          <p>Количество семестров: {TermNumber}</p>
        </div>
        <div className={styles.buttonBlock}>
          <button
            className={styles.formButton}
            onClick={this.AddTermButtonHandle}
          >
            Добавить семестр
          </button>
          <button
            className={styles.formButton}
            onClick={this.RemoveTermButtonHandle}
          >
            Убрать семестр
          </button>
        </div>
        <div className={styles.checkboxBlock}>
          <label className={styles.label}>
            {" "}
            <input
              className={styles.checkbox}
              type="Checkbox"
              checked={CanBeIncreased}
              onChange={this.CanBeIncreasedHandle}
            />{" "}
            Учесть возможность повышения <br /> итогового рейтинга
          </label>
          <label className={styles.label}>
            {" "}
            <input
              className={styles.checkbox}
              type="Checkbox"
              checked={CanBeDowngrade}
              onChange={this.CanBeDowngradeHandle}
            />{" "}
            Учесть возможность понижения <br /> итогового рейтинга
          </label>
        </div>
      </div>
    );
  }
}

CalculatorForm.propTypes = {
  TermNumber: PropTypes.number,
  CanBeDowngrade: PropTypes.bool,
  CanBeIncreased: PropTypes.bool,
  onAddTermButtonClick: PropTypes.func,
  onRemoveTermButtonClick: PropTypes.func,
  onCanBeDowngradeChange: PropTypes.func,
  onCanBeIncreasedChange: PropTypes.func,
};
export default CalculatorForm;
