import React from "react";

const Button = ({ onClick, ...props }) => (
  <button onClick={onClick}>{props.children}</button>
);
export default Button;
