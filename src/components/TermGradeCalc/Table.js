import React from "react";

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.ScoreChangeHandle = this.ScoreChangeHandle.bind(this);
    this.CoefficientChangeHandle = this.CoefficientChangeHandle.bind(this);
  }

  ScoreChangeHandle(e) {
    this.props.onScoreChange(e.target.value, Number(e.target.id));
  }
  
  CoefficientChangeHandle(e) {
    this.props.onCoefficientChange(e.target.value, Number(e.target.id));
  }

  render() {
    return (
      <table>
        <tr>
          <th>Семестр №</th>
          <th>Балл</th>
          <th>Вессовой коэф. #1</th>
          <th>Вессовой коэф. #2</th>
          <th>Балл с учетом весовых коэф.</th>
        </tr>

        {this.props.termsInfo.map((i, index) => (
          <tr>
            <th>
              <p>{i.num}</p>
            </th>
            <td>
              <input
                key={index}
                className="TableInput"
                id={index}
                type="text"
                value={i.score}
                onChange={this.ScoreChangeHandle}
              />
            </td>
            <td>
              <input
                key={index}
                className="TableInput"
                id={index}
                type="text"
                value={i.coefficient1}
                onChange={this.CoefficientChangeHandle}
              />
            </td>
            <td>
              <p>{i.coefficient2}</p>
            </td>
            <td>
              <p>{i.scoreWithCoeff.toFixed(2)}</p>
            </td>
          </tr>
        ))}
      </table>
    );
  }
}

export default Table;
