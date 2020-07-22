import React from "react";
import PropTypes from "prop-types";

const BLOCK_STYLE = {
  width: "40%",
  border: "2px solid silver",
  borderRadius: "5px",
  margin: "15px",
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
};

const Infoblock = ({ header, text }) => (
  <div style={BLOCK_STYLE}>
    <h2>{header}</h2>
    <p>{text}</p>
  </div>
);

Infoblock.propTypes = {
  header: PropTypes.string,
  text: PropTypes.string,
};

export default Infoblock;
