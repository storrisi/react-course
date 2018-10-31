import React, { Component } from "react";
import style from "./App.module.css";
import Customers from "../Customers";

class App extends Component {
  render() {
    return (
      <div className={style.AppHeader}>
        <Customers />
      </div>
    );
  }
}

export default App;
