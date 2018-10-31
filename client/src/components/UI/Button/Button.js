import React from "react";
import PropTypes from "prop-types";

const Button = ({ onClick, ...props }) => (
  <button onClick={onClick}>{props.children}</button>
);

Button.propTypes = {
  onClick: PropTypes.func
};

export default Button;
