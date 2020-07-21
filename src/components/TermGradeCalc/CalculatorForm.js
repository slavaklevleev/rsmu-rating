import React from "react";
import PropTypes from 'prop-types';

const BLOCK_STYLE = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "70%",
  margin: "auto",
};

const BUTTON_BLOCK_STYLE = {
  display: "flex",
}

const CHECKBOX_BLOCK_STYLE = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  width: "100%",
  margin: "10px 0px",
};

const CHECKBOX_LABEL_STYLE = {
  flexDirection: "row",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const CHECKBOX_STYLE = {
  margin: "15px",
}

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
    const {TermNumber, CanBeIncreased, CanBeDowngrade} = this.props
    return (
      <div className="termInfo" style={BLOCK_STYLE}>
        <p>Количество семестров: {TermNumber}</p>
        <div style={BUTTON_BLOCK_STYLE}>
          <button onClick={this.AddTermButtonHandle}>Добавить семестр</button>
          <button onClick={this.RemoveTermButtonHandle}>Убрать семестр</button>
        </div>
        <div style={CHECKBOX_BLOCK_STYLE}>
          <label style={CHECKBOX_LABEL_STYLE}>
            {" "}
            <input
              type="Checkbox"
              checked={CanBeIncreased}
              style={CHECKBOX_STYLE}
              onChange={this.CanBeIncreasedHandle}
            />{" "}
            <p>
              Учесть возможность повышения <br /> итогового рейтинга
            </p>
          </label>
          <label style={CHECKBOX_LABEL_STYLE}>
            {" "}
            <input
              type="Checkbox"
              checked={CanBeDowngrade}
              style={CHECKBOX_STYLE}
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
}
export default CalculatorForm;
