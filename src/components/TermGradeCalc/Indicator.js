import React from "react";
import PropTypes from "prop-types";

const Indicator = ({ score }) => {
  let color;
  let borderColor;

  if (score < 19 || score > 32) {
    color = "rgb(253, 157, 155)";
    borderColor = "rgb(141, 26, 17)";
  } else if (score < 21 || score > 30) {
    color = "rgb(253, 242, 208)";
    borderColor = "rgb(107, 35, 70)";
  } else {
    color = "rgb(210, 226, 241)";
    borderColor = "rgb(103, 187, 196)";
  }

  const INDICATOR = {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    border: "2px solid",
    borderColor: borderColor,
    background: color,
  };

  return (
    <div>
      <div style={INDICATOR}></div>
    </div>
  );
};

Indicator.propTypes = {
  score: PropTypes.number,
};

export default Indicator;
