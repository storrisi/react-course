import React, { Component } from "react";
import {Provider} from 'react-redux'
import { Route, Link,Switch  } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import style from "./App.module.css";
import Customers from "../Customers";
import NotFound from "./NotFound";

class App extends Component {
  render() {
    const {history, store} = this.props
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div className={style.AppHeader}>
            <Link to="/about">About</Link>
            <Link to="/">List</Link>
            <Switch>
              <Route exact path='/' component={Customers}/>
              <Route exact path='/add' component={Customers}/>
              <Route exact path='/edit' component={Customers}/>
              <Route component={NotFound} />
            </Switch>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
