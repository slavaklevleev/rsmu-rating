import React from "react";

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
      <div className="termInfo">
        <p>Количество семестров: {this.props.TermNumber}</p>
        <div>
          <button onClick={this.AddTermButtonHandle}>Добавить семестр</button>
          <button onClick={this.RemoveTermButtonHandle}>Убрать семестр</button>
        </div>
        <div>
          <label>
            {" "}
            <input
              type="Checkbox"
              checked={this.props.CanBeIncreased}
              onChange={this.CanBeIncreasedHandle}
            />{" "}
            <p>
              Учесть возможность повышения <br /> итогового рейтинга
            </p>
          </label>
          <label>
            {" "}
            <input
              type="Checkbox"
              checked={this.props.CanBeDowngrade}
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
