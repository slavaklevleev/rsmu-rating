import React from "react";

const BLOCK_STYLE = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "70%",
  margin: "auto",
};

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
    return (
      <div className="termInfo" style={BLOCK_STYLE}>
        <p>Количество семестров: {this.props.TermNumber}</p>
        <div>
          <button onClick={this.AddTermButtonHandle}>Добавить семестр</button>
          <button onClick={this.RemoveTermButtonHandle}>Убрать семестр</button>
        </div>
        <div style={CHECKBOX_BLOCK_STYLE}>
          <label style={CHECKBOX_LABEL_STYLE}>
            {" "}
            <input
              type="Checkbox"
              checked={this.props.CanBeIncreased}
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
              checked={this.props.CanBeDowngrade}
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

export default CalculatorForm;
