import React, { Component } from 'react';
import {Router, Route, Switch} from 'react-router-dom'
import {Provider} from 'react-redux'
import Customers from '../Customers';
import NavBar from '../../components/NavBar';
import NotFound from '../../components/NotFound';
import {buildPrivateRoute, LIST_ROUTE} from '../../utils/routes'

class App extends Component {
    render() {
        const {history, store} = this.props
        const PrivateRoute = buildPrivateRoute(this.props)
        return (
            <div>
                <Provider store={store}>
                    <Router history={history}>
                        <NavBar />
                        <Switch>
                            <Route exact path="/" component={Customers} />
                            <Route exact path={LIST_ROUTE} component={Customers} />
                            <Route exact path="/add" component={Customers} />
                            <Route exact path="/edit" component={Customers} />
                            <PrivateRoute path="/auth" component={Customers} />
                            <Route component={NotFound} />
                        </Switch>
                    </Router>
                </Provider>
            </div>
        );
    }
}

export default App;